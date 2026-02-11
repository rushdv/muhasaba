"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const config_1 = require("./config");
const database_1 = require("./db/database");
const auth_1 = __importDefault(require("./routes/auth"));
const muhasaba_1 = __importDefault(require("./routes/muhasaba"));
const ramadan_1 = __importDefault(require("./routes/ramadan"));
const app = (0, express_1.default)();
// Initialize database on cold start
let dbInitialized = false;
const initDB = async () => {
    if (!dbInitialized) {
        try {
            await (0, database_1.initDatabase)();
            console.log('✅ Database initialized');
            dbInitialized = true;
        }
        catch (error) {
            console.error('❌ Database initialization error:', error);
        }
    }
};
// Initialize DB on module load
initDB();
// =========================
// Middleware
// =========================
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// CORS Configuration
app.use((0, cors_1.default)({
    origin: config_1.config.cors.origins,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
// =========================
// Routes
// =========================
// Health check
app.get('/', (req, res) => {
    res.json({ status: 'ok', message: 'Muhasabah API - Node.js Backend' });
});
// Auth routes - /api/auth/login, /api/auth/signup, /api/auth/google
app.use('/api/auth', auth_1.default);
// Muhasaba routes - /api/muhasaba
app.use('/api/muhasaba', muhasaba_1.default);
// Ramadan routes - /api/ramadan
app.use('/api/ramadan', ramadan_1.default);
// =========================
// Error Handling
// =========================
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({ detail: 'Internal server error' });
});
exports.default = app;
//# sourceMappingURL=app.js.map