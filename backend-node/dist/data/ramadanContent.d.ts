interface Name {
    arabic: string;
    pronunciation: string;
    meaning: string;
}
interface DayContent {
    ayat: {
        arabic: string;
        meaning: string;
    };
    hadith: string;
    dua: {
        arabic: string;
        meaning: string;
    };
    names: Name[];
}
export declare const getRamadanDayContent: (day: number) => DayContent | null;
export {};
//# sourceMappingURL=ramadanContent.d.ts.map