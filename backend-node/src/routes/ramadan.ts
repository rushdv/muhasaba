import { Router, Request, Response } from 'express';
import { query } from '../db/database';
import { getCurrentUser, AuthRequest } from '../auth/deps';
import { getRamadanDayContent } from '../data/ramadanContent';

const router = Router();

// Get spiritual content for a specific day
router.get('/content/:day', async (req: Request, res: Response): Promise<void> => {
    try {
        const day = parseInt(req.params.day, 10);
        const content = getRamadanDayContent(day);

        if (!content) {
            res.status(404).json({ detail: 'Content not found for this day' });
            return;
        }

        res.status(200).json({ day, ...content });
    } catch (error) {
        console.error('Get content error:', error);
        res.status(500).json({ detail: 'Internal server error' });
    }
});

// Upsert (create or update) ramadan report
router.post('/report', getCurrentUser, async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = (req as AuthRequest).user!.id;
        const reportData = req.body;

        // Check if report exists
        const existingReport = await query(
            'SELECT * FROM ramadan_reports WHERE user_id = $1 AND day_number = $2',
            [userId, reportData.day_number]
        );

        let result;
        if (existingReport.rows.length > 0) {
            // Update existing report
            const fields = Object.keys(reportData).filter(k => k !== 'day_number');
            const setClause = fields.map((field, idx) => `${field} = $${idx + 3}`).join(', ');
            const values = fields.map(field => reportData[field]);

            result = await query(
                `UPDATE ramadan_reports SET ${setClause}, log_date = CURRENT_DATE WHERE user_id = $1 AND day_number = $2 RETURNING *`,
                [userId, reportData.day_number, ...values]
            );
        } else {
            // Create new report
            const fields = ['user_id', 'day_number', ...Object.keys(reportData).filter(k => k !== 'day_number')];
            const placeholders = fields.map((_, idx) => `$${idx + 1}`).join(', ');
            const values = [userId, reportData.day_number, ...Object.keys(reportData).filter(k => k !== 'day_number').map(k => reportData[k])];

            result = await query(
                `INSERT INTO ramadan_reports (${fields.join(', ')}) VALUES (${placeholders}) RETURNING *`,
                values
            );
        }

        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error('Upsert report error:', error);
        res.status(500).json({ detail: 'Internal server error' });
    }
});

// Get history of all reports for current user
router.get('/history', getCurrentUser, async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = (req as AuthRequest).user!.id;

        const result = await query(
            'SELECT * FROM ramadan_reports WHERE user_id = $1 ORDER BY day_number ASC',
            [userId]
        );

        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Get history error:', error);
        res.status(500).json({ detail: 'Internal server error' });
    }
});

// Get analytics for current user
router.get('/analytics', getCurrentUser, async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = (req as AuthRequest).user!.id;

        const result = await query(
            'SELECT * FROM ramadan_reports WHERE user_id = $1',
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
                highlight_text: 'Start your journey today!',
            });
            return;
        }

        const totalDays = reports.length;
        const fastedDays = reports.filter((r: any) => r.is_fasting).length;

        // Calculate salah consistency
        let salahCount = 0;
        reports.forEach((r: any) => {
            salahCount += [r.salah_fajr, r.salah_dhuhr, r.salah_asr, r.salah_maghrib, r.salah_isha]
                .filter(Boolean).length;
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
                quranList.push(parts.join(', '));
            } else if (r.quran_progress) {
                quranList.push(r.quran_progress);
            }
        });

        const namesMemorized = reports.filter((r: any) => r.allahur_naam_shikkha).length * 3;
        const avgEnergy = reports.reduce((sum: number, r: any) => sum + r.spiritual_energy, 0) / totalDays;
        const sadaqahDays = reports.filter((r: any) => r.had_sadaqah).length;

        res.status(200).json({
            total_fasted_days: fastedDays,
            salah_consistency_percentage: Math.round(salahConsistency * 10) / 10,
            quran_summary: quranList.slice(-5), // Last 5 updates
            total_names_memorized: namesMemorized,
            avg_spiritual_energy: Math.round(avgEnergy * 10) / 10,
            total_sadaqah_days: sadaqahDays,
            highlight_text: `Masha'Allah! You have completed a spiritual journey of ${totalDays} days.`,
        });
    } catch (error) {
        console.error('Get analytics error:', error);
        res.status(500).json({ detail: 'Internal server error' });
    }
});

export default router;
