import { type NextRequest, NextResponse } from "next/server"
import { getRegistrationByEmail } from "@/lib/db"
import { sendOtpEmail } from "@/lib/email"
import {
  generateOtp,
  hashOtp,
  storeOtp,
  formDataToPendingRegistration,
} from "@/lib/otp"
import { checkRateLimit, getClientIp, parseRegistrationBody } from "@/lib/register-utils"

export async function POST(request: NextRequest) {
  try {
    const clientIp = getClientIp(request)
    const rateLimit = checkRateLimit(`send-otp:${clientIp}`, 5, 5 * 60 * 1000)

    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: "Too many OTP requests. Please try again later." },
        { status: 429 }
      )
    }

    const body = await request.json()
    const parsed = parseRegistrationBody(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error, details: parsed.details },
        { status: 400 }
      )
    }

    const { data, participationType } = parsed
    const emailRateLimit = checkRateLimit(`send-otp:${data.email}`, 3, 10 * 60 * 1000)

    if (!emailRateLimit.allowed) {
      return NextResponse.json(
        { error: "Too many verification codes sent to this email. Please wait before trying again." },
        { status: 429 }
      )
    }

    if (process.env.DATABASE_URL) {
      try {
        const existing = await getRegistrationByEmail(data.email)
        if (existing) {
          return NextResponse.json(
            { error: "Email already registered" },
            { status: 409 }
          )
        }
      } catch (dbError) {
        if (process.env.NODE_ENV === "development") {
          console.error("Database error during email check:", dbError)
        }
      }
    }

    const otp = generateOtp()
    const otpHash = await hashOtp(otp)
    const pendingRegistration = formDataToPendingRegistration(data, participationType)

    await storeOtp(data.email, otpHash, pendingRegistration)

    const emailResult = await sendOtpEmail(data.email, data.name, otp)

    if (!emailResult.success) {
      if (process.env.NODE_ENV === "development") {
        console.log("OTP email skipped or failed:", emailResult.error)
        console.log(`[DEV] OTP for ${data.email}: ${otp}`)
      }
      return NextResponse.json(
        {
          error: "Failed to send verification email. Please try again later.",
        },
        { status: 503 }
      )
    }

    return NextResponse.json({
      success: true,
      message: "Verification code sent to your email.",
      email: data.email,
    })
  } catch (error) {
    console.error("Send OTP error:", error)
    return NextResponse.json(
      { error: "Failed to send verification code. Please try again." },
      { status: 500 }
    )
  }
}
