"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentUser = void 0;
const jwt_1 = require("./jwt");
const database_1 = require("../db/database");
const getCurrentUser = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            res.status(401).json({ detail: 'Could not validate credentials' });
            return;
        }
        const token = authHeader.substring(7); // Remove 'Bearer ' prefix
        try {
            const payload = (0, jwt_1.verifyToken)(token);
            const email = payload.sub;
            if (!email) {
                res.status(401).json({ detail: 'Could not validate credentials' });
                return;
            }
            // Fetch user from database
            const result = await (0, database_1.query)('SELECT * FROM users WHERE email = $1', [email]);
            if (result.rows.length === 0) {
                res.status(401).json({ detail: 'Could not validate credentials' });
                return;
            }
            req.user = result.rows[0];
            next();
        }
        catch (error) {
            res.status(401).json({ detail: 'Could not validate credentials' });
            return;
        }
    }
    catch (error) {
        res.status(401).json({ detail: 'Could not validate credentials' });
        return;
    }
};
exports.getCurrentUser = getCurrentUser;
//# sourceMappingURL=deps.js.map