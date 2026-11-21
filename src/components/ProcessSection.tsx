import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

const STEPS: ProcessStep[] = [
  {
    number: '01',
    title: 'Discovery & Strategic Diagnosis',
    description: 'We learn your business, goals and challenges through structured commercial discovery.',
  },
  {
    number: '02',
    title: 'Integrated Strategy & Roadmap',
    description: 'A clear plan, scope and timeline for your approval, aligning brand and revenue funnels.',
  },
  {
    number: '03',
    title: 'Precision Execution',
    description: 'The right specialists get to work across strategy, finance and automation, with one contact for you.',
  },
  {
    number: '04',
    title: 'Reporting & Review Loops',
    description: 'Regular results reviews, milestone tracking and continuous data-driven optimization.',
  },
];

export const ProcessSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      stepRefs.current.forEach((el, index) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        // Step is considered active if near vertical center of viewport
        if (rect.top <= window.innerHeight * 0.55 && rect.bottom >= window.innerHeight * 0.25) {
          setActiveStep(index);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const circumference = 2 * Math.PI * 90;
  const activeLength = ((activeStep + 1) / 4) * circumference;

  return (
    <section
      ref={sectionRef}
      id="process"
      className="relative w-full max-w-full py-20 md:py-36 px-4 sm:px-6 md:px-12 bg-[#FFFFFF] text-[#0A0A0A] border-b border-[#0A0A0A]/12 overflow-x-clip"
    >
      <div className="max-w-7xl mx-auto">
        {/* Eyebrow — Increased font size */}
        <div className="mb-6">
          <span className="font-mono text-[14px] sm:text-[15px] md:text-[16px] uppercase tracking-[0.22em] text-[#C71723] font-bold">
            HOW WE WORK
          </span>
        </div>

        {/* Basic Display Heading H2 (Fluids Clamped) */}
        <div className="max-w-5xl mb-16 md:mb-24">
          <h2 className="font-display text-[clamp(30px,4.5vw,66px)] leading-[1.03] tracking-[-0.015em] text-[#0A0A0A] font-normal max-w-full">
            Strategy first. <span className="italic text-[#C71723]">Craft always.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left: Sticky 3D Rotating 360° Ring System */}
          <div className="lg:col-span-5 lg:sticky lg:top-36 flex flex-col items-center justify-center py-4 sm:py-8">
            <div
              className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-88 md:h-88 flex items-center justify-center select-none"
              style={{ perspective: 1200 }}
            >
              {/* 3D Gyroscope Container */}
              <div
                className="relative w-full h-full flex items-center justify-center"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* 3D Ring 1: Outer Horizontal Tilted Ring Rotating on Z */}
                <motion.div
                  animate={{ rotateZ: 360 }}
                  transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-2 rounded-full border border-[#0A0A0A]/15 pointer-events-none"
                  style={{
                    transform: 'rotateX(68deg) rotateY(12deg)',
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {/* Orbiting Beacon Dot */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#E11D2A] shadow-[0_0_12px_rgba(225,29,42,0.8)]" />
                </motion.div>

                {/* 3D Ring 2: Diagonal Polar Ring Rotating in Opposite Phase */}
                <motion.div
                  animate={{ rotateZ: -360 }}
                  transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-5 rounded-full border border-dashed border-[#0A0A0A]/20 pointer-events-none"
                  style={{
                    transform: 'rotateY(64deg) rotateX(15deg)',
                    transformStyle: 'preserve-3d',
                  }}
                >
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#0A0A0A]" />
                </motion.div>

                {/* 3D Ring 3: Center Front-Facing Quadrant Progress Arc */}
                <motion.div
                  animate={{
                    rotateZ: [0, 4, -4, 0],
                  }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                  className="relative w-56 h-56 md:w-64 md:h-64 flex items-center justify-center"
                  style={{
                    transform: 'translateZ(15px)',
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {/* SVG Quadrant Ring */}
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 220 220">
                    {/* Background Ring Track */}
                    <circle
                      cx="110"
                      cy="110"
                      r="90"
                      fill="none"
                      stroke="rgba(10, 10, 10, 0.08)"
                      strokeWidth="7"
                    />

                    {/* 4 Quadrant Divider Marks */}
                    {[0, 90, 180, 270].map((angle) => (
                      <line
                        key={angle}
                        x1="110"
                        y1="14"
                        x2="110"
                        y2="26"
                        stroke="rgba(10, 10, 10, 0.25)"
                        strokeWidth="2"
                        transform={`rotate(${angle} 110 110)`}
                      />
                    ))}

                    {/* Active Quadrant Progress Arc */}
                    <circle
                      cx="110"
                      cy="110"
                      r="90"
                      fill="none"
                      stroke="#E11D2A"
                      strokeWidth="8"
                      strokeDasharray={circumference}
                      strokeDashoffset={circumference - activeLength}
                      strokeLinecap="round"
                      className="transition-all duration-700 ease-out"
                    />
                  </svg>

                  {/* Center Floating 3D Text: 360° */}
                  <motion.div
                    animate={{
                      y: [-3, 3, -3],
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute inset-0 flex flex-col items-center justify-center select-none pointer-events-none"
                    style={{ transform: 'translateZ(35px)' }}
                  >
                    <span className="font-display text-[46px] md:text-[54px] leading-none text-[#0A0A0A] drop-shadow-sm">
                      360°
                    </span>
                    <span className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-[#C71723] font-bold mt-1.5">
                      QUADRANT {activeStep + 1} / 4
                    </span>
                    <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-[#0A0A0A]/85 font-semibold mt-0.5">
                      STRATEGIC ORBIT
                    </span>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Right: 4 Sequential Steps (All steps maintain compliant >= 4.5:1 contrast) */}
          <div className="lg:col-span-7 flex flex-col gap-16 md:gap-24 py-4">
            {STEPS.map((step, index) => {
              const isActive = index <= activeStep;
              return (
                <div
                  key={step.number}
                  ref={(el) => (stepRefs.current[index] = el)}
                  className={`border-l-2 pl-8 transition-all duration-500 ${
                    isActive
                      ? 'border-[#C71723]'
                      : 'border-[#0A0A0A]/20'
                  }`}
                >
                  <div className="font-mono text-[12px] uppercase tracking-[0.18em] text-[#C71723] mb-2 font-bold">
                    PHASE {step.number}
                  </div>
                  <h3 className="font-serif text-[32px] md:text-[40px] leading-[1.1] text-[#0A0A0A] mb-4">
                    {step.title}
                  </h3>
                  <p className="font-sans text-[17px] leading-[1.65] text-[#0A0A0A]/85 max-w-[50ch] font-normal">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
