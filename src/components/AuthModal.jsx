import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, ArrowRight, Mail, Lock, User, Eye, EyeOff, Shield } from 'lucide-react';
import { signIn, signUp } from '../lib/authClient';
import { useLanguage } from '../context/LanguageContext';
import IslamicLogo from './IslamicLogo';

const GoogleIcon = () => (
    <svg viewBox="0 0 24 24" className="w-4 h-4" xmlns="http://www.w3.org/2000/svg">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
);

/**
 * AuthModal — shown when a guest tries to perform an action that requires login.
 * Props:
 *   isOpen: boolean
 *   onClose: () => void
 *   message: string — why login is needed (e.g. "Save your progress")
 */
const AuthModal = ({ isOpen, onClose, message }) => {
    const { t } = useLanguage();
    const navigate = useNavigate();
    const [isSignup, setIsSignup] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            if (isSignup) {
                const { error: err } = await signUp.email({ name, email, password });
                if (err) throw new Error(err.message);
            } else {
                const { error: err } = await signIn.email({ email, password });
                if (err) throw new Error(err.message);
            }
            onClose();
            // Reload page so session is picked up
            window.location.reload();
        } catch (err) {
            setError(err.message || t('auth.authFailed'));
        } finally {
            setLoading(false);
        }
    };

    const handleGoogle = async () => {
        setError('');
        setGoogleLoading(true);
        try {
            await signIn.social({
                provider: 'google',
                callbackURL: `${window.location.href}`,
            });
        } catch (err) {
            setError(err.message || t('auth.googleAuthFailed'));
            setGoogleLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative w-full max-w-md celestial-card border-beam p-6 md:p-10 overflow-hidden">
                {/* Glow */}
                <div className="absolute -top-16 -right-16 w-40 h-40 bg-gold-soft/10 rounded-full blur-3xl pointer-events-none" />

                {/* Close */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 rounded-xl text-slate-900/40 dark:text-slate-100/40 hover:bg-gold-soft/10 transition-colors"
                >
                    <X size={18} />
                </button>

                {/* Header */}
                <div className="text-center mb-6 relative z-10">
                    <div className="w-14 h-14 bg-slate-950 dark:bg-obsidian-900 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-gold-soft/30 shadow-lg">
                        <IslamicLogo size={36} className="text-gold-soft" />
                    </div>
                    <h2 className="text-2xl font-serif font-bold italic text-slate-950 dark:text-gold-soft mb-1">
                        {isSignup ? t('auth.createAccount') : t('auth.signInToHub')}
                    </h2>
                    {message && (
                        <p className="text-[11px] font-bold uppercase tracking-widest text-gold-rich mt-2">
                            {message}
                        </p>
                    )}
                </div>

                {/* Error */}
                {error && (
                    <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 text-red-600 dark:text-red-300 text-[10px] font-bold rounded-xl flex items-center gap-2">
                        <Shield size={12} /> {error}
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
                    {isSignup && (
                        <div className="relative">
                            <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-900/40 dark:text-slate-100/40" />
                            <input
                                type="text"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                placeholder={t('auth.username')}
                                required
                                minLength={2}
                                className="w-full islamic-input-modern pl-10 py-3 text-sm"
                            />
                        </div>
                    )}
                    <div className="relative">
                        <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-900/40 dark:text-slate-100/40" />
                        <input
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder={t('auth.email')}
                            required
                            className="w-full islamic-input-modern pl-10 py-3 text-sm"
                        />
                    </div>
                    <div className="relative">
                        <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-900/40 dark:text-slate-100/40" />
                        <input
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            placeholder={t('auth.password')}
                            required
                            minLength={8}
                            className="w-full islamic-input-modern pl-10 pr-10 py-3 text-sm"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-900/40 dark:text-slate-100/40 hover:text-gold-soft transition-colors"
                        >
                            {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                        </button>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full celestial-button flex items-center justify-center gap-2 py-3"
                    >
                        {loading ? (
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                            <>
                                <span className="uppercase tracking-widest text-[11px] font-bold">
                                    {isSignup ? t('auth.beginJourney') : t('auth.signInToHub')}
                                </span>
                                <ArrowRight size={14} />
                            </>
                        )}
                    </button>

                    <button
                        type="button"
                        onClick={() => { setIsSignup(!isSignup); setError(''); }}
                        className="w-full text-[10px] font-bold uppercase tracking-widest text-slate-900/40 dark:text-slate-100/40 hover:text-gold-rich transition-colors"
                    >
                        {isSignup ? t('auth.alreadyHaveAccount') : t('auth.dontHaveAccount')}
                    </button>
                </form>

                {/* Divider */}
                <div className="mt-5 relative z-10">
                    <div className="relative flex items-center justify-center mb-4">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gold-soft/10" />
                        </div>
                        <span className="relative px-3 bg-white/40 dark:bg-obsidian-900/40 text-[10px] font-bold uppercase tracking-widest text-slate-900/30 dark:text-slate-100/30">
                            {t('auth.orContinueWith')}
                        </span>
                    </div>

                    <button
                        type="button"
                        onClick={handleGoogle}
                        disabled={googleLoading}
                        className="w-full flex items-center justify-center gap-3 px-4 py-2.5 bg-white dark:bg-slate-800 border border-gold-soft/20 rounded-xl text-sm font-bold text-slate-900 dark:text-slate-100 hover:bg-gold-soft/5 transition-all disabled:opacity-60"
                    >
                        {googleLoading ? (
                            <div className="w-4 h-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin" />
                        ) : <GoogleIcon />}
                        <span>Continue with Google</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AuthModal;
