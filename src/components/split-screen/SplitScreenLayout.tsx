import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AboutPanelContent } from './AboutPanelContent';
import { WorkPanelContent } from './WorkPanelContent';
import { Header } from '../Header';
import { ArrowRight } from 'lucide-react';

interface SplitScreenLayoutProps {
  initialPanel?: 'about' | 'work';
}

export const SplitScreenLayout: React.FC<SplitScreenLayoutProps> = ({ initialPanel }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;

  const activePanel: 'about' | 'work' = pathname === '/work' ? 'work' : 'about';

  const [isStripHovered, setIsStripHovered] = useState(false);
  const [isReadyToAnimateText, setIsReadyToAnimateText] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const aboutScrollRef = useRef<HTMLDivElement>(null);
  const workScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReadyToAnimateText(true);
    }, 600);
    return () => clearTimeout(timer);
  }, [activePanel]);

  const handleAboutClick = () => {
    if (activePanel === 'about') return;
    navigate('/about');
  };

  const handleWorkClick = () => {
    if (activePanel === 'work') return;
    navigate('/work');
  };

  const desktopWidths = {
    about: activePanel === 'about'
      ? (isStripHovered ? '89%' : '92%')
      : (isStripHovered ? '11%' : '8%'),
    work: activePanel === 'work'
      ? (isStripHovered ? '89%' : '92%')
      : (isStripHovered ? '11%' : '8%'),
  };

  const mobileHeights = {
    about: activePanel === 'about' ? '88%' : '12%',
    work: activePanel === 'work' ? '88%' : '12%',
  };

  const luxuryTransition = {
    duration: 0.95,
    ease: [0.76, 0, 0.24, 1] as [number, number, number, number],
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#0A0A0A]">
      {/* Header Overlay with compact morphing logo */}
      <Header isPanelExpanded={true} />

      <div className="w-full h-full flex flex-col md:flex-row relative">
        {/* ============================================================== */}
        {/* LEFT / TOP PANEL: ABOUT (Red #E11D2A) */}
        {/* ============================================================== */}
        <motion.div
          animate={
            isMobile
              ? { height: mobileHeights.about, width: '100%' }
              : { width: desktopWidths.about, height: '100%' }
          }
          transition={luxuryTransition}
          onMouseEnter={() => {
            if (activePanel === 'work' && !isMobile) setIsStripHovered(true);
          }}
          onMouseLeave={() => {
            if (activePanel === 'work' && !isMobile) setIsStripHovered(false);
          }}
          onClick={() => {
            if (activePanel === 'work') handleAboutClick();
          }}
          className={`relative bg-[#E11D2A] z-10 flex flex-col overflow-hidden select-none ${
            activePanel === 'work' ? 'cursor-pointer hover:brightness-110' : ''
          }`}
          style={{ willChange: 'width, height' }}
        >
          {activePanel === 'work' ? (
            /* Compressed Thin Strip Mode (When Work is Active) */
            <div className="w-full h-full flex items-center justify-center p-2 text-white relative">
              <div className="transform -rotate-90 whitespace-nowrap flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                <span className="text-xs uppercase tracking-[0.25em] font-medium text-white">
                  About
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-white transform rotate-180" />
              </div>
              <div className="absolute inset-0 bg-black/20 hover:bg-transparent transition-colors" />
            </div>
          ) : (
            /* Fully Expanded Scrollable About Content */
            <div
              ref={aboutScrollRef}
              className="w-full h-full overflow-y-auto overflow-x-hidden scroll-smooth select-text"
            >
              <AboutPanelContent isReadyToAnimateText={isReadyToAnimateText} />
            </div>
          )}
        </motion.div>

        {/* ============================================================== */}
        {/* RIGHT / BOTTOM PANEL: WORK (B&W Photo + Dark Overlay) */}
        {/* ============================================================== */}
        <motion.div
          animate={
            isMobile
              ? { height: mobileHeights.work, width: '100%' }
              : { width: desktopWidths.work, height: '100%' }
          }
          transition={luxuryTransition}
          onMouseEnter={() => {
            if (activePanel === 'about' && !isMobile) setIsStripHovered(true);
          }}
          onMouseLeave={() => {
            if (activePanel === 'about' && !isMobile) setIsStripHovered(false);
          }}
          onClick={() => {
            if (activePanel === 'about') handleWorkClick();
          }}
          className={`relative bg-[#0A0A0A] z-10 flex flex-col overflow-hidden select-none ${
            activePanel === 'about' ? 'cursor-pointer hover:brightness-125' : ''
          }`}
          style={{ willChange: 'width, height' }}
        >
          {activePanel === 'about' ? (
            /* Compressed Thin Strip Mode (When About is Active) */
            <div className="w-full h-full flex items-center justify-center p-2 text-white relative bg-[#0A0A0A] border-l border-white/10">
              <div className="transform -rotate-90 whitespace-nowrap flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E11D2A] animate-pulse" />
                <span className="text-xs uppercase tracking-[0.25em] font-medium text-white">
                  Work
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-white" />
              </div>
              <div className="absolute inset-0 bg-white/5 hover:bg-white/15 transition-colors" />
            </div>
          ) : (
            /* Fully Expanded Scrollable Work Content */
            <div
              ref={workScrollRef}
              className="w-full h-full overflow-y-auto overflow-x-hidden scroll-smooth select-text"
            >
              <WorkPanelContent isReadyToAnimateText={isReadyToAnimateText} />
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

