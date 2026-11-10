import React from 'react';
import { 
  FileText, Download, Award, ShieldCheck, CheckCircle2, 
  Building2, ArrowRight, ExternalLink, Cpu, Printer, Layers
} from 'lucide-react';
import { 
  APPLICATION_SECTORS, TECHNICAL_RESOURCES, CLIENT_LOGOS, 
  INDUSTRIAL_TESTIMONIALS 
} from '../../data/industrialData';

export const ProductApplications = () => {
  const applicationCards = [
    {
      title: "Dyne Test Pens for Flexible Packaging & Converting",
      description: "Check corona treatment on BOPP, PET, CPP and PE films before extrusion coating or solventless lamination.",
      dyneRange: "Typical range: 28 to 56 dyne/cm",
      icon: Layers,
      link: "/shop?category=Dyne%20Test%20Pen&subcategory=Dyne%20Test%20Pen"
    },
    {
      title: "Dyne Test Pens for Flexo & Gravure Printing",
      description: "Stop ink pinholing, flaking and mottling by testing the film just before the print cylinder.",
      dyneRange: "Target range: 38 to 44 dyne/cm",
      icon: Printer,
      link: "/shop?category=Dyne%20Test%20Pen&subcategory=Dyne%20Test%20Pen"
    },
    {
      title: "Dyne Test Pens for Automotive & Plastic Parts",
      description: "Verify plasma and flame treatment on PP bumpers, EPDM seals, dashboards and bonding areas.",
      dyneRange: "Precision range: 48 to 72 dyne/cm",
      icon: Cpu,
      link: "/shop?category=Dyne%20Test%20Pen&subcategory=Dyne%20Test%20Pen"
    },
    {
      title: "Dyne Test Pens for Medical & Pharmaceutical Films",
      description: "Quality checks for blister foil adhesion, sterile barrier packaging and diagnostic test strip polymers.",
      dyneRange: "Typical range: 38 to 60 dyne/cm",
      icon: ShieldCheck,
      link: "/shop?category=Dyne%20Test%20Pen&subcategory=Dyne%20Test%20Pen"
    }
  ];

  return (
    <section className="py-14 md:py-20 bg-white font-sans border-b border-[#DCE5EF]">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
          <p className="inline-flex items-center gap-1.5 bg-[#0B3B6F]/10 text-[#0B3B6F] text-[11px] sm:text-xs font-black uppercase tracking-wider px-3.5 py-1 rounded-full mb-3.5">
            Industrial Use Cases
          </p>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0B3B6F] tracking-tight leading-tight mb-4">
            Dyne Test Pen Applications: Packaging, Printing, Automotive &amp; Medical Films
          </h2>

          <p className="text-sm sm:text-base text-[#172B4D] leading-relaxed font-semibold">
            Our dyne test pens and dyne test pen ink help plants check surface energy quickly and avoid print, coating and bonding problems. Here is where our customers use them most.
          </p>
        </div>

        {/* 4 Application Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {applicationCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <a
                key={idx}
                href={card.link}
                className="bg-[#F8FAFC] rounded-2xl p-6 border border-[#DCE5EF] hover:border-[#0D6EFD] hover:bg-white transition-all duration-300 flex flex-col justify-between group shadow-xs hover:shadow-xl hover:-translate-y-1"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#0B3B6F] text-white flex items-center justify-center mb-4 shadow-sm group-hover:scale-105 transition-transform">
                    <Icon size={22} />
                  </div>

                  {/* Card Title (H3 tag for SEO) */}
                  <h3 className="text-sm sm:text-base font-black text-[#0B3B6F] group-hover:text-[#0D6EFD] transition-colors mb-2.5 leading-snug">
                    {card.title}
                  </h3>

                  <p className="text-xs text-[#2D3748] leading-relaxed font-medium mb-5">
                    {card.description}
                  </p>
                </div>

                {/* Dyne Range Tag (Replaced inappropriate ISO tag on medical card) */}
                <div className="pt-3 border-t border-gray-200/70 flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold text-[#0B3B6F] bg-white px-2.5 py-1 rounded-lg border border-[#DCE5EF] shadow-2xs">
                    {card.dyneRange}
                  </span>
                  <ArrowRight size={15} className="text-[#0D6EFD] group-hover:translate-x-1 transition-transform" />
                </div>
              </a>
            );
          })}
        </div>

        {/* Bottom SEO Internal Links Strip */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 pt-4 border-t border-gray-100 text-xs sm:text-sm font-bold text-gray-500">
          <a 
            href="/shop?category=Dyne%20Test%20Pen&subcategory=Dyne%20Test%20Pen" 
            className="text-[#0B3B6F] hover:text-[#0D6EFD] hover:underline"
          >
            Explore Dyne Test Pens
          </a>
          <span className="text-gray-300 hidden sm:inline">|</span>
          <a 
            href="/shop?category=Dyne%20Test%20Pen&subcategory=Dyne%20Test%20Pen%20Ink" 
            className="text-[#0B3B6F] hover:text-[#0D6EFD] hover:underline"
          >
            Buy Dyne Test Pen Ink
          </a>
          <span className="text-gray-300 hidden sm:inline">|</span>
          <a 
            href="/shop" 
            className="text-[#0D6EFD] font-black hover:underline"
          >
            Request Bulk Quote
          </a>
        </div>

      </div>
    </section>
  );
};

