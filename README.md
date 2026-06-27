# AI Seekho Day Landing Page

A Next.js application for AI Seekho Day event registration with email confirmation functionality.

## Features

- Event registration form
- Email confirmation using SMTP
- Database integration
- Google Sheets export
- Admin dashboard

## Email Setup

To enable email confirmation and OTP verification:

1. Add SMTP credentials to `.env.local` (or run `npm run setup-smtp` for placeholders):

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your_email@example.com
SMTP_PASS=your_smtp_password
SMTP_FROM=your_email@example.com
SMTP_FROM_NAME=EventPro
```

2. Verify the connection:

```bash
npm run verify-smtp
```

## Development

```bash
npm install
npm run dev
```

## Environment Variables

- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`: SMTP email configuration
- `SMTP_FROM`, `SMTP_FROM_NAME`: Optional sender address and display name
- `SMTP_SECURE`: Set to `true` for port 465 (SSL), `false` for port 587 (STARTTLS)
- `DATABASE_URL`: Database connection string (optional)
- `GOOGLE_SHEETS_CREDENTIALS`: Google Sheets API credentials (optional)
