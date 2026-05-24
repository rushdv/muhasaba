import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, User, Mail, Lock, ArrowRight, Eye, EyeOff } from "lucide-react";
import { signIn, signUp } from "../lib/authClient";
import ThemeToggle from "../components/ThemeToggle";
import IslamicLogo from "../components/IslamicLogo";
import { useLanguage } from "../context/LanguageContext";

// Google "G" SVG icon
const GoogleIcon = () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
);

const Login = () => {
    const { language, toggleLanguage, t } = useLanguage();
    const [isSignup, setIsSignup] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    // =========================
    // Email / Password
    // =========================
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            if (isSignup) {
                const { error: err } = await signUp.email({
                    name,
                    email,
                    password,
                    callbackURL: "/dashboard",
                });
                if (err) throw new Error(err.message);
            } else {
                const { error: err } = await signIn.email({
                    email,
                    password,
                    callbackURL: "/dashboard",
                });
                if (err) throw new Error(err.message);
            }
            navigate("/dashboard");
        } catch (err) {
            setError(err.message || t("auth.authFailed"));
        } finally {
            setLoading(false);
        }
    };

    // =========================
    // Google OAuth
    // =========================
    const handleGoogleLogin = async () => {
        setError("");
        setGoogleLoading(true);
        try {
            await signIn.social({
                provider: "google",
                callbackURL: `${window.location.origin}/dashboard`,
            });
            // Better Auth redirects automatically — no need to navigate()
        } catch (err) {
            setError(err.message || t("auth.googleAuthFailed"));
            setGoogleLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-transparent flex items-center justify-center p-6 relative transition-colors duration-1000">
            {/* Top controls */}
            <div className="absolute top-6 right-6 z-50 flex items-center gap-4">
                <button
                    onClick={toggleLanguage}
                    className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-xl md:rounded-2xl bg-white dark:bg-obsidian-900 border border-gold-soft/20 text-slate-900 dark:text-gold-soft font-bold text-xs md:text-sm hover:bg-gold-soft/5 dark:hover:bg-gold-soft/10 transition-all shadow-sm"
                >
                    {language === "en" ? "BN" : "EN"}
                </button>
                <ThemeToggle />
            </div>

            <div className="max-w-md w-full celestial-card border-beam p-6 md:p-12 relative overflow-hidden group">
                {/* Glow */}
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-gold-soft/10 rounded-full blur-3xl group-hover:bg-gold-soft/20 transition-all duration-700" />

                {/* Header */}
                <div className="text-center mb-8 relative z-10">
                    <div className="w-20 h-20 bg-slate-950 dark:bg-obsidian-900 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl border border-gold-soft/30 transform transition-transform group-hover:rotate-12 overflow-hidden">
                        <IslamicLogo size={56} className="text-gold-soft" />
                    </div>
                    <h1 className="text-4xl font-serif font-bold italic mb-2 text-slate-950 dark:text-gold-soft">
                        {t("common.appName")}
                    </h1>
                    <p className="text-[10px] font-bold text-gold-rich tracking-[0.3em] uppercase">
                        {isSignup ? t("auth.createAccount") : t("auth.islamicHub")}
                    </p>
                </div>

                {/* Error */}
                {error && (
                    <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 text-red-600 dark:text-red-300 text-[10px] font-bold rounded-2xl flex items-center gap-3">
                        <Shield size={14} /> {error}
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
                    {isSignup && (
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-slate-900/40 dark:text-slate-100/40 ml-1">
                                {t("auth.username")}
                            </label>
                            <div className="relative">
                                <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-900/40 dark:text-slate-100/40 z-20" />
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full islamic-input-modern pl-12"
                                    placeholder="Your Name"
                                    required
                                    minLength={2}
                                    maxLength={50}
                                />
                            </div>
                        </div>
                    )}

                    <div className="space-y-2">
                        <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-slate-900/40 dark:text-slate-100/40 ml-1">
                            {t("auth.email")}
                        </label>
                        <div className="relative">
                            <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-900/40 dark:text-slate-100/40 z-20" />
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
                            {t("auth.password")}
                        </label>
                        <div className="relative">
                            <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-900/40 dark:text-slate-100/40 z-20" />
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full islamic-input-modern pl-12 pr-12"
                                placeholder="••••••••"
                                required
                                minLength={8}
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
                                    {isSignup ? t("auth.beginJourney") : t("auth.signInToHub")}
                                </span>
                                <ArrowRight size={16} />
                            </>
                        )}
                    </button>

                    {/* Toggle signup/login */}
                    <button
                        type="button"
                        onClick={() => { setIsSignup(!isSignup); setError(""); }}
                        className="w-full text-[10px] font-bold uppercase tracking-widest text-slate-900/40 dark:text-slate-100/40 hover:text-gold-rich dark:hover:text-gold-soft transition-colors"
                    >
                        {isSignup ? t("auth.alreadyHaveAccount") : t("auth.dontHaveAccount")}
                    </button>
                </form>

                {/* Divider */}
                <div className="mt-8 relative z-10">
                    <div className="relative flex items-center justify-center mb-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gold-soft/10" />
                        </div>
                        <span className="relative px-4 bg-white/40 dark:bg-obsidian-900/40 text-[10px] font-bold uppercase tracking-widest text-slate-900/30 dark:text-slate-100/30">
                            {t("auth.orContinueWith")}
                        </span>
                    </div>

                    {/* Google Button */}
                    <button
                        type="button"
                        onClick={handleGoogleLogin}
                        disabled={googleLoading}
                        className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-white dark:bg-slate-800 border border-gold-soft/20 rounded-2xl text-sm font-bold text-slate-900 dark:text-slate-100 hover:bg-gold-soft/5 dark:hover:bg-gold-soft/10 transition-all shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {googleLoading ? (
                            <div className="w-5 h-5 border-2 border-slate-400 border-t-transparent rounded-full animate-spin" />
                        ) : (
                            <GoogleIcon />
                        )}
                        <span>Continue with Google</span>
                    </button>
                </div>

                <p className="mt-10 text-center text-[10px] text-slate-900/20 dark:text-slate-100/20 font-bold uppercase tracking-[0.3em]">
                    {t("auth.spiritualExcellence")}
                </p>
            </div>
        </div>
    );
};

export default Login;
