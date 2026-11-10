import React, { useState } from 'react';
import { ChevronDown, HelpCircle, FileText, ShieldCheck, Mail, Phone } from 'lucide-react';
import SEO from '../components/SEO';
import RequestQuoteModal from '../components/common/RequestQuoteModal';

const FAQs = () => {
    const [openIndex, setOpenIndex] = useState(null);
    const [isQuoteOpen, setIsQuoteOpen] = useState(false);

    const faqData = [
        {
            category: "Dyne Test Pens & Inks",
            questions: [
                {
                    q: "What is a Dyne Test Pen and how does it determine surface energy?",
                    a: "A Dyne test pen is an analytical tool formulated with calibrated liquids having known surface tensions (measured in mN/m or Dyne/cm). When applied to a polymer substrate, if the liquid film stays continuous for at least 2 seconds without beading up, the surface energy of the substrate is equal to or greater than the pen's dyne value."
                },
                {
                    q: "What international standards do MAGNET Dyne Pens conform to?",
                    a: "All ImageTech MAGNET Dyne Pens and Dyne Test Inks are strictly formulated, batch-tested, and calibrated per ASTM D2578, ISO 8296, and DIN 53364 international standards for polyolefin and plastic films."
                },
                {
                    q: "What is the advantage of valve-action pens over standard felt tip markers?",
                    a: "Valve-action Dyne pens feature a spring-loaded tip that seals the reservoir hermetically. Unlike capillary felt markers which absorb surface dust, contaminants, and wax from films into the reservoir, valve pens only release fresh fluid on demand, guaranteeing zero cross-contamination and accurate readings."
                },
                {
                    q: "What dyne levels are typically required for printing and lamination?",
                    a: "Generally, BOPP, PET, and PE films require at least 38 Dyne/cm for solvent-based flexo printing, 42-44 Dyne/cm for water-based or UV inks, and 40-42 Dyne/cm for solventless or extrusion lamination."
                }
            ]
        },
        {
            category: "Doctor Blades & Technical Specifications",
            questions: [
                {
                    q: "What edge profiles are available for ImageTech Doctor Blades?",
                    a: "We manufacture Lamella (stepped), Beveled, and Rounded edge doctor blades from high-grade Swedish carbon steel and ceramic-coated alloys. Lamella edges are ideal for precise flexographic metering with constant contact area throughout the blade life."
                },
                {
                    q: "Can ImageTech provide Certificate of Analysis (CoA) with shipments?",
                    a: "Yes. Every batch of MAGNET Dyne Pens and Dyne Inks comes with a batch number and a Certificate of Analysis confirming tensiometer surface tension measurement and ISO 9001:2015 quality control signoff."
                }
            ]
        },
        {
            category: "Commercial, Bulk Supply & Dispatch",
            questions: [
                {
                    q: "Do you supply customized Dyne levels or OEM private label branding?",
                    a: "Yes. We offer contract OEM manufacturing with customized pen body labeling, private branded packaging, and non-standard dyne calibrations (from 28 to 72 Dyne/cm in 0.5 increments upon request) for international distributors."
                },
                {
                    q: "What are your standard delivery timelines across India and internationally?",
                    a: "Standard stock Dyne pens and inks (28 to 56 Dyne/cm) are dispatched within 24 hours of purchase order receipt. Bulk contracts and custom doctor blade coils typically dispatch in 3 to 5 business days."
                }
            ]
        }
    ];

    const toggleFaq = (idx) => {
        setOpenIndex(openIndex === idx ? null : idx);
    };

    return (
        <main className="pt-8 pb-20 min-h-screen bg-[#F5F8FC] font-sans">
            <SEO
                title="Technical FAQs | ImageTech Industries"
                description="Frequently asked technical questions regarding MAGNET Dyne Test Pens, ASTM D2578 surface energy measurement, doctor blade edge profiles, and bulk supply."
                keywords={["dyne pen faq", "surface tension measurement test", "how to use dyne pen", "astm d2578"]}
            />

            <div className="max-w-4xl mx-auto px-4">
                
                <header className="text-center mb-12">
                    <div className="inline-flex items-center gap-1.5 bg-[#0B3B6F]/10 text-[#0B3B6F] text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full mb-3">
                        <HelpCircle size={14} />
                        <span>Technical Knowledgebase</span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-black text-[#172B4D] tracking-tight mb-3">
                        Frequently Asked Questions
                    </h1>
                    <p className="text-sm md:text-base text-gray-500 max-w-xl mx-auto">
                        Detailed answers regarding surface energy testing principles, ASTM standards, shelf life, and order fulfillment.
                    </p>
                </header>

                <div className="space-y-8">
                    {faqData.map((section, secIdx) => (
                        <div key={secIdx} className="bg-white rounded-2xl p-6 sm:p-8 border border-[#DCE5EF] shadow-xs">
                            <h2 className="text-base font-bold text-[#0B3B6F] uppercase tracking-wider pb-3 mb-4 border-b border-gray-100 flex items-center gap-2">
                                <ShieldCheck size={18} className="text-[#0D6EFD]" />
                                {section.category}
                            </h2>

                            <div className="space-y-3">
                                {section.questions.map((faq, itemIdx) => {
                                    const globalIdx = `${secIdx}-${itemIdx}`;
                                    const isOpen = openIndex === globalIdx;

                                    return (
                                        <div 
                                            key={itemIdx}
                                            className="border border-[#DCE5EF] rounded-xl overflow-hidden transition-colors"
                                        >
                                            <button
                                                onClick={() => toggleFaq(globalIdx)}
                                                className="w-full text-left p-4 bg-[#F5F8FC] hover:bg-gray-100/80 flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-[#172B4D] transition-colors"
                                            >
                                                <span>{faq.q}</span>
                                                <ChevronDown 
                                                    size={16} 
                                                    className={`shrink-0 text-[#0B3B6F] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
                                                />
                                            </button>
                                            {isOpen && (
                                                <div className="p-4 bg-white text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-[#DCE5EF]">
                                                    {faq.a}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Direct Help Strip */}
                <div className="mt-12 bg-white rounded-2xl p-6 border border-[#DCE5EF] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
                    <div>
                        <h3 className="text-sm font-bold text-[#172B4D]">Have a specialized substrate or application question?</h3>
                        <p className="text-xs text-gray-500 mt-0.5">
                            Our laboratory technicians are available to analyze your test samples.
                        </p>
                    </div>
                    <button
                        onClick={() => setIsQuoteOpen(true)}
                        className="bg-[#0B3B6F] hover:bg-[#0D6EFD] text-white px-5 py-2.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap"
                    >
                        Ask Technical Team
                    </button>
                </div>

            </div>

            <RequestQuoteModal
                isOpen={isQuoteOpen}
                onClose={() => setIsQuoteOpen(false)}
                initialProduct="Technical Inquiry / FAQ Page"
            />
        </main>
    );
};

export default FAQs;
