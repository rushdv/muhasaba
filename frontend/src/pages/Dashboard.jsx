import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Moon, LogOut, Sparkles, Activity, Clock, ChevronRight } from 'lucide-react';

const Dashboard = () => {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const modules = [
        {
            title: 'Ramadan Planner',
            desc: 'Your daily companion for Ibadah, trackers & spiritual growth.',
            icon: <Sparkles size={32} />,
            path: '/ramadan',
            color: 'bg-emerald-950',
            textColor: 'text-gold-soft'
        },
        {
            title: 'Spiritual Insights',
            desc: 'Reflect on your journey with personalized Ramadan analytics.',
            icon: <Activity size={32} />,
            path: '/ramadan/wrapped',
            color: 'bg-white',
            textColor: 'text-gold-rich'
        },
        {
            title: 'Muhasaba Logs',
            desc: 'Maintain consistency through daily self-accountability.',
            icon: <Clock size={32} />,
            path: '/muhasaba',
            color: 'bg-white',
            textColor: 'text-emerald-900'
        }
    ];

    return (
        <div className="min-h-screen bg-marfil celestial-pattern pb-12">
            {/* Top Bar */}
            <nav className="bg-white/40 backdrop-blur-xl border-b border-gold-soft/10 px-8 py-6 flex justify-between items-center sticky top-0 z-50">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-950 rounded-2xl flex items-center justify-center border border-gold-soft/30 shadow-lg">
                        <Moon size={24} className="text-gold-soft" fill="currentColor" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-serif font-bold italic tracking-tight">Muhasaba</h1>
                        <p className="text-[10px] uppercase font-bold tracking-[0.3em] text-gold-rich opacity-80">Ramadan Hub Pro</p>
                    </div>
                </div>
                <button
                    onClick={logout}
                    className="flex items-center gap-3 px-6 py-2.5 bg-white border border-gold-soft/20 text-emerald-900 text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-gold-soft/5 transition-all"
                >
                    <LogOut size={16} /> Sign Out
                </button>
            </nav>

            <main className="max-w-7xl mx-auto px-6 py-16">
                <header className="mb-20">
                    <p className="text-[10px] uppercase font-bold tracking-[0.5em] text-gold-rich mb-4">Peace be upon you,</p>
                    <h2 className="text-6xl font-serif font-bold text-emerald-950 italic">Welcome Back</h2>
                    <div className="w-24 h-1 bg-gold-soft mt-8 rounded-full shadow-lg shadow-gold-soft/20" />
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {modules.map((m, i) => (
                        <div
                            key={i}
                            onClick={() => navigate(m.path)}
                            className={`celestial-card p-1 relative overflow-hidden cursor-pointer group h-[400px]`}
                        >
                            <div className={`w-full h-full p-10 rounded-[28px] transition-all duration-700 flex flex-col justify-between ${m.color} ${m.color === 'bg-emerald-950' ? 'text-marfil' : 'text-emerald-950'}`}>
                                <div className="space-y-6">
                                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-transform duration-700 group-hover:scale-110 group-hover:rotate-6 ${m.color === 'bg-emerald-950' ? 'bg-white/10' : 'bg-emerald-50'}`}>
                                        <div className={m.textColor}>{m.icon}</div>
                                    </div>
                                    <h3 className="text-3xl font-serif font-bold italic leading-tight">{m.title}</h3>
                                    <p className={`text-sm leading-relaxed ${m.color === 'bg-emerald-950' ? 'opacity-60 font-medium' : 'text-emerald-900/40 font-bold uppercase tracking-widest text-[11px]'}`}>
                                        {m.desc}
                                    </p>
                                </div>

                                <div className="flex items-center gap-4 group/link">
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${m.color === 'bg-emerald-950' ? 'bg-gold-soft text-white' : 'bg-emerald-950 text-marfil'}`}>
                                        <ChevronRight size={20} className="group-hover/btn:translate-x-1 transition-transform" />
                                    </div>
                                    <span className={`text-xs font-bold uppercase tracking-widest ${m.color === 'bg-emerald-950' ? 'text-gold-soft/60' : 'text-emerald-900/40'}`}>
                                        {m.path === '/muhasaba' ? 'Coming Soon' : 'Explore'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default Dashboard;