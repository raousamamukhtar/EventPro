import { type NextRequest, NextResponse } from "next/server"
import { completeRegistrationWithOtp } from "@/lib/registration-service"
import { checkRateLimit, getClientIp } from "@/lib/register-utils"
import { otpSchema } from "@/lib/validation/registration"
import { sanitizeInput } from "@/lib/sanitize"
import { generateQrCodeDataUrl } from "@/lib/email"

export async function POST(request: NextRequest) {
  try {
    const clientIp = getClientIp(request)
    const rateLimit = checkRateLimit(`verify-otp:${clientIp}`, 10, 5 * 60 * 1000)

    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: "Too many verification attempts. Please try again later." },
        { status: 429 }
      )
    }

    const body = await request.json()
    const parsed = otpSchema.safeParse({
      email: sanitizeInput(String(body.email ?? "")).toLowerCase(),
      otp: sanitizeInput(String(body.otp ?? "")),
    })

    if (!parsed.success) {
      const firstError = parsed.error.errors[0]
      return NextResponse.json(
        { error: firstError?.message || "Invalid verification data" },
        { status: 400 }
      )
    }

    const result = await completeRegistrationWithOtp(parsed.data.email, parsed.data.otp)

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: result.status })
    }

    let qrCode: string | undefined
    if (result.registration.attendance_token) {
      try {
        qrCode = await generateQrCodeDataUrl(result.registration.attendance_token)
      } catch {
        // non-fatal
      }
    }

    return NextResponse.json({
      success: true,
      registration: result.registration,
      qrCode,
      message: result.message,
    })
  } catch (error) {
    console.error("Verify OTP error:", error)
    return NextResponse.json(
      { error: "Verification failed. Please try again." },
      { status: 500 }
    )
  }
}
