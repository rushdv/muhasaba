import React, { useState, useEffect } from 'react';
import {
    Moon, BookOpen, Star, Save, ArrowLeft,
    CheckCircle2, Clock, Sparkles, Sunrise, Heart,
    ChevronLeft, ChevronRight, Activity, Book, Shield, Send
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
        taraweeh: false, tahajjud: false, duha: false,
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
        try {
            const [contentRes, historyRes] = await Promise.all([
                getRamadanContent(day),
                getRamadanHistory()
            ]);
            setContent(contentRes);
            setHistory(historyRes);

            const existing = historyRes.find(r => r.day_number === day);
            if (existing) {
                setReport({ ...initialReport, ...existing });
            } else {
                setReport({ ...initialReport, day_number: day });
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const payload = { ...report, day_number: day };
            // Ensure numeric fields are numbers or null
            payload.quran_para = payload.quran_para ? parseInt(payload.quran_para) : null;
            payload.quran_page = payload.quran_page ? parseInt(payload.quran_page) : null;
            payload.quran_ayat = payload.quran_ayat ? parseInt(payload.quran_ayat) : null;

            await upsertRamadanReport(payload);
            await fetchInitialData();
            alert("সফলভাবে সেভ করা হয়েছে!");
        } catch (err) {
            alert("সেভ করতে সমস্যা হয়েছে।");
        } finally {
            setSaving(false);
        }
    };

    const toggleField = (field) => setReport(prev => ({ ...prev, [field]: !prev[field] }));

    if (loading) return (
        <div className="min-h-screen bg-parchment flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-emerald-800 border-t-transparent rounded-full animate-spin" />
        </div>
    );

    return (
        <div className="min-h-screen bg-parchment islamic-pattern font-sans pb-20 text-emerald-950">
            {/* Nav Header */}
            <nav className="bg-white/80 backdrop-blur-lg border-b border-emerald-100 px-6 py-4 flex justify-between items-center sticky top-0 z-50">
                <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 text-emerald-800 font-bold hover:text-emerald-600 transition-colors">
                    <ArrowLeft size={18} /> ড্যাশবোর্ড
                </button>
                <div className="flex items-center gap-6">
                    <button onClick={() => setDay(d => Math.max(1, d - 1))} className="p-1 hover:bg-emerald-50 rounded-full"><ChevronLeft /></button>
                    <div className="text-center">
                        <p className="text-[10px] uppercase tracking-widest font-bold opacity-60">Ramadan</p>
                        <p className="font-serif font-bold text-xl leading-none">Day {day}</p>
                    </div>
                    <button onClick={() => setDay(d => Math.min(30, d + 1))} className="p-1 hover:bg-emerald-50 rounded-full"><ChevronRight /></button>
                </div>
                <button onClick={handleSave} disabled={saving} className="bg-emerald-800 text-white px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 hover:bg-emerald-900 transition-all shadow-md">
                    {saving ? "সেভ হচ্ছে..." : <><Save size={16} /> সেভ করুন</>}
                </button>
            </nav>

            <div className="max-w-6xl mx-auto px-4 mt-8 space-y-8">

                {/* 1. Inspiration Hub - Knowledge Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Diner Ayat */}
                    <div className="planner-card border-l-8 border-emerald-800 p-8 shadow-sm">
                        <h3 className="text-sm font-bold text-emerald-700 mb-4 flex items-center gap-2 uppercase tracking-wide border-b border-emerald-100 pb-2">
                            দিনের আয়াত
                        </h3>
                        <div className="space-y-4">
                            <p className="text-2xl font-serif text-right leading-relaxed rtl">{content?.ayat?.arabic}</p>
                            <p className="text-sm italic leading-relaxed text-emerald-900/80">{content?.ayat?.meaning}</p>
                        </div>
                    </div>

                    {/* Diner Hadith */}
                    <div className="planner-card border-l-8 border-amber-600 p-8 shadow-sm">
                        <h3 className="text-sm font-bold text-amber-700 mb-4 flex items-center gap-2 uppercase tracking-wide border-b border-amber-100 pb-2">
                            দিনের হাদিস
                        </h3>
                        <p className="text-sm leading-relaxed text-emerald-900/90">{content?.hadith}</p>
                    </div>
                </div>

                {/* 2. Dua & Allahur Naam */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Diner Dua */}
                    <div className="lg:col-span-2 planner-card p-8 shadow-sm relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-5"><Moon size={100} /></div>
                        <h3 className="text-sm font-bold text-emerald-700 mb-4 uppercase tracking-wide border-b border-emerald-100 pb-2">দিনের দুয়া</h3>
                        <div className="space-y-4 relative z-10">
                            <p className="text-2xl font-serif text-emerald-900 leading-relaxed rtl">{content?.dua?.arabic}</p>
                            <p className="text-sm italic opacity-80">{content?.dua?.meaning}</p>
                        </div>
                    </div>

                    {/* Allahur Naam */}
                    <div className="planner-card p-8 bg-emerald-900 text-parchment border-none shadow-xl">
                        <h3 className="text-sm font-bold text-emerald-200 mb-6 uppercase tracking-widest text-center border-b border-white/20 pb-2">আল-আসমাউল হুসনা</h3>
                        <div className="space-y-6">
                            {content?.names?.map((name, i) => (
                                <div key={i} className="flex justify-between items-center group">
                                    <div className="text-right flex-1">
                                        <p className="text-xl font-serif mb-1">{name.arabic}</p>
                                        <p className="text-[10px] uppercase tracking-tighter opacity-70 leading-relaxed font-bold transition-all transition-all">{name.pronunciation}</p>
                                    </div>
                                    <div className="w-px h-10 bg-white/20 mx-4" />
                                    <div className="flex-1 text-left">
                                        <p className="text-sm font-bold text-emerald-100 leading-relaxed font-bold transition-all transition-all">{name.meaning}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 3. Main Trackers - The Grid System */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                    {/* SALAT TRACKER (6 / 12) */}
                    <div className="lg:col-span-6 planner-card p-0 overflow-hidden shadow-lg border-t-4 border-emerald-800">
                        <div className="bg-emerald-50 px-6 py-4 border-b border-emerald-100 flex justify-between items-center">
                            <h3 className="font-serif font-bold text-emerald-900 text-lg">সালাত ট্র্যাকার</h3>
                            <div className="flex gap-4 text-[10px] font-bold uppercase tracking-widest text-emerald-600 leading-relaxed font-bold transition-all transition-all">
                                <span>ফরজ</span>
                                <span>সুন্নত/নফল</span>
                            </div>
                        </div>
                        <div className="divide-y divide-emerald-50">
                            {[
                                { id: 'fajr', label: 'ফজর', sunnat: true },
                                { id: 'dhuhr', label: 'যোহর', sunnat: true },
                                { id: 'asr', label: 'আসর', sunnat: true },
                                { id: 'maghrib', label: 'মাগরিব', sunnat: true },
                                { id: 'isha', label: 'এশা', sunnat: true },
                                { id: 'taraweeh', label: 'তারাবিহ', sunnat: false },
                                { id: 'tahajjud', label: 'তাহাজ্জুদ', sunnat: false },
                                { id: 'duha', label: 'দুহা', sunnat: false }
                            ].map((s) => (
                                <div key={s.id} className="flex items-center justify-between px-6 py-3 hover:bg-emerald-50/30 transition-colors">
                                    <span className="text-sm font-bold text-emerald-800 leading-relaxed font-bold transition-all transition-all">{s.label}</span>
                                    <div className="flex gap-10">
                                        <FormCheckbox checked={report[`salah_${s.id}`]} onClick={() => toggleField(`salah_${s.id}`)} />
                                        <div className="w-14 flex justify-center">
                                            {s.sunnat ? (
                                                <FormCheckbox checked={report[`sunnat_${s.id}`]} onClick={() => toggleField(`sunnat_${s.id}`)} variant="amber" />
                                            ) : <div className="w-6 h-6" />}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* QURAN & CHECKLIST (6 / 12) */}
                    <div className="lg:col-span-6 space-y-6">
                        {/* Quran Tracker */}
                        <div className="planner-card p-8 border-t-4 border-amber-600 shadow-md">
                            <h3 className="font-serif font-bold text-emerald-900 text-lg mb-6 flex items-center gap-2 italic">
                                <BookOpen size={20} className="text-amber-600" /> কোরআন ট্র্যাকার
                            </h3>
                            <div className="grid grid-cols-3 gap-4 mb-6">
                                <FormInput label="আয়াত" value={report.quran_ayat} onChange={v => setReport({ ...report, quran_ayat: v })} placeholder="0" />
                                <FormInput label="পৃষ্ঠা" value={report.quran_page} onChange={v => setReport({ ...report, quran_page: v })} placeholder="0" />
                                <FormInput label="পারা" value={report.quran_para} onChange={v => setReport({ ...report, quran_para: v })} placeholder="0" />
                            </div>
                            <input
                                className="w-full bg-emerald-50 border-emerald-100 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-800 outline-none placeholder:text-emerald-300 font-bold leading-relaxed transition-all transition-all"
                                placeholder="আরও বিস্তারিত (উদা: সুরা নাস)"
                                value={report.quran_progress || ""}
                                onChange={e => setReport({ ...report, quran_progress: e.target.value })}
                            />
                        </div>

                        {/* Daily Checklist */}
                        <div className="planner-card p-8 shadow-md">
                            <h3 className="font-serif font-bold text-emerald-900 text-lg mb-6 flex items-center gap-2 italic leading-relaxed font-bold transition-all transition-all">
                                <Activity size={20} className="text-emerald-700" /> দৈনিক চেকলিস্ট
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                                <CheckItem label="সকালের জিকির" checked={report.sokal_er_zikr} onToggle={() => toggleField('sokal_er_zikr')} />
                                <CheckItem label="সন্ধ্যার জিকির" checked={report.shondha_er_zikr} onToggle={() => toggleField('shondha_er_zikr')} />
                                <CheckItem label="দান-সদাহ" checked={report.had_sadaqah} onToggle={() => toggleField('had_sadaqah')} />
                                <CheckItem label="দিনের বিশেষ কাজ" checked={report.daily_task} onToggle={() => toggleField('daily_task')} />
                                <CheckItem label="জামায়াতে নামাজ" checked={report.jamaat_salat} onToggle={() => toggleField('jamaat_salat')} />
                                <CheckItem label="ইস্তেغফার (৭০+)" checked={report.istighfar_70} onToggle={() => toggleField('istighfar_70')} />
                                <CheckItem label="কোরআন অনুবাদ পড়া" checked={report.quran_translation} onToggle={() => toggleField('quran_translation')} />
                                <CheckItem label="আল্লাহর নাম দেখা" checked={report.allahur_naam_shikkha} onToggle={() => toggleField('allahur_naam_shikkha')} />
                                <CheckItem label="দিনের আয়াত দেখা" checked={report.diner_ayat_shikkha} onToggle={() => toggleField('diner_ayat_shikkha')} />
                                <CheckItem label="দিনের হাদিস দেখা" checked={report.diner_hadith_shikkha} onToggle={() => toggleField('diner_hadith_shikkha')} />
                                <CheckItem label="মিসওয়াক করা" checked={report.miswak} onToggle={() => toggleField('miswak')} />
                                <CheckItem label="আত্মীয়কে কল করা" checked={report.calling_relative} onToggle={() => toggleField('calling_relative')} />
                                <CheckItem label="নতুন কিছু শেখা" checked={report.learning_new} onToggle={() => toggleField('learning_new')} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* 4. Reflection Area */}
                <div className="planner-card p-8 shadow-sm">
                    <h3 className="font-serif font-bold text-emerald-900 text-lg mb-4 flex items-center gap-2 italic">
                        <Smile size={20} className="text-emerald-600" /> আজকের প্রাপ্তি ও বিশেষ অর্জন
                    </h3>
                    <textarea
                        className="w-full h-32 bg-emerald-50/50 border border-emerald-100 rounded-2xl p-6 text-emerald-900 focus:ring-2 focus:ring-emerald-800 outline-none resize-none leading-relaxed leading-relaxed font-medium transition-all"
                        placeholder="আপনার আধ্যাত্মিক উন্নতির কথা এখানে লিখুন..."
                        value={report.reflection_note || ""}
                        onChange={e => setReport({ ...report, reflection_note: e.target.value })}
                    />
                </div>

            </div>
        </div>
    );
};

// Internal Sub-Components
const FormCheckbox = ({ checked, onClick, variant = 'emerald' }) => (
    <button
        onClick={onClick}
        className={`w-6 h-6 rounded flex items-center justify-center transition-all ${checked
                ? (variant === 'emerald' ? 'bg-emerald-800 text-white' : 'bg-amber-600 text-white')
                : 'border-2 border-emerald-100 bg-white hover:border-emerald-300'
            }`}
    >
        {checked && <CheckCircle2 size={16} />}
    </button>
);

const CheckItem = ({ label, checked, onToggle }) => (
    <div className="flex items-center gap-3 group cursor-pointer" onClick={onToggle}>
        <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${checked ? 'bg-emerald-800 border-emerald-800 text-white' : 'border-emerald-200 group-hover:border-emerald-400'}`}>
            {checked && <CheckCircle2 size={12} />}
        </div>
        <span className={`text-[13px] font-medium leading-relaxed font-medium transition-all ${checked ? 'text-emerald-900' : 'text-emerald-700 opacity-80'}`}>{label}</span>
    </div>
);

const FormInput = ({ label, value, onChange, placeholder }) => (
    <div>
        <label className="text-[10px] uppercase tracking-widest font-bold text-emerald-600 mb-1 block leading-relaxed font-bold transition-all transition-all">{label}</label>
        <input
            type="number"
            value={value || ""}
            onChange={e => onChange(e.target.value)}
            className="w-full bg-emerald-50 border-emerald-100 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-800 outline-none font-bold"
            placeholder={placeholder}
        />
    </div>
);

export default RamadanPlanner;