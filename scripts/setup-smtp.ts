import { writeFileSync, readFileSync, existsSync } from "fs"
import { join } from "path"

console.log("Setting up SMTP configuration...")

const envPath = join(process.cwd(), ".env.local")
let envContent = ""

if (existsSync(envPath)) {
  envContent = readFileSync(envPath, "utf8")
}

const smtpVars = [
  "SMTP_HOST=smtp.example.com",
  "SMTP_PORT=587",
  "SMTP_SECURE=false",
  "SMTP_USER=your_email@example.com",
  "SMTP_PASS=your_smtp_password",
  "SMTP_FROM=your_email@example.com",
  "SMTP_FROM_NAME=EventPro",
]

let updated = false

for (const line of smtpVars) {
  const key = line.split("=")[0]
  if (!envContent.includes(`${key}=`)) {
    envContent += envContent.endsWith("\n") || envContent.length === 0 ? "" : "\n"
    envContent += `${line}\n`
    updated = true
    console.log(`Added ${key} placeholder to .env.local`)
  }
}

if (updated) {
  writeFileSync(envPath, envContent)
  console.log("SMTP placeholders added to .env.local")
} else {
  console.log("SMTP variables already exist in .env.local")
}

console.log("\nNext steps:")
console.log("1. Update SMTP_HOST, SMTP_USER, SMTP_PASS, and SMTP_FROM in .env.local")
console.log("2. Use port 465 with SMTP_SECURE=true for SSL, or 587 with SMTP_SECURE=false for STARTTLS")
console.log("3. Run: npm run verify-smtp")
