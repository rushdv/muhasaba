import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

export default function DayEntry() {
    const router = useRouter();
    const { id } = router.query;
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        prayers: { fajr: false, dhuhr: false, asr: false, maghrib: false, isha: false },
        quran_pages: 0,
        sunnah_habits: { dhikr: false, dua: false },
        notes: '',
        mood: 'Neutral'
    });

    useEffect(() => {
        if (!id) return;
        // In a real app, we'd fetch existing data for this day
        const dateStr = `2024-03-${id.toString().padStart(2, '0')}`;
        async function fetchData() {
            try {
                const res = await fetch(`http://localhost:8000/logs/${dateStr}`);
                if (res.ok) {
                    const data = await res.json();
                    setFormData(data);
                }
            } catch (err) {
                console.log("No existing data for this day");
            }
        }
        fetchData();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const dateStr = `2024-03-${id.toString().padStart(2, '0')}`;

        try {
            const res = await fetch('http://localhost:8000/logs/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, date: dateStr })
            });
            if (res.ok) {
                router.push('/');
            }
        } catch (err) {
            alert("Failed to save log");
        } finally {
            setLoading(false);
        }
    };

    const togglePrayer = (p) => {
        setFormData({
            ...formData,
            prayers: { ...formData.prayers, [p]: !formData.prayers[p] }
        });
    };

    if (!id) return null;

    return (
        <div className="min-h-screen bg-background text-foreground cyber-grid p-4 md:p-8">
            <Head>
                <title>Day {id} | Muhasaba</title>
            </Head>

            <header className="max-w-3xl mx-auto mb-10 flex items-center gap-6">
                <button
                    onClick={() => router.push('/')}
                    className="glass-panel w-12 h-12 flex items-center justify-center text-emerald hover:text-gold transition-colors"
                >
                    ←
                </button>
                <div>
                    <h1 className="text-3xl md:text-5xl font-black text-emerald uppercase italic">
                        Day <span className="text-gold">{id.padStart(2, '0')}</span>
                    </h1>
                    <p className="text-emerald/40 font-mono text-xs uppercase tracking-widest">Entry Protocol // Ramadan 1445</p>
                </div>
            </header>

            <main className="max-w-3xl mx-auto">
                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Prayers Section */}
                    <section className="glass-panel p-6 border-l-4 border-l-emerald">
                        <h2 className="text-xl font-bold text-emerald uppercase mb-6 flex items-center gap-2">
                            <span className="w-2 h-2 bg-gold animate-pulse" /> Daily Prayers
                        </h2>
                        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                            {['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'].map((p) => (
                                <button
                                    key={p}
                                    type="button"
                                    onClick={() => togglePrayer(p)}
                                    className={`
                    p-3 border font-mono text-xs uppercase tracking-tighter transition-all
                    ${formData.prayers[p]
                                            ? 'bg-emerald text-cyber-dark border-emerald shadow-[0_0_15px_rgba(16,185,129,0.4)]'
                                            : 'border-emerald/30 text-emerald/60 hover:border-emerald'}
                  `}
                                >
                                    {p}
                                </button>
                            ))}
                        </div>
                    </section>

                    {/* Quran & Habits */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <section className="glass-panel p-6 border-l-4 border-l-gold">
                            <h2 className="text-xl font-bold text-gold uppercase mb-6">Quran Pages</h2>
                            <input
                                type="number"
                                value={formData.quran_pages}
                                onChange={(e) => setFormData({ ...formData, quran_pages: parseInt(e.target.value) || 0 })}
                                className="w-full bg-cyber-dark border border-gold/30 p-4 text-gold text-2xl font-black focus:border-gold outline-none transition-all"
                            />
                        </section>

                        <section className="glass-panel p-6 border-l-4 border-l-emerald">
                            <h2 className="text-xl font-bold text-emerald uppercase mb-6">Sunnah Habits</h2>
                            <div className="space-y-3">
                                {Object.keys(formData.sunnah_habits).map((h) => (
                                    <button
                                        key={h}
                                        type="button"
                                        onClick={() => setFormData({
                                            ...formData,
                                            sunnah_habits: { ...formData.sunnah_habits, [h]: !formData.sunnah_habits[h] }
                                        })}
                                        className={`
                      w-full p-3 border font-mono text-xs uppercase text-left transition-all
                      ${formData.sunnah_habits[h]
                                                ? 'bg-emerald/20 text-emerald border-emerald'
                                                : 'border-emerald/20 text-emerald/40'}
                    `}
                                    >
                                        [{formData.sunnah_habits[h] ? 'X' : ' '}] {h}
                                    </button>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Notes */}
                    <section className="glass-panel p-6">
                        <h2 className="text-xl font-bold text-emerald uppercase mb-6">Daily Realization</h2>
                        <textarea
                            value={formData.notes}
                            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                            placeholder="What did you learn today?"
                            className="w-full bg-cyber-dark border border-emerald/20 p-4 text-emerald/80 h-32 focus:border-emerald outline-none transition-all resize-none"
                        />
                    </section>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-5 bg-emerald text-cyber-dark font-black text-xl uppercase tracking-widest hover:bg-gold transition-colors emerald-glow"
                    >
                        {loading ? 'Transmitting...' : 'Upload Entry'}
                    </button>
                </form>
            </main>
        </div>
    );
}
