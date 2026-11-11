import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../../api';
import { Lock, Eye, EyeOff, ShieldCheck } from 'lucide-react';
import SEO from '../../components/SEO';

const AdminLogin = () => {
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            // Strict Backend Authentication & Token Generation
            const response = await axios.post(`${API_BASE_URL}/admin/login`, {
                password
            });

            if (response.data.success && response.data.token) {
                // Save genuine backend JWT token
                localStorage.setItem('adminToken', response.data.token);
                if (response.data.admin) {
                    localStorage.setItem('adminInfo', JSON.stringify(response.data.admin));
                }
                navigate('/admin/dashboard');
            } else {
                setError(response.data.message || 'Login failed. Please check credentials.');
            }
        } catch (err) {
            console.error('Admin login error:', err);
            const msg = err.response?.data?.message || 'Server error. Please verify backend is running.';
            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#F5F8FC] flex items-center justify-center p-4 font-sans">
            <SEO title="Admin Login | ImageTech Industries" />
            <div className="w-full max-w-md bg-white border border-[#DCE5EF] rounded-2xl shadow-xl p-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 text-[#0D6EFD] rounded-2xl mb-4 border border-blue-100">
                        <Lock className="w-8 h-8" />
                    </div>
                    <h1 className="text-2xl font-bold text-[#172B4D]">ImageTech Admin</h1>
                    <p className="text-sm text-gray-500 mt-1">Enter master password to access industrial console</p>
                </div>

                {error && (
                    <div className="mb-5 p-3.5 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl font-medium">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-5">
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                            Master Admin Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter admin password"
                                required
                                className="w-full bg-[#F8FAFC] border border-[#DCE5EF] rounded-xl px-4 py-3 text-sm text-[#172B4D] focus:outline-none focus:border-[#0D6EFD] focus:bg-white pr-11"
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

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-[#0D6EFD] hover:bg-blue-600 text-white font-bold rounded-xl text-sm shadow-sm transition-all disabled:opacity-50 cursor-pointer"
                    >
                        {loading ? 'Authenticating with Backend...' : 'Access Admin Dashboard'}
                    </button>
                </form>

                <div className="mt-6 pt-5 border-t border-gray-100 flex items-center justify-center gap-1.5 text-xs text-gray-400">
                    <ShieldCheck size={14} className="text-green-600" />
                    <span>JWT-secured ImageTech Commercial API</span>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
