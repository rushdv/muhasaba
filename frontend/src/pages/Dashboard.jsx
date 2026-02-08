import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Moon, Calendar, Activity, LogOut, Sparkles, Star, Heart } from 'lucide-react';

const Dashboard = () => {
    const navigate = useNavigate();

    const modules = [
        {
            id: 'ramadan',
            name: 'Ramadan Planner',
            icon: <Moon size={40} />,
            description: 'Track Fasting, Taraweeh & Daily Goals',
            path: '/ramadan',
            active: true,
            color: 'bg-emerald-50 text-emerald-800 border-emerald-100',
            iconColor: 'text-emerald-700'
        },
        {
            id: 'muhasaba',
            name: 'Daily Muhasaba',
            icon: <Activity size={40} />,
            description: 'Self-reflection & Daily Deeds',
            path: '/daily-log',
            active: false,
            color: 'bg-amber-50 text-amber-800 border-amber-100',
            iconColor: 'text-amber-700'
        },
        {
            id: 'planner',
            name: 'Yearly Planner',
            icon: <Calendar size={40} />,
            description: 'Manage your long-term vision',
            path: '/planner',
            active: false,
            color: 'bg-stone-50 text-stone-800 border-stone-100',
            iconColor: 'text-stone-700'
        }
    ];

    const logout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-parchment islamic-pattern p-6 font-sans">
            {/* Top Bar */}
            <header className="max-w-6xl mx-auto flex justify-between items-center mb-12 py-6 border-b border-emerald-100">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-800 text-parchment rounded-lg shadow-md">
                        <Sparkles size={24} />
                    </div>
                    <h1 className="text-3xl font-bold text-emerald-900 font-serif">
                        Muhasaba <span className="text-emerald-700/60 text-xl font-normal">Hub</span>
                    </h1>
                </div>
                <button
                    onClick={logout}
                    className="flex items-center gap-2 px-4 py-2 text-emerald-800 hover:bg-emerald-50 rounded-lg transition-colors font-semibold"
                >
                    <LogOut size={20} />
                    <span>Sign Out</span>
                </button>
            </header>

            <main className="max-w-6xl mx-auto">
                <div className="mb-10">
                    <h2 className="text-4xl font-bold text-emerald-900 mb-2 font-serif">Assalamu Alaikum</h2>
                    <p className="text-emerald-700 italic font-medium">Step forward every day in your spiritual journey.</p>
                </div>

                {/* Grid Menu */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {modules.map((module) => (
                        <div
                            key={module.id}
                            onClick={() => module.active && navigate(module.path)}
                            className={`group relative p-8 rounded-2xl border-2 transition-all duration-500 overflow-hidden ${module.active
                                    ? `${module.color} cursor-pointer hover:shadow-2xl hover:-translate-y-2 hover:border-emerald-200`
                                    : 'bg-gray-50 text-gray-400 border-gray-100 grayscale opacity-70 cursor-not-allowed'
                                }`}
                        >
                            {/* Decorative background icon */}
                            <div className="absolute -bottom-6 -right-6 opacity-5 group-hover:scale-110 transition-transform duration-700">
                                {module.icon}
                            </div>

                            <div className={`mb-6 p-4 rounded-xl inline-block bg-white shadow-sm ${module.iconColor}`}>
                                {module.icon}
                            </div>

                            <h3 className="text-2xl font-bold mb-3 font-serif flex items-center gap-2">
                                {module.name}
                                {module.active && <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />}
                            </h3>

                            <p className="text-sm leading-relaxed mb-6 font-medium leading-relaxed">
                                {module.description}
                            </p>

                            <div className="flex items-center justify-between">
                                {module.active ? (
                                    <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 bg-emerald-100 px-3 py-1 rounded-full">
                                        Enter Hub
                                    </span>
                                ) : (
                                    <span className="text-[10px] font-bold uppercase tracking-widest bg-gray-200 text-gray-500 px-3 py-1 rounded-full">
                                        Coming Soon
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer Section */}
                <footer className="mt-20 border-t border-emerald-100 pt-10 text-center">
                    <div className="flex justify-center gap-8 mb-6">
                        <div className="flex items-center gap-2 text-emerald-700/60 italic text-sm">
                            <Star size={14} className="text-emerald-600" />
                            <span>Dhulkarnayn Cycle</span>
                        </div>
                        <div className="flex items-center gap-2 text-emerald-700/60 italic text-sm">
                            <Heart size={14} className="text-emerald-600" />
                            <span>Tazkiyah Focused</span>
                        </div>
                    </div>
                </footer>
            </main>
        </div>
    );
};

export default Dashboard;