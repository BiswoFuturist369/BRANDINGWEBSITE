import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CASE_STUDIES_DATA } from '../data/cases';

export const CaseStudiesGallery: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [dragWidth, setDragWidth] = useState(0);

  useEffect(() => {
    const updateConstraints = () => {
      if (sliderRef.current && containerRef.current) {
        const scrollWidth = sliderRef.current.scrollWidth;
        const offsetWidth = containerRef.current.offsetWidth;
        setDragWidth(Math.max(0, scrollWidth - offsetWidth + 60));
      }
    };

    updateConstraints();
    window.addEventListener('resize', updateConstraints);
    return () => window.removeEventListener('resize', updateConstraints);
  }, []);

  return (
    <section
      id="results"
      className="relative w-full max-w-full py-20 md:py-40 bg-[#0A0A0A] text-[#FFFFFF] overflow-hidden border-t border-white/10 select-none"
    >
      {/* Top Header: Eyebrow + Basic H2 + Badge */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 mb-14 md:mb-20">
        <div className="mb-6">
          <span className="font-mono text-[14px] sm:text-[15px] md:text-[16px] uppercase tracking-[0.22em] text-[#E11D2A] font-bold">
            SELECTED WORK
          </span>
        </div>

        <div className="max-w-5xl mb-6">
          <h2 className="font-display text-[clamp(30px,4.5vw,66px)] leading-[1.03] tracking-[-0.015em] text-white font-normal max-w-full">
            Design a future so irresistible,{' '}
            <span className="italic text-[#E11D2A]">it becomes inevitable.</span>
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[#E11D2A]" />
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/50">
            Case studies coming soon · Portfolio currently under curation
          </span>
        </div>
      </div>

      {/* Horizontal Drag Gallery */}
      <div
        ref={containerRef}
        className="w-full pl-6 md:pl-12 overflow-hidden cursor-grab active:cursor-grabbing"
      >
        <motion.div
          ref={sliderRef}
          drag="x"
          dragConstraints={{ right: 0, left: -dragWidth }}
          dragElastic={0.12}
          dragTransition={{ power: 0.25, timeConstant: 250 }}
          className="flex items-end gap-6 sm:gap-8 pb-8 pr-12"
        >
          {CASE_STUDIES_DATA.map((item) => (
            <div
              key={item.id}
              className={`flex-shrink-0 w-[290px] sm:w-[360px] md:w-[420px] rounded-[16px] overflow-hidden relative group bg-[#141414] border border-white/10 shadow-2xl ${item.heightClass}`}
            >
              <div className="w-full h-full relative">
                {/* Grayscale placeholder image */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover grayscale contrast-125 transition-transform duration-700 ease-out group-hover:scale-105 opacity-60"
                  loading="lazy"
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />

                {/* Red tint on hover */}
                <div className="absolute inset-0 bg-[#E11D2A] opacity-0 group-hover:opacity-20 mix-blend-multiply transition-opacity duration-500 pointer-events-none" />

                {/* Top Badge: Category & Status */}
                <div className="absolute top-5 left-5 right-5 flex items-center justify-between z-10">
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em] px-3 py-1 rounded-full bg-black/70 text-white/90 backdrop-blur-md border border-white/10">
                    {item.category}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#E11D2A] px-2.5 py-1 rounded-full bg-black/70 border border-[#E11D2A]/30 backdrop-blur-md">
                    COMING SOON
                  </span>
                </div>

                {/* Bottom Content */}
                <div className="absolute bottom-6 left-6 right-6 z-10">
                  <h3 className="font-serif text-[24px] md:text-[28px] leading-[1.15] text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="font-sans text-[14px] leading-[1.5] text-white/70 font-light">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
