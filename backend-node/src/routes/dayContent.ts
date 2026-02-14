import { Request, Response, Router } from "express";
import { getRamadanDayContent } from "../data/ramadanContent";

const router: Router = Router();
const QURAN_API_BASE = "https://api.quran.com/api/v4";

// Cache for daily content to avoid hitting Quran API repeatedly
// In a real production app, use Redis. In-memory object is fine for this scale.
const contentCache: Record<string, any> = {};

router.get("/:day", async (req: Request, res: Response) => {
  try {
    const day = parseInt(req.params.day, 10);

    if (isNaN(day) || day < 1 || day > 30) {
      res.status(400).json({ error: "Invalid day. Must be between 1 and 30." });
      return;
    }

    // Check cache
    if (contentCache[day]) {
      res.json(contentCache[day]);
      return;
    }

    // Get static content (Hadith, Dua, Names references)
    const staticContent = getRamadanDayContent(day);

    if (!staticContent) {
      res.status(404).json({ error: "Content not found for this day" });
      return;
    }

    // Fetch dynamic Quran content
    const { surah, ayah } = staticContent.ayat;

    // Fetch Arabic text and Bengali translation (ID 161 - Taisirul Quran)
    // Also fetching English (ID 131 - The Clear Quran) as fallback/secondary
    const response = await fetch(
      `${QURAN_API_BASE}/verses/by_key/${surah}:${ayah}?language=bn&words=false&translations=161,131&fields=text_uthmani`
    );

    if (!response.ok) {
      console.error(`Failed to fetch Quran data for ${surah}:${ayah}`);
      // Fallback to static content without enrichment if API fails
      res.json(staticContent);
      return;
    }

    const quranData: any = await response.json();
    const verse = quranData.verse;

    // Extract translations
    const bnTranslation = verse.translations.find(
      (t: any) => t.resource_id === 161
    )?.text;
    const enTranslation = verse.translations.find(
      (t: any) => t.resource_id === 131
    )?.text;

    // Clean up HTML tags from translations if present (API sometimes returns <p> or footnotes)
    const cleanText = (text: string) =>
      text ? text.replace(/<[^>]*>?/gm, "") : "";

    const enrichedContent = {
      ...staticContent,
      ayat: {
        ...staticContent.ayat,
        arabic: verse.text_uthmani,
        meaning: cleanText(bnTranslation), // Primary meaning in Bengali
        meaning_en: cleanText(enTranslation), // Secondary meaning in English
        reference: `${surah}:${ayah}`,
      },
    };

    // Store in cache
    contentCache[day] = enrichedContent;

    res.json(enrichedContent);
  } catch (error) {
    console.error("Error fetching daily content:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
