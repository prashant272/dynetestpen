import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { User, Mail, Phone, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { API_BASE_URL } from '../api';
import SEO from '../components/SEO';
import ButtonLoader from '../components/ButtonLoader';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const redirect = new URLSearchParams(location.search).get('redirect') || location.state?.from || '/';

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            return setError('Passwords do not match');
        }

        if (formData.password.length < 6) {
            return setError('Password must be at least 6 characters long');
        }

        try {
            setLoading(true);
            const { data } = await axios.post(`${API_BASE_URL}/auth/register`, {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                password: formData.password,
            });

            localStorage.setItem('userToken', data.token);
            localStorage.setItem('userInfo', JSON.stringify(data));

            if (data.addresses && data.addresses.length > 0) {
                const defaultAddr = data.addresses.find(a => a.isDefault) || data.addresses[0];
                if (defaultAddr) {
                    localStorage.setItem('shippingAddress', JSON.stringify(defaultAddr));
                }
            }

            navigate(redirect, { replace: true });
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-80px)] flex items-start justify-center bg-[#F5F8FC] px-4 pt-10 pb-16 font-sans">
            <SEO
                title="Create Account | ImageTech Industries"
                description="Register an account with ImageTech Industries for surface tension instruments, dyne test pens and B2B industrial solutions."
            />

            <div className="w-full max-w-[440px] bg-white border border-[#DCE5EF] rounded-2xl shadow-xl p-8 sm:p-10">
                {/* Brand Header */}
                <div className="text-center mb-8">
                    <span className="text-[11px] font-extrabold tracking-[0.25em] text-[#0D6EFD] uppercase block mb-1">
                        IMAGETECH INDUSTRIES
                    </span>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-[#172B4D] tracking-tight">
                        Create Account
                    </h1>
                    <p className="text-gray-500 text-xs sm:text-sm mt-1.5 font-medium">
                        Join our client network to manage orders and quotes
                    </p>
                </div>

                {error && (
                    <div className="mb-6 p-3.5 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs font-semibold flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0"></span>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name */}
                    <div>
                        <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-1">Full Name</label>
                        <div className="relative">
                            <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                            <input
                                type="text"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="Enter your full name"
                                className="w-full bg-[#F8FAFC] border border-[#DCE5EF] rounded-xl pl-10 pr-4 py-2.5 text-sm text-[#172B4D] placeholder:text-gray-400 focus:outline-none focus:border-[#0D6EFD] focus:bg-white transition-all font-medium"
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div>
                        <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-1">Email Address</label>
                        <div className="relative">
                            <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                            <input
                                type="email"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                placeholder="name@company.com"
                                className="w-full bg-[#F8FAFC] border border-[#DCE5EF] rounded-xl pl-10 pr-4 py-2.5 text-sm text-[#172B4D] placeholder:text-gray-400 focus:outline-none focus:border-[#0D6EFD] focus:bg-white transition-all font-medium"
                            />
                        </div>
                    </div>

                    {/* Phone */}
                    <div>
                        <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-1">Phone Number</label>
                        <div className="relative">
                            <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                            <input
                                type="tel"
                                required
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                placeholder="e.g. 9876543210"
                                className="w-full bg-[#F8FAFC] border border-[#DCE5EF] rounded-xl pl-10 pr-4 py-2.5 text-sm text-[#172B4D] placeholder:text-gray-400 focus:outline-none focus:border-[#0D6EFD] focus:bg-white transition-all font-medium"
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div>
                        <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-1">Password</label>
                        <div className="relative">
                            <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                required
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                placeholder="Minimum 6 characters"
                                className="w-full bg-[#F8FAFC] border border-[#DCE5EF] rounded-xl pl-10 pr-10 py-2.5 text-sm text-[#172B4D] placeholder:text-gray-400 focus:outline-none focus:border-[#0D6EFD] focus:bg-white transition-all font-medium"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                            >
                                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-1">Confirm Password</label>
                        <div className="relative">
                            <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                            <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                required
                                value={formData.confirmPassword}
                                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                placeholder="Re-enter your password"
                                className="w-full bg-[#F8FAFC] border border-[#DCE5EF] rounded-xl pl-10 pr-10 py-2.5 text-sm text-[#172B4D] placeholder:text-gray-400 focus:outline-none focus:border-[#0D6EFD] focus:bg-white transition-all font-medium"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                            >
                                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full mt-4 bg-[#0D6EFD] hover:bg-blue-600 text-white font-bold py-3 rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 text-sm disabled:opacity-50 cursor-pointer"
                    >
                        {loading ? <ButtonLoader text="Creating Account..." /> : <>Register Account <ArrowRight className="w-4 h-4" /></>}
                    </button>
                </form>

                {/* Login Link */}
                <div className="mt-6 pt-5 border-t border-[#DCE5EF] text-center">
                    <p className="text-xs text-gray-500 font-medium">
                        Already have an account?{' '}
                        <Link to={`/login?redirect=${redirect}`} className="text-[#0D6EFD] hover:underline font-bold">
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
