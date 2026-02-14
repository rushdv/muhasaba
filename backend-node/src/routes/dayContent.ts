import { Request, Response, Router } from "express";
import { getRamadanDayContent } from "../data/ramadanContent";

const router: Router = Router();
const QURAN_API_BASE = "https://api.quran.com/api/v4";

// Cache for daily content to avoid hitting Quran API repeatedly
// In a real production app, use Redis. In-memory object is fine for this scale.
const contentCache: Record<string, any> = {};

// Get random ayat
router.get("/random-ayat/get", async (req: Request, res: Response) => {
  try {
    // 1. Get random verse
    const randomRes = await fetch(
      `${QURAN_API_BASE}/verses/random?translations=161,131&fields=text_uthmani`
    );
    if (!randomRes.ok) throw new Error("Failed to fetch random verse");
    const randomData: any = await randomRes.json();
    const verse = randomData.verse;

    // 2. Get chapter info for this verse
    const chapterId = verse.chapter_id;
    const chapterRes = await fetch(
      `${QURAN_API_BASE}/chapters/${chapterId}?language=en`
    );
    const chapterData: any = await chapterRes.json();
    const chapter = chapterData.chapter;

    const bnTranslation = verse.translations.find(
      (t: any) => t.resource_id === 161
    )?.text;
    const enTranslation = verse.translations.find(
      (t: any) => t.resource_id === 131
    )?.text;
    const cleanText = (text: string) =>
      text ? text.replace(/<[^>]*>?/gm, "") : "";

    const ayatData = {
      surah: chapterId,
      ayah: verse.verse_number,
      arabic: verse.text_uthmani,
      meaning: cleanText(bnTranslation),
      meaning_en: cleanText(enTranslation),
      reference: verse.verse_key,
      surah_name: chapter.name_simple,
      surah_name_ar: chapter.name_arabic,
    };

    res.json(ayatData);
  } catch (error) {
    console.error("Error fetching random ayat:", error);
    res.status(500).json({ error: "Failed to fetch random ayat" });
  }
});

router.get("/:day", async (req: Request, res: Response) => {
  try {
    const day = parseInt(req.params.day, 10);

    if (isNaN(day) || day < 1 || day > 30) {
      res.status(400).json({ error: "Invalid day. Must be between 1 and 30." });
      return;
    }

    // Check cache for daily content
    if (contentCache[day]) {
      res.json(contentCache[day]);
      return;
    }

    // Get static content
    const staticContent = getRamadanDayContent(day);
    if (!staticContent) {
      res.status(404).json({ error: "Content not found" });
      return;
    }

    const { surah, ayah } = staticContent.ayat;

    // Fetch Verse and Chapter Info in parallel
    const [verseRes, chapterRes] = await Promise.all([
      fetch(
        `${QURAN_API_BASE}/verses/by_key/${surah}:${ayah}?language=bn&words=false&translations=161,131&fields=text_uthmani`
      ),
      fetch(`${QURAN_API_BASE}/chapters/${surah}?language=en`),
    ]);

    if (!verseRes.ok) throw new Error("Failed to fetch verse");

    const verseData: any = await verseRes.json();
    const chapterData: any = await chapterRes.json();

    const verse = verseData.verse;
    const chapter = chapterData.chapter;

    const bnTranslation = verse.translations.find(
      (t: any) => t.resource_id === 161
    )?.text;
    const enTranslation = verse.translations.find(
      (t: any) => t.resource_id === 131
    )?.text;

    const cleanText = (text: string) =>
      text ? text.replace(/<[^>]*>?/gm, "") : "";

    const enrichedContent = {
      ...staticContent,
      ayat: {
        ...staticContent.ayat,
        arabic: verse.text_uthmani,
        meaning: cleanText(bnTranslation),
        meaning_en: cleanText(enTranslation),
        reference: `${surah}:${ayah}`,
        surah_name: chapter.name_simple, // e.g. "Al-Baqarah"
        surah_name_ar: chapter.name_arabic, // e.g. "البقرة"
      },
    };

    contentCache[day] = enrichedContent;
    res.json(enrichedContent);
  } catch (error) {
    console.error("Error fetching daily content:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
