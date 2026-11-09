import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HalftoneHeading } from './ui/halftone-heading';

export const BrandHero: React.FC = () => {
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Tiny pointer parallax (max 14px)
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      setMouseOffset({ x: nx * 14, y: ny * 14 });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

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
      id="studio"
      className="relative w-full min-h-screen bg-[#FFFFFF] text-[#0A0A0A] overflow-hidden flex flex-col justify-between pt-24 pb-12 px-6 md:px-12 selection:bg-[#E11D2A] selection:text-white"
    >
      {/* Procedural Ink-in-Water Smoke Background (covering right ~60% with soft left fade) */}
      <div className="absolute top-0 right-0 w-full md:w-[65%] h-full pointer-events-none overflow-hidden z-0">
        <svg className="absolute w-0 h-0">
          <filter id="inkDisplacement" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.015 0.02"
              numOctaves="4"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="45"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </svg>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.35 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full h-full mix-blend-multiply"
          style={{
            transform: `translate(${mouseOffset.x}px, ${mouseOffset.y}px)`,
            transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {/* Layered radial gradients simulating organic black ink diffusion */}
          <div
            className="absolute inset-0 w-full h-full filter grayscale"
            style={{
              filter: 'url(#inkDisplacement)',
              background: `
                radial-gradient(circle at 75% 30%, rgba(10, 10, 10, 0.85) 0%, rgba(10, 10, 10, 0.5) 30%, transparent 65%),
                radial-gradient(circle at 60% 65%, rgba(20, 20, 20, 0.75) 0%, rgba(20, 20, 20, 0.35) 35%, transparent 70%),
                radial-gradient(circle at 85% 80%, rgba(10, 10, 10, 0.8) 0%, rgba(10, 10, 10, 0.4) 40%, transparent 75%)
              `,
              maskImage: 'linear-gradient(to left, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%)',
              WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%)',
            }}
          />
        </motion.div>
      </div>

      {/* Orbit Motif: Concentric Thin Hairline Circles (Top Right) */}
      <div className="absolute top-20 right-10 md:right-20 pointer-events-none z-0">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
          className="relative w-40 h-40 md:w-60 md:h-60 rounded-full border border-[#0A0A0A]/10 flex items-center justify-center"
        >
          <div className="w-24 h-24 md:w-40 md:h-40 rounded-full border border-[#0A0A0A]/15" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#E11D2A]" />
        </motion.div>
      </div>

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

        {/* Center Hero: Eyebrow + Halftone H1 + Action Controls */}
        <div className="my-auto py-12 md:py-16">
          <div className="mb-4">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#E11D2A] font-semibold">
              ONE PARTNER. EVERY ANGLE.
            </span>
          </div>

          <div className="max-w-5xl">
            <HalftoneHeading
              as="h1"
              text={"URBrand\n*360*"}
              vw={0.13}
              minSize={72}
              maxSize={260}
              lineHeight={0.92}
              align="left"
              accent="#E11D2A"
              warm="#E11D2A"
              hairBoost={0.015}
            />
          </div>

          {/* Under H1: Pill + Solid Black Circle Button */}
          <div className="mt-8 md:mt-12 flex flex-wrap items-center gap-4 md:gap-6">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] px-5 py-2.5 rounded-full border border-[#0A0A0A]/20 bg-[#FFFFFF]/80 backdrop-blur-sm text-[#0A0A0A]">
              BRAND × GROWTH × OPERATIONS
            </span>

            <button
              type="button"
              onClick={handleScrollToProcess}
              className="group relative w-24 h-24 rounded-full bg-[#0A0A0A] text-white flex flex-col items-center justify-center font-mono text-[10px] uppercase tracking-[0.18em] transition-transform duration-300 hover:scale-105 hover:bg-[#E11D2A] focus:outline-none"
              aria-label="Scroll to 360° Process view"
            >
              <span>360°</span>
              <span>VIEW</span>
            </button>
          </div>
        </div>

        {/* Bottom Hairline + Lede & Body */}
        <div className="pt-8 border-t border-[#0A0A0A]/12 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
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

