import { z } from "zod"

export const EXPERIENCE_LEVELS = [
  "beginner",
  "intermediate",
  "advanced",
  "expert",
] as const

export const PARTICIPATION_TYPES = [
  "workshops",
  "hackathon",
  "startup",
  "all",
] as const

const optionalEnum = <T extends readonly [string, ...string[]]>(values: T) =>
  z.preprocess(
    (val) => (val === "" || val === undefined ? undefined : val),
    z.enum(values).optional()
  )

export const registrationSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be at most 100 characters")
    .regex(/^[\p{L}\s'.-]+$/u, "Name contains invalid characters"),
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Please enter a valid email address")
    .max(255, "Email is too long"),
  phone: z
    .string()
    .trim()
    .min(1, "Phone number is required")
    .refine((value) => {
      const digits = value.replace(/[\s\-()]/g, "")
      return /^\+?[0-9]{10,15}$/.test(digits)
    }, "Please enter a valid phone number (10–15 digits)"),
  university: z
    .string()
    .trim()
    .min(2, "University/organization must be at least 2 characters")
    .max(200, "University/organization name is too long"),
  experience: optionalEnum(EXPERIENCE_LEVELS),
  interests: z
    .string()
    .trim()
    .max(1000, "Interests must be at most 1000 characters")
    .optional()
    .or(z.literal("")),
  teamName: z
    .string()
    .trim()
    .max(100, "Team name must be at most 100 characters")
    .optional()
    .or(z.literal("")),
  participationType: optionalEnum(PARTICIPATION_TYPES),
})

export type RegistrationFormData = z.infer<typeof registrationSchema>

export type RegistrationBodyInput = {
  name: string
  email: string
  phone: string
  university: string
  experience?: string
  interests?: string
  teamName?: string
  participationType?: string
}

export const otpSchema = z.object({
  email: z.string().trim().email("Please enter a valid email address"),
  otp: z
    .string()
    .trim()
    .length(6, "Verification code must be 6 digits")
    .regex(/^\d{6}$/, "Verification code must contain only digits"),
})

export type OtpFormData = z.infer<typeof otpSchema>

export function normalizeParticipationType(
  participationType?: string | null
): string | null {
  if (!participationType) return null
  if (participationType === "all") return "hackathon,startup,workshops"
  return participationType
}
