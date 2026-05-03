# Muhasabah Backend

Node.js + Express + TypeScript backend for the Muhasabah app.

## Setup

```bash
# Install dependencies
npm install

# Copy env file and fill in values
cp .env.example .env

# Start dev server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Environment Variables

```
DATABASE_URL=postgresql://...
SECRET_KEY=your-secret-key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_REDIRECT_URI=http://localhost:3000/auth/google/callback
PORT=3000
NODE_ENV=development
```

## API Routes

| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/auth/signup` | Register new user |
| POST | `/api/auth/login` | Login with email/password |
| POST | `/api/auth/google` | Login with Google OAuth |
| GET | `/api/day-content/:day` | Get Ramadan day content (1-30) |
| GET | `/api/day-content/random-ayat/get` | Get a random Quran verse |
| GET | `/api/ramadan/history` | Get user's Ramadan reports |
| POST | `/api/ramadan/report` | Save/update a day's report |
| GET | `/api/ramadan/analytics` | Get Ramadan analytics summary |
| GET | `/api/muhasaba` | Get muhasaba logs |
| POST | `/api/muhasaba` | Create muhasaba log |
| PATCH | `/api/muhasaba/:id` | Toggle log completion |
| DELETE | `/api/muhasaba/:id` | Delete muhasaba log |

## Deployment

Deployed on Vercel as a serverless function via `api/index.ts`.
