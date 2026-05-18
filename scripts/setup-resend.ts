import { writeFileSync, readFileSync, existsSync } from 'fs';
import { join } from 'path';

console.log('🔧 Setting up Resend API key...');

const envPath = join(process.cwd(), '.env.local');
let envContent = '';

if (existsSync(envPath)) {
  envContent = readFileSync(envPath, 'utf8');
}

if (!envContent.includes('RESEND_API_KEY=')) {
  const newEnvContent = envContent + '\nRESEND_API_KEY=your_resend_api_key_here\n';
  writeFileSync(envPath, newEnvContent);
  console.log('✅ Added RESEND_API_KEY placeholder to .env.local');
  console.log('📝 Please replace "your_resend_api_key_here" with your actual Resend API key');
} else {
  console.log('ℹ️  RESEND_API_KEY already exists in .env.local');
}

console.log('\n📋 Next steps:');
console.log('1. Get your API key from https://resend.com/api-keys');
console.log('2. Replace "your_resend_api_key_here" in .env.local with your actual key');
console.log('3. Run: npm run verify-resend'); 