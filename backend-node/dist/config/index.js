"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.config = {
    database: {
        url: process.env.DATABASE_URL || '',
    },
    jwt: {
        secret: process.env.SECRET_KEY || 'change-this-secret-key',
        algorithm: 'HS256',
        expiresIn: '7d',
    },
    google: {
        clientId: process.env.GOOGLE_CLIENT_ID || '',
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
        redirectUri: process.env.GOOGLE_REDIRECT_URI || '',
    },
    server: {
        port: parseInt(process.env.PORT || '3000', 10),
        env: process.env.NODE_ENV || 'development',
    },
    cors: {
        origins: [
            'https://muhasabah.vercel.app',
            'http://localhost:5173',
        ],
    },
};
//# sourceMappingURL=index.js.map