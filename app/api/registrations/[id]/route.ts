import { type NextRequest, NextResponse } from "next/server"
import { verify } from "jsonwebtoken"
import { updateRegistration, deleteRegistration } from "@/lib/db"

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

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!verifyAdmin(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await params
  const registrationId = Number(id)
  if (!Number.isFinite(registrationId)) return NextResponse.json({ error: "Invalid ID" }, { status: 400 })

  try {
    const body = await request.json()
    const updated = await updateRegistration(registrationId, {
      name: body.name || undefined,
      phone: body.phone || undefined,
      university: body.university || undefined,
      experience: body.experience || undefined,
      interests: body.interests || undefined,
      team_name: body.team_name || undefined,
      participation_type: body.participation_type || undefined,
    })
    if (!updated) return NextResponse.json({ error: "Registration not found" }, { status: 404 })
    return NextResponse.json(updated)
  } catch (error) {
    console.error("Update registration error:", error)
    return NextResponse.json({ error: "Failed to update registration" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!verifyAdmin(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await params
  const registrationId = Number(id)
  if (!Number.isFinite(registrationId)) return NextResponse.json({ error: "Invalid ID" }, { status: 400 })

  try {
    const deleted = await deleteRegistration(registrationId)
    if (!deleted) return NextResponse.json({ error: "Registration not found" }, { status: 404 })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Delete registration error:", error)
    return NextResponse.json({ error: "Failed to delete registration" }, { status: 500 })
  }
}
