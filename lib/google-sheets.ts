import { google } from "googleapis"
import type { Registration } from "./db"

// Initialize Google Sheets API
const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  },
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
})

const sheets = google.sheets({ version: "v4", auth })

export async function addRegistrationToSheet(registration: Registration) {
  try {
    if (!process.env.GOOGLE_SHEET_ID) {
      console.warn("Google Sheet ID not configured, skipping sheet update")
      return
    }

    const values = [
      [
        registration.id,
        registration.name,
        registration.email,
        registration.phone,
        registration.university,
        registration.experience || "",
        registration.interests || "",
        registration.team_name || "",
        registration.participation_type || "",
        new Date().toISOString(),
      ],
    ]

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "Sheet1!A:J", // Adjust range as needed
      valueInputOption: "RAW",
      insertDataOption: "INSERT_ROWS",
      requestBody: {
        values,
      },
    })

    if (process.env.NODE_ENV === 'development') {
      console.log("✅ Registration added to Google Sheet:", registration.email)
    }
  } catch (error) {
    console.error("❌ Error adding to Google Sheet:", error)
    // Don't throw error to avoid breaking the main registration flow
  }
}

export async function initializeGoogleSheet() {
  try {
    if (!process.env.GOOGLE_SHEET_ID) {
      console.warn("Google Sheet ID not configured")
      return
    }

    // Add headers if sheet is empty
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "Sheet1!A1:J1",
    })

    if (!response.data.values || response.data.values.length === 0) {
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
        "Registration Date",
      ]

      await sheets.spreadsheets.values.update({
        spreadsheetId: process.env.GOOGLE_SHEET_ID,
        range: "Sheet1!A1:J1",
        valueInputOption: "RAW",
        requestBody: {
          values: [headers],
        },
      })

      if (process.env.NODE_ENV === 'development') {
      console.log("✅ Google Sheet headers initialized")
    }
    }
  } catch (error) {
    console.error("❌ Error initializing Google Sheet:", error)
  }
} 