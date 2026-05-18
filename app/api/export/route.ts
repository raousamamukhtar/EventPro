import { NextRequest, NextResponse } from "next/server"
import { exportRegistrationsAsCSV } from "@/lib/db"
import { verify } from 'jsonwebtoken'
import { EVENT_CONFIG } from "@/lib/config"

export async function GET(request: NextRequest) {
  try {
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

    const buffer = await exportRegistrationsAsCSV()

    const headers = new Headers()
    headers.set("Content-Type", "text/csv")
    headers.set(
      "Content-Disposition",
      `attachment; filename="${EVENT_CONFIG.name.toLowerCase().replace(/\s+/g, '-')}-registrations-${new Date().toISOString().split("T")[0]}.csv"`,
    )

    return new NextResponse(new Uint8Array(buffer), {
      status: 200,
      headers,
    })
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error("Export error:", error)
    }
    return NextResponse.json({ message: "Failed to export registrations" }, { status: 500 })
  }
}
