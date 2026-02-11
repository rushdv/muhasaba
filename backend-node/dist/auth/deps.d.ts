import { Request, Response, NextFunction } from 'express';
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
export declare const getCurrentUser: (req: Request, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=deps.d.ts.map