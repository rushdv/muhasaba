import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRamadanAnalytics } from '../api/ramadan';
import { Sparkles, ArrowLeft, Star, Heart, Book, Activity, Moon, Compass, ChevronRight } from 'lucide-react';
import ThemeToggle from '../components/ThemeToggle';
import IslamicLogo from '../components/IslamicLogo';

const RamadanWrapped = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        getRamadanAnalytics().then(setData).finally(() => setLoading(false));
    }, []);

    if (loading) return (
        <div className="min-h-screen bg-transparent flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-gold-soft border-t-transparent rounded-full animate-spin" />
        </div>
    );

    return (
        <div className="min-h-screen bg-transparent font-sans pb-24 text-slate-950 dark:text-slate-50 transition-colors duration-1000">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-white/20 dark:bg-obsidian-950/20 backdrop-blur-[40px] border-b border-gold-soft/10 px-4 md:px-8 py-4 md:py-5">
                <div className="max-w-5xl mx-auto flex justify-between items-center gap-2">
                    <button onClick={() => navigate('/dashboard')} className="group flex items-center gap-3 text-slate-900 dark:text-slate-50 font-bold">
                        <div className="p-2 transition-transform group-hover:-translate-x-1 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gold-soft/20">
                            <ArrowLeft size={18} />
                        </div>
                        <span className="hidden md:inline uppercase tracking-widest text-[10px] text-gold-rich">Dashboard</span>
                    </button>

                    <div className="flex items-center gap-3">
                        <IslamicLogo size={20} className="text-gold-soft" />
                        <h1 className="text-xl font-serif font-bold italic tracking-wider">Ramadan Insights</h1>
                    </div>

                    <ThemeToggle />
                </div>
            </header>

            <main className="max-w-5xl mx-auto px-4 md:px-6 mt-10 md:mt-16 space-y-12 md:space-y-16">
                {/* Hero Section */}
                <section className="text-center relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] dark:opacity-[0.05] -z-10">
                        <Compass size={window.innerWidth < 768 ? 300 : 400} />
                    </div>
                    <p className="text-[10px] uppercase font-bold tracking-[0.5em] text-gold-rich mb-4 md:mb-6">Your Sacred Evolution</p>
                    <h2 className="text-4xl md:text-6xl font-serif font-bold text-slate-950 dark:text-slate-50 italic mb-6 md:mb-8 leading-tight">Your Spiritual Wrapped</h2>
                    <div className="max-w-2xl mx-auto celestial-card border-beam p-5 md:p-6 bg-slate-950 dark:bg-obsidian-900 text-marfil border-none shadow-gold-soft/10 shadow-xl">
                        <p className="text-base md:text-lg font-medium italic opacity-90">"{data?.highlight_text}"</p>
                    </div>
                </section>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-8">
                    <WrappedCard
                        icon={<Moon size={24} />}
                        title="Fasted Days"
                        value={data?.total_fasted_days}
                        subtitle="Sacred observances"
                        accent="gold"
                    />
                    <WrappedCard
                        icon={<Activity size={24} />}
                        title="Prayer Rate"
                        value={`${data?.salah_consistency_percentage}%`}
                        subtitle="Spiritual alignment"
                        accent="indigo"
                    />
                    <WrappedCard
                        icon={<Book size={24} />}
                        title="Divine Names"
                        value={data?.total_names_memorized}
                        subtitle="Attributes learned"
                        accent="gold"
                    />
                    <WrappedCard
                        icon={<Heart size={24} />}
                        title="Good Deeds"
                        value={data?.total_sadaqah_days}
                        subtitle="Acts of devotion"
                        accent="indigo"
                    />
                </div>

                {/* Quran Summary Section */}
                <section className="celestial-card border-beam p-6 md:p-12 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 md:p-8 opacity-[0.05] group-hover:scale-110 transition-transform duration-1000">
                        <Star size={window.innerWidth < 768 ? 60 : 120} className="text-gold-rich" />
                    </div>
                    <header className="mb-6 md:mb-10">
                        <h3 className="text-2xl md:text-3xl font-serif font-bold italic text-slate-950 dark:text-slate-50 mb-2">Quranic Progress</h3>
                        <p className="text-[10px] uppercase font-bold tracking-widest text-slate-900/40 dark:text-slate-100/40">Milestones reaching the heart</p>
                    </header>
                    <div className="flex flex-wrap gap-3 md:gap-4 relative z-10">
                        {data?.quran_summary?.length > 0 ? data.quran_summary.map((q, idx) => (
                            <div key={idx} className="px-4 md:px-6 py-2 md:py-3 bg-white dark:bg-slate-800 border border-gold-soft/10 rounded-xl md:rounded-2xl text-xs md:text-sm font-bold text-slate-900 dark:text-slate-50 shadow-sm flex items-center gap-2 md:gap-3">
                                <div className="w-1.5 md:w-2 h-1.5 md:h-2 rounded-full bg-gold-soft" />
                                {q}
                            </div>
                        )) : (
                            <p className="text-slate-900/40 dark:text-slate-100/40 font-medium italic text-sm">Your journey with the Quran is just beginning...</p>
                        )}
                    </div>
                </section>

                <footer className="text-center pt-20">
                    <p className="text-[10px] uppercase font-bold tracking-[0.4em] text-gold-rich mb-4">Ramadan Kareem</p>
                    <p className="font-serif italic text-slate-900/40 dark:text-slate-100/40 leading-relaxed max-w-lg mx-auto">
                        "Whoever fasts Ramadan out of faith and in the hope of reward, his previous sins will be forgiven."
                    </p>
                </footer>
            </main>
        </div >
    );
};

const WrappedCard = ({ icon, title, value, subtitle, accent }) => (
    <div className="celestial-card border-beam p-4 md:p-8 group transition-all duration-500 hover:-translate-y-2">
        <div className={`w-9 h-9 md:w-12 md:h-12 rounded-xl md:rounded-2xl flex items-center justify-center mb-3 md:mb-6 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 ${accent === 'gold' ? 'bg-gold-soft/10 text-gold-rich' : 'bg-slate-100 dark:bg-obsidian-900 text-slate-900 dark:text-slate-50'}`}>
            {React.cloneElement(icon, { size: window.innerWidth < 768 ? 18 : 24 })}
        </div>
        <h3 className="text-[8px] md:text-[10px] uppercase font-bold tracking-[0.2em] text-slate-950/40 dark:text-slate-50/40 mb-1 md:mb-2">{title}</h3>
        <p className="text-2xl md:text-4xl font-serif font-bold text-slate-950 dark:text-slate-50 mb-0.5 md:mb-2">{value}</p>
        <p className="text-[9px] md:text-[11px] font-bold text-slate-900/60 dark:text-slate-100/60 leading-tight uppercase tracking-wider">{subtitle}</p>
    </div>
);

export default RamadanWrapped;
