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
        attendance_token VARCHAR(64) UNIQUE,
        attended BOOLEAN DEFAULT FALSE,
        attended_at TIMESTAMPTZ,
        created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
      )
    `

    // Migration: add attendance columns to existing tables
    await sql`ALTER TABLE registrations ADD COLUMN IF NOT EXISTS attendance_token VARCHAR(64) UNIQUE`
    await sql`ALTER TABLE registrations ADD COLUMN IF NOT EXISTS attended BOOLEAN DEFAULT FALSE`
    await sql`ALTER TABLE registrations ADD COLUMN IF NOT EXISTS attended_at TIMESTAMPTZ`
    
    // Create OTP verification table
    await sql`
      CREATE TABLE IF NOT EXISTS registration_otps (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        otp_hash VARCHAR(255) NOT NULL,
        registration_data JSONB NOT NULL,
        expires_at TIMESTAMPTZ NOT NULL,
        attempts INT DEFAULT 0,
        created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
      )
    `

    // Create indexes
    await sql`CREATE INDEX IF NOT EXISTS idx_registrations_email ON registrations(email)`
    await sql`CREATE INDEX IF NOT EXISTS idx_registrations_created_at ON registrations(created_at)`
    await sql`CREATE INDEX IF NOT EXISTS idx_registration_otps_email ON registration_otps(email)`
    await sql`CREATE INDEX IF NOT EXISTS idx_registration_otps_expires_at ON registration_otps(expires_at)`
    
    console.log("✅ Database setup completed successfully!")
    console.log("Tables 'registrations' and 'registration_otps' created with all necessary indexes.")
    
  } catch (error) {
    console.error("❌ Database setup failed:", error)
    process.exit(1)
  }
}

setupDatabase() 