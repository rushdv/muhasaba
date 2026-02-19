# Dynamic Ramadan Content Integration

This document explains the integration of dynamic Quran content into the Ramadan features of the Muhasabah application.

## Overview

Previously, the "Ayat of the Day" content was hardcoded in the application. We have updated the system to fetch this data dynamically from the Quran.com API. This ensures accuracy and allows for easier updates.

## What Changed?

### 1. Backend (`backend-node`)

- **Updated Data Structure**:

  - Previously, `src/data/ramadanContent.ts` contained the full Arabic text and Bengali translation for each day's Ayat.
  - Now, it only stores the **reference** (Surah number and Ayah number).
  - _Example_: Instead of `"Arabic Text..."`, it stores `{ surah: 2, ayah: 183 }`.

- **New API Endpoint**:

  - We created a new route: `GET /api/day-content/:day`.
  - This route takes the day number (e.g., `1` for Ramadan Day 1).
  - It looks up the reference (Surah 2, Ayah 183).
  - It calls the **Quran.com API** to get the actual Arabic text and Bengali translation.
  - It combines this dynamic data with the static content (Hadith, Dua, Names of Allah) and returns the full daily content.

- **App Configuration**:
  - The new route is registered in `src/app.ts` under `/api/day-content`.

### 2. Frontend (`frontend`)

- **API Client**:

  - The function `getRamadanContent` in `src/api/ramadan.js` was updated to call the new endpoint (`/api/day-content/:day`).

- **Data Display**:
  - The `RamadanPlanner` and `Dashboard` components now receive the full data object with `ayat.arabic` and `ayat.meaning` populated from the API.

## How It Works

1.  **User opens the app** (Dashboard or Ramadan Planner).
2.  **App requests content** for the current Ramadan day (e.g., Day 1).
3.  **Backend receives request** at `/api/day-content/1`.
4.  **Backend checks `ramadanContent.ts`** and finds `surah: 2, ayah: 183`.
5.  **Backend calls Quran API**: `https://api.quran.com/api/v4/verses/by_key/2:183...`
6.  **Backend merges data**: Connects the fetched Quran text with the static Hadith/Dua.
7.  **Backend sends response** to the Frontend.
8.  **Frontend displays** the "Ayat of the Day".

## Files Modified

- `backend-node/src/data/ramadanContent.ts`: Replaced text with references.
- `backend-node/src/routes/dayContent.ts`: New file for the API logic.
- `backend-node/src/app.ts`: Registered the new route.
- `frontend/src/api/ramadan.js`: Updated API call URL.

## Troubleshooting

If the Ayat is not showing:

1.  Check if the backend server is running (`pnpm dev` in `backend-node`).
2.  Check if your internet connection is active (required to fetch from Quran.com).
3.  If the external API fails, the backend will return the static data structure (so other parts of the app won't crash), but the Ayat text might be missing.

## API Reference

**Endpoint:** `GET /api/day-content/:day`

**Parameters:**

- `day`: The day number of Ramadan (1-30).

**Success Response (200 OK):**

```json
{
  "ayat": {
    "surah": 2,
    "ayah": 183,
    "arabic": "يَا أَيُّهَا الَّذِينَ آمَنُوا...",
    "meaning": "হে মুমিনগণ!...",
    "reference": "2:183"
  },
  "hadith": "...",
  "dua": { ... },
  "names": [ ... ]
}
```
