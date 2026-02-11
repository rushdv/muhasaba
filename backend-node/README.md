# Muhasabah Backend - Node.js/Express/TypeScript

Complete Node.js/Express.js/TypeScript backend for the Muhasabah application, designed for better Vercel deployment compatibility.

## Features

- ✅ **Authentication**: JWT-based auth with signup, login, and Google OAuth
- ✅ **Database**: PostgreSQL with connection pooling
- ✅ **API Routes**: 
  - `/api/auth/*` - Authentication endpoints
  - `/api/muhasaba/*` - Daily task logging
  - `/api/ramadan/*` - Ramadan planner and analytics
- ✅ **TypeScript**: Full type safety
- ✅ **CORS**: Configured for frontend integration

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

Copy `.env.example` to `.env` and update with your credentials:

```bash
cp .env.example .env
```

### 3. Run Development Server

```bash
npm run dev
```

Server will start on `http://localhost:3000`

### 4. Build for Production

```bash
npm run build
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new account
- `POST /api/auth/login` - Login with email/password
- `POST /api/auth/google` - Google OAuth login

### Muhasaba (Daily Logs)
- `POST /api/muhasaba` - Create log
- `GET /api/muhasaba` - Get all logs
- `PATCH /api/muhasaba/:id` - Toggle completion
- `DELETE /api/muhasaba/:id` - Delete log

### Ramadan Planner
- `GET /api/ramadan/content/:day` - Get spiritual content for day
- `POST /api/ramadan/report` - Create/update daily report
- `GET /api/ramadan/history` - Get all reports
- `GET /api/ramadan/analytics` - Get analytics summary

## Deployment

### Vercel

1. Push to GitHub
2. Import project in Vercel
3. Set environment variables in Vercel dashboard
4. Deploy!

The `vercel.json` configuration is already set up.

## Project Structure

```
backend-node/
├── src/
│   ├── auth/          # Authentication utilities
│   ├── config/        # Configuration
│   ├── data/          # Static data (Ramadan content)
│   ├── db/            # Database connection
│   ├── routes/        # API routes
│   ├── app.ts         # Express app setup
│   └── server.ts      # Server entry point
├── dist/              # Compiled JavaScript (generated)
├── .env               # Environment variables
├── package.json
└── tsconfig.json
```

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL (Neon)
- **Auth**: JWT + Google OAuth
- **Deployment**: Vercel
