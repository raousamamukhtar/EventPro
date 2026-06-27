import { type NextRequest, NextResponse } from "next/server"
import { verify } from "jsonwebtoken"
import { markAttendance, getRegistrationByToken } from "@/lib/db"

function verifyAdmin(request: NextRequest) {
  const token = request.headers.get("authorization")?.replace("Bearer ", "")
  if (!token) return false
  const secret = process.env.JWT_SECRET
  if (!secret) return false
  try {
    const decoded = verify(token, secret, { algorithms: ["HS256"] }) as { role?: string; exp?: number }
    if (decoded.exp && Date.now() >= decoded.exp * 1000) return false
    return decoded.role === "admin"
  } catch {
    return false
  }
}

export async function POST(request: NextRequest) {
  if (!verifyAdmin(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { token } = await request.json()

    if (!token || typeof token !== "string") {
      return NextResponse.json({ error: "Invalid QR code" }, { status: 400 })
    }

    // Check if registration exists first
    const existing = await getRegistrationByToken(token)
    if (!existing) {
      return NextResponse.json({ error: "QR code not recognised. This ticket was not found." }, { status: 404 })
    }

    if (existing.attended) {
      return NextResponse.json(
        {
          alreadyAttended: true,
          registration: {
            name: existing.name,
            email: existing.email,
            university: existing.university,
            participation_type: existing.participation_type,
            attended_at: existing.attended_at,
          },
        },
        { status: 200 }
      )
    }

    const updated = await markAttendance(token)
    if (!updated) {
      return NextResponse.json({ error: "Failed to mark attendance" }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      registration: {
        name: updated.name,
        email: updated.email,
        university: updated.university,
        participation_type: updated.participation_type,
      },
    })
  } catch (error) {
    console.error("Mark attendance error:", error)
    return NextResponse.json({ error: "Server error. Please try again." }, { status: 500 })
  }
}
