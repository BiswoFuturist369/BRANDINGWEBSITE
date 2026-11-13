import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { EmployeesBackgroundPaths } from '../components/ui/background-paths';
import { FocusCarousel } from '../components/ui/focus-carousel';
import { EMPLOYEES_DATA } from '../data/team';

export const EmployeesPage: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-[#0A0A0A] text-[#FFFFFF] selection:bg-[#E11D2A] selection:text-white overflow-x-clip">
      {/* Complementary Animated Vector Flow & 360 Orbital Paths Backdrop */}
      <EmployeesBackgroundPaths />

      {/* Header */}
      <Header />

      <main className="relative z-10 pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Top Breadcrumbs */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-12">
            <Link
              to="/founder"
              className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-white/75 hover:text-[#E11D2A] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Founder Profile</span>
            </Link>

            <Link
              to="/"
              className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/50 hover:text-white transition-colors"
            >
              Return to Studio
            </Link>
          </div>

          {/* Basic Display Section Heading (No Halftone) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mb-10 md:mb-12"
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#E11D2A] font-semibold block mb-4">
              THE SPECIALISTS · SENIOR EXECUTION TEAM
            </span>

            <h1 className="font-display text-[clamp(32px,5.5vw,76px)] leading-[1.02] tracking-[-0.015em] text-white font-normal max-w-4xl">
              Specialists, <span className="italic text-[#E11D2A]">not generalists.</span>
            </h1>

            <div className="mt-6 flex flex-col md:flex-row md:items-end justify-between gap-4 pt-6 border-t border-white/10">
              <div>
                <p className="font-serif text-[22px] md:text-[26px] text-white/90 italic leading-snug">
                  Every frame, brought into focus.
                </p>
                <p className="font-sans text-[15px] text-white/60 font-light mt-1">
                  Each specialist moves smoothly across the curved stage — flattening into crisp detail at centre focus.
                </p>
              </div>
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/50">
                04 SENIOR LEADS · HOVER CARD TO PAUSE
              </span>
            </div>
          </motion.div>
        </div>

        {/* Full-Width 3D Curved Horizontal Focus Carousel */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.85, delay: 0.15 }}
          className="w-full py-4"
        >
          <FocusCarousel employees={EMPLOYEES_DATA} />
        </motion.div>

        {/* Bottom Action Row */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 mt-16 pt-12 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#E11D2A] mb-1">
              WORK WITH THE TEAM
            </div>
            <p className="font-serif text-[24px] md:text-[28px] text-white leading-tight">
              Five specialists aligned under one accountable contact.
            </p>
          </div>

          <Link
            to="/#contact"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#E11D2A] hover:bg-white text-white hover:text-[#0A0A0A] font-mono text-[11px] uppercase tracking-[0.18em] font-medium transition-all duration-300 shadow-xl flex-shrink-0"
          >
            <span>Start a Project</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default EmployeesPage;

