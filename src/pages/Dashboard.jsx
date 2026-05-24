import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Activity, Clock, ChevronRight, BookOpen, LogIn } from 'lucide-react';
import ThemeToggle from '../components/ThemeToggle';
import IslamicLogo from '../components/IslamicLogo';
import { useLanguage } from '../context/LanguageContext';
import { signOut, useSession } from '../lib/authClient';
import AuthModal from '../components/AuthModal';

const Dashboard = () => {
    const navigate = useNavigate();
    const { language, toggleLanguage, t } = useLanguage();
    const { data: session } = useSession();
    const [authModal, setAuthModal] = useState(false);

    const logout = async () => {
        await signOut();
        window.location.reload();
    };

    const modules = [
        {
            title: t('dashboard.ramadanPlanner'),
            desc: t('dashboard.ramadanPlannerDesc'),
            icon: <IslamicLogo size={28} />,
            path: '/ramadan',
            color: 'bg-slate-950 dark:bg-obsidian-900',
            textColor: 'text-gold-soft',
            dark: true,
        },
        {
            title: t('dashboard.spiritualInsights'),
            desc: t('dashboard.spiritualInsightsDesc'),
            icon: <Activity size={28} />,
            path: '/ramadan/wrapped',
            color: 'bg-gold-soft/10 dark:bg-gold-soft/5',
            textColor: 'text-gold-rich dark:text-gold-soft',
            border: 'border-gold-soft/20',
        },
        {
            title: t('dashboard.muhasabaLogs'),
            desc: t('dashboard.muhasabaLogsDesc'),
            icon: <Clock size={28} />,
            path: '/muhasaba',
            color: 'bg-white dark:bg-obsidian-900/30',
            textColor: 'text-slate-900 dark:text-slate-100',
        },
        {
            title: t('dashboard.yearlyPlanner'),
            desc: t('dashboard.yearlyPlannerDesc'),
            icon: <BookOpen size={28} />,
            path: '/yearly',
            color: 'bg-white dark:bg-obsidian-900/30',
            textColor: 'text-slate-400 dark:text-slate-600',
            disabled: true,
        },
        {
            title: t('dashboard.dailyProtocol'),
            desc: t('dashboard.dailyProtocolDesc'),
            icon: <Clock size={28} />,
            path: '/daily',
            color: 'bg-white dark:bg-obsidian-900/30',
            textColor: 'text-slate-400 dark:text-slate-600',
            disabled: true,
        },
        {
            title: t('dashboard.selfAccountability'),
            desc: t('dashboard.selfAccountabilityDesc'),
            icon: <Activity size={28} />,
            path: '/accountability',
            color: 'bg-white dark:bg-obsidian-900/30',
            textColor: 'text-slate-400 dark:text-slate-600',
            disabled: true,
        },
    ];

    return (
        <div className="min-h-screen bg-transparent pb-16 transition-colors duration-1000">
            {/* Navbar */}
            <nav className="bg-white/40 dark:bg-obsidian-900/40 backdrop-blur-3xl border-b border-gold-soft/10 px-4 md:px-8 py-3 flex justify-between items-center sticky top-0 z-50">
                <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 bg-slate-950 dark:bg-obsidian-900 rounded-xl flex items-center justify-center border border-gold-soft/30 shadow-md overflow-hidden shrink-0">
                        <IslamicLogo size={22} className="text-gold-soft" />
                    </div>
                    <h1 className="text-base font-serif font-bold italic tracking-tight text-slate-950 dark:text-gold-soft">
                        {t('common.appName')}
                    </h1>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={toggleLanguage}
                        className="w-8 h-8 flex items-center justify-center rounded-lg bg-white dark:bg-obsidian-900 border border-gold-soft/20 text-slate-900 dark:text-gold-soft font-bold text-[10px] hover:bg-gold-soft/5 transition-all shadow-sm"
                    >
                        {language === 'en' ? 'BN' : 'EN'}
                    </button>
                    <ThemeToggle />
                    {session ? (
                        <button
                            onClick={logout}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-slate-800 border border-gold-soft/20 text-slate-900 dark:text-slate-100 text-[10px] font-bold uppercase tracking-wider rounded-lg hover:bg-gold-soft/5 transition-all shadow-sm"
                        >
                            <LogOut size={12} />
                            <span className="hidden sm:inline">{t('common.signOut')}</span>
                        </button>
                    ) : (
                        <button
                            onClick={() => setAuthModal(true)}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-950 dark:bg-gold-soft text-white dark:text-slate-950 text-[10px] font-bold uppercase tracking-wider rounded-lg transition-all shadow-sm"
                        >
                            <LogIn size={12} />
                            <span>Login</span>
                        </button>
                    )}
                </div>
            </nav>

            <main className="max-w-5xl mx-auto px-4 py-6 md:py-12">
                {/* Header */}
                <header className="mb-6 md:mb-10">
                    <p className="text-[9px] uppercase font-bold tracking-[0.4em] text-gold-rich mb-1.5">
                        {t('dashboard.greeting')}
                    </p>
                    <h2 className="text-3xl md:text-5xl font-serif font-bold text-slate-950 dark:text-marfil italic leading-tight">
                        {session ? session.user?.name || t('dashboard.welcome') : t('dashboard.welcome')}
                    </h2>
                    <div className="w-12 h-0.5 bg-gold-soft mt-3 rounded-full" />
                </header>

                {/* Module Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
                    {modules.map((m, i) => (
                        <div
                            key={i}
                            onClick={() => !m.disabled && navigate(m.path)}
                            className={`celestial-card border-beam p-0.5 relative overflow-hidden group
                                ${m.disabled
                                    ? 'cursor-not-allowed opacity-50'
                                    : 'cursor-pointer hover:border-gold-soft/40 active:scale-[0.98] transition-all duration-300'
                                }
                                ${i === 0 ? 'col-span-2 md:col-span-1' : ''}
                            `}
                        >
                            <div className={`w-full h-full p-4 md:p-6 rounded-[calc(2.5rem-2px)] flex flex-col justify-between gap-3
                                ${m.color} ${m.border ? `border ${m.border}` : 'border-transparent'}
                                ${m.dark ? 'text-marfil' : 'text-slate-950 dark:text-slate-100'}
                                min-h-[140px] md:min-h-[200px]
                            `}>
                                {/* Icon */}
                                <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6
                                    ${m.dark ? 'bg-white/10' : 'bg-slate-50 dark:bg-slate-800/20'}
                                `}>
                                    <div className={m.textColor}>
                                        {React.cloneElement(m.icon, { size: 22 })}
                                    </div>
                                </div>

                                {/* Text */}
                                <div>
                                    <h3 className="text-sm md:text-lg font-serif font-bold italic leading-tight mb-1">
                                        {m.title}
                                    </h3>
                                    <p className={`text-[10px] leading-relaxed line-clamp-2
                                        ${m.dark ? 'opacity-50' : 'text-slate-900/40 dark:text-slate-100/40'}
                                        font-medium
                                    `}>
                                        {m.desc}
                                    </p>
                                </div>

                                {/* Arrow */}
                                <div className="flex items-center gap-2">
                                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-300
                                        ${m.disabled
                                            ? 'bg-slate-900/5 dark:bg-slate-100/5 text-slate-900/10'
                                            : m.dark
                                                ? 'bg-gold-soft text-white'
                                                : 'bg-slate-950 dark:bg-slate-700 text-white'
                                        }
                                    `}>
                                        <ChevronRight size={13} className={!m.disabled ? "group-hover:translate-x-0.5 transition-transform" : ""} />
                                    </div>
                                    <span className={`text-[9px] font-bold uppercase tracking-widest
                                        ${m.disabled ? 'text-slate-900/20 dark:text-slate-100/20' : m.dark ? 'text-gold-soft/60' : 'text-slate-900/30 dark:text-slate-100/30'}
                                    `}>
                                        {m.disabled ? t('common.comingSoon') : t('common.explore')}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            <AuthModal
                isOpen={authModal}
                onClose={() => setAuthModal(false)}
                message="Sign in to save your progress"
            />
        </div>
    );
};

export default Dashboard;
