import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Award, ShieldCheck, Factory, CheckCircle2, FileText, Phone, Mail, ArrowRight, Sparkles, Building2, Beaker, Check } from 'lucide-react';
import SEO from '../components/SEO';
import RequestQuoteModal from '../components/common/RequestQuoteModal';
import { INDUSTRIAL_ASSETS } from '../data/industrialData';

const SITE_URL = "https://www.imagetechindustries.com";

const STATS = [
  { value: "1992", label: "Manufacturing Since", icon: Factory },
  { value: "30+", label: "Years of Experience", icon: Award },
  { value: "500+", label: "Global Plants Served", icon: Building2 },
  { value: "28–72", label: "Dyne/cm Calibrated Range", icon: Beaker },
];

const PRODUCTS = [
  {
    name: "Dyne Test Pens (Magnet Brand)",
    text: "Professional valve-action surface energy testing pens (28 to 72 Dyne/cm) to measure surface tension and check corona treatment quality on polymer films, plastics, and foils.",
    href: "/shop?category=Dyne%20Test%20Pen&subcategory=Dyne%20Test%20Pen",
    image: INDUSTRIAL_ASSETS.dynePenYellow,
    tag: "28 to 72 Dyne/cm",
    specs: "ASTM D2578 / ISO 8296 Verified • Valve Action Tip",
  },
  {
    name: "Dyne Test Inks (100ml / 250ml Bottles)",
    text: "Laboratory-grade surface energy calibration testing inks in 100ml & 250ml bottles, formulated strictly per international standard test fluids for precise wetting analysis.",
    href: "/shop?category=Dyne%20Test%20Pen&subcategory=Dyne%20Test%20Pen%20Ink",
    image: INDUSTRIAL_ASSETS.dyneInkBottle,
    tag: "100ml / 250ml Bottles",
    specs: "ISO 8296 Certified Formulation • CoA Available",
  },
];

const STRENGTHS = [
  "Precision chemical formulation & tensiometer verification",
  "Application-based product development for corona testing",
  "Customised OEM engineering and private labeling",
  "100% batch quality inspection with CoA reports",
  "Direct factory pricing with zero middleman markup",
  "Dedicated technical polymer chemist support",
];

const INDUSTRIES = [
  "Flexible Packaging",
  "BOPP & PET Film Extrusion",
  "Flexo & Gravure Printing",
  "Automotive Polymer Parts",
  "Medical Sterile Barrier Films",
  "Paper & Foil Converting",
  "Quality Testing & R&D Labs",
];

const QUALITY = [
  "Every Dyne pen calibrated strictly to ±0.5 mN/m tolerance",
  "Adherence to ASTM D-2578, ISO 8296 and DIN 53364 standards",
  "Spring-loaded valve mechanism preventing atmospheric drying",
  "Continuous formulation enhancement for challenging substrates",
  "ISO 9001:2015 certified quality management system",
];

