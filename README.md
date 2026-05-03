# Muhasabah

An Islamic personal hub for spiritual tracking, Ramadan planning, and self-accountability.

## Project Structure

```
muhasabah/
├── src/                    # Frontend source (React + Vite)
│   ├── api/                # API client functions
│   ├── assets/             # Static assets
│   ├── components/         # Reusable UI components
│   ├── context/            # React context providers
│   ├── pages/              # Page components
│   ├── App.jsx
│   ├── main.jsx
│   ├── index.css
│   └── translations.js
├── public/                 # Static public files
├── server/                 # Backend source (Node.js + Express + TypeScript)
│   ├── src/
│   │   ├── auth/           # JWT & auth helpers
│   │   ├── config/         # App configuration
│   │   ├── data/           # Static Ramadan content
│   │   ├── db/             # Database connection & init
│   │   ├── routes/         # Express route handlers
│   │   ├── types/          # TypeScript type declarations
│   │   ├── app.ts          # Express app setup
│   │   ├── server.ts       # Vercel serverless export
│   │   └── dev.ts          # Local dev server entry
│   ├── api/
│   │   └── index.ts        # Vercel serverless entry
│   ├── package.json
│   ├── tsconfig.json
│   └── vercel.json
├── index.html
├── package.json            # Frontend dependencies
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── eslint.config.js
├── .env.example
└── .gitignore
```

## Getting Started

### Frontend

```bash
# Install dependencies
npm install

# Start dev server (proxies /api to backend)
npm run dev

# Build for production
npm run build
```

### Backend

```bash
cd server

# Install dependencies
npm install

# Copy env file and fill in values
cp .env.example .env

# Start dev server
npm run dev
```

## Environment Variables

### Frontend (`.env`)
```
VITE_API_URL=http://localhost:3000
VITE_GOOGLE_CLIENT_ID=your-google-client-id
```

### Backend (`server/.env`)
```
DATABASE_URL=postgresql://...
SECRET_KEY=your-secret-key
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
PORT=3000
NODE_ENV=development
```

## Tech Stack

**Frontend:** React 19, Vite, Tailwind CSS v4, React Router, Axios  
**Backend:** Node.js, Express, TypeScript, PostgreSQL (Neon), JWT, Better Auth  
**Deployment:** Vercel (both frontend and backend)
