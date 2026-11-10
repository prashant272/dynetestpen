import React from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Users, Mail, Phone, Calendar, ShoppingBag, ShieldCheck, User } from 'lucide-react';
import { API_BASE_URL } from '../../api';
import TableSkeleton from '../../components/skeletons/TableSkeleton';
import SEO from '../../components/SEO';

const UserManagement = () => {
    const { data: users = [], isLoading: loading } = useQuery({
        queryKey: ['adminUsers'],
        queryFn: async () => {
            const token = localStorage.getItem('adminToken');
            const { data } = await axios.get(`${API_BASE_URL}/admin/users`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return data;
        },
        staleTime: 5 * 60 * 1000,
    });

    return (
        <div className="space-y-6">
            <SEO title="User Management | ImageTech Admin" />
            <div className="flex items-center justify-between bg-white p-6 rounded-2xl border border-[#DCE5EF] shadow-xs">
                <div>
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[#172B4D] mb-1">Registered Users & Clients</h2>
                    <p className="text-gray-500 text-sm">View and manage registered clients and account contacts.</p>
                </div>
                <div className="bg-blue-50 text-[#0D6EFD] px-4 py-2 rounded-xl flex items-center gap-2 font-bold text-sm border border-blue-200">
                    <Users className="w-5 h-5" />
                    {users.length} Total Users
                </div>
            </div>

            {loading ? (
                <TableSkeleton columns={4} rows={10} />
            ) : (
                <div className="bg-white rounded-2xl border border-[#DCE5EF] overflow-hidden shadow-xs">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="border-b border-[#DCE5EF] bg-[#F8FAFC]">
                                <tr>
                                    <th className="py-4 px-6 text-xs font-bold text-gray-600 uppercase tracking-wider">User Details</th>
                                    <th className="py-4 px-6 text-xs font-bold text-gray-600 uppercase tracking-wider">Contact Info</th>
                                    <th className="py-4 px-6 text-xs font-bold text-gray-600 uppercase tracking-wider">Joined On</th>
                                    <th className="text-center py-4 px-6 text-xs font-bold text-gray-600 uppercase tracking-wider">Orders</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#DCE5EF]">
                                {users.length === 0 ? (
                                    <tr>
                                        <td colSpan="4" className="py-12 text-center text-gray-500">
                                            No registered users found.
                                        </td>
                                    </tr>
                                ) : (
                                    users.map((user) => (
                                        <tr key={user._id} className="hover:bg-[#F8FAFC] transition-colors">
                                            <td className="py-4 px-6">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-blue-50 text-[#0D6EFD] flex items-center justify-center font-bold text-sm border border-blue-200">
                                                        {user.name ? user.name.charAt(0).toUpperCase() : <User className="w-4 h-4" />}
                                                    </div>
                                                    <div>
                                                        <div className="font-bold text-[#172B4D] flex items-center gap-1.5">
                                                            {user.name || 'Anonymous User'}
                                                            {user.role === 'admin' && (
                                                                <span className="inline-flex items-center gap-0.5 bg-blue-100 text-[#0D6EFD] text-[10px] px-2 py-0.5 rounded-full font-bold uppercase">
                                                                    <ShieldCheck className="w-3 h-3" /> Admin
                                                                </span>
                                                            )}
                                                        </div>
                                                        <div className="text-xs text-gray-500 font-mono">ID: {user._id.slice(-6)}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="space-y-1">
                                                    {user.email && (
                                                        <div className="flex items-center gap-1.5 text-xs text-gray-700">
                                                            <Mail className="w-3.5 h-3.5 text-gray-400" />
                                                            {user.email}
                                                        </div>
                                                    )}
                                                    {user.phone && (
                                                        <div className="flex items-center gap-1.5 text-xs text-gray-700">
                                                            <Phone className="w-3.5 h-3.5 text-gray-400" />
                                                            {user.phone}
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="py-4 px-6 text-xs text-gray-500">
                                                <div className="flex items-center gap-1.5">
                                                    <Calendar className="w-3.5 h-3.5 text-gray-400" />
                                                    {new Date(user.createdAt).toLocaleDateString('en-IN', {
                                                        day: '2-digit',
                                                        month: 'short',
                                                        year: 'numeric'
                                                    })}
                                                </div>
                                            </td>
                                            <td className="py-4 px-6 text-center">
                                                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-[#F5F8FC] text-[#0D6EFD] border border-[#DCE5EF]">
                                                    <ShoppingBag className="w-3 h-3" />
                                                    {user.orderCount || 0}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserManagement;
