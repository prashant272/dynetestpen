import React, { useState } from 'react';
import { Sparkles, FileText, Phone, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import RequestQuoteModal from '../common/RequestQuoteModal';

const BulkOrderBanner = () => {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);

  const features = [
    {
      title: "Bulk Supply Contracts",
      desc: "Fixed monthly deliveries with special pricing for large orders."
    },
    {
      title: "Custom Dyne Levels",
      desc: "Get dyne test pens and ink in any level from 28 to 72 dyne/cm (mN/m), made to exact tolerance."
    },
    {
      title: "OEM & Private Label",
      desc: "Your brand name, your packaging and your labels on dyne test pens. Ideal for distributors and exporters."
    },
    {
      title: "Technical Support",
      desc: "Talk directly to our polymer chemists and ASTM testing experts."
    },
    {
      title: "Same Quality in Every Batch",
      desc: "Every batch comes with a Certificate of Analysis (CoA) and a surface tensiometer report."
    }
  ];

  return (
    <>
      <section className="py-12 md:py-16 bg-[#F5F8FC] font-sans border-b border-[#DCE5EF]">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <div className="relative rounded-3xl bg-gradient-to-br from-[#071C35] via-[#0B3B6F] to-[#0A2E59] text-white p-6 sm:p-10 md:p-12 overflow-hidden shadow-2xl border border-blue-900/40">

            {/* Subtle Industrial Grid Pattern */}
            <div
              className="absolute inset-0 opacity-10 pointer-events-none"
              style={{
                backgroundImage: `radial-gradient(circle, #ffffff 1px, transparent 1px)`,
                backgroundSize: '24px 24px'
              }}
            />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

              {/* Left Column: Heading, SEO Copy & CTAs */}
              <div className="lg:col-span-7 space-y-4 sm:space-y-5">

                {/* Eyebrow Label (span/p as per SEO guidelines) */}
                <div className="inline-flex items-center gap-2 bg-[#FFC107] text-[#0B3B6F] text-[11px] sm:text-xs font-black uppercase tracking-wider px-3.5 py-1 rounded-full shadow-xs">
                  <Sparkles size={13} className="shrink-0" />
                  <span>Factory Direct OEM &amp; Bulk Supply</span>
                </div>

                {/* H2 SEO Heading */}
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-black tracking-tight leading-tight text-white">
                  Buy Dyne Test Pens &amp; Dyne Test Pen Ink in Bulk from the Manufacturer
                </h2>

                {/* Body Paragraph with Natural Internal Keyword Links */}
                <p className="text-blue-100 text-xs sm:text-sm md:text-base leading-relaxed font-normal max-w-2xl">
                  Looking for{' '}
                  <Link
                    to="/shop?category=Dyne%20Test%20Pen&subcategory=Dyne%20Test%20Pen"
                    className="text-[#FFC107] font-bold underline decoration-[#FFC107]/50 hover:decoration-[#FFC107] transition-colors"
                  >
                    dyne test pens
                  </Link>{' '}
                  or{' '}
                  <Link
                    to="/shop?category=Dyne%20Test%20Pen&subcategory=Dyne%20Test%20Pen%20Ink"
                    className="text-[#FFC107] font-bold underline decoration-[#FFC107]/50 hover:decoration-[#FFC107] transition-colors"
                  >
                    dyne test pen ink
                  </Link>{' '}
                  in large quantity? We make them in our own factory, so you get better prices, steady supply and direct technical help. We supply film converters, flexo printing plants and automotive polymer compounders across the world.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
                  <button
                    onClick={() => setIsQuoteOpen(true)}
                    className="bg-[#FFC107] hover:bg-[#e0a800] text-[#0B3B6F] font-black px-6 sm:px-7 py-3.5 rounded-xl text-xs sm:text-sm transition-all shadow-lg active:scale-95 flex items-center gap-2 cursor-pointer hover:shadow-xl"
                  >
                    <FileText size={16} />
                    <span>Request a Bulk Quote</span>
                  </button>

                  <a
                    href="tel:+918448336036"
                    className="bg-white/10 hover:bg-white/20 text-white border border-white/25 hover:border-[#FFC107] px-5 sm:px-6 py-3.5 rounded-xl text-xs sm:text-sm font-bold transition-all backdrop-blur-xs flex items-center gap-2 active:scale-95 cursor-pointer"
                  >
                    <Phone size={15} className="text-[#FFC107]" />
                    <span>Call Technical Sales: +91 8448336036</span>
                  </a>
                </div>

              </div>

              {/* Right Column: 5 Feature Points with H3 Headings */}
              <div className="lg:col-span-5 space-y-2.5 sm:space-y-3">
                {features.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-white/10 hover:bg-white/15 border border-white/10 rounded-2xl p-3.5 sm:p-4 backdrop-blur-xs transition-all flex items-start gap-3 shadow-xs hover:border-[#FFC107]/40 group"
                  >
                    <div className="w-6 h-6 rounded-full bg-[#FFC107] text-[#0B3B6F] flex items-center justify-center shrink-0 mt-0.5 font-black text-xs group-hover:scale-110 transition-transform">
                      ✓
                    </div>
                    <div>
                      {/* H3 Tag for SEO */}
                      <h3 className="text-xs sm:text-sm font-black text-white group-hover:text-[#FFC107] transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-[11px] sm:text-xs text-blue-100/85 mt-0.5 leading-snug font-medium">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

            </div>

          </div>
        </div>
      </section>

      <RequestQuoteModal
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
        initialProduct="Factory Direct OEM & Bulk Supply Inquiry"
      />
    </>
  );
};

export default BulkOrderBanner;
