import { Resend } from 'resend';
import { config } from 'dotenv';
import { EVENT_CONFIG } from './config';

// Load environment variables only in development
if (process.env.NODE_ENV !== 'production') {
  config({ path: '.env.local' });
}

// Lazy initialization of Resend instance
let resend: Resend | null = null;

function getResendInstance(): Resend | null {
  if (!resend && process.env.RESEND_API_KEY) {
    try {
      resend = new Resend(process.env.RESEND_API_KEY);
    } catch (error) {
      console.warn('Failed to initialize Resend:', error);
      return null;
    }
  }
  return resend;
}

export async function sendRegistrationEmail(email: string, name: string, registrationData?: any) {
  // Skip email sending during build time
  if (process.env.NODE_ENV === 'production' && !process.env.RESEND_API_KEY) {
    console.warn('Resend API key not configured in production. Skipping email sending.');
    return { success: false, error: 'Email service not configured' };
  }
  
  const resendInstance = getResendInstance();
  if (!resendInstance) {
    console.warn('Resend API key not configured. Skipping email sending.');
    return { success: false, error: 'Email service not configured' };
  }

  try {
    const { data, error } = await resendInstance.emails.send({
      from: `${EVENT_CONFIG.name} <onboarding@resend.dev>`,
      to: [email],
      subject: `Registration Confirmed - ${EVENT_CONFIG.name} ${EVENT_CONFIG.year}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8fafc;">
          <div style="background-color: white; border-radius: 12px; padding: 30px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            
            <!-- Header -->
            <div style="text-align: center; margin-bottom: 30px; padding-bottom: 20px; border-bottom: 2px solid #e5e7eb;">
              <h1 style="color: #2563eb; margin: 0; font-size: 28px; font-weight: bold;">${EVENT_CONFIG.name} ${EVENT_CONFIG.year}</h1>
              <p style="color: #6b7280; margin: 10px 0 0 0; font-size: 16px;">Registration Confirmation</p>
            </div>
            
            <!-- Greeting -->
            <div style="margin-bottom: 25px;">
              <h2 style="color: #1f2937; margin: 0 0 15px 0; font-size: 22px;">Hello ${name}!</h2>
              <p style="color: #374151; line-height: 1.6; margin: 0; font-size: 16px;">
                Thank you for registering for <strong>${EVENT_CONFIG.name} ${EVENT_CONFIG.year}</strong>! Your registration has been successfully confirmed.
              </p>
            </div>
            
            <!-- Registration Details -->
            <div style="background-color: #f0f9ff; border: 1px solid #bae6fd; border-radius: 8px; padding: 20px; margin: 25px 0;">
              <h3 style="color: #0369a1; margin: 0 0 15px 0; font-size: 18px;">📋 Registration Details</h3>
              <div style="color: #0c4a6e; font-size: 14px; line-height: 1.5;">
                <p style="margin: 8px 0;"><strong>Name:</strong> ${name}</p>
                <p style="margin: 8px 0;"><strong>Email:</strong> ${email}</p>
                ${registrationData ? `
                  <p style="margin: 8px 0;"><strong>University:</strong> ${registrationData.university || 'Not specified'}</p>
                  <p style="margin: 8px 0;"><strong>Phone:</strong> ${registrationData.phone || 'Not specified'}</p>
                  ${registrationData.team_name ? `<p style="margin: 8px 0;"><strong>Team Name:</strong> ${registrationData.team_name}</p>` : ''}
                  ${registrationData.participation_type ? `<p style="margin: 8px 0;"><strong>Participation Type:</strong> ${registrationData.participation_type}</p>` : ''}
                ` : ''}
                <p style="margin: 8px 0;"><strong>Registration Date:</strong> ${new Date().toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}</p>
              </div>
            </div>
            
            <!-- Event Information -->
            <div style="background-color: #fef3c7; border: 1px solid #fde68a; border-radius: 8px; padding: 20px; margin: 25px 0;">
              <h3 style="color: #92400e; margin: 0 0 15px 0; font-size: 18px;">🎯 Event Information</h3>
              <div style="color: #78350f; font-size: 14px; line-height: 1.5;">
                <p style="margin: 8px 0;"><strong>Event:</strong> ${EVENT_CONFIG.name} ${EVENT_CONFIG.year}</p>
                <p style="margin: 8px 0;"><strong>Organizer:</strong> ${EVENT_CONFIG.organizer}</p>
                <p style="margin: 8px 0;"><strong>Type:</strong> Technology & Innovation Event</p>
                <p style="margin: 8px 0;"><strong>Status:</strong> <span style="color: #059669; font-weight: bold;">✅ Confirmed</span></p>
              </div>
            </div>
            
            <!-- Next Steps -->
            <div style="background-color: #dbeafe; border-left: 4px solid #2563eb; padding: 20px; margin: 25px 0;">
              <h3 style="color: #1e40af; margin: 0 0 15px 0; font-size: 18px;">📅 What's Next?</h3>
              <ul style="color: #1e40af; margin: 0; padding-left: 20px; font-size: 14px; line-height: 1.6;">
                <li style="margin: 8px 0;">You'll receive detailed event schedule and venue information</li>
                <li style="margin: 8px 0;">Check your email for any updates or announcements</li>
                <li style="margin: 8px 0;">Follow our social media for event highlights and preparation tips</li>
                <li style="margin: 8px 0;">Join our community updates group for real-time announcements</li>
                <li style="margin: 8px 0;">Prepare for exciting workshops and competitions</li>
              </ul>
            </div>
            
            <!-- Important Notes -->
            <div style="background-color: #fef2f2; border: 1px solid #fecaca; border-radius: 8px; padding: 20px; margin: 25px 0;">
              <h3 style="color: #991b1b; margin: 0 0 15px 0; font-size: 18px;">⚠️ Important Notes</h3>
              <div style="color: #7f1d1d; font-size: 14px; line-height: 1.5;">
                <ul style="margin: 0; padding-left: 20px;">
                  <li style="margin: 8px 0;">Please arrive 15 minutes before the event starts</li>
                  <li style="margin: 8px 0;">Bring your valid ID and any required materials</li>
                  <li style="margin: 8px 0;">Dress code: Smart casual</li>
                  <li style="margin: 8px 0;">Refreshments will be provided</li>
                </ul>
              </div>
            </div>
            
            <!-- Contact Information -->
            <div style="background-color: #f8fafc; border-radius: 8px; padding: 20px; margin: 25px 0;">
              <h3 style="color: #374151; margin: 0 0 15px 0; font-size: 18px;">📞 Contact Information</h3>
              <div style="color: #6b7280; font-size: 14px; line-height: 1.5;">
                <p style="margin: 8px 0;"><strong>Event Coordinator:</strong> ${EVENT_CONFIG.organizer} Team</p>
                <p style="margin: 8px 0;"><strong>Email:</strong> ${EVENT_CONFIG.email}</p>
                <p style="margin: 8px 0;"><strong>Website:</strong> <a href="https://${EVENT_CONFIG.website}" style="color: #2563eb;">${EVENT_CONFIG.website}</a></p>
              </div>
            </div>
            
            <!-- Footer -->
            <div style="text-align: center; padding: 20px; border-top: 1px solid #e5e7eb; margin-top: 30px;">
              <p style="color: #6b7280; margin: 0; font-size: 14px;">
                We're excited to have you join us for this amazing experience!
              </p>
              <p style="color: #6b7280; margin: 10px 0 0 0; font-size: 12px;">
                If you have any questions, please don't hesitate to contact us.
              </p>
              <div style="margin-top: 20px;">
                <p style="color: #9ca3af; margin: 0; font-size: 11px;">
                  This is an automated confirmation email. Please do not reply to this email.
                </p>
              </div>
            </div>
            
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('Email sending error:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Email sending error:', error);
    return { success: false, error };
  }
} 