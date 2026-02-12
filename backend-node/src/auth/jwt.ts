import jwt from 'jsonwebtoken';
import { config } from '../config';

export interface TokenPayload {
    sub: string; // email
    iat?: number;
    exp?: number;
}

export const createAccessToken = (data: { sub: string }, expiresIn?: string | number): string => {
    return jwt.sign(data, config.jwt.secret as string, {
        algorithm: config.jwt.algorithm,
        expiresIn: expiresIn || config.jwt.expiresIn,
    } as any);
};

export const verifyToken = (token: string): TokenPayload => {
    try {
        return jwt.verify(token, config.jwt.secret, {
            algorithms: [config.jwt.algorithm],
        }) as TokenPayload;
    } catch (error) {
        throw new Error('Invalid or expired token');
    }
};
