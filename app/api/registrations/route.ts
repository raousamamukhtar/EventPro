import { type NextRequest, NextResponse } from "next/server"
import { getRegistrations, getRegistrationStats } from "@/lib/db"
import { verify } from 'jsonwebtoken'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const statsOnly = searchParams.get("stats") === "true"
    const checkSheets = searchParams.get("check-sheets") === "true"

    // JWT verification
    const authHeader = request.headers.get('authorization')
    const token = authHeader?.replace('Bearer ', '')

    if (!token) {
      return NextResponse.json(
        { message: 'Authentication required' },
        { status: 401 }
      )
    }

    const JWT_SECRET = process.env.JWT_SECRET
    if (!JWT_SECRET) {
      return NextResponse.json(
        { message: 'Server configuration error' },
        { status: 500 }
      )
    }

    try {
      const decoded = verify(token, JWT_SECRET, { algorithms: ['HS256'] }) as any
      
      // Check if token is expired
      if (decoded.exp && Date.now() >= decoded.exp * 1000) {
        return NextResponse.json(
          { message: 'Token expired' },
          { status: 401 }
        )
      }

      // Check if user has admin role
      if (decoded.role !== 'admin') {
        return NextResponse.json(
          { message: 'Insufficient permissions' },
          { status: 403 }
        )
      }
    } catch (error) {
      return NextResponse.json(
        { message: 'Invalid token' },
        { status: 401 }
      )
    }

    if (checkSheets) {
      const googleSheetsConfigured = !!(process.env.GOOGLE_SHEET_ID && 
        process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL && 
        process.env.GOOGLE_PRIVATE_KEY)
      
      return NextResponse.json({ googleSheetsConfigured })
    }

    if (statsOnly) {
      const stats = await getRegistrationStats()
      return NextResponse.json(stats)
    }

    const registrations = await getRegistrations()
    return NextResponse.json(registrations)
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error("Error fetching registrations:", error)
    }
    return NextResponse.json({ message: "Failed to fetch registrations" }, { status: 500 })
  }
}
