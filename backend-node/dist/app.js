"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const config_1 = require("./config");
const database_1 = require("./db/database");
const auth_1 = __importDefault(require("./routes/auth"));
const dayContent_1 = __importDefault(require("./routes/dayContent"));
const muhasaba_1 = __importDefault(require("./routes/muhasaba"));
const quran_1 = __importDefault(require("./routes/quran"));
const ramadan_1 = __importDefault(require("./routes/ramadan"));
const app = (0, express_1.default)();
// Initialize database on cold start
let dbInitialized = false;
const initDB = async () => {
    if (!dbInitialized) {
        try {
            await (0, database_1.initDatabase)();
            console.log("✅ Database initialized");
            dbInitialized = true;
        }
        catch (error) {
            console.error("❌ Database initialization error:", error);
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
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
// =========================
// Routes
// =========================
// Health check
app.get("/", (req, res) => {
    res.json({
        status: "ok",
        message: "Muhasabah API - Node.js Backend",
        path: req.url,
        originalUrl: req.originalUrl,
    });
});
// Auth routes
app.use("/api/auth", auth_1.default);
app.use("/auth", auth_1.default); // Alias for Vercel rewrites
// Muhasaba routes
app.use("/api/muhasaba", muhasaba_1.default);
app.use("/muhasaba", muhasaba_1.default); // Alias for Vercel rewrites
// Ramadan routes
app.use("/api/ramadan", ramadan_1.default);
app.use("/ramadan", ramadan_1.default); // Alias for Vercel rewrites
// Quran routes
app.use("/api/quran", quran_1.default);
app.use("/quran", quran_1.default); // Alias for Vercel rewrites
// Daily Content (Mixed)
app.use("/api/day-content", dayContent_1.default);
// =========================
// Error Handling
// =========================
app.use((err, req, res, next) => {
    console.error("Unhandled error:", err);
    res.status(500).json({ detail: "Internal server error" });
});
exports.default = app;
//# sourceMappingURL=app.js.map