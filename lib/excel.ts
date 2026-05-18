import * as XLSX from "xlsx"
import * as fs from "fs"
import * as path from "path"
import { EVENT_CONFIG } from "./config"

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
  created_at?: string
}

const EXCEL_FILE_PATH = path.join(process.cwd(), "data", "registrations.xlsx")
const DATA_DIR = path.join(process.cwd(), "data")

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true })
}

// Initialize Excel file if it doesn't exist
function initializeExcelFile() {
  if (!fs.existsSync(EXCEL_FILE_PATH)) {
    const workbook = XLSX.utils.book_new()
    const worksheet = XLSX.utils.json_to_sheet([])

    // Add headers
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
      "Created At",
    ]
    XLSX.utils.sheet_add_aoa(worksheet, [headers], { origin: "A1" })

    XLSX.utils.book_append_sheet(workbook, worksheet, "Registrations")
    XLSX.writeFile(workbook, EXCEL_FILE_PATH)
  }
}

export async function createRegistration(registration: Omit<Registration, "id" | "created_at">) {
  try {
    initializeExcelFile()

    // Read existing data
    const workbook = XLSX.readFile(EXCEL_FILE_PATH)
    const worksheet = workbook.Sheets["Registrations"]
    const existingData: Registration[] = XLSX.utils.sheet_to_json(worksheet)

    // Check for duplicate email
    const existingEmail = existingData.find((reg) => reg.email.toLowerCase() === registration.email.toLowerCase())
    if (existingEmail) {
      throw new Error("Email already registered")
    }

    // Generate new ID
    const newId = existingData.length > 0 ? Math.max(...existingData.map((r) => r.id || 0)) + 1 : 1

    // Create new registration
    const newRegistration: Registration = {
      id: newId,
      ...registration,
      created_at: new Date().toISOString(),
    }

    // Add to existing data
    const updatedData = [...existingData, newRegistration]

    // Create new worksheet with updated data
    const newWorksheet = XLSX.utils.json_to_sheet(updatedData)

    // Replace the worksheet
    workbook.Sheets["Registrations"] = newWorksheet

    // Write back to file
    XLSX.writeFile(workbook, EXCEL_FILE_PATH)

    return newRegistration
  } catch (error: any) {
    if (error.message === "Email already registered") {
      throw error
    }
    console.error("Error creating registration:", error)
    throw new Error("Failed to save registration")
  }
}

export async function getRegistrations(): Promise<Registration[]> {
  try {
    initializeExcelFile()

    const workbook = XLSX.readFile(EXCEL_FILE_PATH)
    const worksheet = workbook.Sheets["Registrations"]
    const data: Registration[] = XLSX.utils.sheet_to_json(worksheet)

    // Sort by created_at descending
    return data.sort((a, b) => {
      const dateA = new Date(a.created_at || 0).getTime()
      const dateB = new Date(b.created_at || 0).getTime()
      return dateB - dateA
    })
  } catch (error) {
    console.error("Error reading registrations:", error)
    return []
  }
}

export async function getRegistrationByEmail(email: string): Promise<Registration | null> {
  try {
    const registrations = await getRegistrations()
    return registrations.find((reg) => reg.email.toLowerCase() === email.toLowerCase()) || null
  } catch (error) {
    console.error("Error finding registration by email:", error)
    return null
  }
}

export async function getRegistrationStats() {
  try {
    const registrations = await getRegistrations()

    const total = registrations.length

    // Group by experience
    const byExperience = registrations.reduce((acc: any[], reg) => {
      if (reg.experience) {
        const existing = acc.find((item) => item.experience === reg.experience)
        if (existing) {
          existing.count = (Number.parseInt(existing.count) + 1).toString()
        } else {
          acc.push({ experience: reg.experience, count: "1" })
        }
      }
      return acc
    }, [])

    // Group by participation type
    const byParticipationType = registrations.reduce((acc: any[], reg) => {
      if (reg.participation_type) {
        const existing = acc.find((item) => item.participation_type === reg.participation_type)
        if (existing) {
          existing.count = (Number.parseInt(existing.count) + 1).toString()
        } else {
          acc.push({ participation_type: reg.participation_type, count: "1" })
        }
      }
      return acc
    }, [])

    return {
      total,
      byExperience,
      byParticipationType,
    }
  } catch (error) {
    console.error("Error calculating stats:", error)
    return {
      total: 0,
      byExperience: [],
      byParticipationType: [],
    }
  }
}

export async function exportRegistrationsAsExcel(): Promise<Buffer> {
  try {
    const registrations = await getRegistrations()

    // Create a new workbook for export
    const workbook = XLSX.utils.book_new()

    // Format data for export
    const exportData = registrations.map((reg) => ({
      ID: reg.id,
      Name: reg.name,
      Email: reg.email,
      Phone: reg.phone,
      University: reg.university,
      Experience: reg.experience || "",
      Interests: reg.interests || "",
      "Team Name": reg.team_name || "",
      "Participation Type": reg.participation_type || "",
      "Registration Date": reg.created_at ? new Date(reg.created_at).toLocaleDateString() : "",
    }))

    const worksheet = XLSX.utils.json_to_sheet(exportData)

    // Auto-size columns
    const colWidths = Object.keys(exportData[0] || {}).map((key) => ({
      wch: Math.max(key.length, 15),
    }))
    worksheet["!cols"] = colWidths

    XLSX.utils.book_append_sheet(workbook, worksheet, `${EVENT_CONFIG.name} Registrations`.substring(0, 31))

    // Convert to buffer
    const buffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" })
    return buffer
  } catch (error) {
    console.error("Error exporting registrations:", error)
    throw new Error("Failed to export registrations")
  }
}
