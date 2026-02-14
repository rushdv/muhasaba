"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const deps_1 = require("../auth/deps");
const database_1 = require("../db/database");
const router = (0, express_1.Router)();
// Create muhasaba log
router.post("/", deps_1.getCurrentUser, async (req, res) => {
    try {
        const { task_name, note } = req.body;
        const userId = req.user.id;
        const result = await (0, database_1.query)("INSERT INTO muhasaba_logs (task_name, note, user_id) VALUES ($1, $2, $3) RETURNING *", [task_name, note || null, userId]);
        res.status(200).json(result.rows[0]);
    }
    catch (error) {
        console.error("Create log error:", error);
        res.status(500).json({ detail: "Internal server error" });
    }
});
// Get all logs for current user
router.get("/", deps_1.getCurrentUser, async (req, res) => {
    try {
        const userId = req.user.id;
        const result = await (0, database_1.query)("SELECT * FROM muhasaba_logs WHERE user_id = $1 ORDER BY log_date DESC", [userId]);
        res.status(200).json(result.rows);
    }
    catch (error) {
        console.error("Get logs error:", error);
        res.status(500).json({ detail: "Internal server error" });
    }
});
// Update log status (toggle completion)
router.patch("/:log_id", deps_1.getCurrentUser, async (req, res) => {
    try {
        const logId = parseInt(req.params.log_id, 10);
        const userId = req.user.id;
        // Find the log
        const logResult = await (0, database_1.query)("SELECT * FROM muhasaba_logs WHERE id = $1 AND user_id = $2", [logId, userId]);
        if (logResult.rows.length === 0) {
            res.status(404).json({ detail: "Log not found" });
            return;
        }
        const log = logResult.rows[0];
        const newStatus = !log.is_completed;
        // Update the log
        const result = await (0, database_1.query)("UPDATE muhasaba_logs SET is_completed = $1 WHERE id = $2 RETURNING *", [newStatus, logId]);
        res.status(200).json(result.rows[0]);
    }
    catch (error) {
        console.error("Update log error:", error);
        res.status(500).json({ detail: "Internal server error" });
    }
});
// Delete log
router.delete("/:log_id", deps_1.getCurrentUser, async (req, res) => {
    try {
        const logId = parseInt(req.params.log_id, 10);
        const userId = req.user.id;
        // Find the log
        const logResult = await (0, database_1.query)("SELECT * FROM muhasaba_logs WHERE id = $1 AND user_id = $2", [logId, userId]);
        if (logResult.rows.length === 0) {
            res.status(404).json({ detail: "Log not found" });
            return;
        }
        // Delete the log
        await (0, database_1.query)("DELETE FROM muhasaba_logs WHERE id = $1", [logId]);
        res.status(204).send();
    }
    catch (error) {
        console.error("Delete log error:", error);
        res.status(500).json({ detail: "Internal server error" });
    }
});
exports.default = router;
//# sourceMappingURL=muhasaba.js.map