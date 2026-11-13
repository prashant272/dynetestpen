import React, { useState } from 'react';
import { X, Send, CheckCircle2, Building, Mail, Phone, User, FileText, ChevronDown } from 'lucide-react';
import { API_BASE_URL } from '../../api';
import { toast } from 'react-toastify';

const RequestQuoteModal = ({ isOpen, onClose, initialProduct = '' }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    product: initialProduct,
    quantity: '100 - 500 units',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [phoneError, setPhoneError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate phone number: only digits/plus, min 10 digits
    const digitsOnly = formData.phone.replace(/\D/g, '');
    if (digitsOnly.length < 10) {
      toast.error("Please enter a valid 10-digit phone number");
      return;
    }

    setSubmitting(true);

    try {
      // Send to enquiry endpoint in our local backend: /api/enquiry/submit
      const payload = {
        name: formData.name,
        company: formData.company || 'Not Specified',
        email: formData.email,
        phone: formData.phone.trim(),
        subject: `[B2B RFQ Lead] ${formData.product || 'Industrial Inquiry'}`,
        message: `Product Interest: ${formData.product || 'General Inquiry'}
Estimated Quantity: ${formData.quantity}
Requirements / Notes: ${formData.message || 'None'}`
      };

      const res = await fetch(`${API_BASE_URL}/enquiry/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok && data.success) {
        setSubmitted(true);
        toast.success("Quote request submitted! Our technical sales engineers will contact you within 24 hours.");
      } else {
        toast.error(data.message || "Failed to submit quote request. Please check required fields.");
      }
    } catch (err) {
      console.error("Enquiry post error:", err);
      toast.error("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const resetAndClose = () => {
    setSubmitted(false);
    setPhoneError('');
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      product: '',
      quantity: '100 - 500 units',
      message: ''
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="bg-white rounded-2xl w-full max-w-xl max-h-[92vh] overflow-y-auto shadow-2xl border border-blue-900/10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#0B3B6F] text-white p-6 relative">
          <button 
            onClick={resetAndClose}
            aria-label="Close modal"
            className="absolute top-5 right-5 p-1 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X size={20} />
          </button>
          <div className="inline-block px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-[#FFC107] text-[#0B3B6F] mb-2">
            ImageTech Industries B2B
          </div>
          <h2 className="text-xl md:text-2xl font-bold tracking-tight">Request an Industrial Quote</h2>
          <p className="text-blue-100 text-xs md:text-sm mt-1">
            Direct OEM pricing, custom Dyne formulations, and bulk supply contracts.
          </p>
        </div>

        {/* Content */}
        {submitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 size={36} />
            </div>
            <h3 className="text-xl font-bold text-[#172B4D]">Quote Request Received!</h3>
            <p className="text-sm text-gray-600 max-w-md mx-auto">
              Thank you for choosing <strong>ImageTech Industries</strong>. Our industrial technical sales team has received your specifications and will respond with a formal quotation and batch datasheet.
            </p>
            <div className="pt-4">
              <button
                onClick={resetAndClose}
                className="bg-[#0B3B6F] hover:bg-[#0D6EFD] text-white font-semibold px-6 py-2.5 rounded-lg transition-colors text-sm"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#172B4D] mb-1">Full Name *</label>
                <div className="relative">
                  <User size={15} className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Rajiv Mehta"
                    className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0D6EFD] focus:border-[#0D6EFD] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#172B4D] mb-1">Corporate Email *</label>
                <div className="relative">
                  <Mail size={15} className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@company.com"
                    className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0D6EFD] focus:border-[#0D6EFD] outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#172B4D] mb-1">Phone / WhatsApp *</label>
                <div className="relative">
                  <Phone size={15} className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="tel"
                    required
                    maxLength={15}
                    value={formData.phone}
                    onChange={(e) => {
                      const rawVal = e.target.value;
                      if (/[^0-9+\s\-()]/.test(rawVal)) {
                        setPhoneError('Only numbers allowed');
                      } else {
                        setPhoneError('');
                      }
                      const filtered = rawVal.replace(/[^0-9+\s\-()]/g, '');
                      setFormData({ ...formData, phone: filtered });
                    }}
                    placeholder="+91 98765 43210"
                    className={`w-full pl-9 pr-3 py-2 text-sm border rounded-lg focus:ring-2 outline-none ${
                      phoneError 
                        ? 'border-red-500 focus:ring-red-200 focus:border-red-500' 
                        : 'border-gray-300 focus:ring-[#0D6EFD] focus:border-[#0D6EFD]'
                    }`}
                  />
                </div>
                {phoneError && (
                  <p className="text-[11px] text-red-600 font-semibold mt-1">
                    {phoneError}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#172B4D] mb-1">Company / Plant Name</label>
                <div className="relative">
                  <Building size={15} className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="e.g. Apex Packaging Converters"
                    className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0D6EFD] focus:border-[#0D6EFD] outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#172B4D] mb-1">Product of Interest</label>
                <input
                  type="text"
                  value={formData.product}
                  onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                  placeholder="e.g. MAGNET Dyne Pens 38-44"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0D6EFD] focus:border-[#0D6EFD] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#172B4D] mb-1">Estimated Quantity</label>
                <select
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0D6EFD] focus:border-[#0D6EFD] outline-none bg-white"
                >
                  <option>Sample Kit (1 - 10 pens)</option>
                  <option>10 - 50 units</option>
                  <option>50 - 200 units</option>
                  <option>200 - 1000 units (Bulk)</option>
                  <option>1000+ units / OEM Contract</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#172B4D] mb-1">Target Dyne Levels / Substrates / Details</label>
              <textarea
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Mention substrate (BOPP, PET, PE, Foil), desired Dyne levels (e.g. 30, 32, 38, 42 Dyne/cm), or doctor blade dimensions."
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0D6EFD] focus:border-[#0D6EFD] outline-none resize-none"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-3 border-t border-gray-100">
              <button
                type="button"
                onClick={resetAndClose}
                className="px-4 py-2 text-sm font-semibold text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="bg-[#0B3B6F] hover:bg-[#0D6EFD] text-white px-6 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 transition-all shadow-md active:scale-95 disabled:opacity-60"
              >
                {submitting ? 'Submitting...' : (
                  <>
                    <Send size={15} />
                    Submit Request
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default RequestQuoteModal;
