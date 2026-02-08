import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Moon, Shield, User, Mail, Lock, ArrowRight } from 'lucide-react';
import { login, signup } from '../api/auth';

const Login = () => {
    const [isSignup, setIsSignup] = useState(false);
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            if (isSignup) {
                await signup(username, email, password);
            } else {
                await login(email, password);
            }
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.detail || 'Authentication failed. Please check your details.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-marfil celestial-pattern flex items-center justify-center p-6">
            <div className="max-w-md w-full celestial-card p-10 md:p-12 relative overflow-hidden group">
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-gold-soft/10 rounded-full blur-3xl group-hover:bg-gold-soft/20 transition-all duration-700" />

                <div className="text-center mb-8 relative z-10">
                    <div className="w-16 h-16 bg-emerald-950 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl border border-gold-soft/30 transform transition-transform group-hover:rotate-12">
                        <Moon size={32} className="text-gold-soft" fill="currentColor" />
                    </div>
                    <h1 className="text-4xl font-serif font-bold italic mb-2 text-emerald-950">Muhasaba</h1>
                    <p className="text-[10px] font-bold text-gold-rich tracking-[0.3em] uppercase">{isSignup ? 'Create Your Account' : 'Islamic Personal Hub'}</p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 text-[10px] font-bold rounded-2xl flex items-center gap-3 animate-pulse">
                        <Shield size={14} /> {typeof error === 'string' ? error : JSON.stringify(error)}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
                    {isSignup && (
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-emerald-900/40 ml-1">Username</label>
                            <div className="relative group/input">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-900/20 group-focus-within/input:text-gold-soft transition-colors">
                                    <User size={16} />
                                </div>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full islamic-input-modern pl-12"
                                    placeholder="your_name"
                                    required={isSignup}
                                />
                            </div>
                        </div>
                    )}

                    <div className="space-y-2">
                        <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-emerald-900/40 ml-1">Email Address</label>
                        <div className="relative group/input">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-900/20 group-focus-within/input:text-gold-soft transition-colors">
                                <Mail size={16} />
                            </div>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full islamic-input-modern pl-12"
                                placeholder="name@example.com"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-emerald-900/40 ml-1">Password</label>
                        <div className="relative group/input">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-900/20 group-focus-within/input:text-gold-soft transition-colors">
                                <Lock size={16} />
                            </div>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full islamic-input-modern pl-12"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full celestial-button flex items-center justify-center gap-3 relative overflow-hidden group/btn py-4 md:py-5"
                    >
                        {loading ? (
                            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                            <>
                                <span className="uppercase tracking-[0.2em] text-xs font-bold">{isSignup ? 'Begin the Journey' : 'Sign In to Hub'}</span>
                                <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                            </>
                        )}
                    </button>

                    <button
                        type="button"
                        onClick={() => {
                            setIsSignup(!isSignup);
                            setError('');
                        }}
                        className="w-full text-[10px] font-bold uppercase tracking-widest text-emerald-900/40 hover:text-gold-rich transition-colors text-center"
                    >
                        {isSignup ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
                    </button>
                </form>

                <div className="mt-8 relative z-10">
                    <div className="relative flex items-center justify-center mb-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gold-soft/10"></div>
                        </div>
                        <span className="relative px-4 bg-white/40 text-[10px] font-bold uppercase tracking-widest text-emerald-900/30">Or quick access</span>
                    </div>

                    <button
                        type="button"
                        onClick={() => alert("To enable Google Sign-in:\n1. Create a project in Google Cloud Console\n2. Get Client ID & Secret\n3. Configure .env in backend")}
                        className="w-full flex items-center justify-center gap-4 bg-white border border-gold-soft/20 py-4 rounded-2xl text-[10px] font-bold uppercase tracking-widest text-emerald-900 hover:bg-gold-soft/5 transition-all shadow-sm"
                    >
                        <svg className="w-4 h-4" viewBox="0 0 24 24">
                            <path
                                fill="currentColor"
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                style={{ fill: '#4285F4' }}
                            />
                            <path
                                fill="currentColor"
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                style={{ fill: '#34A853' }}
                            />
                            <path
                                fill="currentColor"
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                style={{ fill: '#FBBC05' }}
                            />
                            <path
                                fill="currentColor"
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                style={{ fill: '#EA4335' }}
                            />
                        </svg>
                        Sign in with Google
                    </button>
                </div>

                <p className="mt-10 text-center text-[10px] text-emerald-900/20 font-bold uppercase tracking-[0.3em]">
                    Spiritual Excellence & Devotion
                </p>
            </div>
        </div>
    );
};

export default Login;
