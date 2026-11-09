import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { FOUNDER_DATA, EMPLOYEES_DATA } from '../data/team';

export const LeadershipGatewaySection: React.FC = () => {
  const previewAvatars = [
    { name: FOUNDER_DATA.name, image: FOUNDER_DATA.image, isFounder: true },
    ...EMPLOYEES_DATA.map((e) => ({ name: e.name, image: e.image, isFounder: false })),
  ];

  return (
    <section
      id="founder"
      className="relative w-full py-28 md:py-40 px-6 md:px-12 bg-[#0A0A0A] text-[#FFFFFF] border-t border-white/10 overflow-hidden"
    >
      {/* Subtle Orbit Ring Accent */}
      <div className="pointer-events-none absolute -right-24 top-1/2 -translate-y-1/2 w-[520px] h-[520px] rounded-full border border-white/[0.04]" />
      <div className="pointer-events-none absolute -right-8 top-1/2 -translate-y-1/2 w-[380px] h-[380px] rounded-full border border-[#E11D2A]/15" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Eyebrow */}
        <div className="mb-6">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#E11D2A] font-semibold">
            LEADERSHIP &amp; SPECIALISTS
          </span>
        </div>

        {/* Basic Display Heading (No Halftone) */}
        <div className="max-w-5xl mb-14 md:mb-20">
          <h2 className="font-display text-[40px] md:text-[64px] lg:text-[76px] leading-[1.03] tracking-[-0.015em] text-white font-normal">
            Led by a founder who is{' '}
            <span className="italic text-[#E11D2A]">personally accountable.</span>
          </h2>
          <p className="font-sans text-[17px] md:text-[19px] leading-[1.65] text-white/70 font-light mt-6 max-w-2xl">
            Meet our Founder &amp; CEO Vaishnavi Ahuja and explore the dedicated domain specialists who execute your brand, marketing, financial compliance, and automation strategy.
          </p>
        </div>

        {/* ONE Big Designed Gateway Button -> Navigates to /founder */}
        <motion.div
          whileHover={{ y: -4 }}
          whileTap={{ scale: 0.99 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-5xl"
        >
          <Link
            to="/founder"
            className="group relative block w-full rounded-[24px] p-8 sm:p-10 md:p-14 bg-gradient-to-br from-[#141414] via-[#0F0F0F] to-[#17090B] border border-white/20 hover:border-[#E11D2A] shadow-[0_30px_80px_rgba(0,0,0,0.65)] transition-all duration-500 overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E11D2A]"
          >
            {/* Hover Subtle Crimson Sweep */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#E11D2A]/0 via-[#E11D2A]/10 to-[#E11D2A]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8 lg:gap-12">
              {/* Left Info + Giant Button Text */}
              <div className="flex-1">
                {/* Overlapping Red-Ringed Team Avatars Preview */}
                <div className="flex items-center gap-5 mb-7">
                  <div className="flex -space-x-3">
                    {previewAvatars.map((person, index) => (
                      <div
                        key={person.name}
                        className={`relative rounded-full p-0.5 ring-2 ${
                          person.isFounder ? 'ring-[#E11D2A] z-20' : 'ring-white/40 z-10'
                        } bg-[#0A0A0A] w-12 h-12 sm:w-14 sm:h-14 overflow-hidden transition-transform duration-300 group-hover:scale-105`}
                        style={{ transitionDelay: `${index * 40}ms` }}
                      >
                        <img
                          src={person.image}
                          alt={person.name}
                          className="w-full h-full object-cover rounded-full grayscale contrast-115"
                          loading="lazy"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-[#E11D2A] font-semibold">
                    01 FOUNDER · 04 SPECIALISTS
                  </div>
                </div>

                {/* Primary Explicit Button Headline */}
                <div className="font-display text-[30px] sm:text-[38px] md:text-[46px] lg:text-[52px] leading-[1.08] text-white group-hover:text-white transition-colors">
                  Tap on it to know about the founder and the team
                </div>

                <div className="mt-5 flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-white/55">
                  <span className="text-white/85">Step 01: Company Owner Details</span>
                  <span className="text-[#E11D2A]">→</span>
                  <span>Step 02: The Team &amp; Their Expertise</span>
                </div>
              </div>

              {/* Right Oversized Circular Action Badge */}
              <div className="flex-shrink-0 flex items-center justify-start lg:justify-end">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#E11D2A] text-white flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:bg-white group-hover:text-[#0A0A0A] shadow-[0_0_40px_rgba(225,29,42,0.4)]">
                  <ArrowUpRight className="w-8 h-8 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

