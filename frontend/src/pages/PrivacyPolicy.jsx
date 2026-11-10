import React from 'react';
import { ShieldCheck, Lock, Eye } from 'lucide-react';
import SEO from '../components/SEO';

const PrivacyPolicy = () => {
    return (
        <main className="pt-8 pb-20 min-h-screen bg-[#F5F8FC] font-sans">
            <SEO
                title="Privacy & Data Protection Policy | ImageTech Industries"
                description="How ImageTech Industries handles client commercial data, RFQ submissions, and business contact information."
            />

            <div className="max-w-4xl mx-auto px-4">
                
                <header className="text-center mb-10">
                    <div className="inline-flex items-center gap-1.5 bg-[#0B3B6F]/10 text-[#0B3B6F] text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full mb-3">
                        <Lock size={14} />
                        <span>Corporate Data Protection</span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-black text-[#172B4D] tracking-tight mb-2">
                        Privacy Policy
                    </h1>
                    <p className="text-xs md:text-sm text-gray-500">
                        ImageTech Industries commits to rigorous commercial data confidentiality.
                    </p>
                </header>

                <article className="bg-white rounded-2xl p-6 sm:p-10 border border-[#DCE5EF] shadow-xs space-y-8 text-xs md:text-sm text-gray-600 leading-relaxed">
                    
                    <section>
                        <h2 className="text-base font-bold text-[#0B3B6F] uppercase tracking-wider pb-2 mb-3 border-b border-gray-100">
                            1. Information Collection &amp; Use
                        </h2>
                        <p>
                            When you submit an industrial RFQ (Request for Quote), order Dyne pens, or communicate with ImageTech Industries, we collect company names, procurement contact details, delivery addresses, GSTIN numbers, and specific technical requirements. This information is utilized solely to provide commercial quotations, process shipments, and provide technical post-sales support.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-base font-bold text-[#0B3B6F] uppercase tracking-wider pb-2 mb-3 border-b border-gray-100">
                            2. Non-Disclosure &amp; Substrate Confidentiality
                        </h2>
                        <p>
                            We frequently test confidential barrier films, proprietary coatings, and prototype substrates for clients. ImageTech Industries treats all client application specifications, testing results, and customized formulations with strict non-disclosure safeguards.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-base font-bold text-[#0B3B6F] uppercase tracking-wider pb-2 mb-3 border-b border-gray-100">
                            3. Payment Security &amp; Contact
                        </h2>
                        <p>
                            All online payments on ImageTech Industries are routed through PCI-DSS Level 1 certified gateways (Razorpay). We do not store corporate credit cards or banking passwords on our servers. For questions regarding your commercial account data, contact <span className="font-semibold text-[#0B3B6F]">sales@imagetechindustries.com</span>.
                        </p>
                    </section>

                </article>

            </div>
        </main>
    );
};

export default PrivacyPolicy;
