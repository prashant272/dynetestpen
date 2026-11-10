import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight, Layers, ExternalLink } from "lucide-react";
import { INDUSTRIAL_CATEGORIES } from "../../data/industrialData";

const Categories = () => {
  const scrollContainerRef = useRef(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-12 md:py-16 bg-[#F5F8FC] border-b border-[#DCE5EF] font-sans">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-[#DCE5EF]">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0D6EFD] uppercase tracking-wider mb-1">
              <Layers size={14} />
              <span>Engineered Solutions</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-[#172B4D] tracking-tight">
              Shop by Category
            </h2>
            <p className="text-xs md:text-sm text-gray-500 mt-1">
              Explore our core industrial product divisions for corona treatment, surface tension measurement, and press operations.
            </p>
          </div>

          <div className="mt-4 md:mt-0 flex items-center gap-3">
            {/* Scroll navigation controls */}
            <div className="hidden sm:flex items-center gap-2">
              <button
                onClick={scrollLeft}
                aria-label="Previous category"
                className="w-9 h-9 rounded-lg border border-[#DCE5EF] bg-white hover:bg-gray-50 flex items-center justify-center text-[#172B4D] transition-colors shadow-xs"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={scrollRight}
                aria-label="Next category"
                className="w-9 h-9 rounded-lg border border-[#DCE5EF] bg-white hover:bg-gray-50 flex items-center justify-center text-[#172B4D] transition-colors shadow-xs"
              >
                <ChevronRight size={18} />
              </button>
            </div>

            <Link
              to="/shop"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0B3B6F] hover:text-[#0D6EFD] bg-white px-3.5 py-2 rounded-lg border border-[#DCE5EF] transition-all shadow-xs"
            >
              <span>View All Products</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* Category Cards Carousel / Grid */}
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto gap-4 md:gap-6 hide-scrollbar pb-2 scroll-smooth"
        >
          {INDUSTRIAL_CATEGORIES.map((cat, index) => (
            <div
              key={index}
              className="group flex flex-col shrink-0 w-[260px] sm:w-[280px] md:w-[300px] lg:w-[calc((100%-64px)/4)] bg-white rounded-2xl border border-[#DCE5EF] hover:border-[#0D6EFD] shadow-xs hover:shadow-md transition-all duration-300 overflow-hidden"
            >
              {/* Image Preview with Category Link */}
              <Link 
                to={`/shop?category=${encodeURIComponent(cat.name)}`}
                className="relative aspect-[16/10] bg-gray-100 overflow-hidden block"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                <span className="absolute top-2.5 left-2.5 bg-[#0B3B6F]/90 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded">
                  Division 0{index + 1}
                </span>
                <span className="absolute bottom-2.5 right-2.5 bg-black/60 backdrop-blur-xs text-white text-[10px] font-medium px-2 py-0.5 rounded">
                  {cat.count}
                </span>
              </Link>

              {/* Card Meta */}
              <div className="p-4 flex flex-col flex-1 justify-between">
                <div>
                  <Link 
                    to={`/shop?category=${encodeURIComponent(cat.name)}`}
                    className="text-base font-bold text-[#172B4D] group-hover:text-[#0D6EFD] transition-colors leading-snug block"
                  >
                    {cat.name}
                  </Link>
                  <p className="text-[11px] text-gray-500 mt-1 line-clamp-2 leading-relaxed">
                    {cat.description}
                  </p>

                  {/* Subcategories (if available, e.g. Dyne Test Pen -> Dyne Test Pen and Dyne Test Pen Ink) */}
                  {cat.subcategories && (
                    <div className="mt-3 pt-2.5 border-t border-dashed border-gray-200 space-y-1.5">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                        Subcategories:
                      </div>
                      <div className="grid grid-cols-2 gap-1.5">
                        {cat.subcategories.map((sub, sIdx) => (
                          <Link
                            key={sIdx}
                            to={`/shop?category=${encodeURIComponent(cat.name)}&subcategory=${encodeURIComponent(sub.name)}`}
                            className="bg-blue-50/70 hover:bg-blue-100/80 text-[#0B3B6F] p-1.5 rounded-lg text-[10px] font-bold text-center border border-blue-100 transition-colors truncate"
                            title={sub.name}
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                  <Link
                    to={`/shop?category=${encodeURIComponent(cat.name)}`}
                    className="text-xs font-bold text-[#0D6EFD] flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                  >
                    Explore Division <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default React.memo(Categories);
