"use strict";
// Ramadan 30-Day Spiritual Content
// This serves as the static source for Ayat, Hadith, Dua, and Names of Allah.
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRamadanDayContent = void 0;
const RAMADAN_CONTENT = {
    1: {
        ayat: { surah: 2, ayah: 183 },
        hadith: "যে ব্যক্তি ঈমানের সাথে ও সওয়াবের আশায় রমজানের রোজা রাখে, তার অতীতের সব গুনাহ মাফ করে দেওয়া হয়। (সহীহ বুখারী: ১৯০১)",
        dua: {
            arabic: "اللَّهُمَّ لَكَ صُمْتُ وَعَلَى رِزْقِكَ أَفْطَرْتُ",
            meaning: "হে আল্লাহ! আমি তোমারই জন্য রোজা রেখেছি এবং তোমারই দেয়া রিজিক দ্বারা ইফতার করছি।",
        },
        names: [
            {
                arabic: "الرَّحْمَنُ",
                pronunciation: "Ar-Rahman",
                meaning: "পরম দয়ালু",
            },
            {
                arabic: "الرَّحِيمُ",
                pronunciation: "Ar-Rahim",
                meaning: "অতিশয় মেহেরবান",
            },
            { arabic: "الْمَلِكُ", pronunciation: "Al-Malik", meaning: "সর্বাধিপতি" },
        ],
    },
    2: {
        ayat: { surah: 2, ayah: 185 },
        hadith: "রোজা ঢাল স্বরূপ। সুতরাং রোজা রেখে অশ্লীল কথা বলবে না এবং শোরগোল করবে না। (সহীহ বুখারী: ১৯০৪)",
        dua: {
            arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
            meaning: "হে আমাদের প্রতিপালক! আমাদের দুনিয়াতে কল্যাণ দিন এবং আখেরাতেও কল্যাণ দিন এবং আমাদের জাহান্নামের আজাব থেকে রক্ষা করুন।",
        },
        names: [
            {
                arabic: "الْقُدُّوسُ",
                pronunciation: "Al-Quddus",
                meaning: "অতি পবিত্র",
            },
            {
                arabic: "السَّلَامُ",
                pronunciation: "As-Salam",
                meaning: "শান্তি দানকারী",
            },
            {
                arabic: "الْمُؤْمِنُ",
                pronunciation: "Al-Mu'min",
                meaning: "নিরাপত্তা দানকারী",
            },
        ],
    },
    3: {
        ayat: { surah: 3, ayah: 103 },
        hadith: "দান-সদাহ করলে সম্পদ কমে না। (সহীহ মুসলিম: ২৫৮৮)",
        dua: {
            arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا وَرِزْقًا طَيِّبًا وَعَمَلًا مُتَقَبَّلًا",
            meaning: "হে আল্লাহ! আমি তোমার নিকট উপকারী জ্ঞান, পবিত্র রিজিক এবং কবুলযোগ্য আমল প্রার্থনা করছি।",
        },
        names: [
            {
                arabic: "الْمُهَيْمِنُ",
                pronunciation: "Al-Muhaymin",
                meaning: "রক্ষাকারী",
            },
            {
                arabic: "الْعَزِيزُ",
                pronunciation: "Al-Aziz",
                meaning: "মহা পরাক্রমশালী",
            },
            {
                arabic: "الْجَبَّارُ",
                pronunciation: "Al-Jabbar",
                meaning: "মহাপ্রতাপশালী",
            },
        ],
    },
    4: {
        ayat: { surah: 94, ayah: 5 }, // Verse 5-6 combined logic handled in API or split? Using verse 5 for now as key
        hadith: "সবচেয়ে উত্তম মানুষ সে, যে মানুষের উপকার করে। (আল-মু'জামুল আওসাত: ৫৭৮৭)",
        dua: {
            arabic: "يَا مُقَلِّبَ الْقُلُوبِ ثَبِّتْ قَلْبِي عَلَى دِينِكَ",
            meaning: "হে অন্তর পরিবর্তনকারী! আমার অন্তরকে তোমার দ্বীনের উপর অবিচল রাখো।",
        },
        names: [
            {
                arabic: "الْمُتَكَبِّرُ",
                pronunciation: "Al-Mutakabbir",
                meaning: "অহংকারের অধিকারী",
            },
            {
                arabic: "الْخَالِقُ",
                pronunciation: "Al-Khaliq",
                meaning: "সৃষ্টিকর্তা",
            },
            {
                arabic: "الْبَارِئُ",
                pronunciation: "Al-Bari",
                meaning: "উদ্ভাবনকারী",
            },
        ],
    },
    5: {
        ayat: { surah: 40, ayah: 60 },
        hadith: "দোয়াই ইবাদত। (সুনানে তিরমিজি: ২৯৬৯)",
        dua: {
            arabic: "رَبِّ زِدْنِي عِلْمًا",
            meaning: "হে আমার প্রতিপালক! আমার জ্ঞান বাড়িয়ে দিন।",
        },
        names: [
            {
                arabic: "الْمُصَوِّرُ",
                pronunciation: "Al-Musawwir",
                meaning: "আকৃতি দানকারী",
            },
            {
                arabic: "الْغَفَّارُ",
                pronunciation: "Al-Ghaffar",
                meaning: "ক্ষমাশীল",
            },
            {
                arabic: "الْقَهَّارُ",
                pronunciation: "Al-Qahhar",
                meaning: "কঠোর দমনকারী",
            },
        ],
    },
    6: {
        ayat: { surah: 2, ayah: 186 },
        hadith: "পবিত্রতা ঈমানের অঙ্গ। (সহীহ মুসলিম: ২২৩)",
        dua: {
            arabic: "اللَّهُمَّ أَجِرْنِي مِنَ النَّارِ",
            meaning: "হে আল্লাহ! আমাকে জাহান্নাম থেকে পানাহ দাও।",
        },
        names: [
            {
                arabic: "الْوَهَّابُ",
                pronunciation: "Al-Wahhab",
                meaning: "মহা দানকারী",
            },
            {
                arabic: "الرَّزَّاقُ",
                pronunciation: "Ar-Razzaq",
                meaning: "রিজিকদাতা",
            },
            {
                arabic: "الْفَتَّاحُ",
                pronunciation: "Al-Fattah",
                meaning: "বিজয় দানকারী",
            },
        ],
    },
    7: {
        ayat: { surah: 12, ayah: 87 },
        hadith: "তোমাদের মধ্যে সেই ব্যক্তিই সর্বোত্তম, যে কুরআন শেখে এবং অন্যকে শেখায়। (সহীহ বুখারী: ৫০২৭)",
        dua: {
            arabic: "اللَّهُمَّ اعْنِي عَلَى ذِكْرِكَ وَشُكْرِكَ وَحُسْنِ عِبَادَتِكَ",
            meaning: "হে আল্লাহ! তোমার যিকির, শোকর ও উত্তম ইবাদত পালনে আমাকে সাহায্য কর।",
        },
        names: [
            { arabic: "الْعَلِيمُ", pronunciation: "Al-Alim", meaning: "সর্বজ্ঞ" },
            {
                arabic: "الْقَابِضُ",
                pronunciation: "Al-Qabid",
                meaning: "সংকোচনকারী",
            },
            {
                arabic: "الْبَاسِطُ",
                pronunciation: "Al-Basit",
                meaning: "প্রসারণকারী",
            },
        ],
    },
    8: {
        ayat: { surah: 29, ayah: 45 },
        hadith: "সালাত হচ্ছে জান্নাতের চাবিকাঠি। (সুনানে তিরমিজি: ৪)",
        dua: {
            arabic: "اللَّهُمَّ إِنَّكَ عَفُوٌّ تُحِبُّ الْعَفْوَ فَاعْفُ عَنِّي",
            meaning: "হে আল্লাহ! আপনি ক্ষমাশীল, আপনি ক্ষমা করতে ভালোবাসেন, অতএব আমাকে ক্ষমা করুন।",
        },
        names: [
            { arabic: "الْخَافِضُ", pronunciation: "Al-Khafid", meaning: "অবনতকারী" },
            { arabic: "الرَّافِعُ", pronunciation: "Ar-Rafi", meaning: "উন্নতকারী" },
            {
                arabic: "الْمُعِزُّ",
                pronunciation: "Al-Mu'izz",
                meaning: "সম্মান দানকারী",
            },
        ],
    },
    9: {
        ayat: { surah: 17, ayah: 24 },
        hadith: "মায়ের পায়ের নিচে সন্তানের জান্নাত। (সুনানে নাসায়ী: ৩১০৬)",
        dua: {
            arabic: "رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ",
            meaning: "হে আমাদের প্রতিপালক! আমাদের স্ত্রীদের ও সন্তানদের আমাদের নয়নপ্রীতিকর করুন।",
        },
        names: [
            {
                arabic: "الْمُذِلُّ",
                pronunciation: "Al-Mudhill",
                meaning: "অপদস্থকারী",
            },
            { arabic: "السَّمِيعُ", pronunciation: "As-Sami", meaning: "সর্বশ্রোতা" },
            {
                arabic: "الْبَصِيرُ",
                pronunciation: "Al-Basir",
                meaning: "সর্বদ্রষ্টা",
            },
        ],
    },
    10: {
        ayat: { surah: 65, ayah: 2 },
        hadith: "তাকওয়া এখানে (বুকে)। (সহীহ মুসলিম: ২৫৬৪)",
        dua: {
            arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْهُدَى وَالتُّقَى وَالْعَفَافَ وَالْغِنَى",
            meaning: "হে আল্লাহ! আমি তোমার কাছে হিদায়াত, তাকওয়া, চারিত্রিক পবিত্রতা ও স্বচ্ছলতা প্রার্থনা করছি।",
        },
        names: [
            { arabic: "الْحَكَمُ", pronunciation: "Al-Hakam", meaning: "হুকুমদাতা" },
            { arabic: "الْعَدْلُ", pronunciation: "Al-Adl", meaning: "ন্যায়বিচারক" },
            {
                arabic: "اللَّطِيفُ",
                pronunciation: "Al-Latif",
                meaning: "অতি সূক্ষ্মদর্শী",
            },
        ],
    },
    11: {
        ayat: { surah: 2, ayah: 153 },
        hadith: "ধৈর্য হলো আলো। (সহীহ মুসলিম: ২২৩)",
        dua: {
            arabic: "رَبَّنَا أَفْرِغْ عَلَيْنَا صَبْرًا وَثَبِّتْ أَقْدَامَنَا",
            meaning: "হে আমাদের প্রতিপালক! আমাদের ধৈর্য দান করুন এবং আমাদের কদম সুদৃঢ় রাখুন।",
        },
        names: [
            { arabic: "الْخَبِيرُ", pronunciation: "Al-Khabir", meaning: "সর্বজ্ঞ" },
            {
                arabic: "الْحَلِيمُ",
                pronunciation: "Al-Halim",
                meaning: "অতি সহনশীল",
            },
            { arabic: "الْعَظِيمُ", pronunciation: "Al-Azim", meaning: "অতি মহান" },
        ],
    },
    12: {
        ayat: { surah: 97, ayah: 1 },
        hadith: "তোমরা শেষ দশ দিনের বেজোড় রাতে লাইলাতুল কদর তালাশ করো। (সহীহ বুখারী: ২০২১)",
        dua: {
            arabic: "رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي",
            meaning: "হে আমার প্রতিপালক! আমার বক্ষ প্রশস্ত করে দিন এবং আমার কাজ সহজ করে দিন।",
        },
        names: [
            {
                arabic: "الْغَفُورُ",
                pronunciation: "Al-Ghafur",
                meaning: "অত্যন্ত ক্ষমাশীল",
            },
            {
                arabic: "الشَّكُورُ",
                pronunciation: "Ash-Shakur",
                meaning: "গুণগ্রাহী",
            },
            {
                arabic: "الْعَلِيُّ",
                pronunciation: "Al-Ali",
                meaning: "উচ্চমর্যাদাশীল",
            },
        ],
    },
    13: {
        ayat: { surah: 13, ayah: 28 },
        hadith: "সেই ব্যক্তির উদাহরণ যে তার প্রতিপালককে স্মরণ করে আর যে করে না, তা জীবিত ও মৃতের মতো। (সহীহ বুখারী: ৬৪০৭)",
        dua: {
            arabic: "اللَّهُمَّ بَارِكْ لَنَا فِيمَا رَزَقْتَنَا",
            meaning: "হে আল্লাহ! আমাদের প্রতিটি নেয়ামতে বরকত দাও।",
        },
        names: [
            {
                arabic: "الْكَبِيرُ",
                pronunciation: "Al-Kabir",
                meaning: "অত্যধিক বড়",
            },
            {
                arabic: "الْحَفِيظُ",
                pronunciation: "Al-Hafiz",
                meaning: "সংরক্ষণকারী",
            },
            { arabic: "الْمُقِيتُ", pronunciation: "Al-Muqit", meaning: "রিজিকদাতা" },
        ],
    },
    14: {
        ayat: { surah: 14, ayah: 7 },
        hadith: "যাকে শোকর করার তৌফিক দেওয়া হয়েছে, তাকে নেয়ামত বৃদ্ধি থেকে বঞ্চিত করা হবে না। (শুয়াবুল ঈমান)",
        dua: {
            arabic: "الْحَمْدُ لِلَّهِ عَلَى كُلِّ حَالٍ",
            meaning: "সর্বাবস্থায় আল্লাহর প্রশংসা করছি।",
        },
        names: [
            {
                arabic: "الْحَسِيبُ",
                pronunciation: "Al-Hasib",
                meaning: "হিসাব গ্রহণকারী",
            },
            {
                arabic: "الْجَلِيلُ",
                pronunciation: "Al-Jalil",
                meaning: "মহিমান্বিত",
            },
            {
                arabic: "الْكَرِيمُ",
                pronunciation: "Al-Karim",
                meaning: "মহা দয়ালু",
            },
        ],
    },
    15: {
        ayat: { surah: 5, ayah: 2 },
        hadith: "একজন মুমিন আরেকজন মুমিনের জন্য দেয়ালের ন্যায়, যার এক অংশ অন্য অংশকে শক্তিশালী করে। (সহীহ বুখারী: ৪৮১)",
        dua: {
            arabic: "رَبَّنَا تَقَبَّلْ مِنَّا إِنَّكَ أَنتَ السَّمِيعُ الْعَلِيمُ",
            meaning: "হে আমাদের প্রতিপালক! আমাদের পক্ষ থেকে কবুল করুন, নিশ্চয়ই আপনি সর্বশ্রোতা, সর্বজ্ঞ।",
        },
        names: [
            {
                arabic: "الرَّقِيبُ",
                pronunciation: "Ar-Raqib",
                meaning: "তত্ত্বাবধায়ক",
            },
            {
                arabic: "الْمُجِيبُ",
                pronunciation: "Al-Mujib",
                meaning: "সাড়া দানকারী",
            },
            { arabic: "الْوَاسِعُ", pronunciation: "Al-Wasi", meaning: "অসীম দাতা" },
        ],
    },
    16: {
        ayat: { surah: 49, ayah: 13 },
        hadith: "আল্লাহ তোমাদের চেহারা ও সম্পদের দিকে তাকান না, বরং তোমাদের অন্তর ও আমলের দিকে তাকান। (সহীহ মুসলিম: ২৫৬৪)",
        dua: {
            arabic: "اللَّهُمَّ حَاسِبْنِي حِسَابًا يَسِيرًا",
            meaning: "হে আল্লাহ! আমার হিসাব সহজ করে দিন।",
        },
        names: [
            {
                arabic: "الْحَكِيمُ",
                pronunciation: "Al-Hakim",
                meaning: "প্রজ্ঞাময়",
            },
            {
                arabic: "الْوَدُودُ",
                pronunciation: "Al-Wadud",
                meaning: "মহা প্রেমময়",
            },
            {
                arabic: "الْمَجِيدُ",
                pronunciation: "Al-Majid",
                meaning: "মহা মহিমান্বিত",
            },
        ],
    },
    17: {
        ayat: { surah: 65, ayah: 3 },
        hadith: "যদি তোমরা আল্লাহর উপর ঠিকমতো তাওয়াক্কুল করতে, তবে তিনি তোমাদের পাখিদের ন্যায় রিজিক দিতেন। (সুনানে তিরমিজি: ২৩৪৪)",
        dua: {
            arabic: "حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ",
            meaning: "আল্লাহই আমাদের জন্য যথেষ্ট এবং তিনি কতই না উত্তম কর্মবিধায়ক।",
        },
        names: [
            {
                arabic: "الْبَاعِثُ",
                pronunciation: "Al-Ba'ith",
                meaning: "পুনরুজ্জীবিতকারী",
            },
            {
                arabic: "الشَّكُورُ",
                pronunciation: "Ash-Shahid",
                meaning: "প্রত্যক্ষদর্শী",
            },
            { arabic: "الْحَقُّ", pronunciation: "Al-Haqq", meaning: "মহাসত্য" },
        ],
    },
    18: {
        ayat: { surah: 9, ayah: 105 },
        hadith: "আল্লাহ ঐ ব্যক্তিকে পছন্দ করেন, যে শ্রমের সাথে তার কাজ নিখুঁতভাবে করে। (আল-জামি আস-সাগীর: ১৮৯২)",
        dua: {
            arabic: "اللَّهُمَّ انْفَعْنِي بِمَا عَلَّمْتَنِي",
            meaning: "হে আল্লাহ! তুমি যা আমাকে শিখিয়েছ তা দিয়ে আমার উপকার করো।",
        },
        names: [
            {
                arabic: "الْوَكِيلُ",
                pronunciation: "Al-Wakil",
                meaning: "তত্ত্বাবধায়ক",
            },
            {
                arabic: "الْقَوِيُّ",
                pronunciation: "Al-Qawiy",
                meaning: "মহা শক্তিশালী",
            },
            { arabic: "الْمَتِينُ", pronunciation: "Al-Matin", meaning: "সুদৃঢ়" },
        ],
    },
    19: {
        ayat: { surah: 2, ayah: 22 },
        hadith: "পুরো পৃথিবী আমার জন্য মসজিদ ও পবিত্র বানানো হয়েছে। (সহীহ বুখারী: ৩৩৫)",
        dua: {
            arabic: "اللَّهُمَّ أَنْتَ السَّلَامُ وَمِنْكَ السَّلَامُ",
            meaning: "হে আল্লাহ! আপনিই শান্তি এবং আপনার থেকেই শান্তি আসে।",
        },
        names: [
            {
                arabic: "الْوَلِيُّ",
                pronunciation: "Al-Waliy",
                meaning: "বন্ধু/অভিভাবক",
            },
            { arabic: "الْحَمِيدُ", pronunciation: "Al-Hamid", meaning: "প্রশংসিত" },
            { arabic: "الْمُحْصِي", pronunciation: "Al-Muhsi", meaning: "হিসাবকারী" },
        ],
    },
    20: {
        ayat: { surah: 15, ayah: 9 },
        hadith: "কুরআন পাঠ করো, কারণ কিয়ামতের দিন এটি পাঠকারীর জন্য সুপারিশ করবে। (সহীহ মুসলিম: ৮০৪)",
        dua: {
            arabic: "اللَّهُمَّ اجْعَلِ الْقُرْآنَ رَبِيعَ قَلْبِي",
            meaning: "হে আল্লাহ! কুরআনকে আমার হৃদয়ের বসন্ত করে দাও।",
        },
        names: [
            {
                arabic: "الْمُبْدِئُ",
                pronunciation: "Al-Mubdi",
                meaning: "প্রথমবার সৃষ্টিকারী",
            },
            {
                arabic: "الْمُعِيدُ",
                pronunciation: "Al-Mu'id",
                meaning: "আবারও সৃষ্টিকারী",
            },
            {
                arabic: "الْمُحْيِي",
                pronunciation: "Al-Muhyi",
                meaning: "জীবনদানকারী",
            },
        ],
    },
    21: {
        ayat: { surah: 2, ayah: 152 },
        hadith: "আল্লাহ বলেন: আমি আমার বান্দার সাথে থাকি যখন সে আমাকে স্মরণ করে। (সহীহ বুখারী: ৭৪০৫)",
        dua: {
            arabic: "يَا حَيُّ يَا قَيُّومُ بِرَحْمَتِكَ أَسْتَغِيثُ",
            meaning: "হে চিরঞ্জীব! হে চিরবিরাজমান! আমি তোমার রহমতের মাধ্যমে সাহায্য চাচ্ছি।",
        },
        names: [
            {
                arabic: "الْمُمِيتُ",
                pronunciation: "Al-Mumit",
                meaning: "মৃত্যু দাতা",
            },
            { arabic: "الْحَيُّ", pronunciation: "Al-Hayy", meaning: "চিরঞ্জীব" },
            {
                arabic: "الْقَيُّومُ",
                pronunciation: "Al-Qayyum",
                meaning: "চিরস্থায়ী",
            },
        ],
    },
    22: {
        ayat: { surah: 33, ayah: 21 },
        hadith: "আমি উত্তম চরিত্র সম্পন্ন করার জন্যই প্রেরিত হয়েছি। (মুয়াত্তা মালিক: ১৬৩১)",
        dua: {
            arabic: "اللَّهُمَّ اهْدِنِي لِأَحْسَنِ الْأَخْلَاقِ",
            meaning: "হে আল্লাহ! আমাকে সর্বোত্তম চরিত্রের দিকে হেদায়েত দিন।",
        },
        names: [
            { arabic: "الْوَاجِدُ", pronunciation: "Al-Wajid", meaning: "প্রাপক" },
            {
                arabic: "الْمَاجِدُ",
                pronunciation: "Al-Majid",
                meaning: "মহা গৌরবময়",
            },
            {
                arabic: "الْوَاحِدُ",
                pronunciation: "Al-Wahid",
                meaning: "এক ও অদ্বিতীয়",
            },
        ],
    },
    23: {
        ayat: { surah: 51, ayah: 56 },
        hadith: "ইখলাসই হলো ইবাদতের প্রাণ। (আল-হাকিম)",
        dua: {
            arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْجَنَّةَ",
            meaning: "হে আল্লাহ! আমি তোমার কাছে জান্নাত প্রার্থনা করছি।",
        },
        names: [
            {
                arabic: "الصَّمَدُ",
                pronunciation: "As-Samad",
                meaning: "অমুখাপেক্ষী",
            },
            {
                arabic: "الْقَادِرُ",
                pronunciation: "Al-Qadir",
                meaning: "মহা শক্তিশালী",
            },
            {
                arabic: "الْمُقْتَدِرُ",
                pronunciation: "Al-Muqtadir",
                meaning: "সর্বশক্তিমান",
            },
        ],
    },
    24: {
        ayat: { surah: 7, ayah: 56 },
        hadith: "আল্লাহর রহমত তাঁর ক্রোধের উপর প্রবল হয়। (সহীহ বুখারী: ৩১৯৪)",
        dua: {
            arabic: "رَبَّنَا لا تُزِغْ قُلُوبَنَا بَعْدَ إِذْ হَدَيْتَنَا",
            meaning: "হে আমাদের প্রতিপালক! আমাদের হেদায়েত দেওয়ার পর আমাদের অন্তরকে পথভ্রষ্ট করবেন না।",
        },
        names: [
            {
                arabic: "الْمُقَدِّمُ",
                pronunciation: "Al-Muqaddim",
                meaning: "অগোচরকারী",
            },
            {
                arabic: "الْمُؤَخِّرُ",
                pronunciation: "Al-Mu'akhkhir",
                meaning: "পশ্চাৎবর্তীকারী",
            },
            { arabic: "الْأَوَّلُ", pronunciation: "Al-Awwal", meaning: "অনাদি" },
        ],
    },
    25: {
        ayat: { surah: 29, ayah: 69 },
        hadith: "সেই ব্যক্তিই প্রকৃত মুজাহিদ, যে তার নফসের বিরুদ্ধে জিহাদ করে। (সুনানে তিরমিজি: ১৬২১)",
        dua: {
            arabic: "اللَّهُمَّ تَقَبَّلْ تَوْبَتِي",
            meaning: "হে আল্লাহ! আমার তাওবা কবুল করুন।",
        },
        names: [
            { arabic: "الْآخِرُ", pronunciation: "Al-Akhir", meaning: "অনন্ত" },
            { arabic: "الظَّاهِرُ", pronunciation: "Az-Zahir", meaning: "প্রকাশ্য" },
            { arabic: "الْبَاطِنُ", pronunciation: "Al-Batin", meaning: "গুপ্ত" },
        ],
    },
    26: {
        ayat: { surah: 97, ayah: 3 },
        hadith: "যে ব্যক্তি লাইলাতুল কদরের রাতে ঈমানের সাথে ইবাদত করবে, তার অতীতের সব গুনাহ মাফ হবে। (সহীহ বুখারী: ১৯০১)",
        dua: {
            arabic: "اللَّهُمَّ إِنِّكَ عَفُوٌّ كَرِيمٌ تُحِبُّ الْعَفْوَ فَاعْفُ عَنِّي",
            meaning: "হে আল্লাহ! আপনি ক্ষমাশীল, আপনি ক্ষমা করতে ভালোবাসেন, অতএব আমাকে ক্ষমা করুন।",
        },
        names: [
            { arabic: "الْوَالِي", pronunciation: "Al-Wali", meaning: "অভিভাবক" },
            {
                arabic: "الْمُتَعَالِي",
                pronunciation: "Al-Muta'ali",
                meaning: "সর্বোচ্চ",
            },
            { arabic: "الْبَرُّ", pronunciation: "Al-Barr", meaning: "সদাচারী/দাতা" },
        ],
    },
    27: {
        ayat: { surah: 3, ayah: 92 },
        hadith: "দান বিপদ দূর করে এবং আয়ু বাড়ায়। (তিরমিজি)",
        dua: {
            arabic: "اللَّهُمَّ قِنِي عَذَابَكَ يَوْمَ تَبْعَثُ عِبَادَكَ",
            meaning: "হে আল্লাহ! যেদিন তুমি তোমার বান্দাদের পুনরুত্থিত করবে, সেদিন আমাকে তোমার আজাব থেকে রক্ষা করো।",
        },
        names: [
            {
                arabic: "التَّوَّابُ",
                pronunciation: "At-Tawwab",
                meaning: "তাওবা কবুলকারী",
            },
            {
                arabic: "الْمُنْتَقِمُ",
                pronunciation: "Al-Muntaqim",
                meaning: "প্রতিশোধ গ্রহণকারী",
            },
            {
                arabic: "الْعَفُوُّ",
                pronunciation: "Al-Afuww",
                meaning: "মার্জনাকারী",
            },
        ],
    },
    28: {
        ayat: { surah: 18, ayah: 46 },
        hadith: "মৃত্যুর পর তিনটি আমল ছাড়া সবকিছু বন্ধ হয়ে যায়: সদকায়ে জারিয়া, উপকারী জ্ঞান এবং নেক সন্তান। (সহীহ মুসলিম: ১৬৩১)",
        dua: {
            arabic: "اللَّهُمَّ أَحْسِنْ عَاقِبَتَنَا فِي الْأُمُورِ كُلِّهَا",
            meaning: "হে আল্লাহ! আমাদের প্রতিটি কাজের সমাপ্তি সুন্দর করুন।",
        },
        names: [
            {
                arabic: "الرَّؤُوفُ",
                pronunciation: "Ar-Ra'uf",
                meaning: "অত্যন্ত দয়ালু",
            },
            {
                arabic: "الْمُقْسِطُ",
                pronunciation: "Al-Muqsit",
                meaning: "ন্যায়নিষ্ঠ",
            },
            { arabic: "الْجَامِعُ", pronunciation: "Al-Jami", meaning: "একত্রকারী" },
        ],
    },
    29: {
        ayat: { surah: 108, ayah: 1 },
        hadith: "রমজানের শেষে মুক্তিপ্রাপ্তদের তালিকায় তোমার নাম লিখে দেওয়া হোক। (বায়হাকী)",
        dua: {
            arabic: "اللَّهُمَّ اخْتِمْ بِالصَّالِحَاتِ أَعْمَالَنَا",
            meaning: "হে আল্লাহ! নেক কাজের মাধ্যমে আমাদের আমলনামা শেষ করো।",
        },
        names: [
            {
                arabic: "الْغَنِيُّ",
                pronunciation: "Al-Ghani",
                meaning: "ঐশ্বর্যশালী",
            },
            {
                arabic: "الْمُغْنِي",
                pronunciation: "Al-Mughni",
                meaning: "প্রাচুর্য দানকারী",
            },
            { arabic: "الْمَانِعُ", pronunciation: "Al-Mani", meaning: "বারণকারী" },
        ],
    },
    30: {
        ayat: { surah: 15, ayah: 99 },
        hadith: "উৎসবের দিন (ঈদ) তোমাদের জন্য পুরস্কারের দিন। (তাবারানী)",
        dua: {
            arabic: "تَقَبَّلَ اللَّهُ مِنَّا وَمِنْكُمْ",
            meaning: "আল্লাহ আমাদের ও আপনাদের পক্ষ থেকে কবুল করুন। (ঈদ মোবারক!)",
        },
        names: [
            { arabic: "النَّافِعُ", pronunciation: "An-Nafi", meaning: "উপকারী" },
            { arabic: "النּُورُ", pronunciation: "An-Nur", meaning: "পরম জ্যোতি" },
            { arabic: "الْهَادِي", pronunciation: "Al-Hadi", meaning: "পথপ্রদর্শক" },
        ],
    },
};
/**
 * Helper function to retrieve content for a specific day of Ramadan.
 * @param day - Day of Ramadan (1 to 30)
 * @returns The content for the given day or null if out of range.
 */
const getRamadanDayContent = (day) => {
    if (day < 1 || day > 30)
        return null;
    return RAMADAN_CONTENT[day] || null;
};
exports.getRamadanDayContent = getRamadanDayContent;
//# sourceMappingURL=ramadanContent.js.map