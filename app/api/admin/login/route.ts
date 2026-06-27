import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { sign } from 'jsonwebtoken'

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

// Email validation function
const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Rate limiting (simple in-memory store - use Redis in production)
const loginAttempts = new Map<string, { count: number; lastAttempt: number }>()

// Environment variables for admin credentials
const ADMIN_EMAIL = process.env.ADMIN_EMAIL
const ADMIN_PASSWORD_HASH_B64 = process.env.ADMIN_PASSWORD_HASH_B64
const JWT_SECRET = process.env.JWT_SECRET

export async function POST(request: NextRequest) {
  try {
    // Check if environment variables are configured
    if (!ADMIN_EMAIL || !ADMIN_PASSWORD_HASH_B64 || !JWT_SECRET) {
      console.error('Missing required environment variables for admin authentication')
      return NextResponse.json(
        { message: 'Server configuration error' },
        { status: 500 }
      )
    }

    const body = await request.json()
    
    // Input validation and sanitization
    const email = sanitizeInput(body.email || '')
    const password = sanitizeInput(body.password || '')

    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Validate email format
    if (!validateEmail(email)) {
      return NextResponse.json(
        { message: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Rate limiting
    const clientIP = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
    const now = Date.now()
    const attempts = loginAttempts.get(clientIP) || { count: 0, lastAttempt: 0 }
    
    if (now - attempts.lastAttempt < 60000) { // 1 minute window
      if (attempts.count >= 5) {
        return NextResponse.json(
          { message: 'Too many login attempts. Please try again later.' },
          { status: 429 }
        )
      }
    } else {
      attempts.count = 0
    }
    
    attempts.count++
    attempts.lastAttempt = now
    loginAttempts.set(clientIP, attempts)

    // Verify email and password hash
    if (email !== ADMIN_EMAIL) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Decode base64 hash and verify password
    const decodedHash = Buffer.from(ADMIN_PASSWORD_HASH_B64, 'base64').toString('utf-8')
    const isPasswordValid = await bcrypt.compare(password, decodedHash)
    
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Generate JWT token
    const token = sign(
      { 
        email: ADMIN_EMAIL, 
        role: 'admin',
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) // 24 hours
      },
      JWT_SECRET,
      { algorithm: 'HS256' }
    )

    // Return token in response body instead of cookie
    return NextResponse.json({ 
      message: 'Login successful',
      token: token
    })

  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
} 