import React, { useState } from 'react';
import axios from 'axios';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { API_BASE_URL } from '../../api';
import { Eye, X, Trash2, Mail, Phone, Building2 } from 'lucide-react';
import { toast } from 'react-toastify';
import SEO from '../../components/SEO';
import TableSkeleton from '../../components/skeletons/TableSkeleton';

const EnquiryManagement = () => {
    const queryClient = useQueryClient();
    const [selectedEnquiry, setSelectedEnquiry] = useState(null);
    const [showDetailModal, setShowDetailModal] = useState(false);

    const { data: enquiries = [], isLoading: loading } = useQuery({
        queryKey: ['adminEnquiries'],
        queryFn: async () => {
            const token = localStorage.getItem('adminToken') || localStorage.getItem('userToken');
            const response = await axios.get(`${API_BASE_URL}/enquiry/all`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data.data;
        },
        staleTime: 5 * 60 * 1000,
    });

    const viewDetails = (enquiry) => {
        setSelectedEnquiry(enquiry);
        setShowDetailModal(true);
    };

    const handleStatusChange = async (id, newStatus) => {
        try {
            const token = localStorage.getItem('adminToken') || localStorage.getItem('userToken');
            await axios.put(
                `${API_BASE_URL}/enquiry/${id}/status`,
                { status: newStatus },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            queryClient.invalidateQueries(['adminEnquiries']);
            if (selectedEnquiry && selectedEnquiry._id === id) {
                setSelectedEnquiry({ ...selectedEnquiry, status: newStatus });
            }
            toast.success('Status updated successfully');
        } catch (error) {
            console.error('Error updating status:', error);
            toast.error('Failed to update status');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this enquiry?')) {
            return;
        }

        try {
            const token = localStorage.getItem('adminToken') || localStorage.getItem('userToken');
            await axios.delete(`${API_BASE_URL}/enquiry/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            queryClient.invalidateQueries(['adminEnquiries']);
            setShowDetailModal(false);
            toast.success('Enquiry deleted successfully');
        } catch (error) {
            console.error('Error deleting enquiry:', error);
            toast.error('Failed to delete enquiry');
        }
    };

    const getStatusStyles = (status) => {
        switch (status) {
            case 'resolved': return 'bg-green-50 text-green-700 border-green-200';
            case 'in_progress': return 'bg-blue-50 text-blue-700 border-blue-200';
            case 'spam': return 'bg-red-50 text-red-700 border-red-200';
            case 'pending':
            default: return 'bg-amber-50 text-amber-700 border-amber-200';
        }
    };

    return (
        <div className="space-y-6">
            <SEO title="RFQ & Inquiries | ImageTech Admin" />
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-[#172B4D]">RFQ & Client Leads</h1>
                    <p className="text-gray-500 text-sm font-medium mt-1">Quotations and customer contact inquiries received from ImageTech portal.</p>
                </div>
                <div className="text-sm font-semibold text-gray-700 bg-white border border-[#DCE5EF] px-4 py-2 rounded-xl shadow-xs">
                    Total Leads: <span className="text-[#0D6EFD] font-bold">{enquiries.length}</span>
                </div>
            </div>

            {loading ? (
                <TableSkeleton columns={6} rows={8} />
            ) : (
                <div className="bg-white border border-[#DCE5EF] rounded-2xl overflow-hidden shadow-xs">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-[#F8FAFC] border-b border-[#DCE5EF] text-gray-600 text-xs font-bold uppercase tracking-wider">
                                <tr>
                                    <th className="px-6 py-4">Client Name</th>
                                    <th className="px-6 py-4">Company & Phone</th>
                                    <th className="px-6 py-4">Email</th>
                                    <th className="px-6 py-4">Inquiry / RFQ Message</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Date</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#DCE5EF]">
                                {enquiries.length === 0 ? (
                                    <tr>
                                        <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
                                            No RFQ leads received yet.
                                        </td>
                                    </tr>
                                ) : (
                                    enquiries.map((enquiry) => (
                                        <tr key={enquiry._id} className="hover:bg-[#F8FAFC] transition-colors">
                                            <td className="px-6 py-4 text-[#172B4D] font-bold">{enquiry.name}</td>
                                            <td className="px-6 py-4">
                                                <div className="text-[#172B4D] font-medium">{enquiry.company || '—'}</div>
                                                <div className="text-xs text-gray-500">{enquiry.phone || '—'}</div>
                                            </td>
                                            <td className="px-6 py-4 text-gray-700 text-xs font-mono">{enquiry.email}</td>
                                            <td className="px-6 py-4">
                                                <p className="text-gray-700 text-xs truncate max-w-[220px]">{enquiry.message || enquiry.subject}</p>
                                            </td>
                                            <td className="px-6 py-4">
                                                <select
                                                    value={enquiry.status}
                                                    onChange={(e) => handleStatusChange(enquiry._id, e.target.value)}
                                                    className={`px-2.5 py-1 rounded-lg text-xs font-bold cursor-pointer outline-none border ${getStatusStyles(enquiry.status)}`}
                                                >
                                                    <option value="pending">Pending</option>
                                                    <option value="in_progress">In Progress</option>
                                                    <option value="resolved">Resolved</option>
                                                    <option value="spam">Spam</option>
                                                </select>
                                            </td>
                                            <td className="px-6 py-4 text-gray-500 text-xs whitespace-nowrap">
                                                {new Date(enquiry.createdAt).toLocaleDateString('en-IN', {
                                                    day: '2-digit',
                                                    month: 'short',
                                                    year: 'numeric'
                                                })}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex justify-end gap-1.5">
                                                    <button
                                                        onClick={() => viewDetails(enquiry)}
                                                        className="p-2 text-[#0D6EFD] hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                                                        title="View Details"
                                                    >
                                                        <Eye className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(enquiry._id)}
                                                        className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                                                        title="Delete Inquiry"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Detail Modal */}
            {showDetailModal && selectedEnquiry && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in">
                    <div className="bg-white border border-[#DCE5EF] relative w-full max-w-2xl rounded-2xl shadow-2xl flex flex-col overflow-hidden">
                        <div className="p-6 border-b border-[#DCE5EF] flex justify-between items-center bg-[#F8FAFC]">
                            <div>
                                <h2 className="text-xl font-bold text-[#172B4D]">Lead Inquiry Details</h2>
                                <p className="text-xs text-gray-500 mt-0.5">Submitted on {new Date(selectedEnquiry.createdAt).toLocaleString('en-IN')}</p>
                            </div>
                            <button
                                onClick={() => setShowDetailModal(false)}
                                className="p-1 text-gray-400 hover:text-[#172B4D] hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="p-6 space-y-5 overflow-y-auto max-h-[75vh]">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-[#F8FAFC] p-3.5 rounded-xl border border-[#DCE5EF]">
                                    <label className="text-gray-500 text-xs font-bold uppercase tracking-wider block mb-1">Client Name</label>
                                    <p className="text-[#172B4D] font-bold text-base">{selectedEnquiry.name}</p>
                                </div>
                                <div className="bg-[#F8FAFC] p-3.5 rounded-xl border border-[#DCE5EF]">
                                    <label className="text-gray-500 text-xs font-bold uppercase tracking-wider block mb-1">Company / Organization</label>
                                    <p className="text-[#172B4D] font-bold text-base">{selectedEnquiry.company || '—'}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-[#F8FAFC] p-3.5 rounded-xl border border-[#DCE5EF]">
                                    <label className="text-gray-500 text-xs font-bold uppercase tracking-wider block mb-1">Email</label>
                                    <div className="flex items-center gap-2 text-gray-800 font-semibold text-sm">
                                        <Mail className="w-4 h-4 text-[#0D6EFD]" />
                                        <a href={`mailto:${selectedEnquiry.email}`} className="hover:underline">{selectedEnquiry.email}</a>
                                    </div>
                                </div>
                                <div className="bg-[#F8FAFC] p-3.5 rounded-xl border border-[#DCE5EF]">
                                    <label className="text-gray-500 text-xs font-bold uppercase tracking-wider block mb-1">Phone</label>
                                    <div className="flex items-center gap-2 text-gray-800 font-semibold text-sm">
                                        <Phone className="w-4 h-4 text-[#0D6EFD]" />
                                        <a href={`tel:${selectedEnquiry.phone}`} className="hover:underline">{selectedEnquiry.phone || '—'}</a>
                                    </div>
                                </div>
                            </div>

                            {selectedEnquiry.subject && (
                                <div className="bg-[#F8FAFC] p-3.5 rounded-xl border border-[#DCE5EF]">
                                    <label className="text-gray-500 text-xs font-bold uppercase tracking-wider block mb-1">Subject</label>
                                    <p className="text-[#172B4D] font-semibold text-sm">{selectedEnquiry.subject}</p>
                                </div>
                            )}

                            <div>
                                <label className="text-gray-500 text-xs font-bold uppercase tracking-wider block mb-2">Message / Requirement</label>
                                <div className="bg-[#F8FAFC] rounded-xl p-4 border border-[#DCE5EF]">
                                    <p className="text-gray-800 text-sm whitespace-pre-wrap leading-relaxed">{selectedEnquiry.message || 'No additional message provided.'}</p>
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t border-[#DCE5EF]">
                                <div className="flex items-center gap-3">
                                    <label className="text-gray-500 text-xs font-bold uppercase tracking-wider">Update Status:</label>
                                    <select
                                        value={selectedEnquiry.status}
                                        onChange={(e) => handleStatusChange(selectedEnquiry._id, e.target.value)}
                                        className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer outline-none border ${getStatusStyles(selectedEnquiry.status)}`}
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="in_progress">In Progress</option>
                                        <option value="resolved">Resolved</option>
                                        <option value="spam">Spam</option>
                                    </select>
                                </div>

                                <button
                                    onClick={() => handleDelete(selectedEnquiry._id)}
                                    className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl transition-colors font-semibold text-xs border border-red-200 cursor-pointer"
                                >
                                    <Trash2 className="w-4 h-4" />
                                    Delete Inquiry
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EnquiryManagement;
