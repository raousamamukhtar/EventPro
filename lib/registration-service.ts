import { createRegistration } from "@/lib/db"
import { sendRegistrationEmail } from "@/lib/email"
import { verifyAndConsumeOtp, type PendingRegistration } from "@/lib/otp"

function toRegistrationInput(data: PendingRegistration) {
  return {
    name: data.name,
    email: data.email,
    phone: data.phone,
    university: data.university,
    experience: data.experience ?? undefined,
    interests: data.interests ?? undefined,
    team_name: data.team_name ?? undefined,
    participation_type: data.participation_type ?? undefined,
  }
}

export async function completeRegistrationWithOtp(email: string, otp: string) {
  const verification = await verifyAndConsumeOtp(email, otp)

  if (!verification.success) {
    return {
      success: false as const,
      error: verification.error,
      status: verification.status,
    }
  }

  const { registrationData } = verification
  const registrationInput = toRegistrationInput(registrationData)

  try {
    const registration = await createRegistration(registrationInput)

    try {
      await sendRegistrationEmail(
        registrationData.email,
        registrationData.name,
        { ...registrationInput, attendance_token: registration.attendance_token }
      )
    } catch (emailError) {
      if (process.env.NODE_ENV === "development") {
        console.error("Confirmation email failed:", emailError)
      }
    }

    return {
      success: true as const,
      registration,
      message: "Registration successful! Check your email for confirmation.",
    }
  } catch (dbError) {
    if (dbError instanceof Error && dbError.message === "Email already registered") {
      return {
        success: false as const,
        error: "Email already registered",
        status: 409,
      }
    }

    return {
      success: false as const,
      error: "Registration service temporarily unavailable. Please try again later.",
      status: 503,
    }
  }
}
