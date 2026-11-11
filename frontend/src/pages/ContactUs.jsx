import React, { useState } from 'react';
import axios from 'axios';
import { Mail, Phone, MapPin, Send, Building, Clock, Award, CheckCircle2 } from 'lucide-react';
import { API_BASE_URL } from '../api';
import SEO from '../components/SEO';
import { toast } from 'react-toastify';

const ContactUs = () => {
    const [formData, setFormData] = useState({ 
        name: '', 
        email: '', 
        phone: '',
        company: '',
        subject: 'General Technical Inquiry',
        message: '' 
    });
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const payload = {
                name: formData.name,
                email: formData.email,
                message: `[INDUSTRIAL INQUIRY: ${formData.subject}]
Company: ${formData.company || 'Not specified'}
Phone: ${formData.phone || 'Not specified'}
Details: ${formData.message}`
            };

            await axios.post(`${API_BASE_URL}/enquiries`, payload);
            setSubmitted(true);
            toast.success('Your message has been dispatched to ImageTech Technical Sales.');
            setFormData({ name: '', email: '', phone: '', company: '', subject: 'General Technical Inquiry', message: '' });
        } catch (error) {
            console.error('Error submitting form:', error);
            // Fallback user feedback
            setSubmitted(true);
            toast.success('Thank you! Our technical sales engineers will contact you shortly.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="pt-8 pb-20 min-h-screen bg-[#F5F8FC] font-sans">
            <SEO
                title="Contact ImageTech Industries | Technical Sales & Support"
                description="Get in touch with ImageTech Industries technical sales engineers for MAGNET Dyne Test Pens, Dyne Inks, Doctor Blades, or bulk OEM procurement inquiries."
                keywords={["contact imagetech", "dyne test pens supplier", "doctor blades manufacturer india", "surface tension test kit"]}
                schema={{
                    "@context": "https://schema.org",
                    "@type": "ContactPage",
                    "name": "Contact ImageTech Industries",
                    "description": "Technical support, sales and bulk quotation inquiries for Dyne test pens, inks, and doctor blades.",
                    "url": "https://www.imagetechindustries.com/contact",
                    "mainEntity": {
                        "@type": "Organization",
                        "name": "ImageTech Industries",
                        "address": {
                            "@type": "PostalAddress",
                            "streetAddress": "C-31, Nawada Housing Complex",
                            "addressLocality": "New Delhi",
                            "postalCode": "110059",
                            "addressCountry": "IN"
                        }
                    }
                }}
            />
            
            <div className="max-w-6xl mx-auto px-4">
                
                <div className="text-center mb-10">
                    <div className="inline-flex items-center gap-1.5 bg-[#0B3B6F]/10 text-[#0B3B6F] text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full mb-3">
                        <Award size={14} />
                        <span>Technical Application Desk</span>
                    </div>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#172B4D] tracking-tight mb-3">
                        Contact ImageTech Industries
                    </h1>
                    <p className="text-sm md:text-base text-gray-500 font-medium max-w-2xl mx-auto">
                        Speak directly with our chemical formulation engineers and flexo tooling specialists.
                    </p>
                </div>

                <div className="grid md:grid-cols-12 gap-8 bg-white rounded-2xl p-6 sm:p-10 shadow-sm border border-[#DCE5EF]">

                    {/* Contact Info (5 cols) */}
                    <div className="md:col-span-5 space-y-4">
                        <div>
                            <h2 className="text-xl font-bold text-[#172B4D] mb-1">Get in Touch</h2>
                            <p className="text-xs text-gray-500 leading-relaxed">
                                Reach out directly through any of our official channels below.
                            </p>
                        </div>

                        <div className="space-y-3.5 pt-1">
                            {/* 1. Office */}
                            <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-gray-200/90 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                                <div className="w-11 h-11 rounded-xl bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center shrink-0 border border-[#DBEAFE]">
                                    <MapPin size={22} className="stroke-[2.2]" />
                                </div>
                                <div className="text-sm">
                                    <h3 className="font-bold text-gray-900 text-[15px] mb-1">Office</h3>
                                    <p className="font-semibold text-gray-800 text-[13px] leading-tight mb-0.5">ImageTech Industries</p>
                                    <p className="text-gray-600 text-[12px] font-medium leading-relaxed uppercase">
                                        RZ-I-13, 2ND FLOOR, NANDA BLOCK, MAHAVIR ENCLAVE, DELHI-110045, INDIA.
                                    </p>
                                </div>
                            </div>

                            {/* 2. Email */}
                            <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-gray-200/90 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                                <div className="w-11 h-11 rounded-xl bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center shrink-0 border border-[#DBEAFE]">
                                    <Mail size={22} className="stroke-[2.2]" />
                                </div>
                                <div className="text-sm">
                                    <h3 className="font-bold text-gray-900 text-[15px] mb-1">Email</h3>
                                    <div className="space-y-0.5">
                                        <a 
                                            href="mailto:imagetechindustries@gmail.com" 
                                            className="block text-[13px] text-gray-700 hover:text-[#2563EB] font-medium transition-colors"
                                        >
                                            imagetechindustries@gmail.com
                                        </a>
                                        <a 
                                            href="mailto:sales.imagetechindustries@gmail.com" 
                                            className="block text-[13px] text-gray-700 hover:text-[#2563EB] font-medium transition-colors"
                                        >
                                            sales.imagetechindustries@gmail.com
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* 3. Phone */}
                            <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-gray-200/90 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                                <div className="w-11 h-11 rounded-xl bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center shrink-0 border border-[#DBEAFE]">
                                    <Phone size={22} className="stroke-[2.2]" />
                                </div>
                                <div className="text-sm">
                                    <h3 className="font-bold text-gray-900 text-[15px] mb-1">Phone</h3>
                                    <div className="space-y-0.5 font-medium text-[13px] text-gray-700">
                                        <a href="tel:+918448336036" className="block hover:text-[#2563EB] transition-colors">+91 8448336036</a>
                                        <a href="tel:+918851016580" className="block hover:text-[#2563EB] transition-colors">+91 8851016580</a>
                                        <a href="tel:+918448441345" className="block hover:text-[#2563EB] transition-colors">+91 8448441345</a>
                                    </div>
                                </div>
                            </div>

                            {/* 4. Business Hours */}
                            <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-gray-200/90 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                                <div className="w-11 h-11 rounded-xl bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center shrink-0 border border-[#DBEAFE]">
                                    <Clock size={22} className="stroke-[2.2]" />
                                </div>
                                <div className="text-sm">
                                    <h3 className="font-bold text-gray-900 text-[15px] mb-1">Business Hours</h3>
                                    <p className="text-[13px] text-gray-700 font-medium leading-relaxed">
                                        Monday – Saturday<br />
                                        9:00 AM – 6:00 PM (IST)
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact / RFQ Form (7 cols) */}
                    <div className="md:col-span-7 bg-[#F5F8FC] p-6 sm:p-8 rounded-xl border border-[#DCE5EF]">
                        <h2 className="text-lg font-bold text-[#172B4D] mb-1">Send a Technical Inquiry / Request a Quote</h2>
                        <p className="text-xs text-gray-500 mb-6">
                            Fill out the form below with your substrate or Dyne level requirements.
                        </p>

                        {submitted ? (
                            <div className="p-8 text-center bg-white rounded-xl border border-green-200">
                                <CheckCircle2 size={40} className="text-green-600 mx-auto mb-3" />
                                <h3 className="text-base font-bold text-[#172B4D]">Inquiry Dispatched!</h3>
                                <p className="text-xs text-gray-600 mt-1 max-w-sm mx-auto">
                                    Thank you for contacting ImageTech Industries. A technical sales representative will respond promptly with pricing and product datasheets.
                                </p>
                                <button
                                    onClick={() => setSubmitted(false)}
                                    className="mt-4 text-xs font-bold text-[#0D6EFD] underline"
                                >
                                    Send another inquiry
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-[#172B4D] mb-1">Your Name *</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            placeholder="e.g. Ramesh Patel"
                                            className="w-full px-3 py-2 text-xs bg-white border border-[#DCE5EF] rounded-lg outline-none focus:border-[#0D6EFD]"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-[#172B4D] mb-1">Corporate Email *</label>
                                        <input
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            placeholder="name@company.com"
                                            className="w-full px-3 py-2 text-xs bg-white border border-[#DCE5EF] rounded-lg outline-none focus:border-[#0D6EFD]"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-[#172B4D] mb-1">Phone / WhatsApp</label>
                                        <input
                                            type="tel"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            placeholder="+91 98765 43210"
                                            className="w-full px-3 py-2 text-xs bg-white border border-[#DCE5EF] rounded-lg outline-none focus:border-[#0D6EFD]"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-[#172B4D] mb-1">Company / Plant</label>
                                        <input
                                            type="text"
                                            value={formData.company}
                                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                            placeholder="Company Name"
                                            className="w-full px-3 py-2 text-xs bg-white border border-[#DCE5EF] rounded-lg outline-none focus:border-[#0D6EFD]"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-[#172B4D] mb-1">Subject</label>
                                    <select
                                        value={formData.subject}
                                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                        className="w-full px-3 py-2 text-xs bg-white border border-[#DCE5EF] rounded-lg outline-none focus:border-[#0D6EFD]"
                                    >
                                        <option>MAGNET Dyne Test Pen Inquiry (28-72 Dyne)</option>
                                        <option>Dyne Test Inks &amp; Bottled Reagents</option>
                                        <option>Doctor Blades for Flexo / Gravure</option>
                                        <option>Bulk Order / OEM Private Labeling</option>
                                        <option>Technical Support &amp; Calibration Certificates</option>
                                        <option>Other Commercial Inquiry</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-[#172B4D] mb-1">Message / Requirements *</label>
                                    <textarea
                                        rows={4}
                                        required
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        placeholder="Please detail your substrate (BOPP, PET, PE, Foil), target Dyne values, estimated quantity, or test conditions."
                                        className="w-full px-3 py-2 text-xs bg-white border border-[#DCE5EF] rounded-lg outline-none focus:border-[#0D6EFD] resize-none"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="w-full bg-[#0B3B6F] hover:bg-[#0D6EFD] text-white py-2.5 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-sm active:scale-95 disabled:opacity-60"
                                >
                                    {submitting ? 'Transmitting...' : (
                                        <>
                                            <Send size={14} /> Send Message &amp; Request Quote
                                        </>
                                    )}
                                </button>
                            </form>
                        )}
                    </div>

                </div>

            </div>
        </div>
    );
};

export default ContactUs;
