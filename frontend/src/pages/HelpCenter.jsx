import React, { useState } from 'react';
import { HelpCircle, Mail, Phone, FileText, CheckCircle2, ShieldCheck, MapPin } from 'lucide-react';
import SEO from '../components/SEO';
import RequestQuoteModal from '../components/common/RequestQuoteModal';

const HelpCenter = () => {
    const [isQuoteOpen, setIsQuoteOpen] = useState(false);

    return (
        <main className="pt-8 pb-20 min-h-screen bg-[#F5F8FC] font-sans">
            <SEO
                title="Technical Support & Help Center | ImageTech Industries"
                description="Technical support desk, MSDS datasheets, order tracking, and laboratory assistance for ImageTech Dyne Pens, Dyne Inks, and Doctor Blades."
            />

            <div className="max-w-5xl mx-auto px-4">
                
                <header className="text-center mb-12">
                    <div className="inline-flex items-center gap-1.5 bg-[#0B3B6F]/10 text-[#0B3B6F] text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full mb-3">
                        <HelpCircle size={14} />
                        <span>Technical Assistance Desk</span>
                    </div>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#172B4D] tracking-tight mb-3">
                        ImageTech Help Center &amp; Support
                    </h1>
                    <p className="text-sm md:text-base text-gray-500 max-w-xl mx-auto">
                        Need guidance on ASTM D2578 test procedures, MSDS safety data, or custom volume pricing? We are here to assist.
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    
                    <div className="bg-white rounded-2xl p-6 border border-[#DCE5EF] shadow-xs flex flex-col justify-between">
                        <div>
                            <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0B3B6F] flex items-center justify-center mb-4">
                                <FileText size={24} />
                            </div>
                            <h3 className="font-bold text-sm text-[#172B4D] mb-1">Request a Quote / RFQ</h3>
                            <p className="text-xs text-gray-500 leading-relaxed mb-4">
                                Get formal commercial pricing, volume discount slabs, and proforma invoices for procurement teams.
                            </p>
                        </div>
                        <button
                            onClick={() => setIsQuoteOpen(true)}
                            className="w-full bg-[#0B3B6F] hover:bg-[#0D6EFD] text-white text-xs font-bold py-2.5 rounded-lg transition-colors"
                        >
                            Open Quote Request Form
                        </button>
                    </div>

                    <div className="bg-white rounded-2xl p-6 border border-[#DCE5EF] shadow-xs flex flex-col justify-between">
                        <div>
                            <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0B3B6F] flex items-center justify-center mb-4">
                                <Phone size={24} />
                            </div>
                            <h3 className="font-bold text-sm text-[#172B4D] mb-1">Direct Technical Support</h3>
                            <p className="text-xs text-gray-500 leading-relaxed mb-4">
                                Consult with an application chemist regarding corona treatment levels, wetting problems, or ink adhesion.
                            </p>
                        </div>
                        <a
                            href="tel:+918448336036"
                            className="w-full bg-white hover:bg-gray-50 border border-[#DCE5EF] text-[#0B3B6F] text-xs font-bold py-2.5 rounded-lg transition-colors text-center block"
                        >
                            Call: +91 8448336036
                        </a>
                    </div>

                    <div className="bg-white rounded-2xl p-6 border border-[#DCE5EF] shadow-xs flex flex-col justify-between">
                        <div>
                            <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0B3B6F] flex items-center justify-center mb-4">
                                <Mail size={24} />
                            </div>
                            <h3 className="font-bold text-sm text-[#172B4D] mb-1">Email Sales &amp; Dispatch</h3>
                            <p className="text-xs text-gray-500 leading-relaxed mb-4">
                                For Purchase Orders, logistics tracking, or GST billing updates, reach out to our desk.
                            </p>
                        </div>
                        <a
                            href="mailto:sales@imagetechindustries.com"
                            className="w-full bg-white hover:bg-gray-50 border border-[#DCE5EF] text-[#0B3B6F] text-xs font-bold py-2.5 rounded-lg transition-colors text-center block"
                        >
                            sales@imagetechindustries.com
                        </a>
                    </div>

                </div>

            </div>

            <RequestQuoteModal
                isOpen={isQuoteOpen}
                onClose={() => setIsQuoteOpen(false)}
                initialProduct="Help Center Assistance"
            />
        </main>
    );
};

export default HelpCenter;