export const IndustrialSolutionsBanners = () => {
  return (
    <section className="py-12 bg-[#F5F8FC] font-sans border-b border-[#DCE5EF]">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Solution Banner 1: Surface Energy Testing */}
          <div className="rounded-2xl bg-gradient-to-br from-[#0B3B6F] to-[#082a50] text-white p-6 sm:p-8 flex flex-col justify-between shadow-md relative overflow-hidden">
            <div className="relative z-10">
              <span className="bg-[#FFC107] text-[#0B3B6F] text-[10px] font-black uppercase px-2.5 py-1 rounded inline-block mb-3">
                CORONA &amp; PLASMA VALIDATION
              </span>
              <h3 className="text-xl sm:text-2xl font-black mb-2 tracking-tight">
                MAGNET Dyne Test Pen Kits
              </h3>
              <p className="text-blue-100 text-xs sm:text-sm max-w-md leading-relaxed mb-6">
                Prevent adhesion failures on polymer webs, BOPP, PET, and foils. Complete 28 - 72 Dyne range available with immediate dispatch.
              </p>
            </div>
            <div className="relative z-10 flex items-center gap-3">
              <a
                href="/shop?category=Dyne%20Test%20Pens"
                className="bg-white text-[#0B3B6F] hover:bg-gray-100 font-bold px-4 py-2 rounded-lg text-xs transition-colors flex items-center gap-1.5 shadow-sm"
              >
                Explore Dyne Pens <ArrowRight size={14} />
              </a>
              <span className="text-xs text-blue-200 font-mono">ASTM D2578 Norm</span>
            </div>
          </div>

          {/* Solution Banner 2: Flexo & Doctor Blades */}
          <div className="rounded-2xl bg-gradient-to-br from-[#172B4D] to-[#091e42] text-white p-6 sm:p-8 flex flex-col justify-between shadow-md relative overflow-hidden">
            <div className="relative z-10">
              <span className="bg-[#0D6EFD] text-white text-[10px] font-black uppercase px-2.5 py-1 rounded inline-block mb-3">
                PRESSROOM OPTIMIZATION
              </span>
              <h3 className="text-xl sm:text-2xl font-black mb-2 tracking-tight">
                High-Performance Doctor Blades
              </h3>
              <p className="text-gray-300 text-xs sm:text-sm max-w-md leading-relaxed mb-6">
                Precision carbon and ceramic coated steel blades with micro-honed lamella edges for clean wiping and extended cylinder life.
              </p>
            </div>
            <div className="relative z-10 flex items-center gap-3">
              <a
                href="/shop?category=Doctor%20Blades"
                className="bg-[#FFC107] hover:bg-[#e0a800] text-[#0B3B6F] font-bold px-4 py-2 rounded-lg text-xs transition-colors flex items-center gap-1.5 shadow-sm"
              >
                Explore Doctor Blades <ArrowRight size={14} />
              </a>
              <span className="text-xs text-gray-300 font-mono">Lamella / Bevel</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export const ClientLogosSection = () => {
  return (
    <section className="py-10 bg-white font-sans border-b border-[#DCE5EF]">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        <p className="text-center text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">
          Trusted by Quality Managers and Print Process Engineers Across 500+ Plants
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 items-center">
          {CLIENT_LOGOS.map((client, idx) => (
            <div
              key={idx}
              className="bg-[#F5F8FC] border border-[#DCE5EF] rounded-xl p-3.5 text-center flex flex-col items-center justify-center hover:border-[#0D6EFD] transition-colors"
            >
              <span className="text-xs font-bold text-[#172B4D] tracking-tight">{client.name}</span>
              <span className="text-[10px] text-gray-400 mt-0.5">{client.tag}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const CertificationsSection = () => {
  return (
    <section id="certifications" className="py-12 md:py-16 bg-[#F5F8FC] font-sans border-b border-[#DCE5EF]">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 bg-[#FFC107]/20 text-[#0B3B6F] text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3 border border-[#FFC107]/30">
            <Award size={14} className="text-[#0B3B6F]" />
            <span>Strict Quality Assurance</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-[#172B4D] tracking-tight">
            ISO 9001:2015 Certified Manufacturing
          </h2>
          <p className="text-xs md:text-sm text-gray-500 mt-2">
            Every MAGNET Dyne pen and ink bottle is blended, calibrated, and spectrophotometrically checked under controlled laboratory conditions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 border border-[#DCE5EF] shadow-xs">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#0B3B6F] flex items-center justify-center mb-3">
              <Award size={22} />
            </div>
            <h4 className="text-sm font-bold text-[#172B4D] mb-1">ISO 9001:2015 Accredited</h4>
            <p className="text-xs text-gray-500 leading-relaxed">
              Standardized manufacturing systems, continuous audit compliance, and documented batch retention protocols.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-[#DCE5EF] shadow-xs">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#0B3B6F] flex items-center justify-center mb-3">
              <ShieldCheck size={22} />
            </div>
            <h4 className="text-sm font-bold text-[#172B4D] mb-1">ASTM D2578 / ISO 8296</h4>
            <p className="text-xs text-gray-500 leading-relaxed">
              Compliance testing against internationally recognized surface tension specifications for polyolefin and barrier films.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-[#DCE5EF] shadow-xs">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#0B3B6F] flex items-center justify-center mb-3">
              <CheckCircle2 size={22} />
            </div>
            <h4 className="text-sm font-bold text-[#172B4D] mb-1">Batch Certificate of Analysis</h4>
            <p className="text-xs text-gray-500 leading-relaxed">
              Individual batch trace numbers stamped on every test pen and ink bottle with downloadable digital test certificates.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export const TechnicalResourcesSection = () => {
  return (
    <section id="resources" className="py-12 md:py-16 bg-white font-sans border-b border-[#DCE5EF]">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-[#DCE5EF]">
          <div>
            <span className="text-xs font-bold text-[#0D6EFD] uppercase tracking-wider block mb-1">
              Technical Documentation
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-[#172B4D] tracking-tight">
              Datasheets &amp; Technical Resources
            </h2>
            <p className="text-xs md:text-sm text-gray-500 mt-1">
              Download application notes, ASTM test standards, surface energy charts, and calibration guides.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {TECHNICAL_RESOURCES.map((doc, idx) => (
            <div
              key={idx}
              className="bg-[#F5F8FC] border border-[#DCE5EF] rounded-xl p-5 hover:border-[#0D6EFD] transition-colors flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 rounded-lg bg-white border border-[#DCE5EF] text-[#0B3B6F]">
                    <FileText size={20} />
                  </div>
                  <span className="text-[10px] font-mono text-gray-500 bg-white px-2 py-0.5 rounded border border-[#DCE5EF]">
                    {doc.size}
                  </span>
                </div>

                <span className="text-[10px] font-bold uppercase tracking-wider text-[#0D6EFD] block mb-1">
                  {doc.category}
                </span>

                <h3 className="text-xs md:text-sm font-bold text-[#172B4D] group-hover:text-[#0D6EFD] transition-colors line-clamp-2 leading-snug mb-2">
                  {doc.title}
                </h3>

                <p className="text-xs text-gray-500 line-clamp-3 leading-relaxed mb-4">
                  {doc.description}
                </p>
              </div>

              <a
                href="#download"
                onClick={(e) => {
                  e.preventDefault();
                  alert(`Downloading technical document: ${doc.title}`);
                }}
                className="inline-flex items-center justify-center gap-1.5 bg-white hover:bg-[#0B3B6F] text-[#0B3B6F] hover:text-white border border-[#DCE5EF] hover:border-[#0B3B6F] text-xs font-bold py-2 rounded-lg transition-colors shadow-xs"
              >
                <Download size={13} />
                <span>Download PDF</span>
              </a>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export const IndustrialTestimonials = () => {
  return (
    <section className="py-12 md:py-16 bg-[#F5F8FC] font-sans border-b border-[#DCE5EF]">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold text-[#0D6EFD] uppercase tracking-wider block mb-1">
            Client Testimonials
          </span>
          <h2 className="text-2xl md:text-3xl font-black text-[#172B4D] tracking-tight">
            Trusted by Process &amp; Quality Leaders
          </h2>
          <p className="text-xs md:text-sm text-gray-500 mt-2">
            See how ImageTech surface tension testing products and doctor blades empower industrial plants.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {INDUSTRIAL_TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl p-6 border border-[#DCE5EF] shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 text-[#FFC107] mb-3">
                  {[...Array(t.rating)].map((_, i) => (
                    <span key={i} className="text-sm">★</span>
                  ))}
                </div>
                <p className="text-xs md:text-sm text-gray-600 italic leading-relaxed mb-6">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <h4 className="text-xs font-bold text-[#172B4D]">{t.author}</h4>
                <p className="text-[11px] text-[#0D6EFD] font-medium">{t.role}</p>
                <p className="text-[10px] text-gray-400 mt-0.5">{t.company}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

