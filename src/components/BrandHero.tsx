import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export const BrandHero: React.FC = () => {
  const [revealed, setRevealed] = useState(false);
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.3 });

  useEffect(() => {
    if (isInView) {
      // Trigger Interbrand-style unfold after brief pause
      const timer = setTimeout(() => {
        setRevealed(true);
      }, 550);
      return () => clearTimeout(timer);
    } else {
      // Reset so animation replays when user scrolls back to studio
      setRevealed(false);
    }
  }, [isInView]);

  const handleScrollToProcess = (e: React.MouseEvent) => {
    e.preventDefault();
    const processEl = document.getElementById('process');
    if (processEl) {
      if (window.__lenis) {
        window.__lenis.scrollTo(processEl, { duration: 1.2 });
      } else {
        processEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section
      ref={containerRef}
      id="studio"
      className="relative w-full max-w-full min-h-screen bg-[#FFFFFF] text-[#0A0A0A] overflow-hidden flex flex-col justify-between pt-24 pb-12 px-4 sm:px-6 md:px-12 selection:bg-[#E11D2A] selection:text-white"
    >
      {/* Clean Architectural Background — Zero cracks, zero noisy filters, pristine Interbrand aesthetic */}
      <div className="relative z-10 max-w-7xl mx-auto w-full flex-1 flex flex-col justify-between">
        {/* Top Header Labels */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pt-4 pb-8 border-b border-[#0A0A0A]/10">
          <div className="flex flex-col gap-1.5">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#0A0A0A]/80 flex items-center gap-2">
              <span className="text-[#E11D2A] text-xs leading-none">●</span> INDEPENDENT STUDIO · EST. FOR FOUNDERS
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#0A0A0A]/60">
              SERVING BRANDS WORLDWIDE
            </span>
          </div>

          <div className="flex flex-col md:items-end gap-1.5 text-left md:text-right">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#0A0A0A]/80">
              BRAND · MARKETING · ECOMMERCE
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#0A0A0A]/60">
              CONSULTING · TAX · AI & AUTOMATION
            </span>
          </div>
        </div>

        {/* Center Hero: Eyebrow + Interbrand Reveal H1 (Centered) + Action Controls */}
        <div className="my-auto py-16 md:py-24 text-center flex flex-col items-center justify-center">
          {/* Eyebrow with enlarged prominent font size */}
          <div className="mb-6 md:mb-8">
            <span className="font-mono text-[14px] sm:text-[15px] md:text-[16px] uppercase tracking-[0.22em] text-[#E11D2A] font-bold">
              ONE PARTNER. EVERY ANGLE.
            </span>
          </div>

          {/* Interbrand Unfold H1: First centered 'U', then expands into full 'URBrand 360' */}
          <div className="relative w-full max-w-full flex items-center justify-center select-none overflow-hidden py-2 px-2">
            <h1 className="font-sans font-black tracking-[-0.03em] text-[clamp(32px,7.5vw,118px)] leading-[0.92] text-[#0A0A0A] flex items-center justify-center uppercase max-w-full">
              {/* The Anchor Initial Letter 'U' */}
              <motion.span
                layout
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="inline-block text-[#0A0A0A] flex-shrink-0"
              >
                U
              </motion.span>

              {/* The Expanding Suffix: 'RBrand 360' smoothly reveals from U */}
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{
                  width: revealed ? 'auto' : 0,
                  opacity: revealed ? 1 : 0,
                }}
                transition={{
                  duration: 1.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="overflow-hidden flex items-center whitespace-nowrap will-change-transform"
              >
                <span className="inline-block text-[#0A0A0A]">
                  RBrand
                </span>
                <span className="inline-block ml-2 sm:ml-3 md:ml-4 text-[#E11D2A]">
                  360
                </span>
              </motion.div>
            </h1>
          </div>

          {/* Subtitle Accent underneath title */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: revealed ? 1 : 0, y: revealed ? 0 : 12 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 flex items-center justify-center gap-3 text-center"
          >
            <span className="h-px w-8 md:w-16 bg-[#0A0A0A]/20" />
            <span className="font-serif italic text-[20px] sm:text-[24px] md:text-[28px] text-[#0A0A0A]/70">
              The Flagship 360° Studio
            </span>
            <span className="h-px w-8 md:w-16 bg-[#0A0A0A]/20" />
          </motion.div>

          {/* Under H1: Centered Pill + Solid Black Circle Button */}
          <div className="mt-10 md:mt-14 flex flex-wrap items-center justify-center gap-4 md:gap-6">
            <span className="font-mono text-[11px] sm:text-[12px] uppercase tracking-[0.18em] px-6 py-3 rounded-full border border-[#0A0A0A]/20 bg-[#FFFFFF] text-[#0A0A0A] shadow-sm">
              BRAND × GROWTH × OPERATIONS
            </span>

            <button
              type="button"
              onClick={handleScrollToProcess}
              className="group relative w-24 h-24 rounded-full bg-[#0A0A0A] text-white flex flex-col items-center justify-center font-mono text-[10px] uppercase tracking-[0.18em] transition-transform duration-300 hover:scale-105 hover:bg-[#E11D2A] focus:outline-none shadow-lg cursor-pointer"
              aria-label="Scroll to 360° Process view"
            >
              <span>360°</span>
              <span>VIEW</span>
            </button>
          </div>
        </div>

        {/* Bottom Hairline + Lede & Body */}
        <div className="pt-8 border-t border-[#0A0A0A]/12 grid grid-cols-1 md:grid-cols-12 gap-8 items-start text-left">
          <div className="md:col-span-6">
            <p className="font-serif text-[28px] md:text-[34px] lg:text-[40px] leading-[1.1] text-[#0A0A0A]">
              A 360° studio for brands that{' '}
              <span className="italic text-[#E11D2A]">refuse to blend in.</span>
            </p>
          </div>

          <div className="md:col-span-6 flex justify-start md:justify-end">
            <p className="font-sans text-[17px] leading-[1.65] text-[#0A0A0A]/72 max-w-[56ch] font-light">
              We build the identity, the demand engine and the back office, so a founder can
              move like a company ten times its size. Strategy first. Craft always.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
