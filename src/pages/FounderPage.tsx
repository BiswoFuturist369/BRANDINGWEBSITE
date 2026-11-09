import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { BackgroundPaths } from '../components/ui/background-paths';
import { FOUNDER_DATA } from '../data/team';

export const FounderPage: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-[#0A0A0A] text-[#FFFFFF] selection:bg-[#E11D2A] selection:text-white overflow-x-clip">
      {/* Animated Sweeping Background Paths */}
      <BackgroundPaths />

      {/* Header Navigation */}
      <Header />

      {/* Main Content */}
      <main className="relative z-10 pt-32 pb-24 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          {/* Top Breadcrumb Back Link */}
          <div className="mb-12">
            <Link
              to="/"
              className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-white/60 hover:text-[#E11D2A] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Studio</span>
            </Link>
          </div>

          {/* Basic Section Eyebrow & Display Title (No Halftone) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mb-16 md:mb-20"
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#E11D2A] font-semibold block mb-4">
              COMPANY LEADERSHIP · FOUNDER & CEO
            </span>
            <h1 className="font-display text-[44px] md:text-[72px] lg:text-[84px] leading-[1.02] tracking-[-0.01em] text-white font-normal">
              Led by a founder who is{' '}
              <span className="italic text-[#E11D2A]">personally accountable.</span>
            </h1>
          </motion.div>

          {/* Founder Profile Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-20">
            {/* Left Column: Portrait Card */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 flex flex-col items-center lg:items-start bg-[#111111]/80 backdrop-blur-md border border-white/10 rounded-[20px] p-8 md:p-10"
            >
              <div className="relative w-56 h-56 md:w-72 md:h-72 rounded-full p-2 ring-2 ring-[#E11D2A] mb-8 overflow-hidden bg-black">
                <img
                  src={FOUNDER_DATA.image}
                  alt={`${FOUNDER_DATA.name}, Founder & CEO`}
                  className="w-full h-full object-cover rounded-full grayscale contrast-110"
                />
              </div>

              <div className="text-center lg:text-left w-full">
                <h2 className="font-serif text-[34px] md:text-[42px] leading-[1.08] text-white">
                  {FOUNDER_DATA.name}
                </h2>
                <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#E11D2A] mt-2 font-medium">
                  {FOUNDER_DATA.role}
                </div>
                <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/50 mt-4 pt-4 border-t border-white/10">
                  {FOUNDER_DATA.location}
                </div>
              </div>
            </motion.div>

            {/* Right Column: Quote, Bio & Principles */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7 flex flex-col gap-10"
            >
              {/* Pull-quote block with red left bar */}
              <blockquote className="border-l-4 border-[#E11D2A] pl-6 md:pl-8 py-2 bg-white/[0.02] rounded-r-[12px] pr-6">
                <p className="font-serif text-[24px] md:text-[32px] leading-[1.2] text-white/95">
                  “{FOUNDER_DATA.quote}”
                </p>
              </blockquote>

              {/* Full Founder Biography */}
              <div className="flex flex-col gap-5 text-white/80 font-sans text-[17px] leading-[1.65] font-light">
                {FOUNDER_DATA.bios.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>

              {/* Three Leadership Focus Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-white/10">
                {FOUNDER_DATA.principles.map((item) => (
                  <div
                    key={item.label}
                    className="p-5 rounded-[14px] bg-[#121212]/90 border border-white/10"
                  >
                    <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#E11D2A] mb-2">
                      {item.label}
                    </div>
                    <p className="font-sans text-[13px] leading-[1.55] text-white/70 font-light">
                      {item.detail}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Next Page CTA Button to Employees & Specialists Page */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="pt-12 border-t border-white/10 flex flex-col items-center text-center"
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/50 mb-6">
              NEXT · THE TEAM BEHIND URBRAND 360
            </span>

            <Link
              to="/employees"
              className="group relative inline-flex flex-col sm:flex-row items-center gap-5 px-8 md:px-12 py-6 md:py-7 rounded-full bg-[#0A0A0A] border border-white/25 hover:border-[#E11D2A] hover:bg-[#141414] transition-all duration-300 shadow-2xl"
            >
              <div className="text-center sm:text-left">
                <span className="block font-mono text-[10px] uppercase tracking-[0.18em] text-[#E11D2A] mb-1">
                  04 SPECIALISTS · PHOTOS & PROFILES
                </span>
                <span className="font-serif text-[26px] md:text-[32px] leading-none text-white group-hover:text-white">
                  Explore the team and their expertise
                </span>
              </div>

              <span className="w-12 h-12 rounded-full bg-[#E11D2A] text-white flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:translate-x-1.5 group-hover:scale-105">
                <ArrowRight className="w-5 h-5" />
              </span>
            </Link>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FounderPage;
