import { Request, Response, NextFunction } from "express";
import { auth } from "./auth";
import { toNodeHandler } from "better-auth/node";

export interface BetterAuthUser {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthRequest extends Request {
  user?: BetterAuthUser;
}

/**
 * Express middleware that validates the Better Auth session.
 * Reads the session from the cookie (or Authorization header via Bearer token).
 * Attaches the user to req.user if valid, otherwise returns 401.
 */
export const getCurrentUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const session = await auth.api.getSession({
      headers: req.headers as any,
    });

    if (!session?.user) {
      res.status(401).json({ detail: "Could not validate credentials" });
      return;
    }

    (req as AuthRequest).user = session.user as BetterAuthUser;
    next();
  } catch {
    res.status(401).json({ detail: "Could not validate credentials" });
  }
};
