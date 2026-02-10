import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Moon, Shield, User, Mail, Lock, ArrowRight, Eye, EyeOff } from "lucide-react";
import { login, signup } from "../api/auth";
import api from "../api/client";
import ThemeToggle from "../components/ThemeToggle";
import IslamicLogo from "../components/IslamicLogo";

const Login = () => {
    const [isSignup, setIsSignup] = useState(false);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();
    const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

    // =========================
    // Email / Password Login
    // =========================
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            if (isSignup) {
                await signup(username, email, password);
            } else {
                await login(email, password);
            }
            navigate("/dashboard");
        } catch (err) {
            setError(
                err.response?.data?.detail ||
                "Authentication failed. Please check your details."
            );
        } finally {
            setLoading(false);
        }
    };

    // =========================
    // Google Login
    // =========================

    // =========================
    // Google Login (Native Implementation)
    // =========================
    const handleGoogleLogin = async (response) => {
        setError("");
        try {
            const res = await api.post(
                "/api/auth/google",
                { token: response.credential }
            );

            localStorage.setItem("token", res.data.access_token);
            navigate("/dashboard");
        } catch (err) {
            console.error("Google Login Error:", err);
            setError(
                err.response?.data?.detail ||
                "Google authentication failed. Please try again."
            );
        }
    };

    React.useEffect(() => {
        /* global google */
        if (window.google && googleClientId) {
            google.accounts.id.initialize({
                client_id: googleClientId,
                callback: handleGoogleLogin,
            });

            google.accounts.id.renderButton(
                document.getElementById("google-btn"),
                {
                    theme: "outline",
                    size: "large",
                    shape: "pill",
                    width: "240"
                }
            );
        }
    }, [googleClientId]);

    const handleGoogleSuccess = () => { }; // Replaced by handleGoogleLogin

    return (
        <div className="min-h-screen bg-transparent flex items-center justify-center p-6 relative transition-colors duration-1000">
            {/* Theme Toggle */}
            <div className="absolute top-6 right-6 z-50">
                <ThemeToggle />
            </div>

            <div className="max-w-md w-full celestial-card border-beam p-10 md:p-12 relative overflow-hidden group">
                {/* Glow */}
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-gold-soft/10 rounded-full blur-3xl group-hover:bg-gold-soft/20 transition-all duration-700" />

                {/* Header */}
                <div className="text-center mb-8 relative z-10">
                    <div className="w-16 h-16 bg-slate-950 dark:bg-obsidian-900 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl border border-gold-soft/30 transform transition-transform group-hover:rotate-12">
                        <IslamicLogo size={32} className="text-gold-soft" />
                    </div>

                    <h1 className="text-4xl font-serif font-bold italic mb-2 text-slate-950 dark:text-gold-soft">
                        Muhasabah
                    </h1>

                    <p className="text-[10px] font-bold text-gold-rich tracking-[0.3em] uppercase">
                        {isSignup ? "Create Your Account" : "Islamic Personal Hub"}
                    </p>
                </div>

                {/* Error */}
                {error && (
                    <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 text-red-600 dark:text-red-300 text-[10px] font-bold rounded-2xl flex items-center gap-3 animate-pulse">
                        <Shield size={14} /> {error}
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
                    {isSignup && (
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-slate-900/40 dark:text-slate-100/40 ml-1">
                                Username
                            </label>
                            <div className="relative">
                                <User
                                    size={16}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-900/40 dark:text-slate-100/40 z-20"
                                />
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full islamic-input-modern pl-12"
                                    placeholder="your_name"
                                    required
                                />
                            </div>
                        </div>
                    )}

                    <div className="space-y-2">
                        <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-slate-900/40 dark:text-slate-100/40 ml-1">
                            Email Address
                        </label>
                        <div className="relative">
                            <Mail
                                size={16}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-900/40 dark:text-slate-100/40 z-20"
                            />
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
                        <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-slate-900/40 dark:text-slate-100/40 ml-1">
                            Password
                        </label>
                        <div className="relative">
                            <Lock
                                size={16}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-900/40 dark:text-slate-100/40 z-20"
                            />
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full islamic-input-modern pl-12 pr-12"
                                placeholder="••••••••"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-900/40 dark:text-slate-100/40 hover:text-gold-soft transition-colors z-20"
                            >
                                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full celestial-button flex items-center justify-center gap-3 py-4 md:py-5"
                    >
                        {loading ? (
                            <div className="w-6 h-6 border-2 border-white dark:border-emerald-950 border-t-transparent rounded-full animate-spin" />
                        ) : (
                            <>
                                <span className="uppercase tracking-[0.2em] text-xs font-bold">
                                    {isSignup ? "Begin the Journey" : "Sign In to Hub"}
                                </span>
                                <ArrowRight size={16} />
                            </>
                        )}
                    </button>

                    {/* Toggle */}
                    <button
                        type="button"
                        onClick={() => {
                            setIsSignup(!isSignup);
                            setError("");
                        }}
                        className="w-full text-[10px] font-bold uppercase tracking-widest text-emerald-900/40 dark:text-emerald-100/40 hover:text-gold-rich dark:hover:text-gold-soft transition-colors"
                    >
                        {isSignup
                            ? "Already have an account? Sign In"
                            : "Don't have an account? Sign Up"}
                    </button>
                </form>

                {/* Divider */}
                <div className="mt-8 relative z-10">
                    <div className="relative flex items-center justify-center mb-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gold-soft/10"></div>
                        </div>
                        <span className="relative px-4 bg-white/40 dark:bg-obsidian-900/40 text-[10px] font-bold uppercase tracking-widest text-slate-900/30 dark:text-slate-100/30">
                            Or continue with
                        </span>
                    </div>

                    {/* Google Login */}
                    <div className="flex justify-center">
                        <div id="google-btn"></div>
                    </div>
                </div>

                <p className="mt-10 text-center text-[10px] text-slate-900/20 dark:text-slate-100/20 font-bold uppercase tracking-[0.3em]">
                    Spiritual Excellence & Devotion
                </p>
            </div>
        </div>
    );
};

export default Login;
