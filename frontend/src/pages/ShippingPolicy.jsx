import React from 'react';
import { Truck, ShieldCheck, Clock, MapPin, Package, AlertCircle } from 'lucide-react';
import SEO from '../components/SEO';

const ShippingPolicy = () => {
    return (
        <main className="pt-8 pb-20 min-h-screen bg-[#F5F8FC] font-sans">
            <SEO
                title="Shipping & Logistics Policy | ImageTech Industries"
                description="Commercial dispatch, freight terms, courier tracking, and industrial delivery guidelines for ImageTech Dyne Pens, Inks and Doctor Blades across India and global destinations."
            />

            <div className="max-w-4xl mx-auto px-4">
                
                <header className="text-center mb-10">
                    <div className="inline-flex items-center gap-1.5 bg-[#0B3B6F]/10 text-[#0B3B6F] text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full mb-3">
                        <Truck size={14} />
                        <span>Logistics &amp; Fulfillment</span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-black text-[#172B4D] tracking-tight mb-2">
                        Shipping &amp; Logistics Policy
                    </h1>
                    <p className="text-xs md:text-sm text-gray-500">
                        Reliable nationwide delivery with certified chemical packaging protocols.
                    </p>
                </header>

                <article className="bg-white rounded-2xl p-6 sm:p-10 border border-[#DCE5EF] shadow-xs space-y-8 text-xs md:text-sm text-gray-600 leading-relaxed">
                    
                    <section>
                        <h2 className="text-base font-bold text-[#0B3B6F] uppercase tracking-wider pb-2 mb-3 border-b border-gray-100 flex items-center gap-2">
                            <Clock size={18} className="text-[#0D6EFD]" />
                            Order Processing &amp; Dispatch Schedule
                        </h2>
                        <p className="mb-2">
                            All standard catalog orders for <strong>MAGNET Dyne Test Pens</strong> and <strong>Dyne Inks</strong> received before 3:00 PM IST (Monday through Friday) are dispatched on the same business day from our New Delhi manufacturing facility.
                        </p>
                        <p>
                            Custom dyne levels, special OEM branding, and customized slit doctor blade coils require a technical lead time of 2 to 4 working days for precision formulation, calibration, and QC release.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-base font-bold text-[#0B3B6F] uppercase tracking-wider pb-2 mb-3 border-b border-gray-100 flex items-center gap-2">
                            <MapPin size={18} className="text-[#0D6EFD]" />
                            Nationwide &amp; Global Delivery Timelines
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-3">
                            <div className="bg-[#F5F8FC] p-3.5 rounded-xl border border-[#DCE5EF]">
                                <h3 className="font-bold text-[#172B4D] text-xs mb-1">NCR &amp; North India</h3>
                                <p className="text-xs text-gray-500">1 – 2 Business Days via Express Surface / Air Cargo.</p>
                            </div>
                            <div className="bg-[#F5F8FC] p-3.5 rounded-xl border border-[#DCE5EF]">
                                <h3 className="font-bold text-[#172B4D] text-xs mb-1">Major Indian Metros</h3>
                                <p className="text-xs text-gray-500">2 – 3 Business Days (Mumbai, Bengaluru, Chennai, Kolkata, Ahmedabad).</p>
                            </div>
                            <div className="bg-[#F5F8FC] p-3.5 rounded-xl border border-[#DCE5EF]">
                                <h3 className="font-bold text-[#172B4D] text-xs mb-1">International Air Freight</h3>
                                <p className="text-xs text-gray-500">5 – 8 Business Days via DHL / FedEx International Priority.</p>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-base font-bold text-[#0B3B6F] uppercase tracking-wider pb-2 mb-3 border-b border-gray-100 flex items-center gap-2">
                            <Package size={18} className="text-[#0D6EFD]" />
                            Chemical Safety &amp; Shock-Proof Packaging
                        </h2>
                        <p>
                            All test ink bottles are double-sealed with inner plugs and packaged in protective thermoformed cushions to prevent pressure leakage during transit. Dyne test pens are individually sleeved and hermetically boxed with tamper-evident batch labels.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-base font-bold text-[#0B3B6F] uppercase tracking-wider pb-2 mb-3 border-b border-gray-100 flex items-center gap-2">
                            <ShieldCheck size={18} className="text-[#0D6EFD]" />
                            Tracking &amp; Proof of Delivery (POD)
                        </h2>
                        <p>
                            As soon as your shipment is picked up by our logistics partner (Blue Dart, DTDC, FedEx, or Delhivery), an automated dispatch notification with real-time AWB tracking is sent via email and SMS.
                        </p>
                    </section>

                </article>

            </div>
        </main>
    );
};

export default ShippingPolicy;
