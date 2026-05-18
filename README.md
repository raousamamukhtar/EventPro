# AI Seekho Day Landing Page

A Next.js application for AI Seekho Day event registration with email confirmation functionality.

## Features

- Event registration form
- Email confirmation using Resend
- Database integration
- Google Sheets export
- Admin dashboard

## Email Setup

To enable email confirmation functionality:

1. Sign up for a [Resend](https://resend.com) account
2. Get your API key from the Resend dashboard
3. Add the following environment variable:

```env
RESEND_API_KEY=your_resend_api_key_here
```

4. Update the sender email in `lib/email.ts` to use your verified domain

## Development

```bash
npm install
npm run dev
```

## Environment Variables

- `RESEND_API_KEY`: Your Resend API key for email functionality
- `DATABASE_URL`: Database connection string (optional)
- `GOOGLE_SHEETS_CREDENTIALS`: Google Sheets API credentials (optional)
