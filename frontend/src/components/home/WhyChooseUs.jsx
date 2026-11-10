import React from 'react';
import { Target, Factory, Layers, Award, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const WhyChooseUs = () => {
  const pillars = [
    {
      icon: Target,
      title: "High Precision",
      description: "Every dyne test pen is calibrated to ±0.5 mN/m. We follow ASTM D2578, ISO 8296 and DIN 53364 standards, so your surface energy readings are accurate and reliable."
    },
    {
      icon: Factory,
      title: "Industrial Grade",
      description: "Our dyne test pens have strong valve-action housings and a sealed fluid chamber that keeps out dirt. They are built to work well on busy converting floors."
    },
    {
      icon: Layers,
      title: "Wide Product Range",
      description: "Choose any dyne level from 28 to 72 dyne/cm (mN/m). We also stock certified dyne test pen ink and high-quality flexo doctor blades, ready to ship."
    },
    {
      icon: Award,
      title: "Quality Assured",
      description: "Our factory is ISO 9001:2015 certified. Every batch is checked with automated analytical testing before it leaves our plant."
    },
    {
      icon: ShieldCheck,
      title: "Trusted by Industries",
      description: "Over 500 packaging printers, film extrusion lines, automotive compounders and testing labs buy from ImageTech Industries."
    }
  ];

  return (
    <section className="py-14 md:py-20 bg-white font-sans border-b border-[#DCE5EF]">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        
        {/* Header Block with SEO-Compliant Tags */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
          
          {/* Eyebrow Label (span/p as recommended) */}
          <div className="inline-flex items-center gap-1.5 bg-[#0B3B6F]/10 text-[#0B3B6F] text-[11px] sm:text-xs font-black uppercase tracking-wider px-3.5 py-1 rounded-full mb-3.5">
            <Award size={14} className="text-[#0B3B6F]" />
            <span>Manufacturing Excellence</span>
          </div>

          {/* H2 SEO Heading */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-black text-[#0B3B6F] tracking-tight leading-tight mb-4">
            Why Choose ImageTech Industries for Dyne Test Pens, Dyne Test Pen Ink &amp; Flexo Doctor Blades
          </h2>

          {/* Body Paragraph with Natural Internal Keyword Links */}
          <p className="text-sm sm:text-base text-[#172B4D] leading-relaxed font-semibold">
            We make{' '}
            <Link 
              to="/shop?category=Dyne%20Test%20Pen&subcategory=Dyne%20Test%20Pen" 
              className="text-[#0D6EFD] font-black underline decoration-[#0D6EFD]/40 hover:decoration-[#0D6EFD] transition-colors"
            >
              dyne test pens
            </Link>
            ,{' '}
            <Link 
              to="/shop?category=Dyne%20Test%20Pen&subcategory=Dyne%20Test%20Pen%20Ink" 
              className="text-[#0D6EFD] font-black underline decoration-[#0D6EFD]/40 hover:decoration-[#0D6EFD] transition-colors"
            >
              dyne test pen ink
            </Link>{' '}
            and{' '}
            <Link 
              to="/shop?search=Doctor+Blade" 
              className="text-[#0D6EFD] font-black underline decoration-[#0D6EFD]/40 hover:decoration-[#0D6EFD] transition-colors"
            >
              flexo doctor blades
            </Link>{' '}
            in our own factory. Our products help plants measure surface energy correctly and get steady print quality. Industry leaders in India and across the world trust us.
          </p>
        </div>

        {/* 5 Feature Cards Grid with H3 Tags */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-5">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="bg-[#F8FAFC] rounded-2xl p-5 md:p-6 border border-[#DCE5EF] hover:border-[#0D6EFD] hover:bg-white shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group hover:-translate-y-1.5"
              >
                <div className="w-12 h-12 rounded-xl bg-white text-[#0B3B6F] group-hover:bg-[#0B3B6F] group-hover:text-white flex items-center justify-center mb-4 transition-all shadow-xs border border-gray-200">
                  <Icon size={22} className="stroke-[2.5]" />
                </div>

                {/* H3 Heading for SEO */}
                <h3 className="text-sm md:text-base font-black text-[#0B3B6F] group-hover:text-[#0D6EFD] transition-colors mb-2.5 tracking-tight">
                  {pillar.title}
                </h3>

                <p className="text-xs text-[#2D3748] group-hover:text-[#172B4D] leading-relaxed font-semibold">
                  {pillar.description}
                </p>

                {pillar.title === "Quality Assured" && (
                  <div className="mt-auto pt-3">
                    <span className="inline-flex items-center gap-1.5 text-xs font-black text-[#0D6EFD] bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200/60">
                      <span>ISO 9001:2015</span>
                      <CheckCircle2 size={13} className="text-emerald-600" />
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;
