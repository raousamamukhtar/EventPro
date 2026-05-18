import { initializeGoogleSheet } from "@/lib/google-sheets"

async function setupGoogleSheets() {
  try {
    console.log("Setting up Google Sheets...")
    
    await initializeGoogleSheet()
    
    console.log("✅ Google Sheets setup completed!")
    console.log("Your Google Sheet will now automatically receive new registrations.")
    
  } catch (error) {
    console.error("❌ Google Sheets setup failed:", error)
    console.log("Make sure you have configured the Google Sheets environment variables.")
    process.exit(1)
  }
}

setupGoogleSheets() 