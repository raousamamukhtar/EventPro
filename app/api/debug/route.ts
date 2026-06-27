import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret")
  if (secret !== "debug2026") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const result: Record<string, unknown> = {}

  // Check env vars (masked)
  result.env = {
    DATABASE_URL: process.env.DATABASE_URL ? `set (${process.env.DATABASE_URL.slice(0, 30)}...)` : "MISSING",
    SMTP_HOST: process.env.SMTP_HOST || "MISSING",
    SMTP_PORT: process.env.SMTP_PORT || "MISSING",
    SMTP_USER: process.env.SMTP_USER ? "set" : "MISSING",
    SMTP_PASS: process.env.SMTP_PASS ? "set" : "MISSING",
    JWT_SECRET: process.env.JWT_SECRET ? "set" : "MISSING",
  }

  // Test DB connection
  try {
    const sql = neon(process.env.DATABASE_URL!)
    const rows = await sql`SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'`
    result.db = { status: "ok", tables: rows.map((r: any) => r.table_name) }
  } catch (e: any) {
    result.db = { status: "error", error: e.message }
  }

  // Test DB insert (dry run)
  try {
    const sql = neon(process.env.DATABASE_URL!)
    await sql`SELECT 1 FROM registration_otps LIMIT 1`
    result.otpTable = { status: "ok" }
  } catch (e: any) {
    result.otpTable = { status: "error", error: e.message }
  }

  return NextResponse.json(result)
}
