import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function DayEntry() {
    const router = useRouter();
    const { id } = router.query;
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        prayers: { fajr: false, dhuhr: false, asr: false, maghrib: false, isha: false },
        quran_pages: 0,
        sunnah_habits: { dhikr: false, dua: false },
        notes: '',
        mood: 'Peaceful'
    });

    useEffect(() => {
        if (!id) return;
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
        <div className="min-h-screen bg-background relative overflow-hidden pb-12">
            <div className="absolute inset-0 spiritual-pattern pointer-events-none" />

            <Head>
                <title>Day {id} | Reflection</title>
                <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Inter:wght@400;600&display=swap" rel="stylesheet" />
            </Head>

            <header className="relative max-w-2xl mx-auto pt-10 px-4 mb-10 flex items-center justify-between">
                <Link href="/" className="h-10 w-10 flex items-center justify-center rounded-full bg-white border border-forest/10 text-forest hover:bg-forest hover:text-white transition-all shadow-sm">
                    ←
                </Link>
                <div className="text-right">
                    <h1 className="text-3xl font-serif text-forest">Day {id.padStart(2, '0')}</h1>
                    <p className="text-[10px] uppercase tracking-widest text-gold font-bold">Ramadan reflection</p>
                </div>
            </header>

            <main className="relative max-w-2xl mx-auto px-4">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Prayers Section */}
                    <section className="bg-white p-8 rounded-3xl shadow-sm border border-forest/5">
                        <h2 className="text-lg font-serif text-forest mb-6 flex items-center gap-3">
                            <span className="h-2 w-2 rounded-full bg-gold" /> Salah Tracking
                        </h2>
                        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                            {['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'].map((p) => (
                                <button
                                    key={p}
                                    type="button"
                                    onClick={() => togglePrayer(p)}
                                    className={`
                    py-3 rounded-xl border font-sans text-xs font-semibold uppercase tracking-wider transition-all
                    ${formData.prayers[p]
                                            ? 'bg-forest text-white border-forest shadow-md'
                                            : 'bg-white border-forest/10 text-forest/40 hover:border-forest/30'}
                  `}
                                >
                                    {p}
                                </button>
                            ))}
                        </div>
                    </section>

                    {/* Quran & Habits */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <section className="bg-white p-8 rounded-3xl shadow-sm border border-forest/5">
                            <h2 className="text-lg font-serif text-forest mb-4">Quran Pages</h2>
                            <input
                                type="number"
                                value={formData.quran_pages}
                                onChange={(e) => setFormData({ ...formData, quran_pages: parseInt(e.target.value) || 0 })}
                                className="w-full bg-sand/30 border-b-2 border-forest/10 py-2 text-3xl font-bold text-forest focus:border-gold outline-none transition-all placeholder-forest/10"
                                placeholder="0"
                            />
                        </section>

                        <section className="bg-white p-8 rounded-3xl shadow-sm border border-forest/5">
                            <h2 className="text-lg font-serif text-forest mb-4">Daily Habits</h2>
                            <div className="flex flex-wrap gap-2">
                                {Object.keys(formData.sunnah_habits).map((h) => (
                                    <button
                                        key={h}
                                        type="button"
                                        onClick={() => setFormData({
                                            ...formData,
                                            sunnah_habits: { ...formData.sunnah_habits, [h]: !formData.sunnah_habits[h] }
                                        })}
                                        className={`
                      px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all
                      ${formData.sunnah_habits[h]
                                                ? 'bg-gold text-white shadow-sm'
                                                : 'bg-sand/50 text-forest/40 hover:bg-sand'}
                    `}
                                    >
                                        {h}
                                    </button>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Notes */}
                    <section className="bg-white p-8 rounded-3xl shadow-sm border border-forest/5">
                        <h2 className="text-lg font-serif text-forest mb-4">Daily Realization</h2>
                        <textarea
                            value={formData.notes}
                            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                            placeholder="What touched your heart today?"
                            className="w-full bg-sand/10 border border-forest/5 p-4 text-forest/80 h-32 rounded-2xl focus:border-forest/20 outline-none transition-all resize-none italic"
                        />
                    </section>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-5 bg-forest text-white rounded-2xl font-bold text-lg uppercase tracking-[0.2em] shadow-xl hover:bg-forest/90 transition-all active:scale-[0.98]"
                    >
                        {loading ? 'Saving...' : 'Submit Entry'}
                    </button>
                </form>
            </main>
        </div>
    );
}
