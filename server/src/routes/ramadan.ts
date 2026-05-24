import { Request, Response, Router } from "express";
import { AuthRequest, getCurrentUser } from "../auth/deps";
import { getRamadanDayContent } from "../data/ramadanContent";
import { query } from "../db/database";

const router: Router = Router();

// Whitelist of allowed fields for ramadan_reports to prevent mass assignment / SQL injection
const ALLOWED_REPORT_FIELDS = [
  "is_fasting",
  "salah_fajr",
  "salah_dhuhr",
  "salah_asr",
  "salah_maghrib",
  "salah_isha",
  "taraweeh",
  "tahajjud",
  "duha",
  "tahiyatul_masjid",
  "tahiyatul_wudu",
  "sunnat_fajr",
  "sunnat_dhuhr",
  "sunnat_asr",
  "sunnat_maghrib",
  "sunnat_isha",
  "quran_para",
  "quran_page",
  "quran_ayat",
  "quran_progress",
  "sokal_er_zikr",
  "shondha_er_zikr",
  "had_sadaqah",
  "daily_task",
  "jamaat_salat",
  "istighfar_70",
  "quran_translation",
  "allahur_naam_shikkha",
  "diner_ayat_shikkha",
  "diner_hadith_shikkha",
  "miswak",
  "calling_relative",
  "learning_new",
  "spiritual_energy",
  "reflection_note",
] as const;

type AllowedField = (typeof ALLOWED_REPORT_FIELDS)[number];

// Sanitize incoming report data — only keep whitelisted fields
const sanitizeReportData = (
  body: Record<string, any>
): Partial<Record<AllowedField, any>> => {
  const sanitized: Partial<Record<AllowedField, any>> = {};
  for (const field of ALLOWED_REPORT_FIELDS) {
    if (field in body) {
      sanitized[field] = body[field];
    }
  }
  return sanitized;
};

// Validate day_number
const validateDayNumber = (day: any): number | null => {
  const parsed = parseInt(day, 10);
  if (isNaN(parsed) || parsed < 1 || parsed > 30) return null;
  return parsed;
};

// Get spiritual content for a specific day
router.get(
  "/content/:day",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const day = parseInt(req.params.day, 10);
      const content = getRamadanDayContent(day);

      if (!content) {
        res.status(404).json({ detail: "Content not found for this day" });
        return;
      }

      res.status(200).json({ day, ...content });
    } catch (error) {
      console.error("Get content error:", error);
      res.status(500).json({ detail: "Internal server error" });
    }
  }
);

// Upsert (create or update) ramadan report
router.post(
  "/report",
  getCurrentUser,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = (req as AuthRequest).user!.id;

      // Validate day_number
      const dayNumber = validateDayNumber(req.body.day_number);
      if (dayNumber === null) {
        res
          .status(400)
          .json({ detail: "Invalid day_number. Must be between 1 and 30." });
        return;
      }

      // Sanitize — only whitelisted fields allowed
      const reportData = sanitizeReportData(req.body);

      if (Object.keys(reportData).length === 0) {
        res.status(400).json({ detail: "No valid fields provided." });
        return;
      }

      // Check if report exists
      const existingReport = await query(
        "SELECT id FROM ramadan_reports WHERE user_id = $1 AND day_number = $2",
        [userId, dayNumber]
      );

      let result;
      if (existingReport.rows.length > 0) {
        // Update existing report — fields are whitelisted, safe to use as column names
        const fields = Object.keys(reportData) as AllowedField[];
        const setClause = fields
          .map((field, idx) => `${field} = $${idx + 3}`)
          .join(", ");
        const values = fields.map((field) => reportData[field]);

        result = await query(
          `UPDATE ramadan_reports SET ${setClause}, log_date = CURRENT_DATE WHERE user_id = $1 AND day_number = $2 RETURNING *`,
          [userId, dayNumber, ...values]
        );
      } else {
        // Create new report
        const fields = Object.keys(reportData) as AllowedField[];
        const allFields = ["user_id", "day_number", ...fields];
        const placeholders = allFields
          .map((_, idx) => `$${idx + 1}`)
          .join(", ");
        const values = [userId, dayNumber, ...fields.map((f) => reportData[f])];

        result = await query(
          `INSERT INTO ramadan_reports (${allFields.join(", ")}) VALUES (${placeholders}) RETURNING *`,
          values
        );
      }

      res.status(200).json(result.rows[0]);
    } catch (error) {
      console.error("Upsert report error:", error);
      res.status(500).json({ detail: "Internal server error" });
    }
  }
);

// Get history of all reports for current user
router.get(
  "/history",
  getCurrentUser,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = (req as AuthRequest).user!.id;

      const result = await query(
        "SELECT * FROM ramadan_reports WHERE user_id = $1 ORDER BY day_number ASC",
        [userId]
      );

      res.status(200).json(result.rows);
    } catch (error) {
      console.error("Get history error:", error);
      res.status(500).json({ detail: "Internal server error" });
    }
  }
);

// Get analytics for current user
router.get(
  "/analytics",
  getCurrentUser,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = (req as AuthRequest).user!.id;

      const result = await query(
        "SELECT * FROM ramadan_reports WHERE user_id = $1",
        [userId]
      );

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
      const fastedDays = reports.filter((r: any) => r.is_fasting).length;

      // Calculate salah consistency
      let salahCount = 0;
      reports.forEach((r: any) => {
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
      const quranList: string[] = [];
      reports.forEach((r: any) => {
        if (r.quran_para || r.quran_page || r.quran_ayat) {
          const parts: string[] = [];
          if (r.quran_para) parts.push(`Para ${r.quran_para}`);
          if (r.quran_page) parts.push(`Page ${r.quran_page}`);
          if (r.quran_ayat) parts.push(`Ayat ${r.quran_ayat}`);
          quranList.push(parts.join(", "));
        } else if (r.quran_progress) {
          quranList.push(r.quran_progress);
        }
      });

      const namesMemorized =
        reports.filter((r: any) => r.allahur_naam_shikkha).length * 3;
      const avgEnergy =
        reports.reduce((sum: number, r: any) => sum + r.spiritual_energy, 0) /
        totalDays;
      const sadaqahDays = reports.filter((r: any) => r.had_sadaqah).length;

      res.status(200).json({
        total_fasted_days: fastedDays,
        salah_consistency_percentage: Math.round(salahConsistency * 10) / 10,
        quran_summary: quranList.slice(-5),
        total_names_memorized: namesMemorized,
        avg_spiritual_energy: Math.round(avgEnergy * 10) / 10,
        total_sadaqah_days: sadaqahDays,
        total_journey_days: totalDays,
        highlight_text: `Masha'Allah! You have completed a spiritual journey of ${totalDays} days.`,
      });
    } catch (error) {
      console.error("Get analytics error:", error);
      res.status(500).json({ detail: "Internal server error" });
    }
  }
);

export default router;
