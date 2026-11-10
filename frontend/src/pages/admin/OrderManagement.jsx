import React, { useState } from 'react';
import axios from 'axios';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Eye, CheckCircle, Clock, Truck, XCircle, ChevronDown, CreditCard, Download, Trash2, AlertTriangle, Search, RefreshCw } from 'lucide-react';
import { toast } from 'react-toastify';
import { API_BASE_URL } from '../../api';
import SEO from '../../components/SEO';
import TableSkeleton from '../../components/skeletons/TableSkeleton';

const OrderManagement = () => {
    const queryClient = useQueryClient();
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [trackingUpdate, setTrackingUpdate] = useState({ status: '', location: '', description: '' });
    const [editMode, setEditMode] = useState(false);
    const [editFormData, setEditFormData] = useState({ name: '', phone: '', address: '', city: '', postalCode: '' });

    // Filter & Search states
    const [selectedStatus, setSelectedStatus] = useState('ALL');
    const [searchQuery, setSearchQuery] = useState('');
    const [orderToDelete, setOrderToDelete] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);

    // Admin can delete any order
    const isOrderDeletable = () => true;

    const handleDownloadInvoice = async (orderId, invoiceNumber) => {
        try {
            const token = localStorage.getItem('adminToken') || localStorage.getItem('userToken');
            const response = await axios.get(`${API_BASE_URL}/orders/${orderId}/invoice`, {
                headers: { Authorization: `Bearer ${token}` },
                responseType: 'blob'
            });

            const blob = new Blob([response.data], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `Invoice-${invoiceNumber || orderId.slice(-8)}.pdf`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
            toast.success('Invoice downloaded');
        } catch (err) {
            toast.error('Failed to download invoice');
        }
    };

    const { data: orders = [], isLoading: loading, isFetching, refetch } = useQuery({
        queryKey: ['adminOrders'],
        queryFn: async () => {
            const token = localStorage.getItem('adminToken') || localStorage.getItem('userToken');
            const { data } = await axios.get(`${API_BASE_URL}/orders`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return data;
        },
        staleTime: 5 * 60 * 1000,
    });

    const confirmDeleteOrder = async () => {
        if (!orderToDelete) return;
        try {
            setIsDeleting(true);
            const token = localStorage.getItem('adminToken') || localStorage.getItem('userToken');
            await axios.delete(`${API_BASE_URL}/orders/${orderToDelete._id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            toast.success(`Order #${orderToDelete._id.slice(-8).toUpperCase()} deleted successfully`);
            
            queryClient.setQueryData(['adminOrders'], old => 
                old ? old.filter(o => o._id !== orderToDelete._id) : []
            );
            queryClient.invalidateQueries(['adminPayments']);
            
            if (selectedOrder && selectedOrder._id === orderToDelete._id) {
                setShowDetailModal(false);
                setSelectedOrder(null);
            }
            setOrderToDelete(null);
        } catch (error) {
            console.error('Failed to delete order:', error);
            toast.error(error.response?.data?.message || 'Failed to delete order');
        } finally {
            setIsDeleting(false);
        }
    };

    const handleUpdateStatus = async (orderId, newStatus) => {
        try {
            const token = localStorage.getItem('adminToken') || localStorage.getItem('userToken');
            await axios.put(`${API_BASE_URL}/orders/${orderId}/status`, { status: newStatus }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            
            queryClient.setQueryData(['adminOrders'], old => 
                old ? old.map(o => o._id === orderId ? { ...o, status: newStatus } : o) : old
            );
            
            if (selectedOrder && selectedOrder._id === orderId) {
                setSelectedOrder({ ...selectedOrder, status: newStatus });
            }
            toast.success(`Status updated to ${newStatus}`);
        } catch (error) {
            console.error('Error updating status:', error);
            toast.error('Failed to update status');
        }
    };

    const handleAddTrackingUpdate = async (e) => {
        e.preventDefault();
        if (!trackingUpdate.status || !trackingUpdate.location) return;
        try {
            const token = localStorage.getItem('adminToken') || localStorage.getItem('userToken');
            const { data } = await axios.post(`${API_BASE_URL}/orders/${selectedOrder._id}/tracking`, trackingUpdate, {
                headers: { Authorization: `Bearer ${token}` }
            });
            
            queryClient.setQueryData(['adminOrders'], old => 
                old ? old.map(o => o._id === data._id ? data : o) : old
            );
            setSelectedOrder(data);
            setTrackingUpdate({ status: '', location: '', description: '' });
            toast.success('Tracking update added');
        } catch (error) {
            console.error('Error adding tracking update:', error);
        }
    };

    const handleEditSave = async () => {
        try {
            const token = localStorage.getItem('adminToken') || localStorage.getItem('userToken');
            const { data } = await axios.put(`${API_BASE_URL}/orders/${selectedOrder._id}/edit`, editFormData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            
            queryClient.setQueryData(['adminOrders'], old => 
                old ? old.map(o => o._id === data._id ? data : o) : old
            );
            setSelectedOrder(data);
            setEditMode(false);
            toast.success('Customer details updated');
        } catch (error) {
            console.error('Error updating order details:', error);
        }
    };

    const getStatusColor = (status) => {
        const s = (status || '').toUpperCase();
        switch (s) {
            case 'PAID':
                return 'text-green-700 bg-green-50 border border-green-200';
            case 'PENDING':
            case 'PENDING_PAYMENT':
            case 'PAYMENT_PROCESSING':
                return 'text-amber-700 bg-amber-50 border border-amber-200';
            case 'PROCESSING':
                return 'text-blue-700 bg-blue-50 border border-blue-200';
            case 'SHIPPED':
                return 'text-indigo-700 bg-indigo-50 border border-indigo-200';
            case 'DELIVERED':
                return 'text-emerald-700 bg-emerald-50 border border-emerald-200';
            case 'CANCELLED':
            case 'REFUNDED':
                return 'text-red-700 bg-red-50 border border-red-200';
            default:
                return 'text-gray-700 bg-gray-50 border border-gray-200';
        }
    };

    // Filter Logic
    const filteredOrders = orders.filter((order) => {
        const status = (order.status || '').toUpperCase();
        const matchesStatus =
            selectedStatus === 'ALL' ||
            (selectedStatus === 'PENDING' && ['PENDING', 'PENDING_PAYMENT', 'PAYMENT_PROCESSING'].includes(status)) ||
            status === selectedStatus;

        const customerName = (order.shippingAddress?.name || '').toLowerCase();
        const customerPhone = (order.shippingAddress?.phone || '').toLowerCase();
        const orderId = order._id.toLowerCase();
        const q = searchQuery.toLowerCase();

        const matchesSearch = !q || orderId.includes(q) || customerName.includes(q) || customerPhone.includes(q);

        return matchesStatus && matchesSearch;
    });

    const statusCounts = {
        ALL: orders.length,
        PENDING: orders.filter(o => ['PENDING', 'PENDING_PAYMENT', 'PAYMENT_PROCESSING'].includes((o.status || '').toUpperCase())).length,
        PAID: orders.filter(o => (o.status || '').toUpperCase() === 'PAID').length,
        PROCESSING: orders.filter(o => (o.status || '').toUpperCase() === 'PROCESSING').length,
        SHIPPED: orders.filter(o => (o.status || '').toUpperCase() === 'SHIPPED').length,
        DELIVERED: orders.filter(o => (o.status || '').toUpperCase() === 'DELIVERED').length,
        CANCELLED: orders.filter(o => (o.status || '').toUpperCase() === 'CANCELLED').length,
    };

    return (
        <div className="space-y-6">
            <SEO title="Order Management | ImageTech Admin" />

            {/* Header with Refresh */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-[#172B4D]">Order Management</h1>
                    <p className="text-gray-500 text-sm font-medium mt-1">
                        Track industrial orders, manage client shipments, and delete test or old orders.
                    </p>
                </div>
                <button
                    onClick={() => refetch()}
                    disabled={isFetching}
                    className="flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-700 text-xs font-semibold px-4 py-2.5 rounded-xl border border-[#DCE5EF] shadow-xs transition-colors w-fit disabled:opacity-50 cursor-pointer"
                >
                    <RefreshCw className={`w-3.5 h-3.5 text-[#0D6EFD] ${isFetching ? 'animate-spin' : ''}`} />
                    <span>{isFetching ? 'Refreshing...' : 'Refresh'}</span>
                </button>
            </div>

            {/* Filter Tabs & Search Bar */}
            <div className="flex flex-col lg:flex-row justify-between items-stretch lg:items-center gap-4 bg-white border border-[#DCE5EF] p-3 rounded-2xl shadow-xs">
                {/* Status Tabs */}
                <div className="flex flex-wrap gap-1.5">
                    {[
                        { id: 'ALL', label: 'All Orders', count: statusCounts.ALL },
                        { id: 'PENDING', label: 'Pending', count: statusCounts.PENDING },
                        { id: 'PAID', label: 'Paid', count: statusCounts.PAID },
                        { id: 'PROCESSING', label: 'Processing', count: statusCounts.PROCESSING },
                        { id: 'SHIPPED', label: 'Shipped', count: statusCounts.SHIPPED },
                        { id: 'DELIVERED', label: 'Delivered', count: statusCounts.DELIVERED },
                        { id: 'CANCELLED', label: 'Cancelled', count: statusCounts.CANCELLED }
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setSelectedStatus(tab.id)}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                                selectedStatus === tab.id
                                    ? 'bg-[#0D6EFD] text-white shadow-xs'
                                    : 'text-gray-600 hover:text-[#172B4D] hover:bg-[#F5F8FC]'
                            }`}
                        >
                            <span>{tab.label}</span>
                            <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                                selectedStatus === tab.id
                                    ? 'bg-white/20 text-white'
                                    : 'bg-gray-100 text-gray-600'
                            }`}>
                                {tab.count}
                            </span>
                        </button>
                    ))}
                </div>

                {/* Search */}
                <div className="relative min-w-[260px]">
                    <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                        type="text"
                        placeholder="Search Order ID, Customer, Phone..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-[#F8FAFC] border border-[#DCE5EF] rounded-xl pl-9 pr-4 py-2 text-xs text-[#172B4D] placeholder:text-gray-400 focus:outline-none focus:border-[#0D6EFD] focus:bg-white"
                    />
                </div>
            </div>

            {loading ? (
                <TableSkeleton columns={6} rows={8} />
            ) : filteredOrders.length === 0 ? (
                <div className="bg-white border border-[#DCE5EF] rounded-2xl p-12 text-center shadow-xs">
                    <Truck className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <h3 className="text-[#172B4D] font-bold text-lg">No orders found</h3>
                    <p className="text-gray-500 text-sm mt-1">No orders match the selected filter or search query.</p>
                </div>
            ) : (
                <div className="bg-white border border-[#DCE5EF] rounded-2xl overflow-hidden shadow-xs overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-[#F8FAFC] text-gray-600 text-xs font-bold uppercase tracking-wider border-b border-[#DCE5EF]">
                            <tr>
                                <th className="px-6 py-4">Order ID</th>
                                <th className="px-6 py-4">Customer</th>
                                <th className="px-6 py-4">Total</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#DCE5EF]">
                            {filteredOrders.map((order) => (
                                <tr key={order._id} className="hover:bg-[#F8FAFC] transition-colors">
                                    <td className="px-6 py-4 font-mono text-xs font-bold text-[#0D6EFD]">
                                        #{order._id.substring(order._id.length - 8).toUpperCase()}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="font-bold text-[#172B4D]">{order.shippingAddress?.name || 'Customer'}</div>
                                        <div className="text-xs text-gray-500">{order.shippingAddress?.phone}</div>
                                    </td>
                                    <td className="px-6 py-4 font-bold text-[#172B4D] text-base">₹{order.totalPrice}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${getStatusColor(order.status)}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-xs text-gray-500">
                                        {new Date(order.createdAt).toLocaleDateString('en-IN', {
                                            day: '2-digit',
                                            month: 'short',
                                            year: 'numeric'
                                        })}
                                    </td>
                                    <td className="px-6 py-4 text-right space-x-1.5 whitespace-nowrap">
                                        <button
                                            onClick={() => { 
                                                setSelectedOrder(order); 
                                                setEditFormData({
                                                    name: order.shippingAddress?.name || '',
                                                    phone: order.shippingAddress?.phone || '',
                                                    address: order.shippingAddress?.address || '',
                                                    city: order.shippingAddress?.city || '',
                                                    postalCode: order.shippingAddress?.postalCode || ''
                                                });
                                                setShowDetailModal(true); 
                                                setEditMode(false);
                                            }}
                                            className="p-2 text-[#0D6EFD] hover:bg-blue-50 rounded-lg transition-colors inline-flex cursor-pointer"
                                            title="View Order Details"
                                        >
                                            <Eye className="w-4 h-4" />
                                        </button>

                                        <button
                                            onClick={() => setOrderToDelete(order)}
                                            className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors inline-flex cursor-pointer"
                                            title="Delete Order"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Detail Modal */}
            {showDetailModal && selectedOrder && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in">
                    <div className="bg-white border border-[#DCE5EF] rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl">
                        <div className="p-6 border-b border-[#DCE5EF] flex justify-between items-center bg-[#F8FAFC]">
                            <div>
                                <h2 className="text-xl font-bold text-[#172B4D]">Order Details</h2>
                                <p className="text-xs text-gray-500 font-mono mt-0.5">#{selectedOrder._id}</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => setOrderToDelete(selectedOrder)}
                                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 transition-colors cursor-pointer"
                                >
                                    <Trash2 className="w-3.5 h-3.5" /> Delete Order
                                </button>
                                <button onClick={() => setShowDetailModal(false)} className="text-gray-400 hover:text-[#172B4D] p-1 rounded-lg hover:bg-gray-100 cursor-pointer">
                                    <ChevronDown className="w-6 h-6 rotate-180" />
                                </button>
                            </div>
                        </div>

                        <div className="p-6 space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Customer Info</h3>
                                        <button 
                                            onClick={() => setEditMode(!editMode)} 
                                            className="text-xs text-[#0D6EFD] hover:underline font-bold"
                                        >
                                            {editMode ? 'Cancel' : 'Edit'}
                                        </button>
                                    </div>
                                    <div className="text-[#172B4D]">
                                        {editMode ? (
                                            <div className="space-y-2 mt-2">
                                                <input type="text" value={editFormData.name} onChange={e => setEditFormData({...editFormData, name: e.target.value})} className="w-full bg-[#F8FAFC] border border-[#DCE5EF] rounded-lg px-2.5 py-1.5 text-sm outline-none focus:border-[#0D6EFD]" placeholder="Name" />
                                                <input type="text" value={editFormData.phone} onChange={e => setEditFormData({...editFormData, phone: e.target.value})} className="w-full bg-[#F8FAFC] border border-[#DCE5EF] rounded-lg px-2.5 py-1.5 text-sm outline-none focus:border-[#0D6EFD]" placeholder="Phone" />
                                                <input type="text" value={editFormData.address} onChange={e => setEditFormData({...editFormData, address: e.target.value})} className="w-full bg-[#F8FAFC] border border-[#DCE5EF] rounded-lg px-2.5 py-1.5 text-sm outline-none focus:border-[#0D6EFD]" placeholder="Address" />
                                                <div className="grid grid-cols-2 gap-2">
                                                    <input type="text" value={editFormData.city} onChange={e => setEditFormData({...editFormData, city: e.target.value})} className="w-full bg-[#F8FAFC] border border-[#DCE5EF] rounded-lg px-2.5 py-1.5 text-sm outline-none focus:border-[#0D6EFD]" placeholder="City" />
                                                    <input type="text" value={editFormData.postalCode} onChange={e => setEditFormData({...editFormData, postalCode: e.target.value})} className="w-full bg-[#F8FAFC] border border-[#DCE5EF] rounded-lg px-2.5 py-1.5 text-sm outline-none focus:border-[#0D6EFD]" placeholder="Postal Code" />
                                                </div>
                                                <button onClick={handleEditSave} className="w-full mt-2 bg-[#0D6EFD] text-white font-bold text-xs py-2 rounded-lg hover:bg-blue-600 transition-colors">Save Changes</button>
                                            </div>
                                        ) : (
                                            <div className="bg-[#F8FAFC] p-3 rounded-xl border border-[#DCE5EF]">
                                                <p className="font-bold text-base text-[#172B4D]">{selectedOrder.shippingAddress?.name}</p>
                                                <p className="text-sm text-gray-600 font-mono mt-0.5">{selectedOrder.shippingAddress?.phone}</p>
                                                <p className="text-sm text-gray-700 mt-1">{selectedOrder.shippingAddress?.address}, {selectedOrder.shippingAddress?.city}</p>
                                                <p className="text-xs text-gray-500 mt-0.5">PIN: {selectedOrder.shippingAddress?.postalCode}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Update Order Status</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {['PAID', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map((status) => {
                                            const isSelected = (selectedOrder.status || '').toUpperCase() === status.toUpperCase();
                                            return (
                                                <button
                                                    key={status}
                                                    onClick={() => handleUpdateStatus(selectedOrder._id, status)}
                                                    className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition-all cursor-pointer ${
                                                        isSelected
                                                            ? 'bg-[#0D6EFD] text-white shadow-xs'
                                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                    }`}
                                                >
                                                    {status}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>

                            {/* Ordered Items */}
                            <div className="space-y-2">
                                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Ordered Items</h3>
                                <div className="border border-[#DCE5EF] rounded-xl overflow-hidden divide-y divide-[#DCE5EF]">
                                    {selectedOrder.orderItems?.map((item, idx) => (
                                        <div key={idx} className="p-3 flex items-center justify-between bg-white text-sm">
                                            <div className="flex items-center gap-3">
                                                {item.image && <img src={item.image} alt={item.name} className="w-10 h-10 object-contain rounded border border-gray-200" />}
                                                <div>
                                                    <p className="font-semibold text-[#172B4D]">{item.name}</p>
                                                    <p className="text-xs text-gray-500">Qty: {item.qty} × ₹{item.price}</p>
                                                </div>
                                            </div>
                                            <p className="font-bold text-[#172B4D]">₹{item.qty * item.price}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            
                            <div className="flex justify-between items-center p-4 pt-4 border-t border-[#DCE5EF]">
                                <div className="text-base font-semibold text-gray-600">Total Order Amount</div>
                                <div className="text-2xl font-bold text-[#0D6EFD]">₹{selectedOrder.totalPrice}</div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {orderToDelete && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in">
                    <div className="bg-white border border-[#DCE5EF] rounded-2xl w-full max-w-md p-6 space-y-4 shadow-2xl">
                        <div className="flex items-center gap-3 text-red-600">
                            <div className="p-3 bg-red-50 rounded-xl border border-red-100">
                                <AlertTriangle className="w-6 h-6 text-red-600" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-[#172B4D]">Delete Order?</h3>
                                <p className="text-xs text-gray-500 font-mono">
                                    #{orderToDelete._id.slice(-8).toUpperCase()} • Status: <span className="uppercase font-bold text-gray-700">{orderToDelete.status}</span>
                                </p>
                            </div>
                        </div>

                        <p className="text-sm text-gray-600">
                            Are you sure you want to permanently delete this order record from the database?
                        </p>

                        <div className="bg-[#F8FAFC] p-3 rounded-xl border border-[#DCE5EF] text-xs text-gray-600 space-y-1">
                            <p><span className="text-gray-500">Customer:</span> <strong className="text-[#172B4D]">{orderToDelete.shippingAddress?.name}</strong></p>
                            <p><span className="text-gray-500">Amount:</span> <strong className="text-[#172B4D]">₹{orderToDelete.totalPrice}</strong></p>
                        </div>

                        <div className="flex justify-end gap-3 pt-2">
                            <button
                                type="button"
                                onClick={() => setOrderToDelete(null)}
                                disabled={isDeleting}
                                className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-700 hover:bg-gray-100 border border-gray-200 transition-colors cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={confirmDeleteOrder}
                                disabled={isDeleting}
                                className="flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold text-white bg-red-600 hover:bg-red-700 shadow-sm transition-all disabled:opacity-50 cursor-pointer"
                            >
                                <Trash2 className="w-4 h-4" />
                                {isDeleting ? 'Deleting...' : 'Delete Permanently'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrderManagement;
