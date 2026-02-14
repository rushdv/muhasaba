"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const deps_1 = require("../auth/deps");
const ramadanContent_1 = require("../data/ramadanContent");
const database_1 = require("../db/database");
const router = (0, express_1.Router)();
// Get spiritual content for a specific day
router.get("/content/:day", async (req, res) => {
    try {
        const day = parseInt(req.params.day, 10);
        const content = (0, ramadanContent_1.getRamadanDayContent)(day);
        if (!content) {
            res.status(404).json({ detail: "Content not found for this day" });
            return;
        }
        res.status(200).json({ day, ...content });
    }
    catch (error) {
        console.error("Get content error:", error);
        res.status(500).json({ detail: "Internal server error" });
    }
});
// Upsert (create or update) ramadan report
router.post("/report", deps_1.getCurrentUser, async (req, res) => {
    try {
        const userId = req.user.id;
        const reportData = req.body;
        // Check if report exists
        const existingReport = await (0, database_1.query)("SELECT * FROM ramadan_reports WHERE user_id = $1 AND day_number = $2", [userId, reportData.day_number]);
        let result;
        if (existingReport.rows.length > 0) {
            // Update existing report
            const fields = Object.keys(reportData).filter((k) => k !== "day_number");
            const setClause = fields
                .map((field, idx) => `${field} = $${idx + 3}`)
                .join(", ");
            const values = fields.map((field) => reportData[field]);
            result = await (0, database_1.query)(`UPDATE ramadan_reports SET ${setClause}, log_date = CURRENT_DATE WHERE user_id = $1 AND day_number = $2 RETURNING *`, [userId, reportData.day_number, ...values]);
        }
        else {
            // Create new report
            const fields = [
                "user_id",
                "day_number",
                ...Object.keys(reportData).filter((k) => k !== "day_number"),
            ];
            const placeholders = fields.map((_, idx) => `$${idx + 1}`).join(", ");
            const values = [
                userId,
                reportData.day_number,
                ...Object.keys(reportData)
                    .filter((k) => k !== "day_number")
                    .map((k) => reportData[k]),
            ];
            result = await (0, database_1.query)(`INSERT INTO ramadan_reports (${fields.join(", ")}) VALUES (${placeholders}) RETURNING *`, values);
        }
        res.status(200).json(result.rows[0]);
    }
    catch (error) {
        console.error("Upsert report error:", error);
        res.status(500).json({ detail: "Internal server error" });
    }
});
// Get history of all reports for current user
router.get("/history", deps_1.getCurrentUser, async (req, res) => {
    try {
        const userId = req.user.id;
        const result = await (0, database_1.query)("SELECT * FROM ramadan_reports WHERE user_id = $1 ORDER BY day_number ASC", [userId]);
        res.status(200).json(result.rows);
    }
    catch (error) {
        console.error("Get history error:", error);
        res.status(500).json({ detail: "Internal server error" });
    }
});
// Get analytics for current user
router.get("/analytics", deps_1.getCurrentUser, async (req, res) => {
    try {
        const userId = req.user.id;
        const result = await (0, database_1.query)("SELECT * FROM ramadan_reports WHERE user_id = $1", [userId]);
        const reports = result.rows;
        if (reports.length === 0) {
            res.status(200).json({
                total_fasted_days: 0,
                salah_consistency_percentage: 0.0,
                quran_summary: [],
                total_names_memorized: 0,
                avg_spiritual_energy: 0.0,
                total_sadaqah_days: 0,
                highlight_text: "Start your journey today!",
            });
            return;
        }
        const totalDays = reports.length;
        const fastedDays = reports.filter((r) => r.is_fasting).length;
        // Calculate salah consistency
        let salahCount = 0;
        reports.forEach((r) => {
            salahCount += [
                r.salah_fajr,
                r.salah_dhuhr,
                r.salah_asr,
                r.salah_maghrib,
                r.salah_isha,
            ].filter(Boolean).length;
        });
        const salahConsistency = (salahCount / (totalDays * 5)) * 100;
        // Quran summary
        const quranList = [];
        reports.forEach((r) => {
            if (r.quran_para || r.quran_page || r.quran_ayat) {
                const parts = [];
                if (r.quran_para)
                    parts.push(`Para ${r.quran_para}`);
                if (r.quran_page)
                    parts.push(`Page ${r.quran_page}`);
                if (r.quran_ayat)
                    parts.push(`Ayat ${r.quran_ayat}`);
                quranList.push(parts.join(", "));
            }
            else if (r.quran_progress) {
                quranList.push(r.quran_progress);
            }
        });
        const namesMemorized = reports.filter((r) => r.allahur_naam_shikkha).length * 3;
        const avgEnergy = reports.reduce((sum, r) => sum + r.spiritual_energy, 0) /
            totalDays;
        const sadaqahDays = reports.filter((r) => r.had_sadaqah).length;
        res.status(200).json({
            total_fasted_days: fastedDays,
            salah_consistency_percentage: Math.round(salahConsistency * 10) / 10,
            quran_summary: quranList.slice(-5), // Last 5 updates
            total_names_memorized: namesMemorized,
            avg_spiritual_energy: Math.round(avgEnergy * 10) / 10,
            total_sadaqah_days: sadaqahDays,
            total_journey_days: totalDays,
            highlight_text: `Masha'Allah! You have completed a spiritual journey of ${totalDays} days.`,
        });
    }
    catch (error) {
        console.error("Get analytics error:", error);
        res.status(500).json({ detail: "Internal server error" });
    }
});
exports.default = router;
//# sourceMappingURL=ramadan.js.map