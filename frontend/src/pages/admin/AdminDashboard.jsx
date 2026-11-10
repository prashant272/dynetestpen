import React, { useState } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import AdminSidebar from '../../components/admin/AdminSidebar';
import BlogManagement from './BlogManagement';
import OrderManagement from './OrderManagement';
import EnquiryManagement from './EnquiryManagement';
import ProductManagement from './ProductManagement';
import CategoryManagement from './CategoryManagement';
import OfferManagement from './OfferManagement';
import InstagramManagement from './InstagramManagement';
import ReviewManagement from './ReviewManagement';
import UserManagement from './UserManagement';
import PaymentManagement from './PaymentManagement';
import SEO from '../../components/SEO';
import { IndianRupee, Users, ShoppingBag, Clock } from 'lucide-react';
import { API_BASE_URL } from '../../api';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const { data: stats, isLoading: loadingStats } = useQuery({
        queryKey: ['adminStats'],
        queryFn: async () => {
            const token = localStorage.getItem('adminToken');
            const { data } = await axios.get(`${API_BASE_URL}/admin/stats`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return data;
        },
        staleTime: 5 * 60 * 1000,
        initialData: {
            totalUsers: 0,
            totalOrders: 0,
            totalRevenue: 0,
            pendingOrders: 0
        }
    });

    const renderContent = () => {
        switch (activeTab) {
            case 'dashboard':
                return (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <SEO title="Admin Dashboard | ImageTech Industries" />
                        
                        {/* Header Section */}
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                                <h1 className="text-3xl font-bold tracking-tight text-[#172B4D]">
                                    Welcome Back, Admin
                                </h1>
                                <p className="text-gray-500 mt-1 text-sm font-medium">ImageTech Industries Administration Portal</p>
                            </div>
                            <div className="bg-white border border-[#DCE5EF] px-4 py-2 rounded-xl shadow-xs">
                                <p className="text-xs font-semibold text-[#0D6EFD]">
                                    {new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                                </p>
                            </div>
                        </div>

                        {/* Premium Stats Grid */}
                        <div className="grid md:grid-cols-4 gap-5">
                            {/* Revenue Card */}
                            <div className="rounded-2xl bg-white border border-[#DCE5EF] p-6 shadow-xs">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0D6EFD] flex items-center justify-center shrink-0">
                                        <IndianRupee className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <div className="text-gray-500 text-xs font-semibold uppercase tracking-wider">Total Value</div>
                                        <div className="text-2xl font-bold text-[#172B4D] mt-0.5">₹{stats.totalRevenue.toLocaleString('en-IN')}</div>
                                    </div>
                                </div>
                            </div>

                            {/* Users Card */}
                            <div className="rounded-2xl bg-white border border-[#DCE5EF] p-6 shadow-xs">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                                        <Users className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <div className="text-gray-500 text-xs font-semibold uppercase tracking-wider">Total Users</div>
                                        <div className="text-2xl font-bold text-[#172B4D] mt-0.5">{stats.totalUsers}</div>
                                    </div>
                                </div>
                            </div>

                            {/* Orders Card */}
                            <div className="rounded-2xl bg-white border border-[#DCE5EF] p-6 shadow-xs">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                                        <ShoppingBag className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <div className="text-gray-500 text-xs font-semibold uppercase tracking-wider">Total Orders</div>
                                        <div className="text-2xl font-bold text-[#172B4D] mt-0.5">{stats.totalOrders}</div>
                                    </div>
                                </div>
                            </div>

                            {/* Pending Orders Card */}
                            <div className="rounded-2xl bg-white border border-[#DCE5EF] p-6 shadow-xs">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                                        <Clock className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <div className="text-gray-500 text-xs font-semibold uppercase tracking-wider">Pending Orders</div>
                                        <div className="text-2xl font-bold text-[#172B4D] mt-0.5">{stats.pendingOrders}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Overview Banner */}
                        <div className="bg-white border border-[#DCE5EF] rounded-2xl p-8 text-center shadow-xs">
                            <h3 className="text-xl font-bold text-[#172B4D] mb-1">Industrial Portal Active</h3>
                            <p className="text-gray-500 text-sm max-w-md mx-auto">Use the sidebar to view RFQ inquiries, track orders, publish technical blog updates, and view client contacts.</p>
                        </div>
                    </div>
                );

            case 'categories':
                return <CategoryManagement />;

            case 'products':
                return <ProductManagement />;

            case 'blogs':
                return <BlogManagement />;

            case 'orders':
                return <OrderManagement />;

            case 'payments':
                return <PaymentManagement />;

            case 'offers':
                return <OfferManagement />;

            case 'instagram':
                return <InstagramManagement />;

            case 'enquiries':
                return <EnquiryManagement />;

            case 'reviews':
                return <ReviewManagement />;

            case 'users':
                return <UserManagement />;

            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] flex selection:bg-blue-500/20 text-[#172B4D]">
            <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

            <div className="flex-1 overflow-auto bg-[#F8FAFC]">
                <div className="p-6 md:p-8">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
