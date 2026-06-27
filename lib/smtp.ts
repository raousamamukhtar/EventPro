import nodemailer from "nodemailer"
import type SMTPTransport from "nodemailer/lib/smtp-transport"
import { config } from "dotenv"
import { EVENT_CONFIG } from "./config"

if (process.env.NODE_ENV !== "production") {
  config({ path: ".env.local" })
}

export function isSmtpConfigured(): boolean {
  return Boolean(
    process.env.SMTP_HOST &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASS
  )
}

function getSmtpPort(): number {
  const port = Number(process.env.SMTP_PORT || "587")
  return Number.isFinite(port) ? port : 587
}

function isSecureConnection(): boolean {
  if (process.env.SMTP_SECURE === "true") return true
  if (process.env.SMTP_SECURE === "false") return false
  return getSmtpPort() === 465
}

let transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo> | null = null

export function getSmtpTransporter() {
  if (!isSmtpConfigured()) {
    return null
  }

  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: getSmtpPort(),
      secure: isSecureConnection(),
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })
  }

  return transporter
}

export function getSmtpFromAddress(): string {
  const from = process.env.SMTP_FROM || process.env.SMTP_USER || EVENT_CONFIG.email
  const name = process.env.SMTP_FROM_NAME || EVENT_CONFIG.name
  return `${name} <${from}>`
}

export async function sendSmtpEmail(options: {
  to: string
  subject: string
  html: string
  attachments?: Array<{
    filename: string
    content: Buffer
    cid: string
    contentType: string
  }>
}) {
  if (process.env.NODE_ENV === "production" && !isSmtpConfigured()) {
    console.warn("SMTP is not configured in production. Skipping email.")
    return { success: false as const, error: "Email service not configured" }
  }

  const mailer = getSmtpTransporter()
  if (!mailer) {
    console.warn("SMTP is not configured. Skipping email.")
    return { success: false as const, error: "Email service not configured" }
  }

  try {
    const data = await mailer.sendMail({
      from: getSmtpFromAddress(),
      to: options.to,
      subject: options.subject,
      html: options.html,
      attachments: options.attachments,
    })

    return { success: true as const, data }
  } catch (error) {
    console.error("SMTP email sending error:", error)
    return { success: false as const, error }
  }
}
