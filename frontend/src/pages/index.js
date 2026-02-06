import Head from 'next/head';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLogs() {
      try {
        const res = await fetch('http://localhost:8000/logs/');
        if (res.ok) {
          const data = await res.json();
          setLogs(data);
        }
      } catch (err) {
        console.error("Failed to fetch logs", err);
      } finally {
        setLoading(false);
      }
    }
    fetchLogs();
  }, []);

  const days = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Decorative background pattern */}
      <div className="absolute inset-0 spiritual-pattern pointer-events-none" />

      <Head>
        <title>Muhasaba | Ramadan 1445</title>
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Inter:wght@400;600;800&display=swap" rel="stylesheet" />
      </Head>

      <header className="relative pt-12 pb-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-block px-4 py-1 border border-gold/30 rounded-full text-gold text-xs font-bold tracking-widest uppercase mb-4">
            Ramadan 1445 AH
          </div>
          <h1 className="text-5xl md:text-7xl font-serif text-forest mb-4">
            Muhasaba
          </h1>
          <p className="text-forest/60 max-w-lg mx-auto leading-relaxed">
            Reflecting on our spiritual journey through the holy month.
            Track your progress, build habits, and find peace.
          </p>
        </div>
      </header>

      <main className="relative max-w-6xl mx-auto px-4 pb-24">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-6">
          {days.map((day) => {
            const dateStr = `2024-03-${day.toString().padStart(2, '0')}`;
            const logEntry = logs.find(l => l.date === dateStr);
            const isCompleted = logEntry ? Object.values(logEntry.prayers).every(p => p) : false;

            return (
              <Link
                key={day}
                href={`/day/${day}`}
                className={`
                  group islamic-card rounded-2xl flex flex-col items-center justify-center p-6
                  ${isCompleted ? 'bg-forest text-white ring-4 ring-gold/20' : 'bg-white text-forest'}
                `}
              >
                <span className={`text-xs font-mono mb-2 ${isCompleted ? 'text-sage/60' : 'text-forest/30'}`}>
                  DAY
                </span>
                <span className="text-4xl font-black mb-4">
                  {day.toString().padStart(2, '0')}
                </span>

                <div className="flex gap-1.5">
                  {[1, 2, 3, 4, 5].map((p) => (
                    <div
                      key={p}
                      className={`h-1.5 w-1.5 rounded-full ${isCompleted ? 'bg-gold' : 'bg-forest/10 group-hover:bg-gold/40'}`}
                    />
                  ))}
                </div>

                {isCompleted && (
                  <div className="mt-3 text-[10px] uppercase tracking-tighter text-gold font-bold">
                    Completed
                  </div>
                )}
              </Link>
            );
          })}
        </div>
      </main>

      <footer className="relative py-12 border-t border-forest/5 text-center">
        <p className="text-forest/30 text-xs font-mono uppercase tracking-widest">
          Muhasaba // Premium Spiritual Planner
        </p>
      </footer>
    </div>
  );
}
