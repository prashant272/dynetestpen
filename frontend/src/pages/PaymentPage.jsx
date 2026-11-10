import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../contexts/CartContext';
import {
    ArrowLeft,
    CheckCircle2,
    ShieldCheck,
    MapPin,
    Truck,
    Building2,
    FileCheck,
    Receipt
} from 'lucide-react';
import { API_BASE_URL } from '../api';
import SEO from '../components/SEO';
import ButtonLoader from '../components/ButtonLoader';

const PaymentPage = () => {
    const navigate = useNavigate();
    const { cartItems, cartTotal, clearCart } = useCart();
    const [loading, setLoading] = useState(false);
    const [shippingAddress, setShippingAddress] = useState(null);
    const [notes, setNotes] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('userToken');
        if (!token) {
            navigate('/login?redirect=/checkout/payment');
            return;
        }

        const savedAddr = JSON.parse(localStorage.getItem('shippingAddress'));
        if (!savedAddr) {
            navigate('/checkout/address');
            return;
        }
        setShippingAddress(savedAddr);
    }, [navigate]);

    const finalTotal = cartTotal;
    const totalItemsCount = cartItems.reduce((acc, i) => acc + (i.qty || 1), 0);

    const handleConfirmOrder = async () => {
        if (loading) return;

        const token = localStorage.getItem('userToken');
        const activeAddress = shippingAddress || JSON.parse(localStorage.getItem('shippingAddress'));

        if (!activeAddress) {
            alert('Please provide a valid shipping address.');
            navigate('/checkout/address');
            return;
        }

        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        try {
            setLoading(true);

            // B2B Order placement without payment gateway
            const orderData = {
                orderItems: cartItems.map(item => ({
                    name: item.name || item.title || 'Dyne Test Item',
                    qty: Number(item.qty) || 1,
                    image: (item.images && item.images.length > 0) ? item.images[0] : (item.image || ''),
                    price: Number(item.price) || 0,
                    product: item._id,
                    size: item.selectedSize || item.size || 'Standard',
                    color: item.selectedColor || item.color || ''
                })),
                shippingAddress: activeAddress,
                paymentMethod: 'INVOICE',
                totalPrice: finalTotal,
                notes: notes
            };

            const { data } = await axios.post(`${API_BASE_URL}/orders`, orderData, {
                headers
            });

            clearCart();
            navigate(`/checkout/success?id=${data._id}`);
        } catch (error) {
            console.error('Error placing order:', error);
            alert(error.response?.data?.message || 'Failed to place order. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="pt-6 sm:pt-10 pb-20 min-h-screen bg-[#F5F8FC] px-4 sm:px-6 lg:px-8 font-sans">
            <SEO title="Confirm Procurement Order | ImageTech Industries" noindex={true} />
            
            <div className="max-w-4xl mx-auto w-full">
                {/* Back Button */}
                <button
                    onClick={() => navigate('/checkout/address')}
                    className="flex items-center gap-2 text-gray-500 hover:text-[#0D6EFD] transition-colors mb-4 font-semibold text-xs sm:text-sm cursor-pointer"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Delivery Address
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    
                    {/* LEFT COLUMN: ORDER CONFIRMATION & BILLING */}
                    <div className="lg:col-span-7 space-y-4">
                        {/* Delivery Address Summary Bar */}
                        {shippingAddress && (
                            <div className="bg-white border border-[#DCE5EF] rounded-2xl p-4 shadow-xs">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#0D6EFD] flex items-center justify-center shrink-0">
                                            <MapPin className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                                                Delivery Address
                                            </p>
                                            <p className="text-sm font-bold text-[#172B4D]">
                                                {shippingAddress.name} ({shippingAddress.phone})
                                            </p>
                                            <p className="text-xs text-gray-600 mt-0.5">
                                                {shippingAddress.address}, {shippingAddress.city} - {shippingAddress.postalCode}
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => navigate('/checkout/address')}
                                        className="text-xs font-bold text-[#0D6EFD] hover:underline shrink-0"
                                    >
                                        Change
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Payment / Billing Method Card */}
                        <div className="bg-white border-2 border-[#0D6EFD] rounded-2xl p-5 shadow-xs">
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-2.5">
                                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0D6EFD] flex items-center justify-center">
                                        <Receipt className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h2 className="text-base font-bold text-[#172B4D]">B2B Direct Purchase Order / Invoice</h2>
                                        <p className="text-xs text-gray-500">Official GST Invoice generated & dispatched with goods</p>
                                    </div>
                                </div>
                                <span className="bg-blue-50 text-[#0D6EFD] text-[10px] font-bold uppercase px-2.5 py-1 rounded-full border border-blue-200">
                                    Verified
                                </span>
                            </div>

                            <div className="bg-[#F8FAFC] border border-[#DCE5EF] rounded-xl p-3.5 text-xs text-gray-600 space-y-1.5 mb-4">
                                <div className="flex items-center gap-2 text-[#172B4D] font-semibold">
                                    <FileCheck className="w-4 h-4 text-emerald-600" />
                                    No immediate online transaction fee or gateway payment required.
                                </div>
                                <p className="text-gray-500 pl-6">
                                    Your order will be logged directly into our industrial dispatch ledger. Our sales desk will verify delivery timelines and contact you with tax invoice & dispatch documentation.
                                </p>
                            </div>

                            {/* Optional Purchase Order / GST Note */}
                            <div>
                                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-1">
                                    Purchase Order / Company GSTIN Notes (Optional)
                                </label>
                                <textarea
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                    placeholder="Enter your PO Number, GSTIN number, or specific delivery instructions..."
                                    className="w-full bg-[#F8FAFC] border border-[#DCE5EF] rounded-xl p-3 text-xs text-[#172B4D] outline-none focus:border-[#0D6EFD] focus:bg-white resize-none h-20"
                                />
                            </div>
                        </div>

                        {/* Trust Badges */}
                        <div className="grid grid-cols-2 gap-3 pt-1">
                            <div className="bg-white border border-[#DCE5EF] rounded-xl p-3 flex items-center gap-2.5">
                                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                                <div className="text-[11px] leading-tight">
                                    <strong className="text-[#172B4D] block font-bold">100% Genuine Quality</strong>
                                    <span className="text-gray-500">ISO 9001:2015 Certified</span>
                                </div>
                            </div>
                            <div className="bg-white border border-[#DCE5EF] rounded-xl p-3 flex items-center gap-2.5">
                                <Truck className="w-5 h-5 text-[#0D6EFD] shrink-0" />
                                <div className="text-[11px] leading-tight">
                                    <strong className="text-[#172B4D] block font-bold">All-India Dispatch</strong>
                                    <span className="text-gray-500">Fast Courier Logistics</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: ORDER SUMMARY */}
                    <div className="lg:col-span-5 bg-white border border-[#DCE5EF] rounded-2xl p-5 shadow-xs space-y-4">
                        <div className="border-b border-[#DCE5EF] pb-3">
                            <h3 className="text-base font-bold text-[#172B4D]">Order Summary</h3>
                            <p className="text-xs text-gray-500">{totalItemsCount} item{totalItemsCount !== 1 ? 's' : ''} in cart</p>
                        </div>

                        {/* Cart items list */}
                        <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                            {cartItems.map((item, idx) => (
                                <div key={idx} className="flex items-center gap-3 text-xs">
                                    <img
                                        src={(item.images && item.images.length > 0) ? item.images[0] : (item.image || 'https://via.placeholder.com/60')}
                                        alt={item.name}
                                        className="w-12 h-12 object-contain rounded-lg border border-gray-100 bg-[#F8FAFC] shrink-0 p-1"
                                    />
                                    <div className="flex-1 min-w-0">
                                        <p className="font-semibold text-[#172B4D] truncate">{item.name}</p>
                                        <p className="text-gray-500 mt-0.5">Qty: {item.qty} × ₹{item.price}</p>
                                    </div>
                                    <div className="font-bold text-[#172B4D] shrink-0">
                                        ₹{(item.qty * item.price)}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Price Breakdown */}
                        <div className="border-t border-[#DCE5EF] pt-3 space-y-2 text-xs">
                            <div className="flex justify-between text-gray-600">
                                <span>Subtotal</span>
                                <span className="font-semibold text-[#172B4D]">₹{finalTotal}</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Shipping & Handling</span>
                                <span className="text-emerald-600 font-bold uppercase text-[11px]">Free</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>GST (5%)</span>
                                <span className="text-gray-500">Included in Quote</span>
                            </div>
                            <div className="border-t border-[#DCE5EF] pt-2 flex justify-between items-center text-sm">
                                <span className="font-bold text-[#172B4D]">Total Payable Amount</span>
                                <span className="text-xl font-bold text-[#0D6EFD]">₹{finalTotal}</span>
                            </div>
                        </div>

                        {/* Place Order CTA */}
                        <button
                            type="button"
                            disabled={loading}
                            onClick={handleConfirmOrder}
                            className="w-full bg-[#0D6EFD] hover:bg-blue-600 text-white font-bold py-3.5 rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 text-sm disabled:opacity-50 cursor-pointer"
                        >
                            {loading ? <ButtonLoader text="Placing Procurement Order..." /> : 'Confirm & Place Order'}
                        </button>

                        <p className="text-[11px] text-gray-400 text-center">
                            By placing this order you confirm ImageTech B2B terms and product application requirements.
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default PaymentPage;
