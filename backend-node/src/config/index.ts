import dotenv from 'dotenv';

dotenv.config();

export const config = {
    database: {
        url: process.env.DATABASE_URL || '',
    },
    jwt: {
        secret: process.env.SECRET_KEY || 'change-this-secret-key',
        algorithm: 'HS256' as const,
        expiresIn: '7d',
    },
    google: {
        clientId: process.env.GOOGLE_CLIENT_ID || '',
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
        redirectUri: process.env.GOOGLE_REDIRECT_URI || '',
    },
    server: {
        port: parseInt(process.env.PORT || '3000', 10),
        env: process.env.NODE_ENV || 'development',
    },
    cors: {
        origins: [
            'https://muhasabah.vercel.app',
            'http://localhost:5173',
        ],
    },
};
