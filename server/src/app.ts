import cors from "cors";
import express, { Application, Request, Response } from "express";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./auth/auth";
import { config } from "./config";
import { initDatabase } from "./db/database";
import dayContentRoutes from "./routes/dayContent";
import muhasabaRoutes from "./routes/muhasaba";
import quranRoutes from "./routes/quran";
import ramadanRoutes from "./routes/ramadan";

const app: Application = express();

// Initialize database on cold start
let dbInitialized = false;
const initDB = async () => {
  if (!dbInitialized) {
    try {
      await initDatabase();
      console.log("✅ Database initialized");
      dbInitialized = true;
    } catch (error) {
      console.error("❌ Database initialization error:", error);
    }
  }
};
initDB();

// =========================
// CORS — must be before Better Auth handler
// =========================
app.use(
  cors({
    origin: config.cors.origins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// =========================
// Better Auth handler
// Handles all /api/auth/* routes automatically:
//   POST /api/auth/sign-up/email
//   POST /api/auth/sign-in/email
//   POST /api/auth/sign-in/social  (Google)
//   POST /api/auth/sign-out
//   GET  /api/auth/session
//   GET  /api/auth/callback/google
// =========================
app.all("/api/auth/*", toNodeHandler(auth));

// =========================
// Body parsing (after Better Auth — it reads raw body itself)
// =========================
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

// =========================
// Health check
// =========================
app.get("/", (_req: Request, res: Response) => {
  res.json({ status: "ok", message: "Muhasabah API" });
});

// =========================
// App Routes
// =========================
app.use("/api/muhasaba", muhasabaRoutes);
app.use("/api/ramadan", ramadanRoutes);
app.use("/api/quran", quranRoutes);
app.use("/api/day-content", dayContentRoutes);

// =========================
// Error Handling
// =========================
app.use((err: Error, _req: Request, res: Response, _next: any) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ detail: "Internal server error" });
});

export default app;
