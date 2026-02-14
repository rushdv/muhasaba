interface Name {
    arabic: string;
    pronunciation: string;
    meaning: string;
}
interface DayContent {
    ayat: {
        surah: number;
        ayah: number;
        arabic_fallback?: string;
        meaning_fallback?: string;
    };
    hadith: string;
    dua: {
        arabic: string;
        meaning: string;
    };
    names: Name[];
}
/**
 * Helper function to retrieve content for a specific day of Ramadan.
 * @param day - Day of Ramadan (1 to 30)
 * @returns The content for the given day or null if out of range.
 */
export declare const getRamadanDayContent: (day: number) => DayContent | null;
export {};
//# sourceMappingURL=ramadanContent.d.ts.map