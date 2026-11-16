import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { Sparkles, Globe2, Activity, Cpu, ArrowUpRight, ShieldCheck } from 'lucide-react';

interface MovingBlockCardProps {
  scrollYProgress: MotionValue<number>;
  range: [number, number];
  yRange: [string, string];
  side: 'left' | 'right';
  className?: string;
  children: React.ReactNode;
}

const MovingBlockWrapper: React.FC<MovingBlockCardProps> = ({
  scrollYProgress,
  range,
  yRange,
  side,
  className = '',
  children,
}) => {
  // Extrapolate clamp so elements enter smoothly and don't pop out unexpectedly
  const y = useTransform(scrollYProgress, range, yRange);
  const opacity = useTransform(
    scrollYProgress,
    [
      range[0],
      range[0] + 0.05,
      range[1] - 0.06,
      range[1]
    ],
    [0.4, 1, 1, 0.4]
  );

  return (
    <div
      className={`pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 flex px-3 sm:px-6 md:px-10 lg:px-16 ${
        side === 'left' ? 'justify-center lg:justify-start' : 'justify-center lg:justify-end'
      } ${className}`}
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
      className="relative w-full max-w-full h-[280vh] bg-[#F6F6F4] text-[#0A0A0A] border-t border-b border-[#0A0A0A]/12 overflow-hidden"
    >
      {/* Sticky Full-Viewport Stage */}
      <div className="sticky top-0 w-full max-w-full h-screen overflow-hidden flex items-center justify-center">
        {/* Background Layer: Centered Sticky Master Header ("DID YOU KNOW?") */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 text-center select-none pointer-events-none w-full">
          <div className="mb-4">
            <span className="font-mono text-[14px] sm:text-[15px] md:text-[16px] uppercase tracking-[0.24em] text-[#E11D2A] font-bold">
              URBRAND 360 · BY DESIGN
            </span>
          </div>

          <h2 className="font-sans font-black uppercase text-[clamp(44px,8.5vw,132px)] leading-[0.9] tracking-[-0.04em] text-[#0A0A0A] max-w-full">
            DID YOU KNOW?
          </h2>

          <div className="mt-6 flex items-center justify-center gap-3">
            <span className="h-px w-10 md:w-16 bg-[#0A0A0A]/20" />
            <p className="font-mono text-[11px] md:text-[12px] uppercase tracking-[0.22em] text-[#0A0A0A]/60 font-medium">
              BRAND SYSTEMS · GROWTH MARKETING · CA TAXATION · AI AUTOMATION
            </p>
            <span className="h-px w-10 md:w-16 bg-[#0A0A0A]/20" />
          </div>
        </div>

        {/* Foreground Layer: Densely Staggered Overlapping Moving Blocks (No Empty Spaces) */}
        <div className="absolute inset-0 z-20 pointer-events-none">
          {/* =========================================================================
              BLOCK 01 — Left · Video Reel Background + Live Pod Architecture
              Range: [0.00, 0.32]
              ========================================================================= */}
          <MovingBlockWrapper
            scrollYProgress={scrollYProgress}
            range={[0.00, 0.30]}
            yRange={['35vh', '-90vh']}
            side="left"
          >
            <div className="w-[min(460px,calc(100vw-32px))] min-h-[360px] md:min-h-[400px] bg-[#0A0A0A] text-white p-7 md:p-9 rounded-[20px] shadow-[0_30px_80px_rgba(10,10,10,0.35)] border border-white/15 flex flex-col justify-between relative overflow-hidden group">
              {/* Subtle Video Background Loop */}
              <div className="absolute inset-0 z-0 opacity-25 overflow-hidden">
                <video
                  src="/video/urbrand360-reel-720p.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/80 to-[#0A0A0A]/40" />
              </div>

              {/* Top Row: Live Sync Pill + Identifier */}
              <div className="relative z-10 flex items-center justify-between gap-4">
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
                  <span className="w-2 h-2 rounded-full bg-[#E11D2A] animate-ping" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white">
                    LIVE POD · ACTIVE
                  </span>
                </div>
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#E11D2A] font-bold">
                  01 / STRUCTURE
                </span>
              </div>

              {/* Center Content */}
              <div className="relative z-10 my-4">
                <p className="font-serif italic text-[24px] md:text-[28px] leading-[1.18] text-white max-w-[16ch]">
                  One dedicated pod engineered around your business.
                </p>
                <p className="font-sans text-[13px] leading-[1.6] text-white/75 font-light mt-3 max-w-[28ch]">
                  Brand directors, performance marketers, CA finance &amp; AI developers synced into a single high-conviction unit.
                </p>
              </div>

              {/* Bottom: Specialist Metric Counter */}
              <div className="relative z-10 pt-4 border-t border-white/15 flex items-end justify-between">
                <div>
                  <div className="font-display text-[72px] md:text-[88px] leading-[0.82] tracking-tighter text-white">
                    05
                  </div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#E11D2A] mt-2 font-semibold">
                    SPECIALISTS · 01 CONTACT
                  </div>
                </div>

                <div className="font-mono text-[11px] text-white/60 tracking-wider text-right uppercase">
                  <div>Zero Silos</div>
                  <div className="text-white">Direct Access</div>
                </div>
              </div>
            </div>
          </MovingBlockWrapper>

          {/* =========================================================================
              BLOCK 02 — Right · Infinite Marquee Ticker + Senior Pedigree
              Range: [0.06, 0.38]
              ========================================================================= */}
          <MovingBlockWrapper
            scrollYProgress={scrollYProgress}
            range={[0.06, 0.38]}
            yRange={['90vh', '-90vh']}
            side="right"
          >
            <div className="w-[min(460px,calc(100vw-32px))] min-h-[360px] md:min-h-[400px] bg-[#FFFFFF] text-[#0A0A0A] rounded-[20px] border-x-[12px] border-[#0A0A0A] border-y border-y-[#0A0A0A]/15 p-7 md:p-9 shadow-[0_30px_80px_rgba(10,10,10,0.22)] flex flex-col justify-between overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-[#0A0A0A]/10 pb-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#E11D2A] font-bold">
                  02 / SENIOR PEDIGREE
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[#0A0A0A]/50">
                  NO JUNIORS
                </span>
              </div>

              {/* Moving Horizontal Marquee Ticker */}
              <div className="relative w-full overflow-hidden py-3 bg-[#F6F6F4] -mx-2 px-2 border-y border-[#0A0A0A]/10 my-2">
                <motion.div
                  animate={{ x: ['0%', '-50%'] }}
                  transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                  className="flex items-center gap-4 whitespace-nowrap will-change-transform"
                >
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] font-semibold text-[#0A0A0A]">
                    BRAND ARCHITECTURE ✦ PERFORMANCE ADS ✦ GLOBAL TAXATION ✦ AI AUTOMATION ✦
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] font-semibold text-[#E11D2A]">
                    BRAND ARCHITECTURE ✦ PERFORMANCE ADS ✦ GLOBAL TAXATION ✦ AI AUTOMATION ✦
                  </span>
                </motion.div>
              </div>

              {/* Big Stat */}
              <div className="text-center my-auto py-2">
                <div className="font-display text-[64px] md:text-[78px] leading-none text-[#0A0A0A] tracking-tight">
                  3–8<span className="text-[#E11D2A] italic">+</span>
                </div>
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#0A0A0A]/60 mt-2 font-medium">
                  YEARS CORPORATE EXPERIENCE EACH
                </div>
              </div>

              <div className="pt-4 border-t border-[#0A0A0A]/10 text-center font-sans text-[13px] text-[#0A0A0A]/75 leading-relaxed font-light">
                Senior execution across identity, performance marketing, tax compliance &amp; full-stack automation.
              </div>
            </div>
          </MovingBlockWrapper>

          {/* =========================================================================
              BLOCK 03 — Left · Crimson Cross-Border Financial Radar & Rotating CA Orbit
              Range: [0.18, 0.50]
              ========================================================================= */}
          <MovingBlockWrapper
            scrollYProgress={scrollYProgress}
            range={[0.18, 0.50]}
            yRange={['90vh', '-90vh']}
            side="left"
          >
            <div className="w-[min(460px,calc(100vw-32px))] min-h-[360px] md:min-h-[400px] bg-[#E11D2A] text-white p-7 md:p-9 rounded-[20px] shadow-[0_30px_80px_rgba(225,29,42,0.32)] flex flex-col justify-between relative overflow-hidden">
              <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-white/90">
                <span className="flex items-center gap-1.5 font-bold">
                  <ShieldCheck size={14} />
                  03 / TAX &amp; COMPLIANCE
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[9px]">
                  CHARTERED LED
                </span>
              </div>

              {/* Animated Live SVG Radar / Sweeping Compass */}
              <div className="my-auto py-4 flex items-center justify-center relative">
                <div className="relative w-44 h-44 flex items-center justify-center">
                  {/* Concentric Rings */}
                  <div className="absolute inset-0 rounded-full border border-white/20 animate-ping opacity-25" />
                  <div className="absolute inset-4 rounded-full border border-white/30" />
                  <div className="absolute inset-8 rounded-full border border-white/40" />

                  {/* Rotating Sweeper Line */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <div className="w-1/2 h-0.5 bg-gradient-to-r from-transparent to-white origin-right self-start mt-22" />
                  </motion.div>

                  {/* Center Emblem */}
                  <div className="relative z-10 w-16 h-16 rounded-full bg-white text-[#E11D2A] flex flex-col items-center justify-center font-mono text-[11px] font-bold shadow-lg">
                    <span>CA</span>
                    <span className="text-[8px] uppercase tracking-wider text-[#0A0A0A]">FINANCE</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/25">
                <h3 className="font-serif text-[24px] md:text-[27px] leading-[1.18] text-white mb-1.5">
                  Financial precision across international borders.
                </h3>
                <p className="font-sans text-[13px] leading-[1.55] text-white/90 font-light">
                  Cross-border structuring, overseas tax compliance, and investor audit handled directly by a Chartered Accountant.
                </p>
              </div>
            </div>
          </MovingBlockWrapper>

          {/* =========================================================================
              BLOCK 04 — Right · Cinematic Frame Gallery + Global Delivery
              Range: [0.28, 0.60]
              ========================================================================= */}
          <MovingBlockWrapper
            scrollYProgress={scrollYProgress}
            range={[0.28, 0.60]}
            yRange={['90vh', '-90vh']}
            side="right"
          >
            <div className="w-[min(460px,calc(100vw-32px))] min-h-[360px] md:min-h-[400px] bg-[#FFFFFF] text-[#0A0A0A] rounded-[20px] border border-[#0A0A0A]/15 p-7 md:p-9 shadow-[0_30px_80px_rgba(10,10,10,0.22)] flex flex-col justify-between overflow-hidden">
              <div className="flex items-center justify-between border-b border-[#0A0A0A]/10 pb-4">
                <span className="font-serif italic text-[20px] text-[#0A0A0A]">Global Delivery</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#E11D2A] font-bold">
                  04 / REACH
                </span>
              </div>

              {/* Dynamic Panoramic Visual Frame with Subtle Ken-Burns Animation */}
              <div className="relative my-4 aspect-[16/9] w-full rounded-[14px] overflow-hidden bg-black shadow-inner">
                <motion.img
                  src="/frames/frame-12.jpg"
                  alt="URBrand 360 Visual Craft"
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-full h-full object-cover grayscale contrast-125"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white font-mono text-[10px] uppercase tracking-wider">
                  <span>Worldwide Studios</span>
                  <span className="text-[#E11D2A]">Indore · HQ</span>
                </div>
              </div>

              <div className="pt-2 border-t border-[#0A0A0A]/10">
                <div className="font-sans font-bold uppercase tracking-[-0.02em] text-[20px] md:text-[24px] leading-tight text-[#0A0A0A]">
                  INDORE, INDIA · WORKING WORLDWIDE
                </div>
                <p className="font-sans text-[13px] text-[#0A0A0A]/70 leading-relaxed font-light mt-2">
                  100% remote-first agility connecting founders directly with dedicated specialists without traditional agency bloat.
                </p>
              </div>
            </div>
          </MovingBlockWrapper>

          {/* =========================================================================
              BLOCK 05 — Left · Live Strategy Oscilloscope & Waveform Equalizer
              Range: [0.40, 0.72]
              ========================================================================= */}
          <MovingBlockWrapper
            scrollYProgress={scrollYProgress}
            range={[0.40, 0.72]}
            yRange={['90vh', '-90vh']}
            side="left"
          >
            <div className="w-[min(460px,calc(100vw-32px))] min-h-[360px] md:min-h-[400px] bg-[#0A0A0A] text-white rounded-[20px] border-t-4 border-[#E11D2A] p-7 md:p-9 shadow-[0_30px_80px_rgba(10,10,10,0.35)] flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Activity size={16} className="text-[#E11D2A]" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#E11D2A] font-bold">
                    05 / COMMERCE + AI
                  </span>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/50">
                  REAL-TIME AD ENGINE
                </span>
              </div>

              {/* Animated Live Waveform / Oscilloscope Bars */}
              <div className="my-auto py-4">
                <div className="flex items-end justify-center gap-1.5 h-16 px-4 bg-white/[0.04] rounded-[12px] border border-white/10">
                  {[40, 70, 30, 85, 55, 95, 45, 80, 60, 90, 35, 75, 50, 85, 65, 40].map((height, i) => (
                    <motion.div
                      key={i}
                      animate={{ height: [`${Math.max(15, height * 0.3)}%`, `${height}%`, `${Math.max(15, height * 0.4)}%`] }}
                      transition={{
                        duration: 1.2 + (i % 5) * 0.2,
                        repeat: Infinity,
                        repeatType: 'reverse',
                        ease: 'easeInOut',
                        delay: i * 0.05,
                      }}
                      className={`w-2 rounded-t-sm ${i % 3 === 0 ? 'bg-[#E11D2A]' : 'bg-white/80'}`}
                    />
                  ))}
                </div>

                <div className="mt-4">
                  <h3 className="font-display text-[28px] md:text-[32px] leading-[1.08] text-white">
                    Revenue engines &amp;{' '}
                    <span className="italic text-[#E11D2A]">smart workflows.</span>
                  </h3>
                  <p className="font-sans text-[13px] leading-[1.55] text-white/70 font-light mt-2">
                    Full-funnel performance across Shopify, Amazon, Meta &amp; Google Ads — synced with custom AI automations.
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-white/15 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-white/60">
                <span>PAID MEDIA · CRO · API</span>
                <span className="text-[#E11D2A]">SCALE ENGINE</span>
              </div>
            </div>
          </MovingBlockWrapper>

          {/* =========================================================================
              BLOCK 06 — Right · Animated Interactive AI Pipeline Node Tree
              Range: [0.50, 0.82]
              ========================================================================= */}
          <MovingBlockWrapper
            scrollYProgress={scrollYProgress}
            range={[0.50, 0.82]}
            yRange={['90vh', '-90vh']}
            side="right"
          >
            <div className="w-[min(460px,calc(100vw-32px))] min-h-[360px] md:min-h-[400px] bg-[#FFFFFF] text-[#0A0A0A] rounded-[20px] border border-[#0A0A0A]/20 p-7 md:p-9 shadow-[0_30px_80px_rgba(10,10,10,0.22)] flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Cpu size={16} className="text-[#E11D2A]" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#E11D2A] font-bold">
                    06 / AI AUTOMATION
                  </span>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#0A0A0A]/50">
                  SYSTEM PIPELINE
                </span>
              </div>

              {/* Animated Interactive Flow Nodes */}
              <div className="my-auto py-3 space-y-3">
                <div className="flex items-center justify-between p-3 rounded-[12px] bg-[#F6F6F4] border border-[#0A0A0A]/10">
                  <span className="font-mono text-[11px] font-semibold uppercase text-[#0A0A0A]">
                    01. AUDIT &amp; ROADMAP
                  </span>
                  <span className="w-2 h-2 rounded-full bg-[#E11D2A] animate-pulse" />
                </div>

                <div className="flex items-center justify-center text-[#E11D2A] font-mono text-[12px]">
                  <motion.div
                    animate={{ y: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    ↓
                  </motion.div>
                </div>

                <div className="flex items-center justify-between p-3 rounded-[12px] bg-[#0A0A0A] text-white shadow-md">
                  <span className="font-mono text-[11px] font-semibold uppercase text-white">
                    02. AI WORKFLOW INGESTION
                  </span>
                  <span className="font-mono text-[10px] text-[#E11D2A]">ACTIVE</span>
                </div>

                <div className="flex items-center justify-center text-[#E11D2A] font-mono text-[12px]">
                  <motion.div
                    animate={{ y: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
                  >
                    ↓
                  </motion.div>
                </div>

                <div className="flex items-center justify-between p-3 rounded-[12px] bg-[#F6F6F4] border border-[#0A0A0A]/10">
                  <span className="font-mono text-[11px] font-semibold uppercase text-[#0A0A0A]">
                    03. HIGH LEVERAGE DEPLOYMENT
                  </span>
                  <span className="font-mono text-[10px] text-green-600 font-bold">READY</span>
                </div>
              </div>

              <div className="pt-3 border-t border-[#0A0A0A]/10 flex items-center justify-between">
                <span className="font-sans text-[12.5px] text-[#0A0A0A]/70 font-light">
                  Eliminating manual overhead across operations &amp; data.
                </span>
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#E11D2A] font-bold">
                  48H DIAGNOSTIC
                </span>
              </div>
            </div>
          </MovingBlockWrapper>

          {/* =========================================================================
              BLOCK 07 — Left · Global Clocks & Rotating Emblem Node
              Range: [0.60, 0.92]
              ========================================================================= */}
          <MovingBlockWrapper
            scrollYProgress={scrollYProgress}
            range={[0.60, 0.92]}
            yRange={['90vh', '-90vh']}
            side="left"
          >
            <div className="w-[min(460px,calc(100vw-32px))] min-h-[360px] md:min-h-[400px] bg-[#0A0A0A] text-white rounded-[20px] border border-white/15 p-7 md:p-9 shadow-[0_30px_80px_rgba(10,10,10,0.35)] flex flex-col justify-between">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2">
                  <Globe2 size={16} className="text-[#E11D2A]" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#E11D2A] font-bold">
                    07 / WORLDWIDE HUBS
                  </span>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/50">
                  24/7 SYNCHRONIZED
                </span>
              </div>

              {/* Timezone Grid with Animated Live Pulses */}
              <div className="my-auto py-3 grid grid-cols-2 gap-3">
                <div className="p-3.5 rounded-[12px] bg-white/[0.05] border border-white/10">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-[10px] text-white/50 uppercase">INDORE (HQ)</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E11D2A] animate-ping" />
                  </div>
                  <div className="font-display text-[22px] text-white font-medium">IST · UTC+5:30</div>
                </div>

                <div className="p-3.5 rounded-[12px] bg-white/[0.05] border border-white/10">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-[10px] text-white/50 uppercase">LONDON</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-white/70" />
                  </div>
                  <div className="font-display text-[22px] text-white font-medium">GMT · UTC+0</div>
                </div>

                <div className="p-3.5 rounded-[12px] bg-white/[0.05] border border-white/10">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-[10px] text-white/50 uppercase">NEW YORK</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-white/70" />
                  </div>
                  <div className="font-display text-[22px] text-white font-medium">EST · UTC-5</div>
                </div>

                <div className="p-3.5 rounded-[12px] bg-white/[0.05] border border-white/10">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-[10px] text-white/50 uppercase">SINGAPORE</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-white/70" />
                  </div>
                  <div className="font-display text-[22px] text-white font-medium">SGT · UTC+8</div>
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.16em] text-white/60">
                <span>ASYNC FIRST DELIVERY</span>
                <span className="text-[#E11D2A]">GLOBAL AGILITY</span>
              </div>
            </div>
          </MovingBlockWrapper>

          {/* =========================================================================
              BLOCK 08 — Right · Rotating Monogram 3D Orbit Badge & Founder Pledge
              Range: [0.70, 1.00]
              ========================================================================= */}
          <MovingBlockWrapper
            scrollYProgress={scrollYProgress}
            range={[0.70, 1.00]}
            yRange={['90vh', '-40vh']}
            side="right"
          >
            <div className="w-[min(460px,calc(100vw-32px))] min-h-[360px] md:min-h-[400px] bg-[#FFFFFF] text-[#0A0A0A] rounded-[20px] border border-[#0A0A0A]/20 p-7 md:p-9 shadow-[0_30px_80px_rgba(10,10,10,0.25)] flex flex-col justify-between overflow-hidden relative">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#E11D2A] font-bold">
                  08 / ACCOUNTABILITY
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#0A0A0A]/50">
                  FOUNDER LED
                </span>
              </div>

              {/* Rotating Monogram Orbit Graphic */}
              <div className="my-auto py-3 flex items-center gap-5">
                <div className="relative w-20 h-20 flex-shrink-0 flex items-center justify-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-0 rounded-full border border-dashed border-[#E11D2A]"
                  />
                  <img
                    src="/logo/urbrand360-emblem-dark.png"
                    alt="UR Monogram"
                    className="w-12 h-12 object-contain"
                  />
                </div>

                <blockquote className="border-l-2 border-[#E11D2A] pl-4">
                  <p className="font-serif italic text-[18px] md:text-[21px] leading-[1.25] text-[#0A0A0A]">
                    “A dedicated team, a clear plan, honest reporting and personal founder accountability.”
                  </p>
                </blockquote>
              </div>

              <div className="pt-4 border-t border-[#0A0A0A]/12 flex items-center justify-between">
                <div>
                  <div className="font-sans text-[14px] font-semibold text-[#0A0A0A]">
                    Vaishnavi Ahuja
                  </div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-[#0A0A0A]/60">
                    FOUNDER &amp; CEO, URBRAND 360
                  </div>
                </div>
                <span className="w-9 h-9 rounded-full bg-[#E11D2A] text-white flex items-center justify-center font-mono text-[12px] font-bold shadow-md">
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

export default MovingBlocksSection;
