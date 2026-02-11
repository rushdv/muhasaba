import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { config } from './config';
import { initDatabase } from './db/database';
import authRoutes from './routes/auth';
import muhasabaRoutes from './routes/muhasaba';
import ramadanRoutes from './routes/ramadan';

const app: Application = express();

// Initialize database on cold start
let dbInitialized = false;
const initDB = async () => {
    if (!dbInitialized) {
        try {
            await initDatabase();
            console.log('✅ Database initialized');
            dbInitialized = true;
        } catch (error) {
            console.error('❌ Database initialization error:', error);
        }
    }
};

// Initialize DB on module load
initDB();

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
    res.json({
        status: 'ok',
        message: 'Muhasabah API - Node.js Backend',
        path: req.url,
        originalUrl: req.originalUrl
    });
});

// Auth routes
app.use('/api/auth', authRoutes);
app.use('/auth', authRoutes); // Alias for Vercel rewrites

// Muhasaba routes
app.use('/api/muhasaba', muhasabaRoutes);
app.use('/muhasaba', muhasabaRoutes); // Alias for Vercel rewrites

// Ramadan routes
app.use('/api/ramadan', ramadanRoutes);
app.use('/ramadan', ramadanRoutes); // Alias for Vercel rewrites

// =========================
// Error Handling
// =========================
app.use((err: Error, req: Request, res: Response, next: any) => {
    console.error('Unhandled error:', err);
    res.status(500).json({ detail: 'Internal server error' });
});

export default app;
