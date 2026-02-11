import { Request, Response, NextFunction } from 'express';
import { verifyToken } from './jwt';
import { query } from '../db/database';

export interface User {
    id: number;
    username: string;
    email: string;
    hashed_password: string;
    is_active: boolean;
}

export interface AuthRequest extends Request {
    user?: User;
}

export const getCurrentUser = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            res.status(401).json({ detail: 'Could not validate credentials' });
            return;
        }

        const token = authHeader.substring(7); // Remove 'Bearer ' prefix

        try {
            const payload = verifyToken(token);
            const email = payload.sub;

            if (!email) {
                res.status(401).json({ detail: 'Could not validate credentials' });
                return;
            }

            // Fetch user from database
            const result = await query(
                'SELECT * FROM users WHERE email = $1',
                [email]
            );

            if (result.rows.length === 0) {
                res.status(401).json({ detail: 'Could not validate credentials' });
                return;
            }

            (req as AuthRequest).user = result.rows[0];
            next();
        } catch (error) {
            res.status(401).json({ detail: 'Could not validate credentials' });
            return;
        }
    } catch (error) {
        res.status(401).json({ detail: 'Could not validate credentials' });
        return;
    }
};