const WHY = [
  {
    title: "30+ Years of Manufacturing Experience",
    text: "Decades of deep polymer chemistry and precision engineering know-how built in Delhi since 1992.",
    icon: Award,
  },
  {
    title: "Innovation & Steady Development",
    text: "Formulations engineered to accurately verify corona, plasma, and flame-treated synthetic films.",
    icon: Sparkles,
  },
  {
    title: "Customer-Focused Technical Support",
    text: "Direct access to our application engineers and testing specialists for custom dyne formulations.",
    icon: ShieldCheck,
  },
  {
    title: "Made in India Excellence",
    text: "Global-grade industrial surface testing solutions manufactured with pride in New Delhi, India.",
    icon: Factory,
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: "ImageTech Industries",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.svg`,
  foundingDate: "1992",
  description:
    "Delhi-based manufacturer of MAGNET dyne test pens, dyne test inks, doctor blades, ink mixing rollers, stroboscopes and lab coating instruments.",
  address: { "@type": "PostalAddress", addressLocality: "Delhi", addressCountry: "IN" },
  telephone: "+91-8448336036",
  makesOffer: PRODUCTS.map((p) => ({
    "@type": "Offer",
    itemOffered: { "@type": "Product", name: p.name },
  })),
};

const AboutUs = () => {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);

  return (
    <main className="font-sans bg-white text-[#172B4D]">
      <SEO
        title="About ImageTech Industries | Dyne Test Pen & Doctor Blade Manufacturer in Delhi"
        description="ImageTech Industries is a Delhi-based manufacturer since 1992. We make Magnet dyne test pens, Wipex doctor blades, ink mixing rollers, stroboscopes, bar coaters and GSM cutters for printing and packaging."
      />
      
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      {/* HERO SECTION WITH INDUSTRIAL IMAGERY */}
      <section className="relative bg-gradient-to-br from-[#071C35] via-[#0B3B6F] to-[#0A2E59] text-white border-b border-[#DCE5EF] overflow-hidden">
        
        {/* Subtle Background Pattern */}
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle, #ffffff 1px, transparent 1px)`,
            backgroundSize: '24px 24px'
          }}
        />

        <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-16 md:py-24 relative z-10">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column: Heading & Introduction */}
            <div className="lg:col-span-7 space-y-6">
              
              <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-blue-200">
                <Link to="/" className="hover:text-white transition-colors">Home</Link>
                <span>/</span>
                <span className="text-[#FFC107]">About Us</span>
              </nav>

              <div className="inline-flex items-center gap-2 bg-[#FFC107]/20 border border-[#FFC107]/40 px-3.5 py-1 rounded-full text-[#FFC107] text-xs font-black tracking-wide">
                <Award size={14} />
                <span>ISO 9001:2015 Certified Manufacturer &bull; Est. 1992</span>
              </div>

              <h1 id="about-heading" className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-black tracking-tight leading-tight text-white">
                ImageTech Industries: Dyne Test Pen, Doctor Blade &amp; Industrial Instrument Manufacturer in Delhi
              </h1>

              <p className="text-sm sm:text-base md:text-lg text-blue-100 font-medium leading-relaxed max-w-2xl">
                Precision engineering solutions since 1992. We manufacture reliable, high-precision industrial products that empower printing, flexible packaging converting, and polymer testing plants worldwide with zero compromise on accuracy.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button 
                  onClick={() => setIsQuoteOpen(true)}
                  className="bg-[#FFC107] hover:bg-[#e0a800] text-[#0B3B6F] font-black text-xs sm:text-sm px-7 py-3.5 rounded-xl transition-all shadow-lg active:scale-95 cursor-pointer flex items-center gap-2"
                >
                  <FileText size={16} />
                  <span>Request Factory Quote</span>
                </button>
                <Link 
                  to="/shop?category=Dyne%20Test%20Pen&subcategory=Dyne%20Test%20Pen" 
                  className="bg-white/10 hover:bg-white/20 text-white border border-white/25 font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl transition-all backdrop-blur-xs flex items-center gap-2"
                >
                  <span>View Dyne Test Pens</span>
                  <ArrowRight size={15} />
                </Link>
              </div>

            </div>

            {/* Right Column: Hero Visual Card showcasing Dyne Pen and Ink */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden bg-white/5 border border-white/20 backdrop-blur-md p-6 shadow-2xl space-y-4">
                
                {/* Visual Image Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="relative rounded-2xl overflow-hidden bg-white p-3 aspect-square flex items-center justify-center shadow-inner group">
                    <img 
                      src={INDUSTRIAL_ASSETS.dynePenYellow} 
                      alt="Magnet Dyne Test Pen" 
                      className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute bottom-2 left-2 bg-[#0B3B6F] text-white text-[10px] font-mono font-bold px-2 py-0.5 rounded shadow-xs">
                      Dyne Pen (28-72)
                    </span>
                  </div>

                  <div className="relative rounded-2xl overflow-hidden bg-white p-3 aspect-square flex items-center justify-center shadow-inner group">
                    <img 
                      src={INDUSTRIAL_ASSETS.dyneInkBottle} 
                      alt="Dyne Test Ink Bottle" 
                      className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute bottom-2 left-2 bg-purple-700 text-white text-[10px] font-mono font-bold px-2 py-0.5 rounded shadow-xs">
                      Dyne Ink (100ml)
                    </span>
                  </div>
                </div>

                <div className="pt-2 text-center">
                  <p className="text-xs font-bold text-blue-200">
                    Precision calibrated strictly to ASTM D2578 &amp; ISO 8296
                  </p>
                </div>

              </div>
            </div>

          </div>

          {/* 4 Stats Cards */}
          <dl className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4">
            {STATS.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.label} className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-5 shadow-xs hover:border-[#FFC107]/50 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <dd className="text-2xl sm:text-3xl font-black text-[#FFC107]">{s.value}</dd>
                    <Icon size={20} className="text-blue-200" />
                  </div>
                  <dt className="text-xs font-semibold text-blue-100">{s.label}</dt>
                </div>
              );
            })}
          </dl>

        </div>
      </section>

      {/* OUR STORY SECTION */}
      <section className="max-w-[1400px] mx-auto px-4 md:px-8 py-16 md:py-20" aria-labelledby="story-heading">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-5 space-y-4">
            <div className="inline-flex items-center gap-1.5 bg-[#0B3B6F]/10 text-[#0B3B6F] text-xs font-black uppercase tracking-wider px-3.5 py-1 rounded-full">
              <span>Our Heritage</span>
            </div>
            <h2 id="story-heading" className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0B3B6F] tracking-tight leading-tight">
              Our Story: Delhi Manufacturing Since 1992
            </h2>
            <p className="text-sm font-semibold text-[#0D6EFD]">
              Three decades of relentless engineering and high-precision converting science.
            </p>
          </div>

          <div className="lg:col-span-7 space-y-4 text-gray-700 leading-relaxed font-medium text-sm sm:text-base bg-[#F8FAFC] p-6 sm:p-8 rounded-3xl border border-[#DCE5EF]">
            <p>
              <strong>ImageTech Industries</strong> is a Delhi-based manufacturing pioneer. We deliver reliable, innovative and high-quality industrial solutions designed to enhance surface adhesion, eliminate pinholing, and optimize web conversion lines.
            </p>
            <p>
              We established our roots in 1992 with induction moulding products, household components and high-precision automobile engineering. Over the years, our passionate technical team expanded into specialized polymer surface chemistry, manufacturing proprietary <strong>MAGNET Dyne Test Pens</strong> and <strong>ISO 8296 Test Inks</strong>.
            </p>
            <p>
              Today, our specialized solutions support over 500 converting plants, flexographic print shops, film extrusion lines, and analytical laboratories across India and global export markets.
            </p>
          </div>

        </div>
      </section>

      {/* PRODUCTS EXPERTISE WITH RICH IMAGES */}
      <section className="bg-[#F5F8FC] border-y border-[#DCE5EF] py-16 md:py-20" aria-labelledby="products-heading">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-black uppercase tracking-wider text-[#0D6EFD] block mb-2">
              Engineering Catalog
            </span>
            <h2 id="products-heading" className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0B3B6F] tracking-tight leading-tight mb-3">
              Our Product Expertise
            </h2>
            <p className="text-sm sm:text-base text-gray-600 font-medium">
              We manufacture and supply industrial products for printing, packaging, laboratory analysis, and quality control.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {PRODUCTS.map((p) => (
              <div
                key={p.name}
                className="bg-white border border-[#DCE5EF] hover:border-[#0D6EFD] rounded-3xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group hover:-translate-y-1.5"
              >
                {/* Product Card Image Container */}
                <div className="relative aspect-[16/10] bg-gradient-to-b from-[#F8FAFC] to-[#F1F5F9] p-6 flex items-center justify-center border-b border-gray-100 overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-4 left-4 bg-[#0B3B6F] text-white text-[11px] font-black uppercase px-3 py-1 rounded-md shadow-xs">
                    {p.tag}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-7 flex flex-col flex-1">
                  <h3 className="font-black text-lg sm:text-xl text-[#0B3B6F] group-hover:text-[#0D6EFD] transition-colors mb-2">
                    {p.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-medium mb-3">
                    {p.text}
                  </p>
                  
                  <div className="bg-[#F8FAFC] p-3 rounded-xl border border-gray-100 mb-5">
                    <span className="text-[11px] font-bold text-[#0D6EFD] block">
                      {p.specs}
                    </span>
                  </div>

                  <Link
                    to={p.href}
                    className="mt-auto inline-flex items-center justify-between text-xs sm:text-sm font-black text-[#0B3B6F] group-hover:text-[#0D6EFD] transition-colors pt-3 border-t border-gray-100"
                  >
                    <span>View All Specifications</span>
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform text-[#0D6EFD]" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* MANUFACTURING STRENGTH & INDUSTRIES */}
      <section className="max-w-[1400px] mx-auto px-4 md:px-8 py-16 md:py-20 grid lg:grid-cols-2 gap-10 lg:gap-14">
        
        {/* Left: Manufacturing Strength */}
        <div className="bg-[#F8FAFC] rounded-3xl p-8 border border-[#DCE5EF] shadow-2xs space-y-5">
          <div className="w-12 h-12 rounded-2xl bg-[#0B3B6F] text-white flex items-center justify-center shadow-xs">
            <Factory size={24} />
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0B3B6F] tracking-tight">
            Our Manufacturing Strength
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed font-medium">
            We combine chemistry engineering, rigorous testing, and continuous calibration to manufacture testing tools that deliver reliable surface energy data.
          </p>
          <ul className="space-y-3 pt-2">
            {STRENGTHS.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3 text-sm font-semibold text-[#172B4D]">
                <div className="w-5 h-5 rounded-full bg-blue-100 text-[#0D6EFD] flex items-center justify-center shrink-0 mt-0.5">
                  <Check size={13} className="stroke-[3]" />
                </div>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: Industries We Serve */}
        <div className="bg-[#F8FAFC] rounded-3xl p-8 border border-[#DCE5EF] shadow-2xs space-y-5 flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-[#FFC107] text-[#0B3B6F] flex items-center justify-center shadow-xs mb-4 font-black">
              <Building2 size={24} />
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0B3B6F] tracking-tight mb-3">
              Industries We Serve
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed font-medium mb-6">
              Our dyne test pens, test inks, and doctor blades are integral to production lines across vital sectors:
            </p>
            <div className="flex flex-wrap gap-2.5">
              {INDUSTRIES.map((ind, idx) => (
                <span 
                  key={idx}
                  className="bg-white border border-[#DCE5EF] text-[#0B3B6F] hover:border-[#0D6EFD] px-4 py-2 rounded-xl text-xs sm:text-sm font-bold shadow-2xs transition-colors"
                >
                  {ind}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-500 font-semibold">
              Need custom formulations for an unlisted polymer substrate?
            </p>
            <button
              onClick={() => setIsQuoteOpen(true)}
              className="text-xs font-black text-[#0D6EFD] hover:underline mt-1 inline-flex items-center gap-1 cursor-pointer"
            >
              Consult Application Chemist &rarr;
            </button>
          </div>
        </div>

      </section>

      {/* QUALITY COMMITMENT SECTION */}
      <section className="bg-[#0B3B6F] text-white py-16 md:py-20" aria-labelledby="quality-heading">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          
          <div className="space-y-4">
            <span className="bg-[#FFC107] text-[#0B3B6F] text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-xs inline-block">
              ISO 9001:2015 Laboratory Verified
            </span>
            <h2 id="quality-heading" className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight leading-tight text-white">
              Our Uncompromising Quality Commitment
            </h2>
            <p className="text-sm sm:text-base text-blue-100 leading-relaxed font-medium max-w-xl">
              Quality is the cornerstone of ImageTech Industries. Every batch of surface testing fluid and doctor blade coil is verified using automated analytical instrumentation to ensure total repeatability.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white/15 space-y-3.5">
            {QUALITY.map((q, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <CheckCircle2 size={18} className="text-[#FFC107] shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm font-semibold text-white leading-relaxed">{q}</span>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* VISION & MISSION */}
      <section className="max-w-[1400px] mx-auto px-4 md:px-8 py-16 grid md:grid-cols-2 gap-6">
        <article className="border border-[#DCE5EF] rounded-3xl p-8 bg-gradient-to-br from-white to-[#F8FAFC] shadow-2xs space-y-3">
          <h2 className="text-xl font-black text-[#0B3B6F] flex items-center gap-2">
            <span>🎯</span> Our Vision
          </h2>
          <p className="text-sm text-gray-700 leading-relaxed font-medium">
            To establish ImageTech Industries as the foremost Indian manufacturing authority recognized globally for uncompromising calibration standards, innovation in surface energy testing, and dependable pressroom consumables.
          </p>
        </article>

        <article className="border border-[#DCE5EF] rounded-3xl p-8 bg-gradient-to-br from-white to-[#F8FAFC] shadow-2xs space-y-3">
          <h2 className="text-xl font-black text-[#0B3B6F] flex items-center gap-2">
            <span>🚀</span> Our Mission
          </h2>
          <p className="text-sm text-gray-700 leading-relaxed font-medium">
            To empower converters, extrusion coaters, and printers with scientifically reliable tools manufactured through state-of-the-art chemical blending, maintaining zero tolerance on error and delivering direct factory value.
          </p>
        </article>
      </section>

      {/* WHY CHOOSE IMAGETECH INDUSTRIES */}
      <section className="bg-[#F5F8FC] border-y border-[#DCE5EF] py-16 md:py-20" aria-labelledby="why-heading">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 id="why-heading" className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0B3B6F] tracking-tight">
              Why Choose ImageTech Industries?
            </h2>
            <p className="text-sm text-gray-600 font-medium mt-2">
              Industry-proven advantages built for demanding production lines
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY.map((w, idx) => {
              const Icon = w.icon;
              return (
                <div key={idx} className="bg-white border border-[#DCE5EF] hover:border-[#0D6EFD] rounded-2xl p-6 shadow-xs hover:shadow-lg transition-all duration-300 group">
                  <div className="w-12 h-12 rounded-xl bg-[#0B3B6F]/5 text-[#0B3B6F] group-hover:bg-[#0B3B6F] group-hover:text-white flex items-center justify-center mb-4 transition-colors">
                    <Icon size={22} />
                  </div>
                  <h3 className="font-black text-base text-[#172B4D] mb-2 leading-snug">{w.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-medium">{w.text}</p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* BOTTOM ACTION CTA */}
      <section className="max-w-[1400px] mx-auto px-4 md:px-8 py-16 md:py-24 text-center">
        <div className="bg-gradient-to-br from-[#0B3B6F] to-[#082a50] rounded-3xl p-8 sm:p-12 text-white shadow-xl space-y-6">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-tight">
            Looking for a Certified Dyne Test Pen or Doctor Blade Manufacturer?
          </h2>
          <p className="text-sm sm:text-base text-blue-100 max-w-2xl mx-auto font-medium leading-relaxed">
            Speak directly with our technical team in New Delhi for contract pricing, customized OEM sizing, and prompt factory dispatch.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <button 
              onClick={() => setIsQuoteOpen(true)}
              className="bg-[#FFC107] hover:bg-[#e0a800] text-[#0B3B6F] font-black px-8 py-3.5 rounded-xl transition-all shadow-lg active:scale-95 cursor-pointer text-sm"
            >
              Request a Bulk Quote
            </button>
            <a 
              href="tel:+918448336036" 
              className="bg-white/10 hover:bg-white/20 text-white border border-white/30 font-bold px-7 py-3.5 rounded-xl transition-colors backdrop-blur-xs text-sm"
            >
              Call Technical Sales: +91 8448336036
            </a>
          </div>
        </div>
      </section>

      <RequestQuoteModal
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
        initialProduct="About Us Inquiry"
      />
    </main>
  );
};

export default AboutUs;
