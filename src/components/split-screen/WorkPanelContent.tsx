import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CASE_STUDIES_DATA } from '../../data/cases';
import { Footer } from '../Footer';

interface WorkPanelContentProps {
  isReadyToAnimateText?: boolean;
}

export const WorkPanelContent: React.FC<WorkPanelContentProps> = ({
  isReadyToAnimateText = true,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('All');

  const filters = ['All', 'Branding', 'Ecommerce', 'Marketing', 'Consulting'];

  const filteredCases = selectedFilter === 'All'
    ? CASE_STUDIES_DATA
    : CASE_STUDIES_DATA.filter((c) => c.category === selectedFilter);

  return (
    <div className="w-full relative min-h-screen text-white select-text">
      {/* HERO SECTION */}
      <section className="relative min-h-[85vh] flex flex-col justify-between pt-36 pb-20 px-6 md:px-14 lg:px-20 overflow-hidden bg-[#0A0A0A]">
        <div className="absolute inset-0 z-0">
          <motion.img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop"
            alt="Modern Architecture"
            className="w-full h-full object-cover grayscale contrast-125"
            initial={{ scale: 1.0 }}
            animate={{ scale: 1.08 }}
            transition={{ duration: 16, repeat: Infinity, repeatType: 'reverse', ease: 'linear' }}
          />
          <div className="absolute inset-0 bg-[#0A0A0A]/75 backdrop-blur-[1px]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-[#0A0A0A]/40" />
        </div>

        <div className="relative z-10 max-w-5xl">
          <div className="overflow-hidden mb-6">
            <motion.div
              initial={{ y: 24, opacity: 0 }}
              animate={isReadyToAnimateText ? { y: 0, opacity: 1 } : { y: 24, opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
              className="flex items-center gap-3"
            >
              <span className="w-2 h-2 rounded-full bg-[#E11D2A]" />
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] font-normal text-white/90">
                Selected Portfolio · URBrand 360 Case Studies
              </span>
            </motion.div>
          </div>

          <div className="space-y-1 mb-8 overflow-hidden">
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: '100%' }}
                animate={isReadyToAnimateText ? { y: 0 } : { y: '100%' }}
                transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
                className="font-serif text-[clamp(2.75rem,7vw,7rem)] font-light leading-[1.02] tracking-tight text-white"
              >
                Brands built to
              </motion.h1>
            </div>
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: '100%' }}
                animate={isReadyToAnimateText ? { y: 0 } : { y: '100%' }}
                transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1], delay: 0.18 }}
                className="font-serif text-[clamp(2.75rem,7vw,7rem)] font-light leading-[1.02] tracking-tight text-white"
              >
                be remembered.
              </motion.h1>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isReadyToAnimateText ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.45 }}
            className="max-w-2xl"
          >
            <p className="font-sans text-xl md:text-2xl font-light leading-relaxed text-white/90">
              See how our work across industries and markets shapes our clients' future. We design enduring identities and high-performing digital architectures for founders and growing businesses worldwide.
            </p>
          </motion.div>
        </div>

        <div className="relative z-10 pt-12 flex items-center justify-between border-t border-white/20 font-mono text-[11px] uppercase tracking-[0.18em] font-light text-white/80">
          <span>Case studies coming soon</span>
          <div className="flex items-center gap-2">
            <span>Portfolio</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#E11D2A] animate-pulse" />
          </div>
        </div>
      </section>

      {/* PORTFOLIO GRID */}
      <section className="relative z-20 bg-white text-[#0A0A0A] py-24 md:py-32 px-6 md:px-14 lg:px-20 shadow-[0_-20px_50px_rgba(0,0,0,0.15)]">
        <div className="max-w-7xl mx-auto">
          {/* Header & Filter Controls */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 pb-8 border-b border-black/15">
            <div>
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#E11D2A] font-semibold block mb-2">
                PORTFOLIO PREVIEWS
              </span>
              <h2 className="font-serif text-[38px] md:text-[52px] text-[#0A0A0A]">
                Our Work
              </h2>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-2 md:gap-3" role="tablist">
              {filters.map((filter) => {
                const isActive = selectedFilter === filter;
                return (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setSelectedFilter(filter)}
                    className={`px-5 py-2.5 rounded-full font-mono text-[11px] uppercase tracking-[0.14em] font-medium transition-all duration-300 relative focus:outline-none ${
                      isActive
                        ? 'bg-[#0A0A0A] text-white shadow-md'
                        : 'bg-black/5 text-black/70 hover:bg-black/10 hover:text-black'
                    }`}
                  >
                    <span>{filter}</span>
                    {isActive && (
                      <span className="ml-2 inline-block w-1.5 h-1.5 rounded-full bg-[#E11D2A]" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Notice */}
          <div className="mb-10 p-4 bg-black/5 rounded-lg font-mono text-[11px] text-black/70 tracking-wider uppercase flex items-center gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E11D2A]" />
            <span>Case studies coming soon · Portfolio currently undergoing curation and documentation.</span>
          </div>

          {/* Grid of Case Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 md:gap-10">
            {filteredCases.map((caseItem) => (
              <div
                key={caseItem.id}
                className="group relative rounded-[16px] overflow-hidden bg-[#141414] border border-black/10 shadow-lg"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-black">
                  <img
                    src={caseItem.image}
                    alt={caseItem.title}
                    className="w-full h-full object-cover grayscale contrast-125 transition-transform duration-700 ease-out group-hover:scale-105 opacity-70"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-[#0A0A0A]/40 transition-all duration-700 group-hover:bg-[#E11D2A]/20" />

                  <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-[#0A0A0A]/80 backdrop-blur-md font-mono text-[10px] tracking-[0.15em] uppercase text-white/90">
                    {caseItem.category}
                  </div>

                  <div className="absolute top-4 right-4 z-10 px-3 py-1 rounded-full bg-[#E11D2A] text-white font-mono text-[10px] tracking-[0.15em] uppercase font-semibold">
                    COMING SOON
                  </div>

                  <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent flex flex-col justify-end">
                    <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-white/50 mb-1">
                      {caseItem.client}
                    </span>
                    <h3 className="font-serif text-2xl md:text-3xl text-white">
                      {caseItem.title}
                    </h3>
                    <p className="font-sans text-sm text-white/70 font-light mt-2">
                      {caseItem.subtitle}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};
