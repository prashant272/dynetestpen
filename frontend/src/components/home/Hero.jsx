import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, FileText } from "lucide-react";
import RequestQuoteModal from "../common/RequestQuoteModal";

const Hero = () => {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);

  return (
    <>
      <section className="relative w-full h-[320px] sm:h-[400px] md:h-[480px] lg:h-[560px] bg-black font-sans overflow-hidden">
        
        {/* Full-bleed Crystal Clear Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover object-center z-0"
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>

        {/* Soft vignette */}
        <div className="absolute inset-0 bg-black/25 z-10 pointer-events-none" />

        {/* Clean Buttons Container - Exactly Centered Vertically & Horizontally */}
        <div className="relative z-20 w-full max-w-[1400px] mx-auto h-full flex items-center justify-center px-4">
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <Link
              to="/shop"
              className="bg-[#0D6EFD] hover:bg-blue-600 text-white font-black text-xs sm:text-sm px-5 sm:px-7 py-3.5 sm:py-4 rounded-xl transition-all shadow-xl active:scale-95 inline-flex items-center gap-2 hover:-translate-y-0.5"
            >
              <span>Explore Products</span>
              <ChevronRight size={17} />
            </Link>
            
            <button
              onClick={() => setIsQuoteOpen(true)}
              className="bg-black/60 hover:bg-black/80 text-white border-2 border-white/40 hover:border-[#FFC107] font-black text-xs sm:text-sm px-5 sm:px-7 py-3.5 sm:py-4 rounded-xl transition-all backdrop-blur-md active:scale-95 inline-flex items-center gap-2 cursor-pointer shadow-xl hover:-translate-y-0.5"
            >
              <FileText size={16} className="text-[#FFC107]" />
              <span>Request Custom Dyne RFQ</span>
            </button>
          </div>
        </div>

      </section>

      <RequestQuoteModal
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
        initialProduct="Industrial Catalog Inquiry"
      />
    </>
  );
};

export default React.memo(Hero);
