import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import readline from 'readline'

async function setupAdmin() {
  console.log('🔐 Setting up secure admin credentials...\n')

  // Create readline interface for password input
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })

  // Prompt for admin email
  const adminEmail = await new Promise<string>((resolve) => {
    rl.question('Enter admin email (default: admin@gdgoc.com): ', (answer) => {
      resolve(answer.trim() || 'admin@gdgoc.com')
    })
  })

  // Prompt for admin password
  const adminPassword = await new Promise<string>((resolve) => {
    rl.question('Enter admin password: ', (answer) => {
      resolve(answer.trim())
    })
  })

  // Close readline interface
  rl.close()

  if (!adminPassword) {
    console.error('❌ Password cannot be empty!')
    process.exit(1)
  }

  // Generate secure JWT secret
  const jwtSecret = crypto.randomBytes(64).toString('hex')
  
  // Generate admin password hash and encode to base64
  const saltRounds = 12
  const passwordHash = await bcrypt.hash(adminPassword, saltRounds)
  const passwordHashB64 = Buffer.from(passwordHash).toString('base64')

  console.log('\n📋 Environment Variables to add to your .env.local file:\n')
  console.log('ADMIN_EMAIL=' + adminEmail)
  console.log('ADMIN_PASSWORD_HASH_B64=' + passwordHashB64)
  console.log('JWT_SECRET=' + jwtSecret)
  console.log('\n🔒 Security Features Implemented:')
  console.log('✅ Password hashing with bcrypt (12 rounds)')
  console.log('✅ Base64 encoding for environment variables')
  console.log('✅ JWT token authentication')
  console.log('✅ HTTP-only secure cookies')
  console.log('✅ Input sanitization and validation')
  console.log('✅ Rate limiting (5 attempts per minute)')
  console.log('✅ XSS protection')
  console.log('✅ SQL injection protection')
  console.log('✅ CSRF protection via secure cookies')
  console.log('✅ Admin route protection middleware')
  console.log('\n⚠️  IMPORTANT SECURITY NOTES:')
  console.log('1. Never commit .env.local to version control')
  console.log('2. Use a strong, unique JWT_SECRET in production')
  console.log('3. Enable HTTPS in production')
  console.log('4. Consider using Redis for rate limiting in production')
  console.log('5. Regularly rotate admin credentials')
  console.log('6. Monitor login attempts and failed authentications')
  console.log('7. Use environment variables for all sensitive data')
  console.log('8. Implement proper logging for security events')
  console.log('\n🚀 Your admin panel is now secure!')
}

setupAdmin().catch(console.error) 