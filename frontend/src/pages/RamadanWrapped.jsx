import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRamadanAnalytics } from '../api/ramadan';
import { Sparkles, ArrowLeft, Star, Heart, Book, Activity, Moon } from 'lucide-react';

const RamadanWrapped = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        getRamadanAnalytics().then(setData).finally(() => setLoading(false));
    }, []);

    if (loading) return <div className="min-h-screen bg-parchment flex items-center justify-center"><div className="w-10 h-10 border-4 border-emerald-800 border-t-transparent rounded-full animate-spin" /></div>;

    return (
        <div className="min-h-screen bg-parchment islamic-pattern p-6 font-sans">
            <nav className="max-w-4xl mx-auto py-6 flex justify-between items-center bg-transparent border-none">
                <button onClick={() => navigate('/ramadan')} className="flex items-center gap-2 text-emerald-800 font-bold group">
                    <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Back to Planner
                </button>
                <h1 className="text-2xl font-serif font-bold text-emerald-900">Ramadan Wrapped</h1>
            </nav>

            <main className="max-w-4xl mx-auto space-y-10 mt-10">
                <div className="text-center">
                    <Sparkles className="mx-auto text-emerald-600 mb-4" size={48} />
                    <h2 className="text-4xl font-serif italic text-emerald-900 mb-2"> Your Spiritual Journey</h2>
                    <p className="text-emerald-700 font-medium">{data?.highlight_text}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <WrappedCard icon={<Moon className="text-amber-600" />} title="Fasted Days" value={data?.total_fasted_days} subtitle="days observed" />
                    <WrappedCard icon={<Activity className="text-emerald-600" />} title="Salah Consistency" value={`${data?.salah_consistency_percentage}%`} subtitle="of all prayers" />
                    <WrappedCard icon={<Book className="text-blue-600" />} title="Names Memorized" value={data?.total_names_memorized} subtitle="names of Allah" />
                    <WrappedCard icon={<Heart className="text-rose-600" />} title="Good Deeds & Sadaqah" value={data?.total_sadaqah_days} subtitle="days with acts of kindness" />
                </div>

                <div className="islamic-card p-10 bg-emerald-900 text-parchment text-center border-none">
                    <h3 className="text-2xl font-serif italic mb-6">Reflection & Quran Growth</h3>
                    <div className="flex flex-wrap justify-center gap-4">
                        {data?.quran_summary?.map((q, idx) => (
                            <div key={idx} className="px-4 py-2 bg-white/10 rounded-full text-xs font-bold leading-relaxed transition-all">
                                {q}
                            </div>
                        ))}
                    </div>
                </div>

                <footer className="text-center text-emerald-600/60 pb-10 italic">
                    "Actions are but by intentions."
                </footer>
            </main>
        </div>
    );
};

const WrappedCard = ({ icon, title, value, subtitle }) => (
    <div className="islamic-card p-8 text-center hover:shadow-2xl transition-all border-emerald-100">
        <div className="mb-4 flex justify-center">{icon}</div>
        <h3 className="text-sm font-bold uppercase tracking-widest text-emerald-700 mb-2">{title}</h3>
        <p className="text-5xl font-serif font-bold text-emerald-900 mb-2">{value}</p>
        <p className="text-xs text-emerald-600/70 font-medium leading-relaxed font-medium transition-all">{subtitle}</p>
    </div>
);

export default RamadanWrapped;
