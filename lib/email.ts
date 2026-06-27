import QRCode from "qrcode"
import { EVENT_CONFIG } from "./config"
import { sendSmtpEmail } from "./smtp"

export async function sendOtpEmail(email: string, name: string, otp: string) {
  return sendSmtpEmail({
    to: email,
    subject: `Your verification code - ${EVENT_CONFIG.name} ${EVENT_CONFIG.year}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8fafc;">
        <div style="background-color: white; border-radius: 12px; padding: 30px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #2563eb; margin: 0; font-size: 24px; font-weight: bold;">Verify Your Email</h1>
            <p style="color: #6b7280; margin: 10px 0 0 0; font-size: 16px;">${EVENT_CONFIG.name} ${EVENT_CONFIG.year}</p>
          </div>
          <p style="color: #374151; line-height: 1.6; font-size: 16px;">
            Hello ${name}, use the verification code below to complete your event registration:
          </p>
          <div style="background-color: #eff6ff; border: 2px dashed #93c5fd; border-radius: 12px; padding: 24px; margin: 24px 0; text-align: center;">
            <p style="color: #6b7280; margin: 0 0 8px 0; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Verification Code</p>
            <p style="color: #1d4ed8; margin: 0; font-size: 36px; font-weight: bold; letter-spacing: 8px; font-family: monospace;">${otp}</p>
          </div>
          <p style="color: #6b7280; font-size: 14px; line-height: 1.5;">
            This code expires in <strong>10 minutes</strong>. If you did not request this code, you can safely ignore this email.
          </p>
        </div>
      </div>
    `,
  })
}

export async function generateQrCodeDataUrl(attendanceToken: string): Promise<string> {
  return QRCode.toDataURL(attendanceToken, {
    width: 256,
    margin: 2,
    color: { dark: "#1d4ed8", light: "#ffffff" },
  })
}

async function generateQrCodeBuffer(attendanceToken: string): Promise<Buffer> {
  return QRCode.toBuffer(attendanceToken, {
    width: 256,
    margin: 2,
    color: { dark: "#1d4ed8", light: "#ffffff" },
  })
}

export async function sendRegistrationEmail(
  email: string,
  name: string,
  registrationData?: {
    university?: string
    phone?: string
    team_name?: string
    participation_type?: string
    attendance_token?: string
  }
) {
  let qrCodeHtml = ""
  let qrAttachment: { filename: string; content: Buffer; cid: string; contentType: string } | undefined
  if (registrationData?.attendance_token) {
    try {
      const qrBuffer = await generateQrCodeBuffer(registrationData.attendance_token)
      qrAttachment = { filename: "qr.png", content: qrBuffer, cid: "attendance-qr", contentType: "image/png" }
      qrCodeHtml = `
        <div style="text-align: center; margin: 25px 0; padding: 20px; background: #f0f9ff; border: 1px solid #bae6fd; border-radius: 12px;">
          <h3 style="color: #0369a1; margin: 0 0 12px 0; font-size: 16px;">Your Attendance QR Code</h3>
          <p style="color: #0c4a6e; font-size: 13px; margin: 0 0 16px 0;">Show this QR code at the venue to mark your attendance.</p>
          <img src="cid:attendance-qr" alt="Attendance QR Code" width="200" height="200" style="border-radius: 8px; border: 3px solid #bae6fd;" />
          <p style="color: #64748b; font-size: 11px; margin: 12px 0 0 0;">Keep this email safe — you'll need this QR code at the event.</p>
        </div>
      `
    } catch {
      // QR generation failure should not block email delivery
    }
  }
  return sendSmtpEmail({
    to: email,
    subject: `Registration Confirmed - ${EVENT_CONFIG.name} ${EVENT_CONFIG.year}`,
    attachments: qrAttachment ? [qrAttachment] : undefined,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8fafc;">
        <div style="background-color: white; border-radius: 12px; padding: 30px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <div style="text-align: center; margin-bottom: 30px; padding-bottom: 20px; border-bottom: 2px solid #e5e7eb;">
            <h1 style="color: #2563eb; margin: 0; font-size: 28px; font-weight: bold;">${EVENT_CONFIG.name} ${EVENT_CONFIG.year}</h1>
            <p style="color: #6b7280; margin: 10px 0 0 0; font-size: 16px;">Registration Confirmation</p>
          </div>
          <div style="margin-bottom: 25px;">
            <h2 style="color: #1f2937; margin: 0 0 15px 0; font-size: 22px;">Hello ${name}!</h2>
            <p style="color: #374151; line-height: 1.6; margin: 0; font-size: 16px;">
              Thank you for registering for <strong>${EVENT_CONFIG.name} ${EVENT_CONFIG.year}</strong>! Your registration has been successfully confirmed.
            </p>
          </div>
          <div style="background-color: #f0f9ff; border: 1px solid #bae6fd; border-radius: 8px; padding: 20px; margin: 25px 0;">
            <h3 style="color: #0369a1; margin: 0 0 15px 0; font-size: 18px;">Registration Details</h3>
            <div style="color: #0c4a6e; font-size: 14px; line-height: 1.5;">
              <p style="margin: 8px 0;"><strong>Name:</strong> ${name}</p>
              <p style="margin: 8px 0;"><strong>Email:</strong> ${email}</p>
              ${
                registrationData
                  ? `
                <p style="margin: 8px 0;"><strong>University:</strong> ${registrationData.university || "Not specified"}</p>
                <p style="margin: 8px 0;"><strong>Phone:</strong> ${registrationData.phone || "Not specified"}</p>
                ${registrationData.team_name ? `<p style="margin: 8px 0;"><strong>Team Name:</strong> ${registrationData.team_name}</p>` : ""}
                ${registrationData.participation_type ? `<p style="margin: 8px 0;"><strong>Participation Type:</strong> ${registrationData.participation_type}</p>` : ""}
              `
                  : ""
              }
              <p style="margin: 8px 0;"><strong>Registration Date:</strong> ${new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}</p>
            </div>
          </div>
          ${qrCodeHtml}
          <div style="background-color: #fef3c7; border: 1px solid #fde68a; border-radius: 8px; padding: 20px; margin: 25px 0;">
            <h3 style="color: #92400e; margin: 0 0 15px 0; font-size: 18px;">Event Information</h3>
            <div style="color: #78350f; font-size: 14px; line-height: 1.5;">
              <p style="margin: 8px 0;"><strong>Event:</strong> ${EVENT_CONFIG.name} ${EVENT_CONFIG.year}</p>
              <p style="margin: 8px 0;"><strong>Organizer:</strong> ${EVENT_CONFIG.organizer}</p>
              <p style="margin: 8px 0;"><strong>Status:</strong> <span style="color: #059669; font-weight: bold;">Confirmed</span></p>
            </div>
          </div>
          <div style="text-align: center; padding: 20px; border-top: 1px solid #e5e7eb; margin-top: 30px;">
            <p style="color: #6b7280; margin: 0; font-size: 14px;">
              We're excited to have you join us for this amazing experience!
            </p>
            <p style="color: #9ca3af; margin: 10px 0 0 0; font-size: 11px;">
              This is an automated confirmation email. Please do not reply to this email.
            </p>
          </div>
        </div>
      </div>
    `,
  })
}
