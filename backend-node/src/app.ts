import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { config } from './config';
import authRoutes from './routes/auth';
import muhasabaRoutes from './routes/muhasaba';
import ramadanRoutes from './routes/ramadan';

const app: Application = express();

// =========================
// Middleware
// =========================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS Configuration
app.use(cors({
    origin: config.cors.origins,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

// =========================
// Routes
// =========================

// Health check
app.get('/', (req: Request, res: Response) => {
    res.json({ status: 'ok' });
});

// Auth routes - /api/auth/login, /api/auth/signup, /api/auth/google
app.use('/api/auth', authRoutes);

// Muhasaba routes - /api/muhasaba
app.use('/api/muhasaba', muhasabaRoutes);

// Ramadan routes - /api/ramadan
app.use('/api/ramadan', ramadanRoutes);

// =========================
// Error Handling
// =========================
app.use((err: Error, req: Request, res: Response, next: any) => {
    console.error('Unhandled error:', err);
    res.status(500).json({ detail: 'Internal server error' });
});

export default app;
