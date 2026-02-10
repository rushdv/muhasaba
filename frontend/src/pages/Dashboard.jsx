import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Moon, LogOut, Sparkles, Activity, Clock, ChevronRight, BookOpen } from 'lucide-react';
import ThemeToggle from '../components/ThemeToggle';
import IslamicLogo from '../components/IslamicLogo';

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
            icon: <IslamicLogo size={32} />,
            path: '/ramadan',
            color: 'bg-slate-950 dark:bg-obsidian-900',
            textColor: 'text-gold-soft'
        },
        {
            title: 'Spiritual Insights',
            desc: 'Reflect on your journey with personalized Ramadan analytics.',
            icon: <Activity size={32} />,
            path: '/ramadan/wrapped',
            color: 'bg-gold-soft/10 dark:bg-gold-soft/5',
            textColor: 'text-gold-rich dark:text-gold-soft',
            border: 'border-gold-soft/20'
        },
        {
            title: 'Yearly Planner',
            desc: 'Mapping your spiritual goals throughout the Islamic year.',
            icon: <BookOpen size={32} />,
            path: '/yearly',
            color: 'bg-white dark:bg-obsidian-900/30',
            textColor: 'text-slate-900/20 dark:text-slate-100/20',
            disabled: true
        },
        {
            title: 'Daily Protocol',
            desc: 'Structured routines for consistent spiritual productivity.',
            icon: <Clock size={32} />,
            path: '/daily',
            color: 'bg-white dark:bg-obsidian-900/30',
            textColor: 'text-slate-900/20 dark:text-slate-100/20',
            disabled: true
        },
        {
            title: 'Self Accountability',
            desc: 'Comprehensive records to reflect and improve daily character.',
            icon: <Activity size={32} />,
            path: '/accountability',
            color: 'bg-white dark:bg-obsidian-900/30',
            textColor: 'text-slate-900/20 dark:text-slate-100/20',
            disabled: true
        },
        {
            title: 'Muhasaba Logs',
            desc: 'Maintain consistency through daily self-accountability.',
            icon: <Clock size={32} />,
            path: '/muhasaba',
            color: 'bg-white dark:bg-obsidian-900/30',
            textColor: 'text-slate-900/20 dark:text-slate-100/20',
            disabled: true
        }
    ];

    return (
        <div className="min-h-screen bg-transparent pb-12 transition-colors duration-1000">
            {/* Top Bar - Compact for Mobile */}
            <nav className="bg-white/40 dark:bg-obsidian-900/40 backdrop-blur-3xl border-b border-gold-soft/10 px-4 md:px-8 py-4 md:py-6 flex justify-between items-center sticky top-0 z-50">
                <div className="flex items-center gap-3 md:gap-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-slate-950 dark:bg-obsidian-900 rounded-xl md:rounded-2xl flex items-center justify-center border border-gold-soft/30 shadow-lg group-hover:rotate-12 transition-transform">
                        <IslamicLogo size={20} className="text-gold-soft" />
                    </div>
                    <div>
                        <h1 className="text-lg md:text-2xl font-serif font-bold italic tracking-tight text-slate-950 dark:text-gold-soft">Muhasabah</h1>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <ThemeToggle />
                    <button
                        onClick={logout}
                        className="flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2 md:py-2.5 bg-white dark:bg-slate-800 border border-gold-soft/20 text-slate-900 dark:text-slate-100 text-[10px] md:text-xs font-bold uppercase tracking-widest rounded-lg md:rounded-xl hover:bg-gold-soft/5 dark:hover:bg-gold-soft/10 transition-all shadow-sm"
                    >
                        <LogOut size={14} className="md:w-4 md:h-4" /> Sign Out
                    </button>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-16">
                <header className="mb-12 md:mb-20 text-center md:text-left">
                    <p className="text-[9px] md:text-[10px] uppercase font-bold tracking-[0.4em] md:tracking-[0.5em] text-gold-rich mb-3 md:mb-4">Peace be upon you,</p>
                    <h2 className="text-4xl md:text-6xl font-serif font-bold text-slate-950 dark:text-marfil italic">Welcome Back</h2>
                    <div className="w-16 md:w-24 h-1 bg-gold-soft mt-6 md:mt-8 rounded-full shadow-lg shadow-gold-soft/20 inline-block md:block" />
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
                    {modules.map((m, i) => (
                        <div
                            key={i}
                            onClick={() => !m.disabled && navigate(m.path)}
                            className={`celestial-card border-beam p-1 relative overflow-hidden group h-[240px] md:h-[400px] ${m.disabled ? 'cursor-not-allowed grayscale-[0.4]' : 'cursor-pointer hover:border-gold-soft/40 dark:hover:border-gold-soft/40 transition-colors duration-500'}`}
                        >
                            <div className={`w-full h-full p-4 md:p-10 rounded-[18px] md:rounded-[28px] transition-all duration-700 flex flex-col justify-between ${m.color} ${m.border || 'border-transparent'} border-2 ${m.color.includes('bg-slate-950') ? 'text-marfil' : 'text-slate-950 dark:text-slate-100'}`}>
                                <div className="space-y-3 md:space-y-6">
                                    <div className={`w-10 h-10 md:w-16 md:h-16 rounded-lg md:rounded-2xl flex items-center justify-center transition-transform duration-700 group-hover:scale-110 group-hover:rotate-6 ${m.color.includes('bg-slate-950') ? 'bg-white/10' : 'bg-slate-50 dark:bg-slate-800/10'}`}>
                                        <div className={m.textColor}>{React.cloneElement(m.icon, { size: window.innerWidth < 768 ? 20 : 32 })}</div>
                                    </div>
                                    <h3 className="text-xl md:text-3xl font-serif font-bold italic leading-tight">{m.title}</h3>
                                    <p className={`leading-relaxed line-clamp-2 md:line-clamp-none ${m.color.includes('bg-slate-950') ? 'text-[10px] md:text-sm opacity-60 font-medium' : 'text-slate-900/40 dark:text-slate-100/40 font-bold uppercase tracking-widest text-[8px] md:text-[11px]'}`}>
                                        {m.desc}
                                    </p>
                                </div>

                                <div className="flex items-center gap-3 md:gap-4 group/link">
                                    <div className={`w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl flex items-center justify-center transition-all duration-300 ${m.disabled ? 'bg-slate-900/5 dark:bg-slate-100/5 text-slate-900/10 dark:text-slate-100/10' : (m.color.includes('bg-slate-950') ? 'bg-gold-soft text-white' : 'bg-slate-950 dark:bg-slate-800 text-marfil')}`}>
                                        <ChevronRight size={16} className={!m.disabled ? "group-hover:translate-x-1 transition-transform" : ""} />
                                    </div>
                                    <span className={`text-[10px] md:text-xs font-bold uppercase tracking-widest ${m.disabled ? 'text-slate-900/20 dark:text-slate-100/20' : (m.color.includes('bg-slate-950') ? 'text-gold-soft/60' : 'text-slate-900/40 dark:text-slate-100/40')}`}>
                                        {m.disabled ? 'Coming Soon' : 'Explore'}
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