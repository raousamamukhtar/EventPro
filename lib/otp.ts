import { randomInt } from "crypto"
import bcrypt from "bcryptjs"
import { neon } from "@neondatabase/serverless"
import type { RegistrationFormData } from "@/lib/validation/registration"

const OTP_EXPIRY_MS = 10 * 60 * 1000 // 10 minutes
const MAX_VERIFY_ATTEMPTS = 5


export interface PendingRegistration {
  name: string
  email: string
  phone: string
  university: string
  experience: string | null
  interests: string | null
  team_name: string | null
  participation_type: string | null
}

interface OtpRecord {
  otpHash: string
  registrationData: PendingRegistration
  expiresAt: number
  attempts: number
}

const memoryStore = new Map<string, OtpRecord>()

let sql: ReturnType<typeof neon> | null = null

function getSql() {
  if (!sql && process.env.DATABASE_URL) {
    sql = neon(process.env.DATABASE_URL)
  }
  return sql
}

export function generateOtp(): string {
  return randomInt(100000, 1000000).toString()
}

export async function hashOtp(otp: string): Promise<string> {
  return bcrypt.hash(otp, 10)
}

export async function verifyOtpHash(otp: string, hash: string): Promise<boolean> {
  return bcrypt.compare(otp, hash)
}

export function formDataToPendingRegistration(
  data: RegistrationFormData,
  participationType: string | null
): PendingRegistration {
  return {
    name: data.name,
    email: data.email.toLowerCase(),
    phone: data.phone,
    university: data.university,
    experience: data.experience || null,
    interests: data.interests || null,
    team_name: data.teamName || null,
    participation_type: participationType,
  }
}

export async function storeOtp(
  email: string,
  otpHash: string,
  registrationData: PendingRegistration
): Promise<void> {
  const normalizedEmail = email.toLowerCase()
  const expiresAt = new Date(Date.now() + OTP_EXPIRY_MS)

  const db = getSql()
  if (db) {
    await db`
      DELETE FROM registration_otps WHERE email = ${normalizedEmail}
    `
    await db`
      INSERT INTO registration_otps (email, otp_hash, registration_data, expires_at, attempts)
      VALUES (
        ${normalizedEmail},
        ${otpHash},
        ${JSON.stringify(registrationData)},
        ${expiresAt.toISOString()},
        0
      )
    `
    return
  }

  memoryStore.set(normalizedEmail, {
    otpHash,
    registrationData,
    expiresAt: expiresAt.getTime(),
    attempts: 0,
  })
}

export async function verifyAndConsumeOtp(
  email: string,
  otp: string
): Promise<
  | { success: true; registrationData: PendingRegistration }
  | { success: false; error: string; status: number }
> {
  const normalizedEmail = email.toLowerCase()
  const db = getSql()

  if (db) {
    // Use EXTRACT(EPOCH …) so the expiry comparison happens in the database,
    // avoiding any JS/local-timezone date parsing issues with TIMESTAMP columns.
    const rows = (await db`
      SELECT otp_hash, registration_data, attempts,
             (expires_at <= NOW()) AS is_expired
      FROM registration_otps
      WHERE email = ${normalizedEmail}
      LIMIT 1
    `) as Array<{
      otp_hash: string
      registration_data: PendingRegistration | string
      attempts: number
      is_expired: boolean
    }>

    if (!rows.length) {
      console.error(`[OTP] No record found for email: ${normalizedEmail}`)
      return {
        success: false,
        error: "No verification code found. Please request a new one.",
        status: 400,
      }
    }

    const record = rows[0]

    if (record.is_expired) {
      console.error(`[OTP] Code expired for email: ${normalizedEmail}`)
      await db`DELETE FROM registration_otps WHERE email = ${normalizedEmail}`
      return {
        success: false,
        error: "Verification code has expired. Please request a new one.",
        status: 400,
      }
    }

    if (record.attempts >= MAX_VERIFY_ATTEMPTS) {
      console.error(`[OTP] Max attempts reached for email: ${normalizedEmail}`)
      await db`DELETE FROM registration_otps WHERE email = ${normalizedEmail}`
      return {
        success: false,
        error: "Too many failed attempts. Please request a new verification code.",
        status: 429,
      }
    }

    const isValid = await verifyOtpHash(otp, record.otp_hash)
    if (!isValid) {
      console.error(`[OTP] Invalid code for email: ${normalizedEmail}, attempt: ${record.attempts + 1}`)
      await db`
        UPDATE registration_otps
        SET attempts = attempts + 1
        WHERE email = ${normalizedEmail}
      `
      return {
        success: false,
        error: "Invalid verification code. Please try again.",
        status: 400,
      }
    }

    await db`DELETE FROM registration_otps WHERE email = ${normalizedEmail}`

    const registrationData =
      typeof record.registration_data === "string"
        ? JSON.parse(record.registration_data)
        : record.registration_data

    return { success: true, registrationData }
  }

  const record = memoryStore.get(normalizedEmail)
  if (!record) {
    return {
      success: false,
      error: "No verification code found. Please request a new one.",
      status: 400,
    }
  }

  if (Date.now() > record.expiresAt) {
    memoryStore.delete(normalizedEmail)
    return {
      success: false,
      error: "Verification code has expired. Please request a new one.",
      status: 400,
    }
  }

  if (record.attempts >= MAX_VERIFY_ATTEMPTS) {
    memoryStore.delete(normalizedEmail)
    return {
      success: false,
      error: "Too many failed attempts. Please request a new verification code.",
      status: 429,
    }
  }

  const isValid = await verifyOtpHash(otp, record.otpHash)
  if (!isValid) {
    record.attempts += 1
    memoryStore.set(normalizedEmail, record)
    return {
      success: false,
      error: "Invalid verification code. Please try again.",
      status: 400,
    }
  }

  memoryStore.delete(normalizedEmail)
  return { success: true, registrationData: record.registrationData }
}
