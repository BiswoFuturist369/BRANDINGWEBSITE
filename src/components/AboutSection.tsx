import React from 'react';
import { motion } from 'framer-motion';
import { Target, Compass } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section
      id="about-urbrand"
      className="relative w-full max-w-full py-16 sm:py-24 md:py-36 px-4 sm:px-6 md:px-12 bg-[#FFFFFF] text-[#0A0A0A] border-b border-[#0A0A0A]/12 overflow-hidden"
    >
      {/* 3D Background Decorative Grid & Orbital Arc */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#E11D2A]/[0.03] blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-[#0A0A0A]/[0.02] blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Eyebrow */}
        <div className="mb-4">
          <span className="font-mono text-[14px] sm:text-[15px] md:text-[16px] uppercase tracking-[0.22em] text-[#C71723] font-bold">
            ABOUT URBRAND 360
          </span>
        </div>

        {/* Large Prominent Display Headline: WHY CHOOSE URBRAND 360 */}
        <div className="max-w-5xl mb-6">
          <h2 className="font-display text-[clamp(36px,5.8vw,80px)] leading-[1.0] tracking-[-0.02em] text-[#0A0A0A] font-normal uppercase max-w-full">
            WHY CHOOSE <span className="italic text-[#C71723]">URBRAND 360</span>
          </h2>
        </div>

        {/* Core Subtitle / Value Statement */}
        <div className="max-w-5xl mb-12 md:mb-16">
          <p className="font-serif italic text-[24px] sm:text-[28px] md:text-[34px] leading-[1.18] text-[#0A0A0A]/85">
            Building Better Businesses Through Strategy, Innovation &amp; Collaboration.
          </p>
        </div>

        {/* Two-Column Core Story */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start mb-16 pb-16 border-b border-[#0A0A0A]/10">
          <div className="lg:col-span-6 space-y-6">
            <p className="font-serif italic text-[22px] sm:text-[26px] md:text-[28px] leading-[1.25] text-[#0A0A0A]">
              At URBrand 360, we believe every business has the potential to achieve more with the right strategy, structure and support.
            </p>
            <p className="font-sans text-[16px] md:text-[17px] leading-[1.7] text-[#0A0A0A]/75 font-light">
              We work with SMEs, entrepreneurs and growing businesses to identify challenges,
              strengthen brand positioning, improve strategic efficiency and unlock new growth opportunities.
            </p>
          </div>

          <div className="lg:col-span-6 space-y-6 font-sans text-[16px] md:text-[17px] leading-[1.7] text-[#0A0A0A]/75 font-light">
            <p>
              Our integrated approach brings together business consulting, branding, performance
              marketing, strategy and automation to help businesses move from fragmented processes to structured growth.
            </p>
            <p className="p-5 rounded-[16px] bg-[#F6F6F4] border-l-4 border-[#E11D2A] text-[#0A0A0A] font-medium text-[15px] md:text-[16px] leading-[1.6]">
              “We don’t believe in one-size-fits-all solutions. We believe in understanding your business
              first, identifying what matters most and developing strategies aligned with your goals.”
            </p>
          </div>
        </div>

        {/* Mission & Vision: 3D Floating Perspective Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Mission Card */}
          <motion.div
            whileHover={{ y: -6, rotateX: 2, rotateY: -2 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-[24px] p-8 md:p-12 bg-[#0A0A0A] text-white shadow-2xl border border-white/10 relative overflow-hidden flex flex-col justify-between"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-[#E11D2A]/10 blur-2xl pointer-events-none" />

            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-[#E11D2A] text-white flex items-center justify-center">
                  <Target className="w-5 h-5" />
                </div>
                <span className="font-mono text-[12px] uppercase tracking-[0.2em] text-[#FF3B47] font-bold">
                  OUR MISSION
                </span>
              </div>

              <h3 className="font-serif text-[28px] md:text-[34px] leading-[1.15] text-white mb-4">
                Clarity, Capabilities &amp; Connections
              </h3>

              <p className="font-sans text-[16px] md:text-[17px] leading-[1.65] text-white/90 font-light">
                To empower businesses with the clarity, capabilities and connections they need to build stronger brands and sustainable, compounding growth.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-white/15 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.16em] text-white/80">
              <span>FOUNDER-FIRST COMMITMENT</span>
              <span className="text-[#FF3B47] font-semibold">360° IMPACT</span>
            </div>
          </motion.div>

          {/* Vision Card */}
          <motion.div
            whileHover={{ y: -6, rotateX: 2, rotateY: 2 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-[24px] p-8 md:p-12 bg-[#F6F6F4] text-[#0A0A0A] shadow-xl border border-[#0A0A0A]/10 relative overflow-hidden flex flex-col justify-between"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-[#E11D2A]/5 blur-2xl pointer-events-none" />

            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-[#0A0A0A] text-white flex items-center justify-center">
                  <Compass className="w-5 h-5 text-[#FF3B47]" />
                </div>
                <span className="font-mono text-[12px] uppercase tracking-[0.2em] text-[#0A0A0A] font-bold">
                  OUR VISION
                </span>
              </div>

              <h3 className="font-serif text-[28px] md:text-[34px] leading-[1.15] text-[#0A0A0A] mb-4">
                Trusted Global Growth Partner
              </h3>

              <p className="font-sans text-[16px] md:text-[17px] leading-[1.65] text-[#0A0A0A]/85 font-normal">
                To become a trusted global growth partner for businesses seeking meaningful transformation, operational excellence and long-term commercial success.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-[#0A0A0A]/12 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.16em] text-[#0A0A0A]/85 font-semibold">
              <span>WORLDWIDE REACH</span>
              <span className="text-[#C71723] font-bold">LONG-TERM SUCCESS</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
