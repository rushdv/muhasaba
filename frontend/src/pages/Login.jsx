import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Moon, Shield } from 'lucide-react';
import { login } from '../api/auth';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await login(email, password);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.detail || 'Invalid credentials. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-marfil celestial-pattern flex items-center justify-center p-6">
            <div className="max-w-md w-full celestial-card p-12 relative overflow-hidden group">
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-gold-soft/10 rounded-full blur-3xl group-hover:bg-gold-soft/20 transition-all duration-700" />

                <div className="text-center mb-10 relative z-10">
                    <div className="w-20 h-20 bg-emerald-950 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl border border-gold-soft/30 transform transition-transform group-hover:rotate-12">
                        <Moon size={40} className="text-gold-soft" fill="currentColor" />
                    </div>
                    <h1 className="text-4xl font-serif font-bold italic mb-2 text-emerald-950">Muhasaba</h1>
                    <p className="text-sm font-medium text-gold-rich tracking-widest uppercase mb-8">Celestial Ramadan Hub</p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 text-xs font-bold rounded-2xl flex items-center gap-3">
                        <Shield size={16} /> {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                    <div className="space-y-2">
                        <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-emerald-900/40 ml-1">Email Address</label>
                        <div className="relative">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full islamic-input-modern"
                                placeholder="name@example.com"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-emerald-900/40 ml-1">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full islamic-input-modern"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full celestial-button flex items-center justify-center gap-3 relative overflow-hidden group/btn"
                    >
                        {loading ? (
                            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                            <>
                                <span>Enter the Sanctuary</span>
                            </>
                        )}
                    </button>
                </form>

                <p className="mt-8 text-center text-[11px] text-emerald-900/40 font-bold uppercase tracking-widest">
                    Spiritual Excellence & Devotion
                </p>
            </div>
        </div>
    );
};

export default Login;
