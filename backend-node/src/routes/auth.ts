import { Router, Request, Response } from 'express';
import { OAuth2Client } from 'google-auth-library';
import { query } from '../db/database';
import { hashPassword, verifyPassword } from '../auth/security';
import { createAccessToken } from '../auth/jwt';
import { config } from '../config';

const router = Router();
const googleClient = new OAuth2Client(config.google.clientId);

// Signup endpoint
router.post('/signup', async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, email, password } = req.body;

        // Check if user already exists
        const existingUser = await query(
            'SELECT * FROM users WHERE email = $1',
            [email]
        );

        if (existingUser.rows.length > 0) {
            res.status(400).json({ detail: 'User already exists' });
            return;
        }

        // Hash password and create user
        const hashedPassword = await hashPassword(password);
        const { rememberMe } = req.body;
        const result = await query(
            'INSERT INTO users (username, email, hashed_password) VALUES ($1, $2, $3) RETURNING *',
            [username, email, hashedPassword]
        );

        const newUser = result.rows[0];
        const expiresIn = rememberMe ? '30d' : '7d';
        const token = createAccessToken({ sub: newUser.email }, expiresIn);

        res.status(200).json({
            access_token: token,
            token_type: 'bearer',
        });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ detail: 'Internal server error' });
    }
});

// Login endpoint
router.post('/login', async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        // Find user
        const result = await query(
            'SELECT * FROM users WHERE email = $1',
            [email]
        );

        if (result.rows.length === 0) {
            res.status(401).json({ detail: 'Incorrect email or password' });
            return;
        }

        const user = result.rows[0];

        // Verify password
        const isValid = await verifyPassword(password, user.hashed_password);
        if (!isValid) {
            res.status(401).json({ detail: 'Incorrect email or password' });
            return;
        }

        const { rememberMe } = req.body;
        const expiresIn = rememberMe ? '30d' : '7d';
        const token = createAccessToken({ sub: user.email }, expiresIn);

        res.status(200).json({
            access_token: token,
            token_type: 'bearer',
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ detail: 'Internal server error' });
    }
});

// Google OAuth endpoint
router.post('/google', async (req: Request, res: Response): Promise<void> => {
    try {
        const { token } = req.body;

        if (!config.google.clientId) {
            console.error('❌ CRITICAL: GOOGLE_CLIENT_ID is missing from environment!');
            res.status(500).json({ detail: 'GOOGLE_CLIENT_ID is not set in backend environment' });
            return;
        }

        console.log(`DEBUG: Using Google Client ID: ${config.google.clientId.substring(0, 10)}...${config.google.clientId.substring(config.google.clientId.length - 10)}`);
        console.log(`DEBUG: Received token (first 20 chars): ${token.substring(0, 20)}...`);

        let ticket;
        try {
            // Verify the token with audience check
            ticket = await googleClient.verifyIdToken({
                idToken: token,
                audience: config.google.clientId,
            });
            console.log('✅ Token verified successfully with audience check');
        } catch (verifyError: any) {
            console.log(`⚠️ Initial verification failed: ${verifyError.message}. Attempting loose verification...`);

            // Try without audience to see what's inside
            ticket = await googleClient.verifyIdToken({
                idToken: token,
            });

            const payload = ticket.getPayload();
            const actualAud = payload?.aud;
            console.log(`DEBUG: Token audience: ${actualAud}`);
            console.log(`DEBUG: Expected audience: ${config.google.clientId}`);

            if (actualAud !== config.google.clientId) {
                throw new Error(`Audience mismatch. Token has '${actualAud}' but backend expects '${config.google.clientId}'`);
            }
        }

        const payload = ticket.getPayload();
        if (!payload || !payload.email) {
            throw new Error('No email found in Google ID token');
        }

        const email = payload.email;
        const name = payload.name || payload.given_name || email.split('@')[0];

        // Check if user exists
        let userResult = await query(
            'SELECT * FROM users WHERE email = $1',
            [email]
        );

        let user;
        if (userResult.rows.length === 0) {
            console.log(`DEBUG: Creating new user for email: ${email}`);

            // Generate unique username
            let username = name;
            const existingUsername = await query(
                'SELECT * FROM users WHERE username = $1',
                [username]
            );

            if (existingUsername.rows.length > 0) {
                username = `${name}_${Math.random().toString(36).substring(2, 8)}`;
            }

            // Create new user with random password
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
        const expiresIn = rememberMe ? '30d' : '7d';
        const accessToken = createAccessToken({ sub: user.email }, expiresIn);

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

export default router;
