import { Resend } from 'resend';
import { config } from 'dotenv';

// Load environment variables
config({ path: '.env.local' });

async function verifyResend() {
  console.log('🔍 Verifying Resend API key...');
  
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('❌ RESEND_API_KEY not found in environment variables');
    console.log('Please set your API key: $env:RESEND_API_KEY="your_api_key"');
    return;
  }

  console.log(`📝 API Key: ${apiKey.substring(0, 10)}...`);
  
  let resend: Resend;
  try {
    resend = new Resend(apiKey);
  } catch (error) {
    console.error('❌ Failed to initialize Resend:', error);
    return;
  }

  try {
    console.log('📧 Testing email send...');
    
    const eventName = process.env.NEXT_PUBLIC_EVENT_NAME || 'EventPro';
    
    const { data, error } = await resend.emails.send({
      from: `${eventName} <onboarding@resend.dev>`,
      to: ['delivered@resend.dev'],
      subject: `Test Email - ${eventName}`,
      html: `<p>This is a test email from ${eventName} registration system!</p>`,
    });

    if (error) {
      console.error('❌ Email sending failed:', error);
      console.log('\n💡 Troubleshooting tips:');
      console.log('1. Check if your API key is correct');
      console.log('2. Make sure you copied the full API key');
      console.log('3. Verify your Resend account is active');
      return;
    }

    console.log('✅ Email sent successfully!');
    console.log('📊 Check your Resend dashboard for the email');
    console.log('🎉 Your API key is working correctly!');
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

verifyResend(); 