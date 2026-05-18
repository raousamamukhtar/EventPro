# Database & Google Sheets Setup for AI Seekho Day

## Prerequisites

1. **Neon PostgreSQL Database**: You need a Neon database account and a database URL
2. **Google Cloud Project** (Optional): For Google Sheets integration
3. **Environment Variables**: Set up your `.env.local` file

## Setup Instructions

### 1. Environment Variables

Create a `.env.local` file in your project root:

```env
# Database Configuration
DATABASE_URL=postgresql://username:password@hostname/database?sslmode=require

# Google Sheets Configuration (Optional)
GOOGLE_SHEET_ID=your-google-sheet-id-here
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour private key here\n-----END PRIVATE KEY-----\n"
```

Replace the URLs with your actual connection strings.

### 2. Install Dependencies

```bash
npm install
# or
pnpm install
```

### 3. Setup Database Table

Run the database setup script to create the registrations table:

```bash
npm run setup-db
# or
pnpm setup-db
```

### 4. Setup Google Sheets (Optional)

If you want to track registrations in Google Sheets:

1. Follow the detailed guide in `GOOGLE_SHEETS_SETUP.md`
2. Run the Google Sheets setup:

```bash
npm run setup-sheets
# or
pnpm setup-sheets
```

3. Test the integration:

```bash
npm run test-sheets
# or
pnpm test-sheets
```

### 5. Test the Registration

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Go to your application and try registering a user
3. The data will be saved to your PostgreSQL database
4. If configured, it will also be added to your Google Sheet

## Database Schema

The `registrations` table has the following structure:

- `id` (SERIAL PRIMARY KEY): Auto-incrementing ID
- `name` (VARCHAR): Full name of the registrant
- `email` (VARCHAR UNIQUE): Email address (unique constraint)
- `phone` (VARCHAR): Phone number
- `university` (VARCHAR): University or organization
- `experience` (VARCHAR): Programming experience level
- `interests` (TEXT): Areas of interest
- `team_name` (VARCHAR): Team name (optional)
- `participation_type` (VARCHAR): Type of participation
- `created_at` (TIMESTAMP): Registration timestamp
- `updated_at` (TIMESTAMP): Last update timestamp

## API Endpoints

- `POST /api/register`: Register a new participant
- `GET /api/registrations`: Get all registrations (admin only)
- `GET /api/export`: Export registrations as Excel (admin only)

## Features

### Database Features
- ✅ Simple PostgreSQL connection without ORM
- ✅ Email uniqueness validation
- ✅ Input validation and sanitization
- ✅ Error handling
- ✅ Automatic timestamps
- ✅ Indexed for performance

### Google Sheets Features (Optional)
- ✅ Automatic real-time updates to Google Sheets
- ✅ Non-blocking integration (won't break registration if sheets fail)
- ✅ Organized headers and data structure
- ✅ Secure service account authentication
- ✅ Easy tracking and analytics

## Data Flow

1. **User submits registration** → Form validation
2. **Data saved to PostgreSQL** → Primary storage
3. **Data added to Google Sheets** → Real-time tracking (optional)
4. **Success response** → User confirmation

## Troubleshooting

### Database Issues
- Check your `DATABASE_URL` environment variable
- Ensure your Neon database is accessible
- Run `npm run setup-db` to recreate the table

### Google Sheets Issues
- Verify your service account credentials
- Check that the Google Sheet is shared with the service account
- Run `npm run test-sheets` to test the integration
- See `GOOGLE_SHEETS_SETUP.md` for detailed troubleshooting 