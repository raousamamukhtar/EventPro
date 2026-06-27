import { type NextRequest } from "next/server"
import { sanitizeInput } from "@/lib/sanitize"
import {
  registrationSchema,
  normalizeParticipationType,
  type RegistrationBodyInput,
} from "@/lib/validation/registration"

const rateLimitStore = new Map<string, { count: number; lastAttempt: number }>()

export function getClientIp(request: NextRequest): string {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown"
}

export function checkRateLimit(
  key: string,
  maxAttempts: number,
  windowMs: number
): { allowed: boolean; retryAfterMs?: number } {
  const now = Date.now()
  const record = rateLimitStore.get(key) || { count: 0, lastAttempt: 0 }

  if (now - record.lastAttempt >= windowMs) {
    record.count = 0
  }

  if (record.count >= maxAttempts) {
    const retryAfterMs = windowMs - (now - record.lastAttempt)
    return { allowed: false, retryAfterMs }
  }

  record.count += 1
  record.lastAttempt = now
  rateLimitStore.set(key, record)
  return { allowed: true }
}

export function sanitizeRegistrationBody(body: unknown): RegistrationBodyInput {
  const b = (body && typeof body === "object" ? body : {}) as Record<string, unknown>

  return {
    name: sanitizeInput(String(b.name ?? "")),
    email: sanitizeInput(String(b.email ?? "")).toLowerCase(),
    phone: sanitizeInput(String(b.phone ?? "")),
    university: sanitizeInput(String(b.university ?? "")),
    experience: b.experience ? sanitizeInput(String(b.experience)) : undefined,
    interests: b.interests ? sanitizeInput(String(b.interests)) : undefined,
    teamName: b.teamName ? sanitizeInput(String(b.teamName)) : undefined,
    participationType: b.participationType
      ? sanitizeInput(String(b.participationType))
      : undefined,
  }
}

export function parseRegistrationBody(body: unknown) {
  const sanitized = sanitizeRegistrationBody(body)
  const parsed = registrationSchema.safeParse(sanitized)

  if (!parsed.success) {
    const firstError = parsed.error.errors[0]
    return {
      success: false as const,
      error: firstError?.message || "Invalid registration data",
      details: parsed.error.flatten(),
    }
  }

  const participationType = normalizeParticipationType(parsed.data.participationType)

  return {
    success: true as const,
    data: parsed.data,
    participationType,
  }
}
