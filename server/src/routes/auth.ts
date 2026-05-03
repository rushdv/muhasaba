import { Request, Response, Router } from "express";
import { OAuth2Client } from "google-auth-library";
import { createAccessToken } from "../auth/jwt";
import { hashPassword, verifyPassword } from "../auth/security";
import { config } from "../config";
import { query } from "../db/database";
import { betterAuthInstance } from "../auth/betterAuth";

const router: Router = Router();
const googleClient = new OAuth2Client(config.google.clientId);

const createToken = (email: string, rememberMe?: boolean) => {
  const expiresIn = rememberMe ? "30d" : "7d";
  return createAccessToken({ sub: email }, expiresIn);
};

// Signup endpoint
router.post("/signup", async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await query("SELECT * FROM users WHERE email = $1", [email]);

    if (existingUser.rows.length > 0) {
      res.status(400).json({ detail: "User already exists" });
      return;
    }

    const hashedPassword = await hashPassword(password);
    const { rememberMe } = req.body;
    const result = await query(
      "INSERT INTO users (username, email, hashed_password) VALUES ($1, $2, $3) RETURNING *",
      [username, email, hashedPassword]
    );

    const newUser = result.rows[0];
    const token = createToken(newUser.email, rememberMe);

    res.status(200).json({
      access_token: token,
      token_type: "bearer",
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ detail: "Internal server error" });
  }
});

// Login endpoint
router.post("/login", async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const result = await query("SELECT * FROM users WHERE email = $1", [email]);

    if (result.rows.length === 0) {
      res.status(401).json({ detail: "Incorrect email or password" });
      return;
    }

    const user = result.rows[0];
    const isValid = await verifyPassword(password, user.hashed_password);

    if (!isValid) {
      res.status(401).json({ detail: "Incorrect email or password" });
      return;
    }

    const { rememberMe } = req.body;
    const token = createToken(user.email, rememberMe);

    res.status(200).json({
      access_token: token,
      token_type: "bearer",
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ detail: "Internal server error" });
  }
});

// Google OAuth endpoint
router.post("/google", async (req: Request, res: Response): Promise<void> => {
  try {
    const { token } = req.body;

    if (!token) {
      console.error('❌ Error: No token provided in request body');
      res.status(400).json({ detail: 'No Google token provided' });
      return;
    }

    if (!config.google.clientId) {
      console.error('❌ CRITICAL: GOOGLE_CLIENT_ID is missing from environment!');
      res.status(500).json({ detail: 'GOOGLE_CLIENT_ID is not configured on the server' });
      return;
    }

    console.log(`DEBUG: Using Google Client ID: ${config.google.clientId.substring(0, 10)}...`);
    console.log(`DEBUG: Received token (first 20 chars): ${token.substring(0, 20)}...`);

    const ticket = await googleClient.verifyIdToken({
      idToken: token,
      audience: config.google.clientId,
    });

    const payload = ticket.getPayload();
    if (!payload || !payload.email) {
      throw new Error('No email found in Google ID token');
    }

    const email = payload.email;
    const name = payload.name || payload.given_name || email.split('@')[0];

    let userResult = await query('SELECT * FROM users WHERE email = $1', [email]);
    let user;

    if (userResult.rows.length === 0) {
      console.log(`DEBUG: Creating new user for email: ${email}`);
      let username = name;
      const existingUsername = await query('SELECT * FROM users WHERE username = $1', [username]);

      if (existingUsername.rows.length > 0) {
        username = `${name}_${Math.random().toString(36).substring(2, 8)}`;
      }

      const randomPassword = Math.random().toString(36).substring(2, 15);
      const hashedPassword = await hashPassword(randomPassword);
      const newUserResult = await query(
        'INSERT INTO users (username, email, hashed_password) VALUES ($1, $2, $3) RETURNING *',
        [username, email, hashedPassword]
      );
      user = newUserResult.rows[0];
    } else {
      user = userResult.rows[0];
    }

    const { rememberMe } = req.body;
    const accessToken = createToken(user.email, rememberMe);

    res.status(200).json({
      access_token: accessToken,
      token_type: 'bearer',
    });
  } catch (error: any) {
    const errorMsg = error.message || 'Unknown error';
    console.error('🔥 GOOGLE AUTH ERROR:', errorMsg);
    res.status(401).json({ detail: `Google Authentication Failed: ${errorMsg}` });
  }
});

router.get("/better-auth-status", (_req: Request, res: Response): void => {
  res.status(200).json({
    status: "ok",
    betterAuth: true,
  });
});

export default router;
