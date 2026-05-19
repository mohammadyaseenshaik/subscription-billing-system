import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserPlus, Zap, Eye, EyeOff, AlertCircle, Check } from 'lucide-react';

const RegisterPage = () => {
    const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const passwordStrength = (pwd) => {
        let score = 0;
        if (pwd.length >= 8) score++;
        if (/[A-Z]/.test(pwd)) score++;
        if (/[0-9]/.test(pwd)) score++;
        if (/[^A-Za-z0-9]/.test(pwd)) score++;
        return score;
    };
    const strength = passwordStrength(form.password);
    const strengthLabel = ['', 'Weak', 'Fair', 'Good', 'Strong'][strength];
    const strengthColor = ['', 'bg-red-500', 'bg-amber-500', 'bg-blue-500', 'bg-emerald-500'][strength];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (form.password !== form.confirmPassword) {
            return setError('Passwords do not match.');
        }
        if (form.password.length < 6) {
            return setError('Password must be at least 6 characters.');
        }
        setLoading(true);
        try {
            await register({ name: form.name, email: form.email, password: form.password, role: 'USER' });
            setSuccess(true);
            setTimeout(() => navigate('/login'), 2000);
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed. This email may already be in use.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 flex items-center justify-center p-4">
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-violet-600/20 blur-3xl" />
                <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-blue-600/20 blur-3xl" />
            </div>

            <div className="relative w-full max-w-md animate-in">
                {/* Logo */}
                <div className="flex flex-col items-center mb-8">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-xl shadow-purple-900/50 mb-4">
                        <Zap className="w-7 h-7 text-white" />
                    </div>
                    <h1 className="text-2xl font-bold text-white">Create your account</h1>
                    <p className="text-blue-300 text-sm mt-1">Start managing your subscriptions today</p>
                </div>

                {/* Card */}
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl p-8">

                    {success ? (
                        <div className="flex flex-col items-center justify-center py-6 text-center gap-4">
                            <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                                <Check className="w-8 h-8 text-emerald-400" />
                            </div>
                            <div>
                                <p className="text-white font-bold text-lg">Account Created!</p>
                                <p className="text-blue-300 text-sm mt-1">Redirecting to login...</p>
                            </div>
                        </div>
                    ) : (
                        <>
                            {error && (
                                <div className="flex items-start gap-3 p-4 mb-5 text-sm text-red-300 bg-red-500/10 rounded-xl border border-red-500/20">
                                    <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                                    {error}
                                </div>
                            )}

                            <form className="space-y-4" onSubmit={handleSubmit}>
                                <div>
                                    <label className="block text-sm font-medium text-blue-200 mb-1.5">Full Name</label>
                                    <input
                                        type="text"
                                        value={form.name}
                                        onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))}
                                        className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-blue-300/50 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/60 focus:border-violet-400/60 transition"
                                        placeholder="John Doe"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-blue-200 mb-1.5">Email Address</label>
                                    <input
                                        type="email"
                                        value={form.email}
                                        onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))}
                                        className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-blue-300/50 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/60 focus:border-violet-400/60 transition"
                                        placeholder="john.doe@example.com"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-blue-200 mb-1.5">Password</label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            value={form.password}
                                            onChange={(e) => setForm(f => ({ ...f, password: e.target.value }))}
                                            className="w-full px-4 py-3 pr-11 rounded-xl bg-white/10 border border-white/20 text-white placeholder-blue-300/50 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/60 focus:border-violet-400/60 transition"
                                            placeholder="••••••••"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-300/70 hover:text-blue-200 transition"
                                        >
                                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                        </button>
                                    </div>
                                    {/* Password Strength */}
                                    {form.password && (
                                        <div className="mt-2">
                                            <div className="flex gap-1">
                                                {[1, 2, 3, 4].map(i => (
                                                    <div
                                                        key={i}
                                                        className={`h-1 flex-1 rounded-full transition-all duration-300 ${i <= strength ? strengthColor : 'bg-white/20'}`}
                                                    />
                                                ))}
                                            </div>
                                            <p className={`text-xs mt-1 font-medium ${
                                                strength === 1 ? 'text-red-400' :
                                                strength === 2 ? 'text-amber-400' :
                                                strength === 3 ? 'text-blue-400' : 'text-emerald-400'
                                            }`}>{strengthLabel}</p>
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-blue-200 mb-1.5">Confirm Password</label>
                                    <input
                                        type="password"
                                        value={form.confirmPassword}
                                        onChange={(e) => setForm(f => ({ ...f, confirmPassword: e.target.value }))}
                                        className={`w-full px-4 py-3 rounded-xl bg-white/10 border text-white placeholder-blue-300/50 text-sm focus:outline-none focus:ring-2 transition ${
                                            form.confirmPassword && form.confirmPassword !== form.password
                                                ? 'border-red-500/50 focus:ring-red-500/40'
                                                : 'border-white/20 focus:ring-violet-500/60 focus:border-violet-400/60'
                                        }`}
                                        placeholder="••••••••"
                                        required
                                    />
                                    {form.confirmPassword && form.confirmPassword !== form.password && (
                                        <p className="text-xs text-red-400 mt-1">Passwords do not match</p>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    id="register-submit-btn"
                                    disabled={loading}
                                    className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white text-sm font-semibold hover:from-violet-500 hover:to-purple-500 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-purple-900/50 mt-2"
                                >
                                    {loading ? (
                                        <svg className="animate-spin w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                        </svg>
                                    ) : (
                                        <UserPlus className="w-4 h-4" />
                                    )}
                                    {loading ? 'Creating account...' : 'Create Account'}
                                </button>
                            </form>

                            <p className="text-sm text-blue-300/70 text-center mt-6">
                                Already have an account?{' '}
                                <Link to="/login" className="text-violet-400 hover:text-violet-300 font-semibold transition">
                                    Sign in
                                </Link>
                            </p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
