import { Request, Response, Router } from "express";

const router: Router = Router();
const QURAN_API_BASE = "https://api.quran.com/api/v4";

// Generic proxy for Quran API
router.get("/*", async (req: Request, res: Response) => {
  try {
    const path = req.params[0]; // Captures everything after /api/quran/
    const query = new URLSearchParams(req.query as any).toString();
    const url = `${QURAN_API_BASE}/${path}${query ? `?${query}` : ""}`;

    console.log(`Proxying to Quran API: ${url}`);

    const response = await fetch(url);

    if (!response.ok) {
      res.status(response.status).json({
        error: `Quran API Error: ${response.statusText}`,
        details: await response.text(),
      });
      return;
    }

    const data = await response.json();
    res.json(data);
  } catch (error: any) {
    console.error("Quran API Proxy Error:", error);
    res.status(500).json({ error: "Failed to fetch data from Quran API" });
  }
});

export default router;
