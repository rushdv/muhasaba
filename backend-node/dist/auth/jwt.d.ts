export interface TokenPayload {
    sub: string;
    iat?: number;
    exp?: number;
}
export declare const createAccessToken: (data: {
    sub: string;
}) => string;
export declare const verifyToken: (token: string) => TokenPayload;
//# sourceMappingURL=jwt.d.ts.map