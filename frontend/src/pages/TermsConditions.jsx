import React from 'react';
import { ShieldCheck, FileText, Scale } from 'lucide-react';
import SEO from '../components/SEO';

const TermsConditions = () => {
    return (
        <main className="pt-8 pb-20 min-h-screen bg-[#F5F8FC] font-sans">
            <SEO
                title="Commercial Terms & Conditions | ImageTech Industries"
                description="Commercial sales terms, quotation validity, product warranties, and payment conditions for ImageTech Industries B2B industrial testing solutions."
            />

            <div className="max-w-4xl mx-auto px-4">
                
                <header className="text-center mb-10">
                    <div className="inline-flex items-center gap-1.5 bg-[#0B3B6F]/10 text-[#0B3B6F] text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full mb-3">
                        <Scale size={14} />
                        <span>Commercial Agreement</span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-black text-[#172B4D] tracking-tight mb-2">
                        Terms &amp; Conditions of Commercial Sale
                    </h1>
                    <p className="text-xs md:text-sm text-gray-500">
                        ImageTech Industries • B2B Industrial Supply &amp; Technical Services
                    </p>
                </header>

                <article className="bg-white rounded-2xl p-6 sm:p-10 border border-[#DCE5EF] shadow-xs space-y-8 text-xs md:text-sm text-gray-600 leading-relaxed">
                    
                    <section>
                        <h2 className="text-base font-bold text-[#0B3B6F] uppercase tracking-wider pb-2 mb-3 border-b border-gray-100">
                            1. Scope &amp; Commercial Quotations
                        </h2>
                        <p>
                            All supply agreements, commercial proforma invoices, and online purchases from <strong>ImageTech Industries</strong> are governed exclusively by these commercial terms. Official quotations provided to industrial clients remain valid for 30 calendar days from the date of issue unless specified otherwise.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-base font-bold text-[#0B3B6F] uppercase tracking-wider pb-2 mb-3 border-b border-gray-100">
                            2. Product Technical Specifications &amp; Intended Use
                        </h2>
                        <p>
                            MAGNET Dyne Test Pens and Dyne Test Inks are formulated solely for industrial surface tension and corona discharge verification on plastic films, foils, and paperboards. The purchaser is responsible for validating the appropriateness of the dyne level and doctor blade edge profile for their specific pressroom machinery and substrates.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-base font-bold text-[#0B3B6F] uppercase tracking-wider pb-2 mb-3 border-b border-gray-100">
                            3. Pricing, Taxes &amp; Invoicing
                        </h2>
                        <p>
                            All catalog prices are listed in Indian Rupees (INR) or agreed contract currency. Applicable GST (Goods and Services Tax) and freight surcharges are detailed transparently at checkout and on official GST tax invoices.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-base font-bold text-[#0B3B6F] uppercase tracking-wider pb-2 mb-3 border-b border-gray-100">
                            4. Intellectual Property &amp; Brand Rights
                        </h2>
                        <p>
                            "ImageTech Industries", "MAGNET Dyne", technical datasheets, and proprietary fluid formulations are protected intellectual property of ImageTech Industries. No unauthorized reproduction or reverse engineering is permitted.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-base font-bold text-[#0B3B6F] uppercase tracking-wider pb-2 mb-3 border-b border-gray-100">
                            5. Jurisdiction
                        </h2>
                        <p>
                            Any legal dispute arising from transactions with ImageTech Industries shall be subject to the exclusive jurisdiction of the competent courts of New Delhi, India.
                        </p>
                    </section>

                </article>

            </div>
        </main>
    );
};

export default TermsConditions;
