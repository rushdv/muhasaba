import Head from 'next/head';
import { useState, useEffect } from 'react';

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
    <div className="min-h-screen cyber-grid bg-background text-foreground p-4 md:p-8">
      <Head>
        <title>Muhasaba | Ramadan Planner</title>
      </Head>

      <header className="max-w-6xl mx-auto mb-12 flex justify-between items-end border-b border-emerald/30 pb-6">
        <div>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-emerald italic">
            Muhasaba <span className="text-gold">Planner</span>
          </h1>
          <p className="text-emerald/60 mt-2 font-mono tracking-widest uppercase text-xs sm:text-sm">
            Self-Realization System // Ramadan 1445
          </p>
        </div>
        <div className="text-right hidden sm:block">
          <div className="text-gold font-mono text-xl">DAY 01 - 30</div>
          <div className="text-emerald/40 text-xs uppercase tracking-widest mt-1">Status: Active</div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-4">
          {days.map((day) => {
            const dateStr = `2024-03-${day.toString().padStart(2, '0')}`; // Example date
            const logEntry = logs.find(l => l.date === dateStr);
            const isCompleted = logEntry ? Object.values(logEntry.prayers).every(p => p) : false;

            return (
              <a
                key={day}
                href={`/day/${day}`}
                className={`
                  group relative aspect-square glass-panel flex flex-col items-center justify-center 
                  transition-all duration-300 hover:scale-105 hover:border-gold/50 hover:shadow-[0_0_30px_rgba(250,204,21,0.2)]
                  ${isCompleted ? 'border-gold bg-gold/5' : 'border-emerald/20'}
                `}
              >
                <span className="absolute top-2 left-2 text-[10px] font-mono text-emerald/40 group-hover:text-gold/60 transition-colors">
                  #{day.toString().padStart(2, '0')}
                </span>

                <div className={`
                  text-3xl md:text-4xl font-black 
                  ${isCompleted ? 'text-gold gold-glow' : 'text-emerald/60'}
                `}>
                  {day}
                </div>

                <div className="mt-2 flex gap-1">
                  {[1, 2, 3, 4, 5].map((p) => (
                    <div
                      key={p}
                      className={`h-1 w-2 rounded-full ${isCompleted ? 'bg-gold' : 'bg-emerald/20'}`}
                    />
                  ))}
                </div>

                {/* Decorative corners */}
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-emerald/0 group-hover:border-gold/40 transition-all" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-emerald/0 group-hover:border-gold/40 transition-all" />
              </a>
            );
          })}
        </div>
      </main>

      <footer className="max-w-6xl mx-auto mt-20 border-t border-emerald/10 pt-8 text-center text-emerald/30 font-mono text-xs tracking-[0.2em] uppercase">
        System v1.0.4 // Spiritual Analytics Enabled
      </footer>
    </div>
  );
}
