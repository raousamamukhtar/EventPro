import { neon } from "@neondatabase/serverless"
import * as dotenv from "dotenv"

// Load environment variables from .env.local
dotenv.config({ path: ".env.local" })

async function setupDatabase() {
  try {
    console.log("Setting up database...")
    
    if (!process.env.DATABASE_URL) {
      console.error("❌ DATABASE_URL not configured!")
      process.exit(1)
    }
    
    const sql = neon(process.env.DATABASE_URL)
    
    // Create the registrations table
    await sql`
      CREATE TABLE IF NOT EXISTS registrations (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        phone VARCHAR(50) NOT NULL,
        university VARCHAR(255) NOT NULL,
        experience VARCHAR(50),
        interests TEXT,
        team_name VARCHAR(255),
        participation_type VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `
    
    // Create indexes
    await sql`CREATE INDEX IF NOT EXISTS idx_registrations_email ON registrations(email)`
    await sql`CREATE INDEX IF NOT EXISTS idx_registrations_created_at ON registrations(created_at)`
    
    console.log("✅ Database setup completed successfully!")
    console.log("Table 'registrations' created with all necessary indexes.")
    
  } catch (error) {
    console.error("❌ Database setup failed:", error)
    process.exit(1)
  }
}

setupDatabase() 