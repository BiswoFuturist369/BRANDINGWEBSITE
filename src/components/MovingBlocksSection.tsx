import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

interface MovingBlockCardProps {
  scrollYProgress: MotionValue<number>;
  range: [number, number];
  yRange: [string, string];
  side: 'left' | 'right';
  children: React.ReactNode;
}

const MovingBlockWrapper: React.FC<MovingBlockCardProps> = ({
  scrollYProgress,
  range,
  yRange,
  side,
  children,
}) => {
  const y = useTransform(scrollYProgress, range, yRange);
  const opacity = useTransform(
    scrollYProgress,
    [range[0], Math.min(range[0] + 0.04, range[1]), Math.max(range[1] - 0.05, range[0]), range[1]],
    [0.95, 1, 1, 0.9]
  );

  return (
    <div
      className={`pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 flex px-4 sm:px-8 md:px-14 lg:px-20 ${
        side === 'left' ? 'justify-center md:justify-start' : 'justify-center md:justify-end'
      }`}
    >
      <motion.div
        style={{ y, opacity, willChange: 'transform, opacity' }}
        className="pointer-events-auto"
      >
        {children}
      </motion.div>
    </div>
  );
};

export const MovingBlocksSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  return (
    <section
      ref={sectionRef}
      id="highlights"
      className="relative w-full h-[330vh] bg-[#F6F6F4] text-[#0A0A0A] border-t border-b border-[#0A0A0A]/12"
    >
      {/* Sticky Full-Viewport Stage */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center">
        {/* Background Layer: Centered Sticky Basic Header ("DID YOU KNOW?") */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center select-none pointer-events-none">
          <div className="mb-4">
            <span className="font-mono text-[14px] sm:text-[15px] md:text-[16px] uppercase tracking-[0.22em] text-[#E11D2A] font-bold">
              URBRAND 360 · BY DESIGN
            </span>
          </div>
          <h2 className="font-sans font-semibold uppercase text-[52px] sm:text-[84px] md:text-[118px] lg:text-[148px] leading-[0.94] tracking-[-0.04em] text-[#0A0A0A]">
            DID YOU KNOW?
          </h2>
          <p className="mt-5 font-mono text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-[#0A0A0A]/45">
            BRAND SYSTEMS · GROWTH MARKETING · CA TAXATION · AI AUTOMATION
          </p>
        </div>

        {/* Foreground Layer: Staggered Rectangular Detail Blocks Moving Vertically Over Header */}
        <div className="absolute inset-0 z-20 pointer-events-none">
          {/* Block 01 — Left · Deep Black Architectural Block */}
          <MovingBlockWrapper
            scrollYProgress={scrollYProgress}
            range={[0, 0.34]}
            yRange={['40vh', '-112vh']}
            side="left"
          >
            <div className="w-[325px] sm:w-[395px] md:w-[440px] min-h-[390px] md:min-h-[435px] bg-[#0A0A0A] text-white p-8 md:p-10 shadow-[0_25px_70px_rgba(10,10,10,0.3)] border border-white/10 flex flex-col justify-between">
              <div className="flex items-start justify-between gap-4">
                <p className="font-serif italic text-[22px] md:text-[26px] leading-[1.15] text-white/95 max-w-[16ch]">
                  One dedicated pod engineered around your business.
                </p>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#E11D2A] font-semibold flex-shrink-0">
                  01 / STRUCTURE
                </span>
              </div>

              <div className="mt-8 pt-6 border-t border-white/15 flex items-end justify-between">
                <div>
                  <div className="font-display text-[84px] md:text-[104px] leading-[0.82] tracking-tighter text-white">
                    05
                  </div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#E11D2A] mt-3">
                    SPECIALISTS · 01 CONTACT
                  </div>
                </div>
                <p className="font-sans text-[13px] leading-[1.5] text-white/70 font-light max-w-[18ch] text-right">
                  Brand, sales, ecommerce, CA finance &amp; AI experts synced seamlessly.
                </p>
              </div>
            </div>
          </MovingBlockWrapper>

          {/* Block 02 — Right · Bold Framed White Typographic Block */}
          <MovingBlockWrapper
            scrollYProgress={scrollYProgress}
            range={[0.04, 0.48]}
            yRange={['102vh', '-112vh']}
            side="right"
          >
            <div className="w-[325px] sm:w-[395px] md:w-[440px] min-h-[390px] md:min-h-[435px] bg-[#FFFFFF] text-[#0A0A0A] border-x-[14px] border-[#0A0A0A] border-y border-y-[#0A0A0A]/15 p-8 md:p-10 shadow-[0_25px_70px_rgba(10,10,10,0.22)] flex flex-col justify-between">
              <div className="text-center border-b border-[#0A0A0A]/12 pb-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#E11D2A] font-semibold">
                  02 / SENIOR PEDIGREE
                </span>
                <p className="font-serif italic text-[26px] md:text-[30px] leading-tight text-[#0A0A0A] mt-2">
                  Specialists Only
                </p>
              </div>

              <div className="my-auto py-4 text-center">
                <div className="font-display text-[68px] md:text-[82px] leading-none text-[#0A0A0A] tracking-tight">
                  3–8<span className="text-[#E11D2A] italic">+</span>
                </div>
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#0A0A0A]/60 mt-2">
                  YEARS CORPORATE EXPERIENCE EACH
                </div>
              </div>

              <div className="pt-4 border-t border-[#0A0A0A]/12 text-center font-sans text-[13.5px] text-[#0A0A0A]/75 leading-relaxed">
                Senior execution in corporate roles, performance ads, compliance, and tech — zero junior handoffs.
              </div>
            </div>
          </MovingBlockWrapper>

          {/* Block 03 — Left · Crimson Red Orbital Poster Block */}
          <MovingBlockWrapper
            scrollYProgress={scrollYProgress}
            range={[0.20, 0.64]}
            yRange={['106vh', '-112vh']}
            side="left"
          >
            <div className="w-[325px] sm:w-[395px] md:w-[440px] min-h-[400px] md:min-h-[445px] bg-[#E11D2A] text-white p-8 md:p-10 shadow-[0_25px_70px_rgba(225,29,42,0.28)] flex flex-col justify-between relative overflow-hidden">
              <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-white/90">
                <span>03 / TAX &amp; COMPLIANCE</span>
                <span>CHARTERED LED</span>
              </div>

              {/* Curved Graphic Arc Motif */}
              <div className="my-4 flex items-center justify-center">
                <svg viewBox="0 0 320 120" className="w-full h-24 overflow-visible">
                  <defs>
                    <path
                      id="urbrandCurvedArc"
                      d="M 20 96 A 155 155 0 0 1 300 96"
                    />
                  </defs>
                  <text
                    fill="#FFFFFF"
                    fontSize="16"
                    fontWeight="700"
                    letterSpacing="2.4"
                    className="font-sans uppercase"
                  >
                    <textPath href="#urbrandCurvedArc" startOffset="50%" textAnchor="middle">
                      CROSS-BORDER · GLOBAL TAX · CA
                    </textPath>
                  </text>
                  <line x1="28" y1="106" x2="292" y2="106" stroke="rgba(255,255,255,0.35)" strokeWidth="1" />
                </svg>
              </div>

              <div className="pt-3 border-t border-white/25">
                <h3 className="font-serif text-[25px] md:text-[28px] leading-[1.15] text-white mb-2">
                  Financial precision across markets.
                </h3>
                <p className="font-sans text-[13.5px] leading-[1.55] text-white/90 font-light">
                  International taxation handled directly by a Chartered Accountant with 6 years of corporate expertise.
                </p>
              </div>
            </div>
          </MovingBlockWrapper>

          {/* Block 04 — Right · Split Editorial White Poster Block */}
          <MovingBlockWrapper
            scrollYProgress={scrollYProgress}
            range={[0.36, 0.80]}
            yRange={['106vh', '-112vh']}
            side="right"
          >
            <div className="w-[325px] sm:w-[395px] md:w-[440px] min-h-[390px] md:min-h-[435px] bg-[#FFFFFF] text-[#0A0A0A] border border-[#0A0A0A]/15 p-8 md:p-10 shadow-[0_25px_70px_rgba(10,10,10,0.2)] flex flex-col justify-between">
              <div className="flex items-start justify-between gap-4 border-b border-[#0A0A0A]/10 pb-5">
                <span className="font-serif text-[22px] text-[#0A0A0A]/80">We build</span>
                <span className="font-serif text-[22px] text-[#E11D2A] italic text-right">
                  Global Reach
                </span>
              </div>

              <div className="my-auto py-4">
                <div className="font-sans font-bold uppercase tracking-[-0.03em] text-[28px] md:text-[34px] leading-[1.05] text-[#0A0A0A]">
                  INDORE, INDIA · WORKING WORLDWIDE
                </div>
                <div className="w-12 h-1 bg-[#E11D2A] mt-4" />
              </div>

              <div className="flex items-end justify-between gap-4 pt-5 border-t border-[#0A0A0A]/10">
                <p className="font-sans text-[13px] text-[#0A0A0A]/70 leading-relaxed font-light">
                  100% remote-first studio agility without traditional agency bloat.
                </p>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#0A0A0A] font-semibold flex-shrink-0">
                  04 / REACH
                </span>
              </div>
            </div>
          </MovingBlockWrapper>

          {/* Block 05 — Left · Black Tech & Growth Stack Block */}
          <MovingBlockWrapper
            scrollYProgress={scrollYProgress}
            range={[0.52, 0.94]}
            yRange={['106vh', '-112vh']}
            side="left"
          >
            <div className="w-[325px] sm:w-[395px] md:w-[440px] min-h-[390px] md:min-h-[435px] bg-[#0A0A0A] text-white border-t-4 border-[#E11D2A] p-8 md:p-10 shadow-[0_25px_70px_rgba(10,10,10,0.32)] flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#E11D2A]">
                  05 / COMMERCE + AI
                </span>
                <span className="w-2 h-2 rounded-full bg-[#E11D2A]" />
              </div>

              <div className="my-auto py-4">
                <h3 className="font-display text-[32px] md:text-[38px] leading-[1.05] text-white">
                  Revenue engines &amp;{' '}
                  <span className="italic text-[#E11D2A]">smart workflows.</span>
                </h3>
                <p className="font-sans text-[13.5px] leading-[1.6] text-white/70 font-light mt-4">
                  Full-funnel performance across Shopify, Amazon, Meta &amp; Google Ads — paired with custom AI automations and API integrations.
                </p>
              </div>

              <div className="pt-4 border-t border-white/15 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.16em] text-white/55">
                <span>PAID MEDIA · CRO · API</span>
                <span>SCALE</span>
              </div>
            </div>
          </MovingBlockWrapper>

          {/* Block 06 — Right · White Founder Promise Block */}
          <MovingBlockWrapper
            scrollYProgress={scrollYProgress}
            range={[0.68, 1]}
            yRange={['106vh', '-42vh']}
            side="right"
          >
            <div className="w-[325px] sm:w-[395px] md:w-[440px] min-h-[390px] md:min-h-[435px] bg-[#FFFFFF] text-[#0A0A0A] border border-[#0A0A0A]/20 p-8 md:p-10 shadow-[0_25px_70px_rgba(10,10,10,0.22)] flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#E11D2A] font-semibold">
                  06 / ACCOUNTABILITY
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#0A0A0A]/50">
                  FOUNDER LED
                </span>
              </div>

              <blockquote className="my-auto py-4 border-l-4 border-[#E11D2A] pl-5">
                <p className="font-serif text-[22px] md:text-[26px] leading-[1.2] text-[#0A0A0A]">
                  “A dedicated team, a clear plan, honest reporting and personal founder accountability.”
                </p>
              </blockquote>

              <div className="pt-4 border-t border-[#0A0A0A]/12 flex items-center justify-between">
                <div>
                  <div className="font-sans text-[14px] font-medium text-[#0A0A0A]">
                    Vaishnavi Ahuja
                  </div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-[#0A0A0A]/55">
                    FOUNDER &amp; CEO, URBRAND 360
                  </div>
                </div>
                <span className="w-8 h-8 rounded-full bg-[#E11D2A] text-white flex items-center justify-center font-mono text-[11px] font-bold">
                  360
                </span>
              </div>
            </div>
          </MovingBlockWrapper>
        </div>
      </div>
    </section>
  );
};

