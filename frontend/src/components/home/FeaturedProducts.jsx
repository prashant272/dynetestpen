import React, { useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ArrowRight, ChevronLeft, ChevronRight, PenTool, Droplets } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductCard from '../ProductCard';
import ProductSkeleton from '../skeletons/ProductSkeleton';
import { PRODUCTS_API_URL } from '../../api';
import { DYNE_PENS, DYNE_INKS } from '../../data/industrialData';

const FeaturedProducts = () => {
  const penScrollRef = useRef(null);
  const inkScrollRef = useRef(null);

  const { data: dbProducts = [], isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      try {
        const response = await fetch(`${PRODUCTS_API_URL}/products`);
        if (!response.ok) return [];
        const json = await response.json();
        return Array.isArray(json) ? json : (json.products || []);
      } catch {
        return [];
      }
    },
    staleTime: 1000 * 60 * 15,
  });

  // Strict filtering: ONLY Dyne Pens and ONLY Dyne Inks (strips out any non-dyne items like Magnetic Rollers)
  const { dynePens, dyneInks } = React.useMemo(() => {
    if (dbProducts && dbProducts.length > 0) {
      const pens = dbProducts.filter(p => {
        const slug = (p.slug || '').toLowerCase();
        const title = (p.title || '').toLowerCase();
        return (slug.startsWith('magnet-dyne-test-pen') || (title.includes('dyne test pen') && !title.includes('ink')));
      });

      const inks = dbProducts.filter(p => {
        const slug = (p.slug || '').toLowerCase();
        const title = (p.title || '').toLowerCase();
        return (slug.startsWith('dyne-test-ink') || title.includes('dyne test ink'));
      });

      return {
        dynePens: pens.length > 0 ? pens : DYNE_PENS,
        dyneInks: inks.length > 0 ? inks : DYNE_INKS,
      };
    }

    return {
      dynePens: DYNE_PENS,
      dyneInks: DYNE_INKS,
    };
  }, [dbProducts]);

  const scrollPens = (direction) => {
    if (penScrollRef.current) {
      const scrollAmount = penScrollRef.current.clientWidth * 0.75;
      penScrollRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  const scrollInks = (direction) => {
    if (inkScrollRef.current) {
      const scrollAmount = inkScrollRef.current.clientWidth * 0.75;
      inkScrollRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-white font-sans divide-y divide-[#DCE5EF]">
      
      {/* ================= SECTION 1: DYNE TEST PEN ================= */}
      <section className="py-8 md:py-12">
        <div className="max-w-[1400px] mx-auto px-3 sm:px-6 md:px-8">
          
          {/* Header with Arrow Navigation */}
          <div className="flex items-center justify-between mb-5 pb-3 border-b border-[#DCE5EF]">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#0B3B6F] text-white flex items-center justify-center shadow-xs shrink-0">
                <PenTool size={16} />
              </div>
              <div>
                <h2 className="text-lg sm:text-2xl md:text-3xl font-black text-[#0B3B6F] tracking-tight">
                  Dyne Test Pen
                </h2>
                <p className="text-[11px] sm:text-xs text-gray-500 font-medium">
                  Precision MAGNET valve-action surface tension test pens (28 to 72 Dyne/cm)
                </p>
              </div>
            </div>

            {/* Arrows + View All Link */}
            <div className="flex items-center gap-2 sm:gap-4">
              <Link
                to="/shop?category=Dyne%20Test%20Pen&subcategory=Dyne%20Test%20Pen"
                className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-bold text-[#0D6EFD] hover:underline bg-blue-50 px-2.5 py-1 rounded-lg sm:bg-transparent sm:p-0"
              >
                <span>View All ({dynePens.length})</span>
                <ArrowRight size={13} />
              </Link>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => scrollPens('left')}
                  className="w-7 h-7 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl border border-gray-200 bg-white hover:bg-gray-100 flex items-center justify-center text-[#0B3B6F] shadow-xs active:scale-95 transition-all cursor-pointer"
                  title="Previous"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={() => scrollPens('right')}
                  className="w-7 h-7 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl border border-gray-200 bg-[#0B3B6F] hover:bg-[#082a50] flex items-center justify-center text-white shadow-xs active:scale-95 transition-all cursor-pointer"
                  title="Next"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* 1 Single Horizontal Row Carousel */}
          {isLoading ? (
            <div className="flex gap-3 sm:gap-6 overflow-hidden">
              {[...Array(4)].map((_, idx) => (
                <div key={idx} className="w-[170px] sm:w-[240px] md:w-[280px] shrink-0">
                  <ProductSkeleton />
                </div>
              ))}
            </div>
          ) : (
            <div 
              ref={penScrollRef}
              className="flex gap-3 sm:gap-6 overflow-x-auto scroll-smooth pb-3 hide-scrollbar snap-x snap-mandatory"
            >
              {dynePens.map((product, idx) => (
                <div 
                  key={product._id || idx} 
                  className="w-[190px] sm:w-[240px] md:w-[280px] shrink-0 snap-start"
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}

        </div>
      </section>


      {/* ================= SECTION 2: DYNE TEST INK ================= */}
      <section className="py-8 md:py-12 bg-[#F8FAFC]">
        <div className="max-w-[1400px] mx-auto px-3 sm:px-6 md:px-8">
          
          {/* Header with Arrow Navigation */}
          <div className="flex items-center justify-between mb-5 pb-3 border-b border-[#DCE5EF]">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-purple-700 text-white flex items-center justify-center shadow-xs shrink-0">
                <Droplets size={16} />
              </div>
              <div>
                <h2 className="text-lg sm:text-2xl md:text-3xl font-black text-[#0B3B6F] tracking-tight">
                  Dyne Test Ink
                </h2>
                <p className="text-[11px] sm:text-xs text-gray-500 font-medium">
                  ISO 8296 &amp; ASTM D2578 certified surface energy calibration inks (100ml / 250ml)
                </p>
              </div>
            </div>

            {/* Arrows + View All Link */}
            <div className="flex items-center gap-2 sm:gap-4">
              <Link
                to="/shop?category=Dyne%20Test%20Pen&subcategory=Dyne%20Test%20Pen%20Ink"
                className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-bold text-purple-700 hover:underline bg-purple-50 px-2.5 py-1 rounded-lg sm:bg-transparent sm:p-0"
              >
                <span>View All ({dyneInks.length})</span>
                <ArrowRight size={13} />
              </Link>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => scrollInks('left')}
                  className="w-7 h-7 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl border border-gray-200 bg-white hover:bg-gray-100 flex items-center justify-center text-purple-700 shadow-xs active:scale-95 transition-all cursor-pointer"
                  title="Previous"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={() => scrollInks('right')}
                  className="w-7 h-7 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl border border-purple-700 bg-purple-700 hover:bg-purple-800 flex items-center justify-center text-white shadow-xs active:scale-95 transition-all cursor-pointer"
                  title="Next"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* 1 Single Horizontal Row Carousel */}
          {isLoading ? (
            <div className="flex gap-3 sm:gap-6 overflow-hidden">
              {[...Array(4)].map((_, idx) => (
                <div key={idx} className="w-[170px] sm:w-[240px] md:w-[280px] shrink-0">
                  <ProductSkeleton />
                </div>
              ))}
            </div>
          ) : (
            <div 
              ref={inkScrollRef}
              className="flex gap-3 sm:gap-6 overflow-x-auto scroll-smooth pb-3 hide-scrollbar snap-x snap-mandatory"
            >
              {dyneInks.map((product, idx) => (
                <div 
                  key={product._id || idx} 
                  className="w-[190px] sm:w-[240px] md:w-[280px] shrink-0 snap-start"
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}

        </div>
      </section>

    </div>
  );
};

export default FeaturedProducts;
