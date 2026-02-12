import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Moon, LogOut, Sparkles, Activity, Clock, ChevronRight, BookOpen } from 'lucide-react';
import ThemeToggle from '../components/ThemeToggle';
import IslamicLogo from '../components/IslamicLogo';
import { useLanguage } from '../context/LanguageContext';

const Dashboard = () => {
    const navigate = useNavigate();
    const { language, toggleLanguage, t } = useLanguage();

    const logout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const modules = [
        {
            title: t('dashboard.ramadanPlanner'),
            desc: t('dashboard.ramadanPlannerDesc'),
            icon: <IslamicLogo size={32} />,
            path: '/ramadan',
            color: 'bg-slate-950 dark:bg-obsidian-900',
            textColor: 'text-gold-soft'
        },
        {
            title: t('dashboard.spiritualInsights'),
            desc: t('dashboard.spiritualInsightsDesc'),
            icon: <Activity size={32} />,
            path: '/ramadan/wrapped',
            color: 'bg-gold-soft/10 dark:bg-gold-soft/5',
            textColor: 'text-gold-rich dark:text-gold-soft',
            border: 'border-gold-soft/20'
        },
        {
            title: t('dashboard.yearlyPlanner'),
            desc: t('dashboard.yearlyPlannerDesc'),
            icon: <BookOpen size={32} />,
            path: '/yearly',
            color: 'bg-white dark:bg-obsidian-900/30',
            textColor: 'text-slate-900/20 dark:text-slate-100/20',
            disabled: true
        },
        {
            title: t('dashboard.dailyProtocol'),
            desc: t('dashboard.dailyProtocolDesc'),
            icon: <Clock size={32} />,
            path: '/daily',
            color: 'bg-white dark:bg-obsidian-900/30',
            textColor: 'text-slate-900/20 dark:text-slate-100/20',
            disabled: true
        },
        {
            title: t('dashboard.selfAccountability'),
            desc: t('dashboard.selfAccountabilityDesc'),
            icon: <Activity size={32} />,
            path: '/accountability',
            color: 'bg-white dark:bg-obsidian-900/30',
            textColor: 'text-slate-900/20 dark:text-slate-100/20',
            disabled: true
        },
        {
            title: t('dashboard.muhasabaLogs'),
            desc: t('dashboard.muhasabaLogsDesc'),
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
            <nav className="bg-white/40 dark:bg-obsidian-900/40 backdrop-blur-3xl border-b border-gold-soft/10 px-3 md:px-8 py-3 md:py-6 flex justify-between items-center sticky top-0 z-50">
                <div className="flex items-center gap-3 md:gap-4">
                    <div className="w-10 h-10 md:w-16 md:h-16 bg-slate-950 dark:bg-obsidian-900 rounded-xl md:rounded-2xl flex items-center justify-center border border-gold-soft/30 shadow-lg group-hover:rotate-12 transition-transform overflow-hidden shrink-0">
                        <IslamicLogo size={window.innerWidth < 768 ? 28 : 44} className="text-gold-soft" />
                    </div>
                    <div className="min-w-0">
                        <h1 className="text-base md:text-2xl font-serif font-bold italic tracking-tight text-slate-950 dark:text-gold-soft truncate">{t('common.appName')}</h1>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <button
                        onClick={toggleLanguage}
                        className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-xl md:rounded-2xl bg-white dark:bg-obsidian-900 border border-gold-soft/20 text-slate-900 dark:text-gold-soft font-bold text-xs md:text-sm hover:bg-gold-soft/5 dark:hover:bg-gold-soft/10 transition-all shadow-sm"
                    >
                        {language === 'en' ? 'BN' : 'EN'}
                    </button>
                    <ThemeToggle />
                    <button
                        onClick={logout}
                        className="flex items-center gap-2 md:gap-3 px-3 md:px-6 py-2 md:py-2.5 bg-white dark:bg-slate-800 border border-gold-soft/20 text-slate-900 dark:text-slate-100 text-[10px] md:text-xs font-bold uppercase tracking-widest rounded-lg md:rounded-xl hover:bg-gold-soft/5 dark:hover:bg-gold-soft/10 transition-all shadow-sm"
                        title={t('common.signOut')}
                    >
                        <LogOut size={16} className="md:w-4 md:h-4" />
                        <span className="hidden md:inline">{t('common.signOut')}</span>
                    </button>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-16">
                <header className="mb-12 md:mb-20 text-center md:text-left">
                    <p className="text-[9px] md:text-[10px] uppercase font-bold tracking-[0.4em] md:tracking-[0.5em] text-gold-rich mb-3 md:mb-4">{t('dashboard.greeting')}</p>
                    <h2 className="text-4xl md:text-6xl font-serif font-bold text-slate-950 dark:text-marfil italic">{t('dashboard.welcome')}</h2>
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
                                    <div className={`w-12 h-12 md:w-20 md:h-20 rounded-lg md:rounded-2xl flex items-center justify-center transition-transform duration-700 group-hover:scale-110 group-hover:rotate-6 overflow-hidden ${m.color.includes('bg-slate-950') ? 'bg-white/10' : 'bg-slate-50 dark:bg-slate-800/10'}`}>
                                        <div className={m.textColor}>{React.cloneElement(m.icon, { size: window.innerWidth < 768 ? 32 : 56 })}</div>
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
                                        {m.disabled ? t('common.comingSoon') : t('common.explore')}
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