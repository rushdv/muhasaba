import React, { useState, useEffect } from 'react';
import {
    Moon, BookOpen, Star, Save, ArrowLeft,
    CheckCircle2, Clock, Sparkles, Sunrise, Heart,
    ChevronLeft, ChevronRight, Activity, Book, Shield, Send, Smile,
    Check, Target, Coffee, Zap, MessageSquare, Compass
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getRamadanContent, upsertRamadanReport, getRamadanHistory } from '../api/ramadan';

const RamadanPlanner = () => {
    const navigate = useNavigate();
    const [day, setDay] = useState(1);
    const [content, setContent] = useState(null);
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    // Initial Form State
    const initialReport = {
        is_fasting: false,
        salah_fajr: false, salah_dhuhr: false, salah_asr: false, salah_maghrib: false, salah_isha: false,
        taraweeh: false, tahajjud: false, duha: false, tahiyatul_masjid: false, tahiyatul_wudu: false,
        sunnat_fajr: false, sunnat_dhuhr: false, sunnat_asr: false, sunnat_maghrib: false, sunnat_isha: false,
        quran_para: "", quran_page: "", quran_ayat: "", quran_progress: "",
        sokal_er_zikr: false, shondha_er_zikr: false, had_sadaqah: false, daily_task: false,
        jamaat_salat: false, istighfar_70: false, quran_translation: false,
        allahur_naam_shikkha: false, diner_ayat_shikkha: false, diner_hadith_shikkha: false,
        miswak: false, calling_relative: false, learning_new: false,
        spiritual_energy: 5, reflection_note: ""
    };

    const [report, setReport] = useState(initialReport);

    useEffect(() => {
        fetchInitialData();
    }, [day]);

    const fetchInitialData = async () => {
        setLoading(true);
        // Fetch public content (no auth required)
        try {
            const contentRes = await getRamadanContent(day);
            setContent(contentRes);
        } catch (err) {
            console.error("Failed to fetch spiritual content:", err);
            setContent(null);
        }

        // Fetch user history (requires auth)
        try {
            const historyRes = await getRamadanHistory();
            setHistory(historyRes);
            const existing = historyRes.find(r => r.day_number === day);
            if (existing) {
                setReport({ ...initialReport, ...existing });
            } else {
                setReport({ ...initialReport, day_number: day });
            }
        } catch (err) {
            console.error("Failed to fetch history:", err);
            setReport({ ...initialReport, day_number: day });
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const payload = { ...report, day_number: day };
            payload.quran_para = payload.quran_para ? parseInt(payload.quran_para) : null;
            payload.quran_page = payload.quran_page ? parseInt(payload.quran_page) : null;
            payload.quran_ayat = payload.quran_ayat ? parseInt(payload.quran_ayat) : null;

            await upsertRamadanReport(payload);
            await fetchInitialData();
            // Using a more subtle animation or toast would be better, but keeping it simple for now
        } catch (err) {
            console.error(err);
        } finally {
            setSaving(false);
        }
    };

    const toggleField = (field) => setReport(prev => ({ ...prev, [field]: !prev[field] }));

    if (loading) return (
        <div className="min-h-screen bg-marfil flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-gold-soft border-t-transparent rounded-full animate-spin" />
        </div>
    );

    return (
        <div className="min-h-screen bg-marfil celestial-pattern font-sans pb-24 text-emerald-950">
            {/* Header / Nav */}
            <header className="sticky top-0 z-50 bg-marfil/80 backdrop-blur-2xl border-b border-gold-soft/10 px-6 md:px-8 py-4 md:py-5">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <button onClick={() => navigate('/dashboard')} className="group flex items-center gap-3 text-emerald-900 font-bold">
                        <div className="p-2 transition-transform group-hover:-translate-x-1 bg-white rounded-xl shadow-sm border border-gold-soft/20">
                            <ArrowLeft size={18} />
                        </div>
                        <span className="hidden md:inline uppercase tracking-widest text-[10px] text-gold-rich">Back to Hub</span>
                    </button>

                    <div className="flex items-center gap-2 md:gap-8">
                        <button onClick={() => setDay(d => Math.max(1, d - 1))} className="p-1 md:p-2 hover:bg-gold-soft/10 rounded-xl transition-colors">
                            <ChevronLeft size={20} className="text-gold-rich md:w-6" />
                        </button>
                        <div className="px-4 md:px-8 py-1.5 md:py-2 bg-emerald-950 text-white rounded-xl md:rounded-2xl shadow-xl flex flex-col items-center border border-gold-soft/20 min-w-[100px] md:min-w-[140px]">
                            <span className="text-[7px] md:text-[10px] uppercase font-bold tracking-[0.2em] md:tracking-[0.3em] text-gold-soft mb-0.5 md:mb-1">Ramadan Journey</span>
                            <h1 className="text-sm md:text-2xl font-serif font-bold italic tracking-wider leading-none">Day {day.toString().padStart(2, '0')}</h1>
                        </div>
                        <button onClick={() => setDay(d => Math.min(30, d + 1))} className="p-1 md:p-2 hover:bg-gold-soft/10 rounded-xl transition-colors">
                            <ChevronRight size={20} className="text-gold-rich md:w-6" />
                        </button>
                    </div>

                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="celestial-button flex items-center gap-3 group px-6 md:px-8 py-3 md:py-4 transition-all hover:scale-[1.02] border-gold-soft/30"
                    >
                        {saving ? (
                            <div className="w-5 h-5 border-2 border-marfil border-t-transparent rounded-full animate-spin" />
                        ) : (
                            <>
                                <Save size={18} className="transition-transform group-hover:scale-110" />
                                <span className="hidden sm:inline uppercase tracking-widest text-[11px]">Save Effort</span>
                            </>
                        )}
                    </button>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 md:px-6 mt-6 md:mt-12 grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">

                {/* LEFT COLUMN: Spiritual Content */}
                <aside className="lg:col-span-4 space-y-8">
                    {/* Daily Ayat */}
                    <section className="celestial-card p-8 md:p-10 relative overflow-hidden group">
                        <div className="absolute -top-10 -right-10 opacity-[0.03] transition-transform duration-1000 group-hover:rotate-12">
                            <Compass size={280} />
                        </div>
                        <header className="flex items-center gap-3 mb-8">
                            <div className="w-10 h-10 rounded-full bg-gold-soft/10 flex items-center justify-center text-gold-rich">
                                <BookOpen size={20} />
                            </div>
                            <h2 className="text-xs uppercase font-bold tracking-widest text-gold-rich">Verse of the Day</h2>
                        </header>
                        <div className="space-y-6 relative z-10">
                            <p className="text-2xl md:text-3xl font-serif leading-relaxed text-right text-emerald-900/90" dir="rtl">
                                {content?.ayat?.arabic}
                            </p>
                            {content?.ayat?.meaning && (
                                <p className="text-sm italic leading-relaxed text-emerald-800 font-medium">
                                    "{content?.ayat?.meaning}"
                                </p>
                            )}
                        </div>
                    </section>

                    {/* Al-Asmaul Husna */}
                    <section className="celestial-card p-0 overflow-hidden bg-emerald-950 text-marfil border-none">
                        <header className="p-8 border-b border-white/5 flex items-center justify-between">
                            <h2 className="text-marfil text-[10px] uppercase font-bold tracking-[0.4em]">Divine Attributes</h2>
                            <Sparkles size={16} className="text-gold-soft" />
                        </header>
                        <div className="p-8 space-y-8">
                            {content?.names?.map((name, i) => (
                                <div key={i} className="flex items-center justify-between group">
                                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-gold-soft font-serif text-lg">
                                        {i + 1}
                                    </div>
                                    <div className="flex-1 px-6">
                                        <p className="text-sm font-bold text-emerald-100 mb-0.5">{name.meaning}</p>
                                        <p className="text-[10px] uppercase tracking-widest opacity-40 font-bold">{name.pronunciation}</p>
                                    </div>
                                    <p className="text-2xl font-serif text-gold-soft group-hover:scale-110 transition-transform duration-500" dir="rtl">
                                        {name.arabic}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Hadith Section */}
                    <section className="celestial-card p-8 bg-gold-soft/5 border-gold-soft/20">
                        <header className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-full bg-emerald-950/10 flex items-center justify-center text-emerald-900">
                                <Smile size={20} />
                            </div>
                            <h2 className="text-xs uppercase font-bold tracking-widest text-emerald-900/60">Prophetic Tradition</h2>
                        </header>
                        {content?.hadith && (
                            <p className="text-sm text-emerald-900 font-medium italic leading-relaxed">
                                "{content?.hadith}"
                            </p>
                        )}
                    </section>

                    {/* Sacred Dua Section */}
                    <section className="celestial-card p-8 bg-white border-gold-soft/10">
                        <header className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-full bg-gold-soft/10 flex items-center justify-center text-gold-rich">
                                <Star size={20} />
                            </div>
                            <h2 className="text-xs uppercase font-bold tracking-widest text-gold-rich">Sacred Invocation</h2>
                        </header>
                        {(content?.dua?.arabic || content?.dua?.meaning) && (
                            <div className="space-y-4">
                                {content?.dua?.arabic && (
                                    <p className="text-xl md:text-2xl font-serif text-right text-emerald-900" dir="rtl">
                                        {content?.dua?.arabic}
                                    </p>
                                )}
                                {content?.dua?.meaning && (
                                    <p className="text-sm italic font-medium text-emerald-800 leading-relaxed border-l-2 border-gold-soft/30 pl-4">
                                        {content?.dua?.meaning}
                                    </p>
                                )}
                            </div>
                        )}
                    </section>
                </aside>

                {/* RIGHT COLUMN: Interactive Trackers */}
                <div className="lg:col-span-8 space-y-8">

                    {/* TOP STATS: Quick glance */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <article className="celestial-card p-8 flex items-center gap-6">
                            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 ${report.is_fasting ? 'bg-emerald-900 text-gold-soft shadow-lg' : 'bg-emerald-50 text-emerald-300'}`}>
                                <Zap size={32} />
                            </div>
                            <div>
                                <h3 className="text-xs uppercase font-bold tracking-widest text-gold-rich mb-2">Fasting Status</h3>
                                <button
                                    onClick={() => toggleField('is_fasting')}
                                    className={`px-6 py-2 rounded-xl text-xs font-bold transition-all ${report.is_fasting ? 'bg-gold-soft text-white shadow-md' : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'}`}
                                >
                                    {report.is_fasting ? 'Currently Fasting' : 'Mark as Fasting'}
                                </button>
                            </div>
                        </article>

                        <article className="celestial-card p-8 flex items-center gap-6">
                            <div className="w-16 h-16 rounded-2xl bg-amber-50 flex items-center justify-center text-gold-rich">
                                <Heart size={32} fill="currentColor" opacity={0.1} />
                            </div>
                            <div>
                                <h3 className="text-xs uppercase font-bold tracking-widest text-gold-rich mb-2">Spiritual Energy</h3>
                                <div className="flex gap-2">
                                    {[1, 2, 3, 4, 5, 6, 7].map(lvl => (
                                        <div
                                            key={lvl}
                                            onClick={() => setReport({ ...report, spiritual_energy: lvl })}
                                            className={`w-4 h-10 rounded-full cursor-pointer transition-all ${lvl <= report.spiritual_energy ? 'bg-gold-soft shadow-gold-glow' : 'bg-gold-soft/10'}`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </article>
                    </div>

                    {/* MAIN GRID: Prayers & Quran */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                        {/* Salat Tracker */}
                        <section className="celestial-card p-8">
                            <header className="flex justify-between items-center mb-8 border-b border-gold-soft/10 pb-4">
                                <h2 className="font-serif text-xl font-bold flex items-center gap-2">
                                    <Target size={20} className="text-gold-rich" />
                                    <span>Salat Tracker</span>
                                </h2>
                                <div className="flex gap-4 text-[9px] font-bold uppercase tracking-widest text-emerald-400">
                                    <span>Fardh</span>
                                    <span>Sunnah</span>
                                </div>
                            </header>
                            <div className="space-y-4">
                                {[
                                    { id: 'salah_fajr', label: 'Fajr', s: true },
                                    { id: 'salah_dhuhr', label: 'Dhuhr', s: true },
                                    { id: 'salah_asr', label: 'Asr', s: true },
                                    { id: 'salah_maghrib', label: 'Maghrib', s: true },
                                    { id: 'salah_isha', label: 'Isha', s: true },
                                    { id: 'taraweeh', label: 'Taraweeh', voluntary: true },
                                    { id: 'tahajjud', label: 'Tahajjud', voluntary: true },
                                    { id: 'duha', label: 'Duha', voluntary: true },
                                    { id: 'tahiyatul_masjid', label: 'Tahiyatul Masjid', voluntary: true },
                                    { id: 'tahiyatul_wudu', label: 'Tahiyatul Wudu', voluntary: true }
                                ].map((p) => (
                                    <div key={p.id} className="flex items-center justify-between p-2 rounded-xl hover:bg-gold-soft/5 transition-colors">
                                        <span className="text-sm font-semibold tracking-wide text-emerald-900/80">{p.label}</span>
                                        <div className="flex gap-12">
                                            {!p.voluntary ? (
                                                <MinimalCheckbox
                                                    active={report[p.id]}
                                                    onClick={() => toggleField(p.id)}
                                                />
                                            ) : <div className="w-6 h-6" />}

                                            {p.s ? (
                                                <MinimalCheckbox
                                                    active={report[p.id.replace('salah_', 'sunnat_')]}
                                                    onClick={() => toggleField(p.id.replace('salah_', 'sunnat_'))}
                                                    color="gold"
                                                />
                                            ) : p.voluntary ? (
                                                <MinimalCheckbox
                                                    active={report[p.id]}
                                                    onClick={() => toggleField(p.id)}
                                                    color="gold"
                                                />
                                            ) : <div className="w-6 h-6" />}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Quran Consistency */}
                        <section className="space-y-8">
                            <div className="celestial-card p-8 border-t-4 border-gold-soft">
                                <header className="mb-8">
                                    <h2 className="font-serif text-xl font-bold flex items-center gap-2 italic">
                                        <Book size={20} className="text-gold-rich" /> Quran Progress
                                    </h2>
                                </header>
                                <div className="grid grid-cols-3 gap-3 md:gap-4 mb-6 md:mb-8">
                                    <LegacyInput label="Para" value={report.quran_para} onChange={v => setReport({ ...report, quran_para: v })} />
                                    <LegacyInput label="Page" value={report.quran_page} onChange={v => setReport({ ...report, quran_page: v })} />
                                    <LegacyInput label="Ayat" value={report.quran_ayat} onChange={v => setReport({ ...report, quran_ayat: v })} />
                                </div>
                                <textarea
                                    className="w-full bg-emerald-50/50 border border-gold-soft/10 rounded-2xl p-4 text-sm outline-none focus:ring-2 focus:ring-gold-soft/20 resize-none h-24 placeholder:text-emerald-300 font-medium"
                                    placeholder="Brief reflection on today's recitation..."
                                    value={report.quran_progress || ""}
                                    onChange={e => setReport({ ...report, quran_progress: e.target.value })}
                                />
                            </div>

                            {/* Checklist */}
                            <div className="celestial-card p-8 group relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-4 opacity-[0.05] group-hover:scale-110 transition-transform duration-700">
                                    <Check size={80} className="text-gold-rich" />
                                </div>
                                <h2 className="font-serif text-xl font-bold mb-6 italic">Daily Sunnah</h2>
                                <div className="grid grid-cols-1 gap-4">
                                    {[
                                        { id: 'sokal_er_zikr', label: 'Morning Adhkar' },
                                        { id: 'shondha_er_zikr', label: 'Evening Adhkar' },
                                        { id: 'had_sadaqah', label: 'Charity / Kind Act' },
                                        { id: 'jamaat_salat', label: 'Prayer in Jamaat' },
                                        { id: 'istighfar_70', label: 'Istighfar (70+ times)' },
                                        { id: 'diner_ayat_shikkha', label: 'Learn Verse of the Day' },
                                        { id: 'diner_hadith_shikkha', label: 'Learn Hadith of the Day' },
                                        { id: 'allahur_naam_shikkha', label: 'Learn Names of Allah' },
                                        { id: 'miswak', label: 'Sunnah Miswak' }
                                    ].map(item => (
                                        <label key={item.id} className="flex items-center gap-4 cursor-pointer group/item">
                                            <div
                                                onClick={() => toggleField(item.id)}
                                                className={`w-5 h-5 rounded-lg border flex items-center justify-center transition-all ${report[item.id] ? 'bg-gold-soft border-gold-soft text-white' : 'border-gold-soft/30 group-hover/item:border-gold-soft'}`}
                                            >
                                                {report[item.id] && <Check size={12} strokeWidth={4} />}
                                            </div>
                                            <span className={`text-sm font-medium transition-colors ${report[item.id] ? 'text-emerald-900' : 'text-emerald-700/60'}`}>
                                                {item.label}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Reflection Box */}
                    <section className="celestial-card p-8 md:p-10 bg-gradient-to-br from-white to-gold-soft/5 border-gold-soft/10">
                        <header className="flex items-center justify-between mb-8">
                            <h2 className="font-serif text-2xl font-bold italic tracking-tight flex items-center gap-3">
                                <MessageSquare size={24} className="text-gold-rich" />
                                <span>Soul’s Reflection</span>
                            </h2>
                            <div className="px-4 py-1.5 rounded-full bg-gold-soft/10 text-gold-rich text-[10px] font-bold uppercase tracking-widest">
                                Private Note
                            </div>
                        </header>
                        <textarea
                            className="w-full h-40 bg-transparent border-none p-0 text-lg text-emerald-900 focus:ring-0 outline-none resize-none placeholder:text-emerald-900/20 font-serif italic italic leading-relaxed"
                            placeholder="What did your heart experience today? Any victories or areas for growth?"
                            value={report.reflection_note || ""}
                            onChange={e => setReport({ ...report, reflection_note: e.target.value })}
                        />
                    </section>

                    {/* 30 DAYS JOURNEY TIMELINE */}
                    <section className="celestial-card p-8 md:p-10 mt-12 overflow-hidden relative">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold-soft/30 to-transparent" />
                        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                            <div>
                                <h2 className="font-serif text-2xl font-bold italic text-emerald-950 mb-1">30 Days Journey</h2>
                                <p className="text-[10px] uppercase font-bold tracking-[0.3em] text-gold-rich opacity-60">Digital Spiritual Timeline</p>
                            </div>
                            <div className="flex items-center gap-4 text-[9px] font-bold uppercase tracking-widest">
                                <div className="w-2.5 h-2.5 rounded-full bg-gold-rich shadow-[0_0_8px_rgba(163,124,53,0.4)]" />
                                <span>Completed</span>
                                <div className="w-2.5 h-2.5 rounded-full bg-emerald-900/5" />
                                <span className="opacity-40">Pending</span>
                            </div>
                        </header>

                        <div className="overflow-x-auto pb-4 scrollbar-hide">
                            <div className="grid grid-cols-6 sm:grid-cols-10 md:grid-cols-6 lg:grid-cols-10 gap-2 md:gap-3">
                                {Array.from({ length: 30 }, (_, i) => i + 1).map(d => {
                                    const isCompleted = history.some(r => r.day_number === d);
                                    const isCurrent = day === d;
                                    return (
                                        <button
                                            key={d}
                                            onClick={() => setDay(d)}
                                            className={`
                                                aspect-square rounded-xl md:rounded-2xl flex flex-col items-center justify-center transition-all duration-500 relative group
                                                ${isCompleted
                                                    ? 'bg-gold-rich text-white shadow-lg shadow-gold-rich/20'
                                                    : 'bg-emerald-900/5 text-emerald-900/30'}
                                                ${isCurrent
                                                    ? 'ring-2 ring-gold-soft ring-offset-4 ring-offset-marfil scale-105 z-10'
                                                    : 'hover:scale-105 active:scale-95'}
                                            `}
                                        >
                                            <span className={`text-[10px] md:text-xs font-bold ${isCompleted ? 'opacity-100' : 'opacity-40'}`}>
                                                {d.toString().padStart(2, '0')}
                                            </span>
                                            {isCompleted && <div className="w-1 h-1 rounded-full bg-white mt-0.5 shadow-sm opacity-60" />}

                                            {/* Minimal Tooltip for Desktop */}
                                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-emerald-950 text-white text-[8px] font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-20 uppercase tracking-[0.2em]">
                                                Day {d}
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
};

// UI ATOMS
const MinimalCheckbox = ({ active, onClick, color = 'emerald' }) => (
    <button
        onClick={onClick}
        className={`w-6 h-6 rounded-xl border-2 transition-all duration-300 flex items-center justify-center ${active
            ? (color === 'emerald' ? 'bg-emerald-900 border-emerald-900 text-marfil' : 'bg-gold-soft border-gold-soft text-marfil shadow-lg shadow-gold-button')
            : 'border-gold-soft/10 bg-white hover:border-gold-soft/30'}`}
    >
        {active && <Check size={14} strokeWidth={3} />}
    </button>
);

const LegacyInput = ({ label, value, onChange }) => (
    <div className="space-y-2">
        <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-emerald-900/40 ml-1">{label}</label>
        <input
            type="number"
            value={value || ""}
            onChange={e => onChange(e.target.value)}
            className="w-full bg-white border border-gold-soft/10 p-3 md:p-4 rounded-xl md:rounded-2xl text-center text-lg font-serif font-bold focus:ring-2 focus:ring-gold-soft/20 outline-none transition-all placeholder:text-gold-soft/10"
            placeholder="—"
        />
    </div>
);

export default RamadanPlanner;
