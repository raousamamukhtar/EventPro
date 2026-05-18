import { config } from 'dotenv';

// Load environment variables
config({ path: '.env.local' });

console.log('🔍 Debugging environment variables...');
console.log('RESEND_API_KEY:', process.env.RESEND_API_KEY ? '✅ Set' : '❌ Not set');
console.log('API Key length:', process.env.RESEND_API_KEY?.length || 0);
console.log('First 10 chars:', process.env.RESEND_API_KEY?.substring(0, 10) || 'N/A');

if (process.env.RESEND_API_KEY) {
  console.log('📝 Full API Key:', process.env.RESEND_API_KEY);
} 