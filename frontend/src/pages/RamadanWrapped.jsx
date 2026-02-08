import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRamadanAnalytics } from '../api/ramadan';
import { Sparkles, ArrowLeft, Star, Heart, Book, Activity, Moon, Compass, ChevronRight } from 'lucide-react';

const RamadanWrapped = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        getRamadanAnalytics().then(setData).finally(() => setLoading(false));
    }, []);

    if (loading) return (
        <div className="min-h-screen bg-marfil flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-gold-soft border-t-transparent rounded-full animate-spin" />
        </div>
    );

    return (
        <div className="min-h-screen bg-marfil celestial-pattern font-sans pb-24 text-emerald-950">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-marfil/80 backdrop-blur-2xl border-b border-gold-soft/10 px-8 py-5">
                <div className="max-w-5xl mx-auto flex justify-between items-center">
                    <button onClick={() => navigate('/dashboard')} className="group flex items-center gap-3 text-emerald-900 font-bold">
                        <div className="p-2 transition-transform group-hover:-translate-x-1 bg-white rounded-xl shadow-sm border border-gold-soft/20">
                            <ArrowLeft size={18} />
                        </div>
                        <span className="hidden md:inline uppercase tracking-widest text-[10px] text-gold-rich">Dashboard</span>
                    </button>

                    <div className="flex items-center gap-3">
                        <Sparkles size={20} className="text-gold-soft" />
                        <h1 className="text-xl font-serif font-bold italic tracking-wider">Ramadan Insights</h1>
                    </div>

                    <div className="w-24" /> {/* Spacer */}
                </div>
            </header>

            <main className="max-w-5xl mx-auto px-6 mt-16 space-y-16">
                {/* Hero Section */}
                <section className="text-center relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] -z-10">
                        <Compass size={400} />
                    </div>
                    <p className="text-[10px] uppercase font-bold tracking-[0.5em] text-gold-rich mb-6">Your Sacred Evolution</p>
                    <h2 className="text-6xl font-serif font-bold text-emerald-950 italic mb-8 leading-tight">Your Spiritual Wrapped</h2>
                    <div className="max-w-2xl mx-auto celestial-card p-6 bg-emerald-950 text-marfil border-none shadow-gold-soft/10">
                        <p className="text-lg font-medium italic opacity-90">"{data?.highlight_text}"</p>
                    </div>
                </section>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
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
                        accent="emerald"
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
                        accent="emerald"
                    />
                </div>

                {/* Quran Summary Section */}
                <section className="celestial-card p-12 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-[0.05] group-hover:scale-110 transition-transform duration-1000">
                        <Star size={120} className="text-gold-rich" />
                    </div>
                    <header className="mb-10">
                        <h3 className="text-3xl font-serif font-bold italic text-emerald-950 mb-2">Quranic Progress</h3>
                        <p className="text-[10px] uppercase font-bold tracking-widest text-emerald-900/40">Milestones reaching the heart</p>
                    </header>
                    <div className="flex flex-wrap gap-4 relative z-10">
                        {data?.quran_summary?.length > 0 ? data.quran_summary.map((q, idx) => (
                            <div key={idx} className="px-6 py-3 bg-white border border-gold-soft/10 rounded-2xl text-sm font-bold text-emerald-900 shadow-sm flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-gold-soft" />
                                {q}
                            </div>
                        )) : (
                            <p className="text-emerald-900/40 font-medium italic">Your journey with the Quran is just beginning...</p>
                        )}
                    </div>
                </section>

                <footer className="text-center pt-20">
                    <p className="text-[10px] uppercase font-bold tracking-[0.4em] text-gold-rich mb-4">Ramadan Kareem</p>
                    <p className="font-serif italic text-emerald-900/40 leading-relaxed max-w-lg mx-auto">
                        "Whoever fasts Ramadan out of faith and in the hope of reward, his previous sins will be forgiven."
                    </p>
                </footer>
            </main>
        </div>
    );
};

const WrappedCard = ({ icon, title, value, subtitle, accent }) => (
    <div className="celestial-card p-8 group transition-all duration-500 hover:-translate-y-2">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 ${accent === 'gold' ? 'bg-gold-soft/10 text-gold-rich' : 'bg-emerald-50 text-emerald-900'}`}>
            {icon}
        </div>
        <h3 className="text-[10px] uppercase font-bold tracking-[0.2em] text-emerald-950/40 mb-2">{title}</h3>
        <p className="text-4xl font-serif font-bold text-emerald-950 mb-2">{value}</p>
        <p className="text-[11px] font-bold text-emerald-900/60 leading-relaxed font-bold uppercase tracking-wider">{subtitle}</p>
    </div>
);

export default RamadanWrapped;
