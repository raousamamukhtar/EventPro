import { config } from "dotenv"
import { getSmtpTransporter, isSmtpConfigured, getSmtpFromAddress } from "../lib/smtp"
import { EVENT_CONFIG } from "../lib/config"

config({ path: ".env.local" })

async function verifySmtp() {
  console.log("Verifying SMTP configuration...")

  if (!isSmtpConfigured()) {
    console.error("SMTP is not configured. Required: SMTP_HOST, SMTP_USER, SMTP_PASS")
    console.log("Run: npm run setup-smtp")
    return
  }

  const transporter = getSmtpTransporter()
  if (!transporter) {
    console.error("Failed to create SMTP transporter")
    return
  }

  try {
    console.log("Testing SMTP connection...")
    await transporter.verify()
    console.log("SMTP connection verified")

    const testRecipient = process.env.SMTP_TEST_TO || process.env.SMTP_USER
    if (!testRecipient) {
      console.log("Set SMTP_TEST_TO to send a test email")
      return
    }

    console.log(`Sending test email to ${testRecipient}...`)
    const result = await transporter.sendMail({
      from: getSmtpFromAddress(),
      to: testRecipient,
      subject: `Test Email - ${EVENT_CONFIG.name}`,
      html: `<p>This is a test email from the ${EVENT_CONFIG.name} registration system.</p>`,
    })

    console.log("Test email sent successfully")
    console.log("Message ID:", result.messageId)
  } catch (error) {
    console.error("SMTP verification failed:", error)
    console.log("\nTroubleshooting tips:")
    console.log("1. Check SMTP_HOST and SMTP_PORT")
    console.log("2. For Gmail, use an App Password and smtp.gmail.com")
    console.log("3. Set SMTP_SECURE=true for port 465, false for port 587")
  }
}

verifySmtp()
