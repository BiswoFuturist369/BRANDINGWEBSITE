import React from 'react';
import { motion } from 'framer-motion';
import { AboutAccordion } from './AboutAccordion';
import { OFFICES_DATA } from '../../data/offices';
import { Footer } from '../Footer';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface AboutPanelContentProps {
  isReadyToAnimateText?: boolean;
}

export const AboutPanelContent: React.FC<AboutPanelContentProps> = ({
  isReadyToAnimateText = true,
}) => {
  return (
    <div className="w-full relative min-h-screen text-white select-text">
      {/* SECTION A: Hero (Red Background #E11D2A) */}
      <section className="relative min-h-[85vh] flex flex-col justify-between pt-36 pb-20 px-6 md:px-14 lg:px-20 bg-[#E11D2A] text-white overflow-hidden">
        {/* Subtle geometric line art background */}
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <svg className="w-full h-full" viewBox="0 0 1000 1000" fill="none">
            <circle cx="500" cy="500" r="450" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="6 6" />
            <circle cx="500" cy="500" r="300" stroke="#FFFFFF" strokeWidth="1" />
            <path d="M 50 500 H 950 M 500 50 V 950" stroke="#FFFFFF" strokeWidth="0.5" />
          </svg>
        </div>

        <div className="relative z-10 max-w-5xl">
          {/* Label */}
          <div className="overflow-hidden mb-6">
            <motion.div
              initial={{ y: 24, opacity: 0 }}
              animate={isReadyToAnimateText ? { y: 0, opacity: 1 } : { y: 24, opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
              className="flex items-center gap-3"
            >
              <span className="w-2 h-2 rounded-full bg-white" />
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] font-normal text-white/90">
                About URBrand 360 · Global Advisory
              </span>
            </motion.div>
          </div>

          {/* Masked Headline Reveal */}
          <div className="space-y-1 mb-8 overflow-hidden">
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: '100%' }}
                animate={isReadyToAnimateText ? { y: 0 } : { y: '100%' }}
                transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
                className="font-serif text-[clamp(2.75rem,7vw,7rem)] font-light leading-[1.02] tracking-tight text-white"
              >
                Where vision
              </motion.h1>
            </div>
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: '100%' }}
                animate={isReadyToAnimateText ? { y: 0 } : { y: '100%' }}
                transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1], delay: 0.18 }}
                className="font-serif text-[clamp(2.75rem,7vw,7rem)] font-light leading-[1.02] tracking-tight text-white"
              >
                meets strategy.
              </motion.h1>
            </div>
          </div>

          {/* Body Paragraph */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isReadyToAnimateText ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.45 }}
            className="max-w-2xl"
          >
            <p className="font-sans text-xl md:text-2xl font-light leading-relaxed text-white/95">
              URBrand 360 is a creative brand and business consultancy. We help ambitious companies worldwide build brands, sharpen strategy, automate operations and grow, with one partner that sees the full 360°.
            </p>
          </motion.div>
        </div>

        {/* Bottom indicator */}
        <div className="relative z-10 pt-12 flex items-center justify-between border-t border-white/20 font-mono text-[11px] uppercase tracking-[0.18em] font-light text-white/80">
          <span>Indore, India · Working worldwide</span>
          <div className="flex items-center gap-2">
            <span>Core Practice</span>
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          </div>
        </div>
      </section>

      {/* SECTION B: White Curtain slides up over red ("Our core solutions") */}
      <section className="relative z-20 bg-white text-[#0A0A0A] py-24 md:py-32 px-6 md:px-14 lg:px-20 shadow-[0_-20px_50px_rgba(0,0,0,0.15)]">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16 md:mb-20">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#E11D2A] font-semibold block mb-3">
              COMPREHENSIVE CAPABILITIES
            </span>
            <h2 className="font-serif text-[38px] md:text-[52px] text-[#0A0A0A]">
              Our core solutions
            </h2>
            <p className="font-sans text-lg md:text-xl font-light text-[#0A0A0A]/70 mt-4 max-w-2xl leading-relaxed">
              Eight synchronized disciplines engineered to elevate market authority, operational velocity, and fiscal resilience.
            </p>
          </div>

          <AboutAccordion />
        </div>
      </section>

      {/* SECTION C: "Our studio" */}
      <section className="relative z-20 bg-[#F6F6F4] text-[#0A0A0A] py-24 md:py-32 px-6 md:px-14 lg:px-20 border-t border-black/10">
        <div className="max-w-6xl mx-auto">
          <div className="mb-14 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#E11D2A] font-semibold block mb-3">
                STUDIO PRESENCE
              </span>
              <h2 className="font-serif text-[38px] md:text-[52px] text-[#0A0A0A]">
                Headquarters
              </h2>
            </div>
            <p className="font-sans text-sm font-light text-[#0A0A0A]/70 max-w-md">
              A remote-first team of specialists, based in Indore, India, working with brands worldwide without the overhead of a traditional agency.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
            {OFFICES_DATA.map((office) => (
              <div
                key={office.id}
                className="group relative rounded-[16px] overflow-hidden bg-black text-white border border-black/10 shadow-xl"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-black">
                  <img
                    src={office.image}
                    alt={`${office.city} Studio`}
                    className="w-full h-full object-cover grayscale contrast-125 transition-all duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-[#0A0A0A]/40 transition-all duration-700 group-hover:bg-[#E11D2A]/25" />

                  <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/70 to-transparent flex flex-col justify-end">
                    <span className="font-mono text-[11px] tracking-[0.18em] uppercase font-light text-[#E11D2A] group-hover:text-white transition-colors">
                      {office.country}
                    </span>
                    <h3 className="font-serif text-4xl sm:text-5xl text-white mt-1">
                      {office.city}
                    </h3>
                  </div>
                </div>

                <div className="p-6 md:p-8 bg-[#0A0A0A] border-t border-white/10 space-y-3">
                  <p className="font-sans text-sm font-light text-white/90">{office.address}</p>
                  <p className="font-mono text-xs font-light text-white/50">{office.district} · {office.postal}</p>
                  <div className="pt-2 flex justify-between items-center font-mono text-xs tracking-wider uppercase font-light text-white/60">
                    <span>{office.timezone}</span>
                    <Link to="/contact" className="text-[#E11D2A] hover:underline flex items-center gap-1">
                      <span>Get in Touch</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION D: Founder Vaishnavi Ahuja Feature Section */}
      <section className="relative z-20 bg-[#0A0A0A] text-white py-28 md:py-36 px-6 md:px-14 lg:px-20 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="mb-14">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#E11D2A] font-semibold block mb-3">
              LEADERSHIP & ACCOUNTABILITY
            </span>
            <h2 className="font-serif text-[38px] md:text-[52px] text-white">
              Founder & CEO
            </h2>
          </div>

          <div className="rounded-[16px] border border-white/15 bg-white/[0.02] p-8 md:p-14 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="w-64 h-64 md:w-72 md:h-72 rounded-full p-2 ring-2 ring-[#E11D2A] overflow-hidden">
                <img
                  src="/team/founder-vaishnavi-ahuja.jpg"
                  alt="Vaishnavi Ahuja, Founder & CEO"
                  className="w-full h-full object-cover rounded-full grayscale contrast-115 hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#E11D2A] font-normal block mb-1">
                  FOUNDER & CEO, URBRAND 360
                </span>
                <h3 className="font-serif text-3xl md:text-5xl text-white">
                  Vaishnavi Ahuja
                </h3>
                <span className="font-mono text-xs uppercase tracking-widest text-white/50 font-light block mt-1">
                  Indore, India · Working worldwide
                </span>
              </div>

              <div className="pl-6 border-l-2 border-[#E11D2A]">
                <blockquote className="font-serif text-xl md:text-2xl font-light text-white italic leading-relaxed">
                  “Our promise to you: a dedicated team, a clear plan, honest reporting and a founder who is personally accountable for the quality of our work.”
                </blockquote>
              </div>

              <p className="font-sans text-white/70 font-light text-base leading-relaxed">
                Vaishnavi brings around 4 years of diverse corporate experience across several fast-paced industries, including serving as Vice President of a fractional marketing company. Combining entrepreneurial vision with cross-industry experience, she brings a strategic, results-driven perspective to brand growth, operational leadership and market positioning.
              </p>

              <div className="pt-2">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-white hover:text-[#E11D2A] transition-colors py-2 border-b border-white/30 hover:border-[#E11D2A]"
                >
                  <span>Request Leadership Consultation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION E: Footer */}
      <Footer />
    </div>
  );
};
