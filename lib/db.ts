import { neon } from "@neondatabase/serverless"

// Initialize database connection only if DATABASE_URL is available
let sql: any = null

function getSql() {
  if (!sql) {
    sql = neon(process.env.DATABASE_URL!)
  }
  return sql
}

export interface Registration {
  id?: number
  name: string
  email: string
  phone: string
  university: string
  experience?: string
  interests?: string
  team_name?: string
  participation_type?: string
  created_at?: Date
  updated_at?: Date
}

export async function createRegistration(registration: Omit<Registration, "id" | "created_at" | "updated_at">) {
  if (!process.env.DATABASE_URL) {
    // Fallback: Return a mock registration for testing
    console.warn("DATABASE_URL not configured. Using fallback mode.")
    return {
      id: Math.floor(Math.random() * 1000),
      ...registration,
      created_at: new Date(),
      updated_at: new Date()
    }
  }
  
  try {
    const sql = getSql()
    const result = await sql`
      INSERT INTO registrations (name, email, phone, university, experience, interests, team_name, participation_type)
      VALUES (${registration.name}, ${registration.email}, ${registration.phone}, ${registration.university}, 
              ${registration.experience || null}, ${registration.interests || null}, 
              ${registration.team_name || null}, ${registration.participation_type || null})
      RETURNING *
    `
    

    
    return result[0]
  } catch (error: any) {
    if (error.code === "23505") {
      // Unique constraint violation
      throw new Error("Email already registered")
    }
    throw error
  }
}

export async function getRegistrations() {
  if (!process.env.DATABASE_URL) {
    console.warn("DATABASE_URL not configured. Returning empty array.")
    return []
  }
  
  try {
    const sql = getSql()
    const result = await sql`
      SELECT * FROM registrations 
      ORDER BY created_at DESC
    `
    return result
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error("Error fetching registrations:", error)
    }
    throw error
  }
}

export async function getRegistrationByEmail(email: string) {
  if (!process.env.DATABASE_URL) {
    console.warn("DATABASE_URL not configured. Email check disabled.")
    return null
  }
  
  try {
    const sql = getSql()
    const result = await sql`
      SELECT * FROM registrations 
      WHERE email = ${email}
      LIMIT 1
    `
    return result[0] || null
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error("Error fetching registration by email:", error)
    }
    throw error
  }
}

export async function getRegistrationStats() {
  if (!process.env.DATABASE_URL) {
    throw new Error("Database not configured")
  }
  
  try {
    const sql = getSql()
    const totalResult = await sql`SELECT COUNT(*) as total FROM registrations`
    const experienceResult = await sql`
      SELECT experience, COUNT(*) as count 
      FROM registrations 
      WHERE experience IS NOT NULL 
      GROUP BY experience
    `
    const participationResult = await sql`
      SELECT participation_type, COUNT(*) as count 
      FROM registrations 
      WHERE participation_type IS NOT NULL 
      GROUP BY participation_type
    `

    return {
      total: Number.parseInt(totalResult[0].total),
      byExperience: experienceResult,
      byParticipationType: participationResult,
    }
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error("Error fetching registration stats:", error)
    }
    throw error
  }
}

export async function exportRegistrationsAsCSV(): Promise<Buffer> {
  if (!process.env.DATABASE_URL) {
    throw new Error("Database not configured")
  }
  
  try {
    const registrations = await getRegistrations()

    // Create CSV headers
    const headers = [
      "ID",
      "Name", 
      "Email",
      "Phone",
      "University",
      "Experience",
      "Interests",
      "Team Name",
      "Participation Type",
      "Registration Date"
    ]

    // Create CSV content
    const csvRows = [headers.join(",")]
    
    for (const reg of registrations) {
      const row = [
        reg.id || "",
        `"${reg.name.replace(/"/g, '""')}"`,
        `"${reg.email.replace(/"/g, '""')}"`,
        `"${reg.phone.replace(/"/g, '""')}"`,
        `"${reg.university.replace(/"/g, '""')}"`,
        `"${(reg.experience || "").replace(/"/g, '""')}"`,
        `"${(reg.interests || "").replace(/"/g, '""')}"`,
        `"${(reg.team_name || "").replace(/"/g, '""')}"`,
        `"${(reg.participation_type || "").replace(/"/g, '""')}"`,
        `"${reg.created_at ? new Date(reg.created_at).toLocaleDateString() : ""}"`
      ]
      csvRows.push(row.join(","))
    }

    const csvContent = csvRows.join("\n")
    return Buffer.from(csvContent, "utf-8")
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error("Error exporting registrations:", error)
    }
    throw new Error("Failed to export registrations")
  }
}

