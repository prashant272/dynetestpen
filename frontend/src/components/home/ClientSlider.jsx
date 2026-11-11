import React from 'react';

const CLIENT_LOGOS = [
  { name: 'Singhania Flexo Pack', src: '/clients/singhania.jpg' },
  { name: 'Constantia Flexibles', src: '/clients/constantia.png' },
  { name: 'Kohli Industries', src: '/clients/kohli.png' },
  { name: 'Parle Products', src: '/clients/parle.png' },
  { name: 'UFLEX Limited', src: '/clients/uflex.png' },
  { name: 'Hubergroup', src: '/clients/hubergroup.jpg' },
  { name: 'DS Group', src: '/clients/dsgroup.jpg' },
  { name: 'GLS Group', src: '/clients/gls.png' },
  { name: 'Huhtamaki', src: '/clients/huhtamaki.png' },
  { name: 'Sakata INX', src: '/clients/sakatainx.png' },
];

const ClientSlider = () => {
  return (
    <section className="py-7 sm:py-9 bg-white border-y border-[#DCE5EF] overflow-hidden font-sans">
      <div className="max-w-[1400px] mx-auto px-4 mb-4 text-center">
        <p className="text-[11px] sm:text-xs font-black uppercase tracking-widest text-[#0B3B6F]">
          Trusted by India's Leading Converting, Flexible Packaging &amp; FMCG Brands
        </p>
      </div>

      {/* Infinite Smooth CSS Marquee */}
      <div className="relative w-full overflow-hidden">
        {/* Soft Edge Fade Overlays */}
        <div className="absolute top-0 bottom-0 left-0 w-12 sm:w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-12 sm:w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        {/* Marquee Track Container */}
        <div className="flex w-max client-marquee-track">
          
          {/* First loop of logos */}
          <div className="flex items-center gap-6 sm:gap-10 pr-6 sm:pr-10 shrink-0">
            {CLIENT_LOGOS.map((client, idx) => (
              <div
                key={`a-${idx}`}
                className="flex items-center justify-center h-14 sm:h-16 px-4 py-2 rounded-xl bg-white border border-[#E2E8F0] shadow-xs shrink-0 hover:shadow-md transition-shadow"
              >
                <img
                  src={client.src}
                  alt={client.name}
                  title={client.name}
                  className="max-h-9 sm:max-h-11 w-auto max-w-[130px] sm:max-w-[160px] object-contain"
                  loading="lazy"
                />
              </div>
            ))}
          </div>

          {/* Exact duplicate loop to make the scroll seamless & infinite */}
          <div className="flex items-center gap-6 sm:gap-10 pr-6 sm:pr-10 shrink-0" aria-hidden="true">
            {CLIENT_LOGOS.map((client, idx) => (
              <div
                key={`b-${idx}`}
                className="flex items-center justify-center h-14 sm:h-16 px-4 py-2 rounded-xl bg-white border border-[#E2E8F0] shadow-xs shrink-0 hover:shadow-md transition-shadow"
              >
                <img
                  src={client.src}
                  alt={client.name}
                  title={client.name}
                  className="max-h-9 sm:max-h-11 w-auto max-w-[130px] sm:max-w-[160px] object-contain"
                  loading="lazy"
                />
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Standalone Scoped CSS for Guaranteed Infinite Motion */}
      <style>{`
        @keyframes clientScroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .client-marquee-track {
          animation: clientScroll 22s linear infinite;
        }
        .client-marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default React.memo(ClientSlider);
