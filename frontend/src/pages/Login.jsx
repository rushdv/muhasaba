import { useState } from "react";
import { login } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { LogIn, Mail, Lock, Sparkles } from "lucide-react";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const nav = useNavigate();

    const submit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            await login(email, password);
            nav("/dashboard");
        } catch (err) {
            setError("Invalid email or password. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 islamic-pattern bg-parchment relative overflow-hidden">
            {/* Decorative Orbs */}
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-100 rounded-full blur-3xl opacity-50" />
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-emerald-200 rounded-full blur-3xl opacity-30" />

            <div className="w-full max-w-md relative z-10">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-800 text-parchment mb-4 shadow-lg ring-8 ring-emerald-50">
                        <Sparkles size={32} />
                    </div>
                    <h1 className="text-4xl font-bold text-emerald-900 mb-2">Muhasaba</h1>
                    <p className="text-emerald-700 italic font-medium">Spiritual Accountability & Growth</p>
                </div>

                <div className="islamic-card p-8 shadow-2xl">
                    <h2 className="text-2xl font-semibold text-emerald-800 mb-6 text-center">Welcome Back</h2>

                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={submit} className="space-y-5">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-emerald-800 ml-1">Email Address</label>
                            <div className="relative">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-600">
                                    <Mail size={18} />
                                </div>
                                <input
                                    type="email"
                                    required
                                    placeholder="name@example.com"
                                    className="w-full pl-10 islamic-input"
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-emerald-800 ml-1">Password</label>
                            <div className="relative">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-600">
                                    <Lock size={18} />
                                </div>
                                <input
                                    type="password"
                                    required
                                    placeholder="••••••••"
                                    className="w-full pl-10 islamic-input"
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between text-sm py-1">
                            <label className="flex items-center gap-2 text-emerald-700 cursor-pointer">
                                <input type="checkbox" className="rounded border-emerald-300 text-emerald-600" />
                                Remember me
                            </label>
                            <a href="#" className="text-emerald-800 font-semibold hover:underline">Forgot password?</a>
                        </div>

                        <button
                            disabled={loading}
                            className="w-full islamic-button flex items-center justify-center gap-2 group"
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-parchment border-t-transparent rounded-full animate-spin" />
                            ) : (
                                <>
                                    <span>Sign In</span>
                                    <LogIn size={18} className="transition-transform group-hover:translate-x-1" />
                                </>
                            )}
                        </button>
                    </form>

                    <p className="mt-8 text-center text-sm text-emerald-700">
                        Don't have an account?{" "}
                        <a href="#" className="text-emerald-800 font-bold hover:underline">Create Account</a>
                    </p>
                </div>

                {/* Footer Quote */}
                <p className="mt-12 text-center text-emerald-600/60 text-sm italic italic">
                    "He who knows himself, knows his Lord."
                </p>
            </div>
        </div>
    );
}
