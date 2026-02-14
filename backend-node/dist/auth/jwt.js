"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.createAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const createAccessToken = (data, expiresIn) => {
    return jsonwebtoken_1.default.sign(data, config_1.config.jwt.secret, {
        algorithm: config_1.config.jwt.algorithm,
        expiresIn: expiresIn || config_1.config.jwt.expiresIn,
    });
};
exports.createAccessToken = createAccessToken;
const verifyToken = (token) => {
    try {
        return jsonwebtoken_1.default.verify(token, config_1.config.jwt.secret, {
            algorithms: [config_1.config.jwt.algorithm],
        });
    }
    catch (error) {
        throw new Error('Invalid or expired token');
    }
};
exports.verifyToken = verifyToken;
//# sourceMappingURL=jwt.js.map