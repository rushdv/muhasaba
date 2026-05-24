import { ArrowLeft, Check, Plus, Trash2, FileText, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useSession } from '../lib/authClient';
import AuthModal from '../components/AuthModal';
import { getLogs, createLog, toggleLog, deleteLog } from '../api/muhasaba';
import ThemeToggle from '../components/ThemeToggle';
import IslamicLogo from '../components/IslamicLogo';
import { useLanguage } from '../context/LanguageContext';

const MuhasabaLogs = () => {
    const navigate = useNavigate();
    const { language, toggleLanguage, t } = useLanguage();
    const { data: session } = useSession();
    const [authModal, setAuthModal] = useState(false);

    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [taskName, setTaskName] = useState('');
    const [note, setNote] = useState('');
    const [adding, setAdding] = useState(false);
    const [showForm, setShowForm] = useState(false);

    const fetchLogs = async () => {
        try {
            const data = await getLogs();
            setLogs(data);
        } catch (err) {
            // 401 = guest user — show empty state, not an error
            if (err?.response?.status !== 401) {
                toast.error('Failed to load logs.');
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLogs();
    }, []);

    const handleAdd = async (e) => {
        e.preventDefault();
        if (!taskName.trim()) return;
        setAdding(true);
        try {
            const newLog = await createLog({ task_name: taskName.trim(), note: note.trim() || undefined });
            setLogs((prev) => [newLog, ...prev]);
            setTaskName('');
            setNote('');
            setShowForm(false);
            toast.success('Log added ✓');
        } catch (err) {
            toast.error('Failed to add log.');
        } finally {
            setAdding(false);
        }
    };

    const handleToggle = async (id) => {
        try {
            const updated = await toggleLog(id);
            setLogs((prev) => prev.map((l) => (l.id === id ? updated : l)));
        } catch (err) {
            toast.error('Failed to update log.');
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteLog(id);
            setLogs((prev) => prev.filter((l) => l.id !== id));
            toast.success('Log deleted.');
        } catch (err) {
            toast.error('Failed to delete log.');
        }
    };

    // Group logs by date
    const grouped = logs.reduce((acc, log) => {
        const date = log.log_date ? new Date(log.log_date).toLocaleDateString('en-GB', {
            day: 'numeric', month: 'long', year: 'numeric'
        }) : 'Unknown Date';
        if (!acc[date]) acc[date] = [];
        acc[date].push(log);
        return acc;
    }, {});

    const completedCount = logs.filter((l) => l.is_completed).length;
    const totalCount = logs.length;

    return (
        <div className="min-h-screen bg-transparent font-sans pb-24 text-slate-950 dark:text-slate-50 transition-colors duration-1000">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-white/20 dark:bg-obsidian-950/20 backdrop-blur-[40px] border-b border-gold-soft/10 px-3 md:px-8 py-3 md:py-5">
                <div className="max-w-4xl mx-auto flex justify-between items-center gap-2">
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="group flex items-center gap-3 text-slate-900 dark:text-slate-50 font-bold"
                    >
                        <div className="p-2 transition-transform group-hover:-translate-x-1 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gold-soft/20">
                            <ArrowLeft size={18} />
                        </div>
                        <span className="hidden md:inline uppercase tracking-widest text-[10px] text-gold-rich">
                            {t('common.back')}
                        </span>
                    </button>

                    <div className="flex items-center gap-2 md:gap-3 overflow-hidden">
                        <IslamicLogo size={28} className="text-gold-soft shrink-0" />
                        <h1 className="text-lg md:text-xl font-serif font-bold italic tracking-wider truncate">
                            {t('dashboard.muhasabaLogs')}
                        </h1>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={toggleLanguage}
                            className="w-10 h-10 flex items-center justify-center rounded-xl bg-white dark:bg-obsidian-900 border border-gold-soft/20 text-slate-900 dark:text-gold-soft font-bold text-xs hover:bg-gold-soft/5 transition-all shadow-sm"
                        >
                            {language === 'en' ? 'BN' : 'EN'}
                        </button>
                        <ThemeToggle />
                    </div>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-4 md:px-6 mt-8 md:mt-12 space-y-8">
                {/* Stats + Add Button */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="celestial-card border-beam px-6 py-4 flex items-center gap-6">
                        <div className="text-center">
                            <p className="text-2xl font-serif font-bold text-slate-950 dark:text-slate-50">{completedCount}</p>
                            <p className="text-[9px] uppercase font-bold tracking-widest text-gold-rich mt-0.5">Completed</p>
                        </div>
                        <div className="w-px h-8 bg-gold-soft/20" />
                        <div className="text-center">
                            <p className="text-2xl font-serif font-bold text-slate-950 dark:text-slate-50">{totalCount - completedCount}</p>
                            <p className="text-[9px] uppercase font-bold tracking-widest text-slate-900/40 dark:text-slate-100/40 mt-0.5">Pending</p>
                        </div>
                        <div className="w-px h-8 bg-gold-soft/20" />
                        <div className="text-center">
                            <p className="text-2xl font-serif font-bold text-slate-950 dark:text-slate-50">{totalCount}</p>
                            <p className="text-[9px] uppercase font-bold tracking-widest text-slate-900/40 dark:text-slate-100/40 mt-0.5">Total</p>
                        </div>
                    </div>

                    <button
                        onClick={() => {
                            if (!session) { setAuthModal(true); return; }
                            setShowForm((v) => !v);
                        }}
                        className="celestial-button flex items-center gap-2 px-6 py-3 transition-all hover:scale-[1.02]"
                    >
                        <Plus size={16} />
                        <span className="uppercase tracking-widest text-[11px] font-bold">New Log</span>
                    </button>
                </div>

                {/* Add Form */}
                {showForm && (
                    <form
                        onSubmit={handleAdd}
                        className="celestial-card border-beam p-6 md:p-8 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300"
                    >
                        <h2 className="font-serif text-lg font-bold italic text-slate-950 dark:text-slate-50">
                            Add a Muhasaba Log
                        </h2>
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-slate-900/40 dark:text-slate-100/40">
                                Task / Reflection
                            </label>
                            <input
                                type="text"
                                value={taskName}
                                onChange={(e) => setTaskName(e.target.value)}
                                placeholder="e.g. Read 2 pages of Quran after Fajr"
                                maxLength={255}
                                required
                                className="w-full bg-white dark:bg-slate-800/40 border border-gold-soft/10 rounded-xl p-3 text-sm font-medium text-slate-950 dark:text-slate-50 outline-none focus:ring-2 focus:ring-gold-soft/20 placeholder:text-slate-300 dark:placeholder:text-slate-100/30"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-slate-900/40 dark:text-slate-100/40">
                                Note (optional)
                            </label>
                            <textarea
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                                placeholder="Any reflection or context..."
                                rows={3}
                                className="w-full bg-white dark:bg-slate-800/40 border border-gold-soft/10 rounded-xl p-3 text-sm font-medium text-slate-950 dark:text-slate-50 outline-none focus:ring-2 focus:ring-gold-soft/20 resize-none placeholder:text-slate-300 dark:placeholder:text-slate-100/30"
                            />
                        </div>
                        <div className="flex gap-3">
                            <button
                                type="submit"
                                disabled={adding || !taskName.trim()}
                                className="celestial-button flex items-center gap-2 px-6 py-2.5 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {adding ? (
                                    <Loader2 size={14} className="animate-spin" />
                                ) : (
                                    <Plus size={14} />
                                )}
                                <span className="uppercase tracking-widest text-[11px] font-bold">Add</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => { setShowForm(false); setTaskName(''); setNote(''); }}
                                className="px-6 py-2.5 rounded-xl border border-gold-soft/20 text-[11px] font-bold uppercase tracking-widest text-slate-900/60 dark:text-slate-100/60 hover:bg-gold-soft/5 transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                )}

                {/* Logs List */}
                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <div className="w-12 h-12 border-4 border-gold-soft border-t-transparent rounded-full animate-spin" />
                    </div>
                ) : totalCount === 0 ? (
                    <div className="celestial-card p-12 text-center space-y-4">
                        <FileText size={40} className="mx-auto text-gold-soft/30" />
                        <p className="font-serif italic text-slate-900/40 dark:text-slate-100/40 text-lg">
                            No logs yet. Start your muhasaba journey.
                        </p>
                        <button
                            onClick={() => setShowForm(true)}
                            className="celestial-button px-6 py-2.5 text-[11px] font-bold uppercase tracking-widest"
                        >
                            Add First Log
                        </button>
                    </div>
                ) : (
                    <div className="space-y-8">
                        {Object.entries(grouped).map(([date, dateLogs]) => (
                            <div key={date}>
                                <p className="text-[10px] uppercase font-bold tracking-[0.3em] text-gold-rich mb-3 px-1">
                                    {date}
                                </p>
                                <div className="space-y-3">
                                    {dateLogs.map((log) => (
                                        <div
                                            key={log.id}
                                            className={`celestial-card p-4 md:p-5 flex items-start gap-4 group transition-all duration-300 ${log.is_completed ? 'opacity-60' : ''}`}
                                        >
                                            {/* Toggle Checkbox */}
                                            <button
                                                onClick={() => handleToggle(log.id)}
                                                className={`mt-0.5 w-6 h-6 rounded-lg border-2 flex items-center justify-center shrink-0 transition-all duration-300 ${
                                                    log.is_completed
                                                        ? 'bg-gold-soft border-gold-soft text-white shadow-md'
                                                        : 'border-gold-soft/30 hover:border-gold-soft bg-white/5'
                                                }`}
                                            >
                                                {log.is_completed && <Check size={13} strokeWidth={4} />}
                                            </button>

                                            {/* Content */}
                                            <div className="flex-1 min-w-0">
                                                <p className={`text-sm font-semibold leading-snug ${log.is_completed ? 'line-through text-slate-900/40 dark:text-slate-100/40' : 'text-slate-950 dark:text-slate-50'}`}>
                                                    {log.task_name}
                                                </p>
                                                {log.note && (
                                                    <p className="text-xs text-slate-900/50 dark:text-slate-100/50 mt-1 font-medium italic leading-relaxed">
                                                        {log.note}
                                                    </p>
                                                )}
                                            </div>

                                            {/* Delete */}
                                            <button
                                                onClick={() => handleDelete(log.id)}
                                                className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg text-slate-900/30 dark:text-slate-100/30 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all shrink-0"
                                                title="Delete log"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
            <AuthModal
                isOpen={authModal}
                onClose={() => setAuthModal(false)}
                message="Sign in to save your muhasaba logs"
            />
        </div>
    );
};

export default MuhasabaLogs;
