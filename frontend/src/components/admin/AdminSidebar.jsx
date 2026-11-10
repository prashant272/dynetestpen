import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, FileText, Users, LogOut, Menu, X, Inbox, ShoppingBag } from 'lucide-react';
import { logoutAdmin } from '../../utils/auth';

const AdminSidebar = ({ activeTab, setActiveTab }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navigate = useNavigate();

    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'enquiries', label: 'RFQ & Leads', icon: Inbox },
        { id: 'orders', label: 'Orders', icon: ShoppingBag },
        { id: 'blogs', label: 'Blog Posts', icon: FileText },
        { id: 'users', label: 'User Details', icon: Users },
    ];

    const handleLogout = () => {
        logoutAdmin();
        navigate('/admin/login');
    };

    return (
        <>
            {/* Mobile Menu Toggle */}
            <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden fixed top-4 left-4 z-50 p-2.5 bg-white border border-[#DCE5EF] rounded-xl text-[#0D6EFD] shadow-md transition-transform active:scale-95"
            >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Sidebar */}
            <div className={`
                fixed lg:relative inset-y-0 left-0 z-40
                w-64 shrink-0
                transform transition-all duration-300 ease-out
                ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}>
                <div className="flex flex-col h-[calc(100vh-2rem)] m-4 bg-white border border-[#DCE5EF] rounded-2xl shadow-sm overflow-hidden">
                    
                    {/* Logo Section */}
                    <div className="p-6 border-b border-[#DCE5EF] bg-[#F5F8FC]">
                        <h1 className="text-xl font-black uppercase tracking-tight text-[#172B4D]">
                            IMAGETECH
                        </h1>
                        <p className="text-[10px] text-[#0D6EFD] mt-1 font-bold uppercase tracking-[0.2em]">INDUSTRIES • ADMIN</p>
                    </div>

                    {/* Menu Items */}
                    <div className="flex-1 overflow-y-auto overflow-x-hidden p-3 space-y-1.5 scrollbar-hide">
                        {menuItems.map((item) => {
                            const isActive = activeTab === item.id;
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => {
                                        setActiveTab(item.id);
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className={`
                                        w-full flex items-center gap-3 px-4 py-3 rounded-xl
                                        transition-all duration-200 group text-sm font-semibold
                                        ${isActive
                                            ? 'bg-[#0D6EFD] text-white shadow-sm'
                                            : 'text-gray-600 hover:text-[#0D6EFD] hover:bg-[#F5F8FC]'
                                        }
                                    `}
                                >
                                    <item.icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-gray-500 group-hover:text-[#0D6EFD]'}`} />
                                    <span>{item.label}</span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Logout Button */}
                    <div className="p-3 border-t border-[#DCE5EF] bg-[#F8FAFC]">
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 text-sm font-semibold transition-colors"
                        >
                            <LogOut className="w-4 h-4 text-red-500" />
                            <span>Secure Logout</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Overlay */}
            {isMobileMenuOpen && (
                <div
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="lg:hidden fixed inset-0 bg-black/40 backdrop-blur-xs z-30 transition-opacity"
                />
            )}
        </>
    );
};

export default AdminSidebar;
