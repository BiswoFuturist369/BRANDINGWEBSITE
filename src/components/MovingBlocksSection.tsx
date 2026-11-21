import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Activity, Cpu, Globe2 } from 'lucide-react';

export const MovingBlocksSection: React.FC = () => {
  return (
    <section
      id="highlights"
      className="relative w-full max-w-full bg-[#F6F6F4] text-[#0A0A0A] border-t border-b border-[#0A0A0A]/12 overflow-x-clip"
    >
      {/* =========================================================================
          PINNED STICKY BACKGROUND LAYER ("DID YOU KNOW?")
          Stays locked in the exact center of the screen while all 8 blocks scroll
          smoothly over it in 1:1 native sync — emulating Interbrand.com
          ========================================================================= */}
      <div className="sticky top-0 h-[100svh] w-full flex flex-col items-center justify-center pointer-events-none select-none z-0 px-4 text-center">
        <div className="mb-3 sm:mb-4">
          <span className="font-mono text-[12px] sm:text-[15px] md:text-[16px] uppercase tracking-[0.2em] sm:tracking-[0.24em] text-[#E11D2A] font-bold">
            URBRAND 360 · BY DESIGN
          </span>
        </div>

        <h2 className="font-sans font-black uppercase text-[clamp(38px,9vw,148px)] leading-[0.88] tracking-[-0.04em] text-[#0A0A0A] max-w-full">
          DID YOU KNOW?
        </h2>

        <div className="mt-4 sm:mt-6 flex items-center justify-center gap-2 sm:gap-3">
          <span className="h-px w-6 sm:w-8 md:w-20 bg-[#0A0A0A]/20 flex-shrink-0" />
          <p className="font-mono text-[9px] sm:text-[11px] md:text-[12px] uppercase tracking-[0.16em] sm:tracking-[0.22em] text-[#0A0A0A]/60 font-medium">
            BRAND SYSTEMS · GROWTH MARKETING · CA TAXATION · AI AUTOMATION
          </p>
          <span className="h-px w-6 sm:w-8 md:w-20 bg-[#0A0A0A]/20 flex-shrink-0" />
        </div>
      </div>

      {/* =========================================================================
          FOREGROUND NATIVE-SCROLL STAGGERED BLOCKS LAYER
          Natural browser scroll flow = 100% locked 1:1 sync scrolling up & down,
          zero empty gaps, every single block fully visible on every screen size.
          ========================================================================= */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-14 -mt-[20vh] sm:-mt-[35vh] pb-[14vh] sm:pb-[20vh] flex flex-col gap-8 sm:gap-12 lg:gap-0">
        {/* =========================================================================
            BLOCK 01 — Left · Pod Structure with Looping Video Reel
            ========================================================================= */}
        <div className="w-full flex justify-center lg:justify-start">
          <div className="w-full max-w-[460px] lg:w-[460px] xl:w-[500px] min-h-[320px] sm:min-h-[380px] bg-[#0A0A0A] text-white p-6 sm:p-8 xl:p-10 rounded-[20px] shadow-[0_30px_70px_rgba(10,10,10,0.3)] border border-white/15 flex flex-col justify-between relative overflow-hidden">
            {/* Subtle Looping Silent Reel Video */}
            <div className="absolute inset-0 z-0 opacity-25 overflow-hidden pointer-events-none">
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

            <div className="relative z-10 my-5">
              <p className="font-serif italic text-[26px] xl:text-[30px] leading-[1.18] text-white max-w-[17ch]">
                One dedicated pod engineered around your business.
              </p>
              <p className="font-sans text-[14px] leading-[1.6] text-white/75 font-light mt-3 max-w-[32ch]">
                Brand directors, performance marketers, CA finance &amp; AI developers synced into a single high-conviction unit.
              </p>
            </div>

            <div className="relative z-10 pt-5 border-t border-white/15 flex items-end justify-between">
              <div>
                <div className="font-display text-[76px] xl:text-[88px] leading-[0.82] tracking-tighter text-white">
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
        </div>

        {/* =========================================================================
            BLOCK 02 — Right · Senior Pedigree with Infinite Moving Marquee
            ========================================================================= */}
        <div className="w-full flex justify-center lg:justify-end lg:-mt-24">
          <div className="w-full max-w-[460px] lg:w-[460px] xl:w-[500px] min-h-[320px] sm:min-h-[380px] bg-[#FFFFFF] text-[#0A0A0A] rounded-[20px] border-x-[8px] sm:border-x-[14px] border-[#0A0A0A] border-y border-y-[#0A0A0A]/15 p-6 sm:p-8 xl:p-10 shadow-[0_30px_70px_rgba(10,10,10,0.22)] flex flex-col justify-between overflow-hidden">
            <div className="flex items-center justify-between border-b border-[#0A0A0A]/10 pb-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#E11D2A] font-bold">
                02 / SENIOR PEDIGREE
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[#0A0A0A]/50">
                NO JUNIORS
              </span>
            </div>

            {/* Infinite Horizontal Moving Marquee */}
            <div className="relative w-full overflow-hidden py-3 bg-[#F6F6F4] border-y border-[#0A0A0A]/10 my-3">
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

            <div className="text-center my-auto py-3">
              <div className="font-display text-[68px] xl:text-[82px] leading-none text-[#0A0A0A] tracking-tight">
                3–8<span className="text-[#E11D2A] italic">+</span>
              </div>
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#0A0A0A]/60 mt-2 font-medium">
                YEARS CORPORATE EXPERIENCE EACH
              </div>
            </div>

            <div className="pt-4 border-t border-[#0A0A0A]/10 text-center font-sans text-[13.5px] text-[#0A0A0A]/75 leading-relaxed font-light">
              Senior execution across identity, performance marketing, tax compliance &amp; full-stack automation.
            </div>
          </div>
        </div>

        {/* =========================================================================
            BLOCK 03 — Left · Crimson CA-Led Tax Radar
            ========================================================================= */}
        <div className="w-full flex justify-center lg:justify-start lg:-mt-20">
          <div className="w-full max-w-[460px] lg:w-[460px] xl:w-[500px] min-h-[380px] bg-[#E11D2A] text-white p-8 xl:p-10 rounded-[20px] shadow-[0_30px_70px_rgba(225,29,42,0.32)] flex flex-col justify-between relative overflow-hidden">
            <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-white/90">
              <span className="flex items-center gap-1.5 font-bold">
                <ShieldCheck size={14} />
                03 / TAX &amp; COMPLIANCE
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[9px]">
                CHARTERED LED
              </span>
            </div>

            {/* Live Sweeping SVG Radar */}
            <div className="my-auto py-4 flex items-center justify-center relative">
              <div className="relative w-40 h-40 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border border-white/20 animate-ping opacity-25" />
                <div className="absolute inset-4 rounded-full border border-white/30" />
                <div className="absolute inset-8 rounded-full border border-white/40" />

                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="w-1/2 h-0.5 bg-gradient-to-r from-transparent to-white origin-right self-start mt-20" />
                </motion.div>

                <div className="relative z-10 w-16 h-16 rounded-full bg-white text-[#E11D2A] flex flex-col items-center justify-center font-mono text-[11px] font-bold shadow-lg">
                  <span>CA</span>
                  <span className="text-[8px] uppercase tracking-wider text-[#0A0A0A]">FINANCE</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/25">
              <h3 className="font-serif text-[25px] xl:text-[28px] leading-[1.18] text-white mb-2">
                Financial precision across international borders.
              </h3>
              <p className="font-sans text-[13.5px] leading-[1.55] text-white/90 font-light">
                Cross-border structuring, overseas tax compliance, and investor audit handled directly by a Chartered Accountant.
              </p>
            </div>
          </div>
        </div>

        {/* =========================================================================
            BLOCK 04 — Right-Center Offset · Global Delivery Animated Orbital Map
            ========================================================================= */}
        <div className="w-full flex justify-center lg:justify-end lg:pr-12 xl:pr-20 lg:-mt-20">
          <div className="w-full max-w-[460px] lg:w-[460px] xl:w-[500px] min-h-[380px] bg-[#FFFFFF] text-[#0A0A0A] rounded-[20px] border border-[#0A0A0A]/15 p-8 xl:p-10 shadow-[0_30px_70px_rgba(10,10,10,0.22)] flex flex-col justify-between overflow-hidden">
            <div className="flex items-center justify-between border-b border-[#0A0A0A]/10 pb-4">
              <span className="font-serif italic text-[22px] text-[#0A0A0A]">Global Delivery</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#E11D2A] font-bold">
                04 / REACH
              </span>
            </div>

            {/* Animated Global Reach Orbital Stage */}
            <div className="relative my-4 h-40 w-full rounded-[14px] overflow-hidden bg-[#0A0A0A] flex items-center justify-center border border-[#0A0A0A]/10">
              {/* Rotating Orbital Rings */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
                className="absolute w-56 h-56 rounded-full border border-dashed border-white/20"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                className="absolute w-36 h-36 rounded-full border border-[#E11D2A]/50"
              />
              {/* Pulsing Core */}
              <div className="relative z-10 text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E11D2A] text-white font-mono text-[10px] uppercase tracking-[0.2em] font-bold shadow-[0_0_24px_rgba(225,29,42,0.6)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                  WORKING WORLDWIDE
                </div>
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/60 mt-2.5">
                  APAC · EUROPE · AMERICAS · MENA
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-[#0A0A0A]/10">
              <div className="font-sans font-bold uppercase tracking-[-0.02em] text-[22px] xl:text-[25px] leading-tight text-[#0A0A0A]">
                INDORE, INDIA · WORKING WORLDWIDE
              </div>
              <p className="font-sans text-[13.5px] text-[#0A0A0A]/70 leading-relaxed font-light mt-2">
                100% remote-first agility connecting founders directly with dedicated specialists without traditional agency bloat.
              </p>
            </div>
          </div>
        </div>

        {/* =========================================================================
            BLOCK 05 — Left-Center Offset · Live Strategy Waveform Equalizer
            ========================================================================= */}
        <div className="w-full flex justify-center lg:justify-start lg:pl-10 xl:pl-16 lg:-mt-20">
          <div className="w-full max-w-[460px] lg:w-[460px] xl:w-[500px] min-h-[380px] bg-[#0A0A0A] text-white rounded-[20px] border-t-4 border-[#E11D2A] p-8 xl:p-10 shadow-[0_30px_70px_rgba(10,10,10,0.35)] flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Activity size={16} className="text-[#E11D2A]" />
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#E11D2A] font-bold">
                  05 / COMMERCE + PERFORMANCE
                </span>
              </div>
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/50">
                REAL-TIME AD ENGINE
              </span>
            </div>

            <div className="my-auto py-4">
              <div className="flex items-end justify-center gap-1.5 h-16 px-4 bg-white/[0.04] rounded-[12px] border border-white/10">
                {[40, 70, 30, 85, 55, 95, 45, 80, 60, 90, 35, 75, 50, 85, 65, 40].map((height, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      height: [
                        `${Math.max(15, height * 0.3)}%`,
                        `${height}%`,
                        `${Math.max(15, height * 0.4)}%`,
                      ],
                    }}
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

              <div className="mt-5">
                <h3 className="font-display text-[28px] xl:text-[32px] leading-[1.08] text-white">
                  Revenue engines &amp;{' '}
                  <span className="italic text-[#E11D2A]">smart workflows.</span>
                </h3>
                <p className="font-sans text-[13.5px] leading-[1.55] text-white/70 font-light mt-2">
                  Full-funnel performance across Shopify, Amazon, Meta &amp; Google Ads — synced with custom AI automations.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-white/15 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-white/60">
              <span>PAID MEDIA · CRO · API</span>
              <span className="text-[#E11D2A]">SCALE ENGINE</span>
            </div>
          </div>
        </div>

        {/* =========================================================================
            BLOCK 06 — Right · Computational AI Automation Pipeline
            ========================================================================= */}
        <div className="w-full flex justify-center lg:justify-end lg:-mt-20">
          <div className="w-full max-w-[460px] lg:w-[460px] xl:w-[500px] min-h-[380px] bg-[#FFFFFF] text-[#0A0A0A] rounded-[20px] border border-[#0A0A0A]/20 p-8 xl:p-10 shadow-[0_30px_70px_rgba(10,10,10,0.22)] flex flex-col justify-between">
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

            <div className="my-auto py-3 space-y-2.5">
              <div className="flex items-center justify-between p-3.5 rounded-[12px] bg-[#F6F6F4] border border-[#0A0A0A]/10">
                <span className="font-mono text-[11px] font-semibold uppercase text-[#0A0A0A]">
                  01. AUDIT &amp; ROADMAP
                </span>
                <span className="w-2 h-2 rounded-full bg-[#E11D2A] animate-pulse" />
              </div>

              <div className="flex items-center justify-center text-[#E11D2A] font-mono text-[12px]">
                <motion.div animate={{ y: [0, 4, 0] }} transition={{ duration: 1.4, repeat: Infinity }}>
                  ↓
                </motion.div>
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-[12px] bg-[#0A0A0A] text-white shadow-md">
                <span className="font-mono text-[11px] font-semibold uppercase text-white">
                  02. AI WORKFLOW INGESTION
                </span>
                <span className="font-mono text-[9px] uppercase tracking-wider bg-[#E11D2A] text-white px-2 py-0.5 rounded">
                  ACTIVE
                </span>
              </div>

              <div className="flex items-center justify-center text-[#E11D2A] font-mono text-[12px]">
                <motion.div animate={{ y: [0, 4, 0] }} transition={{ duration: 1.4, repeat: Infinity, delay: 0.3 }}>
                  ↓
                </motion.div>
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-[12px] bg-[#F6F6F4] border border-[#0A0A0A]/10">
                <span className="font-mono text-[11px] font-semibold uppercase text-[#0A0A0A]">
                  03. HIGH LEVERAGE DEPLOYMENT
                </span>
                <span className="font-mono text-[10px] text-[#E11D2A] font-bold">LIVE</span>
              </div>
            </div>

            <div className="pt-4 border-t border-[#0A0A0A]/10 flex items-center justify-between">
              <span className="font-sans text-[13px] text-[#0A0A0A]/70 font-light">
                Eliminating manual overhead across systems.
              </span>
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#E11D2A] font-bold">
                48H DIAGNOSTIC
              </span>
            </div>
          </div>
        </div>

        {/* =========================================================================
            BLOCK 07 — Left · Synchronized Global Timezones
            ========================================================================= */}
        <div className="w-full flex justify-center lg:justify-start lg:-mt-20">
          <div className="w-full max-w-[460px] lg:w-[460px] xl:w-[500px] min-h-[380px] bg-[#0A0A0A] text-white rounded-[20px] border border-white/15 p-8 xl:p-10 shadow-[0_30px_70px_rgba(10,10,10,0.35)] flex flex-col justify-between">
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

            <div className="my-auto py-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-[12px] bg-white/[0.05] border border-white/10">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-[9px] text-white/50 uppercase">INDORE (HQ)</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E11D2A] animate-ping" />
                </div>
                <div className="font-display text-[19px] sm:text-[21px] text-white font-medium">IST · UTC+5:30</div>
              </div>

              <div className="p-3.5 rounded-[12px] bg-white/[0.05] border border-white/10">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-[9px] text-white/50 uppercase">LONDON</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-white/70" />
                </div>
                <div className="font-display text-[19px] sm:text-[21px] text-white font-medium">GMT · UTC+0</div>
              </div>

              <div className="p-3.5 rounded-[12px] bg-white/[0.05] border border-white/10">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-[9px] text-white/50 uppercase">NEW YORK</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-white/70" />
                </div>
                <div className="font-display text-[19px] sm:text-[21px] text-white font-medium">EST · UTC-5</div>
              </div>

              <div className="p-3.5 rounded-[12px] bg-white/[0.05] border border-white/10">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-[9px] text-white/50 uppercase">SINGAPORE</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-white/70" />
                </div>
                <div className="font-display text-[19px] sm:text-[21px] text-white font-medium">SGT · UTC+8</div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.16em] text-white/60">
              <span>ASYNC FIRST DELIVERY</span>
              <span className="text-[#E11D2A]">GLOBAL AGILITY</span>
            </div>
          </div>
        </div>

        {/* =========================================================================
            BLOCK 08 — Right · Founder Accountability & Rotating Orbit Emblem
            ========================================================================= */}
        <div className="w-full flex justify-center lg:justify-end lg:-mt-20">
          <div className="w-full max-w-[460px] lg:w-[460px] xl:w-[500px] min-h-[380px] bg-[#FFFFFF] text-[#0A0A0A] rounded-[20px] border border-[#0A0A0A]/20 p-8 xl:p-10 shadow-[0_30px_70px_rgba(10,10,10,0.25)] flex flex-col justify-between overflow-hidden relative">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#E11D2A] font-bold">
                08 / ACCOUNTABILITY
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#0A0A0A]/50">
                FOUNDER LED
              </span>
            </div>

            <div className="my-auto py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5">
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 flex items-center justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-0 rounded-full border border-dashed border-[#E11D2A]"
                />
                <picture>
                  <source srcSet="/logo/urbrand360-emblem-dark-sm.webp" type="image/webp" />
                  <img
                    src="/logo/urbrand360-emblem-dark-sm.png"
                    alt="UR Monogram"
                    width={48}
                    height={48}
                    loading="lazy"
                    decoding="async"
                    className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
                  />
                </picture>
              </div>

              <blockquote className="border-l-2 border-[#E11D2A] pl-4">
                <p className="font-serif italic text-[18px] sm:text-[19px] xl:text-[22px] leading-[1.25] text-[#0A0A0A]">
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
        </div>
      </div>
    </section>
  );
};

export default MovingBlocksSection;
