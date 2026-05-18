# Email Setup Guide

## Step 1: Get Your Resend API Key

1. Go to [resend.com](https://resend.com) and sign up/login
2. Navigate to your dashboard
3. Go to "API Keys" section
4. Create a new API key
5. Copy the API key (it starts with `re_`)

## Step 2: Set Environment Variable

### Option A: Create .env.local file
Create a file named `.env.local` in your project root and add:
```
RESEND_API_KEY=re_your_api_key_here
```

### Option B: Set in PowerShell (temporary)
```powershell
$env:RESEND_API_KEY="re_your_api_key_here"
```

## Step 3: Update Sender Email

Edit `lib/email.ts` and change the `from` email to your verified domain:
```typescript
from: 'AI Seekho Day <noreply@yourdomain.com>',
```

If you don't have a verified domain, you can use Resend's sandbox domain for testing:
```typescript
from: 'AI Seekho Day <onboarding@resend.dev>',
```

## Step 4: Test Email Functionality

Run the test script:
```bash
npm run test-email
```

## Step 5: Test with Registration

1. Start your development server: `npm run dev`
2. Go to your registration page
3. Fill out and submit the registration form
4. Check your email for the confirmation

## Troubleshooting

- **"API key not found"**: Make sure your API key is correct and environment variable is set
- **"Domain not verified"**: Use `onboarding@resend.dev` for testing, or verify your domain in Resend dashboard
- **"Email not received"**: Check spam folder and Resend dashboard for delivery status

## Production Deployment

For production, make sure to:
1. Verify your domain in Resend dashboard
2. Update the `from` email to use your verified domain
3. Set the environment variable in your hosting platform (Vercel, etc.) 