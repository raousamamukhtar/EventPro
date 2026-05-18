import { type NextRequest, NextResponse } from "next/server"
import { createRegistration, getRegistrationByEmail } from "@/lib/db"
import { sendRegistrationEmail } from "@/lib/email"

// Input sanitization function
const sanitizeInput = (input: string): string => {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .replace(/['"`]/g, '') // Remove quotes that could break SQL
    .substring(0, 1000) // Limit length
}

// Input validation function
const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^[\+]?[0-9]{10,15}$/
  return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''))
}

const validateName = (name: string): boolean => {
  return name.length >= 2 && name.length <= 100 && /^[a-zA-Z\s]+$/.test(name)
}

const validateUniversity = (university: string): boolean => {
  return university.length >= 2 && university.length <= 200
}

// Rate limiting (simple in-memory store - use Redis in production)
const registrationAttempts = new Map<string, { count: number; lastAttempt: number }>()

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Rate limiting
    const clientIP = request.ip || request.headers.get('x-forwarded-for') || 'unknown'
    const now = Date.now()
    const attempts = registrationAttempts.get(clientIP) || { count: 0, lastAttempt: 0 }
    
    if (now - attempts.lastAttempt < 300000) { // 5 minute window
      if (attempts.count >= 3) {
        return NextResponse.json(
          { error: "Too many registration attempts. Please try again later." },
          { status: 429 }
        )
      }
    } else {
      attempts.count = 0
    }
    
    attempts.count++
    attempts.lastAttempt = now
    registrationAttempts.set(clientIP, attempts)
    
    // Extract and sanitize input
    const { name, email, phone, university, experience, interests, teamName, participationType } = body
    
    // Sanitize all inputs
    const sanitizedName = sanitizeInput(name || '')
    const sanitizedEmail = sanitizeInput(email || '').toLowerCase()
    const sanitizedPhone = sanitizeInput(phone || '')
    const sanitizedUniversity = sanitizeInput(university || '')
    const sanitizedExperience = experience ? sanitizeInput(experience) : null
    const sanitizedInterests = interests ? sanitizeInput(interests) : null
    const sanitizedTeamName = teamName ? sanitizeInput(teamName) : null
    const sanitizedParticipationType = participationType ? sanitizeInput(participationType) : null
    
    // Validate required fields
    if (!sanitizedName || !sanitizedEmail || !sanitizedPhone || !sanitizedUniversity) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    // Validate input formats
    if (!validateName(sanitizedName)) {
      return NextResponse.json(
        { error: "Invalid name format" },
        { status: 400 }
      )
    }

    if (!validateEmail(sanitizedEmail)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      )
    }

    if (!validatePhone(sanitizedPhone)) {
      return NextResponse.json(
        { error: "Invalid phone number format" },
        { status: 400 }
      )
    }

    if (!validateUniversity(sanitizedUniversity)) {
      return NextResponse.json(
        { error: "Invalid university name" },
        { status: 400 }
      )
    }

    // Validate participation type if provided
    const validParticipationTypes = ['hackathon', 'startup', 'workshops', 'all']
    if (sanitizedParticipationType && !validParticipationTypes.includes(sanitizedParticipationType)) {
      return NextResponse.json(
        { error: "Invalid participation type" },
        { status: 400 }
      )
    }

    // Handle "all" participation type - convert to all three types
    let finalParticipationType = sanitizedParticipationType
    if (sanitizedParticipationType === 'all') {
      finalParticipationType = 'hackathon,startup,workshops'
    }

    // Check if email already exists (only if database is configured)
    if (process.env.DATABASE_URL) {
      try {
        const existingRegistration = await getRegistrationByEmail(sanitizedEmail)
        if (existingRegistration) {
          return NextResponse.json(
            { error: "Email already registered" },
            { status: 409 }
          )
        }
      } catch (dbError) {
        if (process.env.NODE_ENV === 'development') {
          console.error("Database connection error during email check:", dbError)
        }
        // Continue with registration even if email check fails
      }
    }

    // Create registration
    let registration
    try {
      registration = await createRegistration({
        name: sanitizedName,
        email: sanitizedEmail,
        phone: sanitizedPhone,
        university: sanitizedUniversity,
        experience: sanitizedExperience,
        interests: sanitizedInterests,
        team_name: sanitizedTeamName,
        participation_type: finalParticipationType,
      })
    } catch (dbError) {
      if (process.env.NODE_ENV === 'development') {
        console.error("Database creation error:", dbError)
      }
      return NextResponse.json(
        { error: "Registration service temporarily unavailable. Please try again later." },
        { status: 503 }
      )
    }

    // Send confirmation email
    try {
      const emailData = {
        name: sanitizedName,
        email: sanitizedEmail,
        phone: sanitizedPhone,
        university: sanitizedUniversity,
        experience: sanitizedExperience,
        interests: sanitizedInterests,
        team_name: sanitizedTeamName,
        participation_type: finalParticipationType,
      }
      const emailResult = await sendRegistrationEmail(sanitizedEmail, sanitizedName, emailData)
      if (!emailResult.success && process.env.NODE_ENV === 'development') {
        console.log("Email sending skipped or failed:", emailResult.error)
      }
    } catch (emailError) {
      if (process.env.NODE_ENV === 'development') {
        console.error("Email sending failed:", emailError)
      }
      // Don't fail the registration if email fails
    }

    return NextResponse.json({
      success: true,
      registration,
      message: "Registration successful! Check your email for confirmation."
    })

  } catch (error: any) {
    console.error("Registration error:", error)
    console.error("Error details:", {
      message: error.message,
      stack: error.stack,
      name: error.name
    })
    
    if (error.message === "Email already registered") {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 409 }
      )
    }
    
    if (error.message === "Database not configured") {
      return NextResponse.json(
        { error: "Registration service temporarily unavailable" },
        { status: 503 }
      )
    }

    return NextResponse.json(
      { error: "Registration failed. Please try again." },
      { status: 500 }
    )
  }
} 