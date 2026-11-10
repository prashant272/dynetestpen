import React from 'react';
import { ShieldCheck, RotateCcw, AlertTriangle, CheckCircle2, Award } from 'lucide-react';
import SEO from '../components/SEO';

const ReturnPolicy = () => {
    return (
        <main className="pt-8 pb-20 min-h-screen bg-[#F5F8FC] font-sans">
            <SEO
                title="Quality Assurance & Replacement Policy | ImageTech Industries"
                description="ImageTech Industries ISO 9001:2015 quality guarantee, calibration variance replacements, and industrial return guidelines."
            />

            <div className="max-w-4xl mx-auto px-4">
                
                <header className="text-center mb-10">
                    <div className="inline-flex items-center gap-1.5 bg-[#0B3B6F]/10 text-[#0B3B6F] text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full mb-3">
                        <Award size={14} />
                        <span>ISO 9001:2015 Quality Commitment</span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-black text-[#172B4D] tracking-tight mb-2">
                        Quality Assurance &amp; Return Policy
                    </h1>
                    <p className="text-xs md:text-sm text-gray-500">
                        100% batch calibration accuracy backed by comprehensive laboratory replacement support.
                    </p>
                </header>

                <article className="bg-white rounded-2xl p-6 sm:p-10 border border-[#DCE5EF] shadow-xs space-y-8 text-xs md:text-sm text-gray-600 leading-relaxed">
                    
                    <section>
                        <h2 className="text-base font-bold text-[#0B3B6F] uppercase tracking-wider pb-2 mb-3 border-b border-gray-100 flex items-center gap-2">
                            <ShieldCheck size={18} className="text-[#0D6EFD]" />
                            100% Quality &amp; Accuracy Guarantee
                        </h2>
                        <p className="mb-2">
                            Every <strong>MAGNET Dyne Test Pen</strong> and <strong>Dyne Test Ink</strong> batch produced by ImageTech Industries undergoes analytical surface tension verification using digital tensiometers before leaving our laboratory.
                        </p>
                        <p>
                            If any sealed product exhibits an unexpected calibration variance from the ASTM D2578 / ISO 8296 certified tolerance (±0.5 Dyne/cm), ImageTech will arrange immediate complimentary replacement or commercial credit.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-base font-bold text-[#0B3B6F] uppercase tracking-wider pb-2 mb-3 border-b border-gray-100 flex items-center gap-2">
                            <RotateCcw size={18} className="text-[#0D6EFD]" />
                            Replacement &amp; Transit Claims Process
                        </h2>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-2.5">
                                <CheckCircle2 size={16} className="text-green-600 shrink-0 mt-0.5" />
                                <div>
                                    <strong>Transit Damage or Leakage:</strong> Report within 48 hours of shipment delivery with photographs of packaging to <span className="font-semibold text-[#0B3B6F]">sales@imagetechindustries.com</span>. We dispatch expedited replacements immediately.
                                </div>
                            </li>
                            <li className="flex items-start gap-2.5">
                                <CheckCircle2 size={16} className="text-green-600 shrink-0 mt-0.5" />
                                <div>
                                    <strong>Incorrect Specification Dispatch:</strong> If delivered dyne values or blade profiles differ from your approved Purchase Order, replacement stock is sent via Priority Air Freight at our expense.
                                </div>
                            </li>
                            <li className="flex items-start gap-2.5">
                                <CheckCircle2 size={16} className="text-green-600 shrink-0 mt-0.5" />
                                <div>
                                    <strong>Shelf Life &amp; Storage Conditions:</strong> Pens must be stored capped between 15°C and 25°C away from direct sunlight. Claims must cite the printed batch number on the container.
                                </div>
                            </li>
                        </ul>
                    </section>

                    <section className="bg-[#F5F8FC] p-4 rounded-xl border border-[#DCE5EF]">
                        <h3 className="font-bold text-xs text-[#172B4D] mb-1">Commercial Returns &amp; Restocking</h3>
                        <p className="text-xs text-gray-500">
                            Because chemical reagents and surface tension fluids are sensitive to environmental contamination once opened, unsealed liquid containers cannot be restocked for general sale. Unopened, intact master cases may be returned within 14 days subject to standard commercial restocking inspection.
                        </p>
                    </section>

                </article>

            </div>
        </main>
    );
};

export default ReturnPolicy;
