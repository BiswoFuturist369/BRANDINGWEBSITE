import React, { useState, useEffect, useRef } from 'react';

interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

const STEPS: ProcessStep[] = [
  {
    number: '01',
    title: 'Discovery call',
    description: 'We learn your business, goals and challenges.',
  },
  {
    number: '02',
    title: 'Strategy & proposal',
    description: 'A clear plan, scope and timeline for your approval.',
  },
  {
    number: '03',
    title: 'Execution',
    description: 'The right specialists get to work, one contact for you.',
  },
  {
    number: '04',
    title: 'Reporting & review',
    description: 'Regular results reviews and continuous improvement.',
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

  // Calculate arc strokeDashoffset for quadrant progress
  // Radius = 100, Circumference = 2 * PI * 100 = 628.32
  const circumference = 2 * Math.PI * 90;
  // Each quadrant is 25% = circumference * 0.25
  const activeLength = ((activeStep + 1) / 4) * circumference;

  return (
    <section
      ref={sectionRef}
      id="process"
      className="relative w-full py-24 md:py-36 px-6 md:px-12 bg-[#FFFFFF] text-[#0A0A0A] border-b border-[#0A0A0A]/12"
    >
      <div className="max-w-7xl mx-auto">
        {/* Eyebrow — Increased font size */}
        <div className="mb-6">
          <span className="font-mono text-[14px] sm:text-[15px] md:text-[16px] uppercase tracking-[0.22em] text-[#E11D2A] font-bold">
            HOW WE WORK
          </span>
        </div>

        {/* Basic Display Heading H2 */}
        <div className="max-w-5xl mb-16 md:mb-24">
          <h2 className="font-display text-[42px] md:text-[64px] lg:text-[78px] leading-[1.03] tracking-[-0.015em] text-[#0A0A0A] font-normal">
            Strategy first. <span className="italic text-[#E11D2A]">Craft always.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left: Sticky 360° Ring Quadrant Diagram */}
          <div className="lg:col-span-5 lg:sticky lg:top-36 flex flex-col items-center justify-center py-8">
            <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
              {/* SVG Quadrant Ring */}
              <svg className="w-full h-full -rotate-90" viewBox="0 0 220 220">
                {/* Background Ring Track */}
                <circle
                  cx="110"
                  cy="110"
                  r="90"
                  fill="none"
                  stroke="rgba(10, 10, 10, 0.08)"
                  strokeWidth="8"
                />

                {/* 4 Quadrant Divider Marks */}
                {[0, 90, 180, 270].map((angle) => (
                  <line
                    key={angle}
                    x1="110"
                    y1="14"
                    x2="110"
                    y2="26"
                    stroke="rgba(10, 10, 10, 0.2)"
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

              {/* Centre Text: 360° */}
              <div className="absolute inset-0 flex flex-col items-center justify-center select-none pointer-events-none">
                <span className="font-display text-[44px] md:text-[52px] leading-none text-[#0A0A0A]">
                  360°
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#0A0A0A]/50 mt-1">
                  QUADRANT {activeStep + 1} / 4
                </span>
              </div>
            </div>
          </div>

          {/* Right: 4 Sequential Steps */}
          <div className="lg:col-span-7 flex flex-col gap-16 md:gap-24 py-4">
            {STEPS.map((step, index) => {
              const isActive = index <= activeStep;
              return (
                <div
                  key={step.number}
                  ref={(el) => (stepRefs.current[index] = el)}
                  className={`border-l-2 pl-8 transition-all duration-500 ${
                    isActive
                      ? 'border-[#E11D2A] opacity-100'
                      : 'border-[#0A0A0A]/10 opacity-40'
                  }`}
                >
                  <div className="font-mono text-[12px] uppercase tracking-[0.18em] text-[#E11D2A] mb-2">
                    PHASE {step.number}
                  </div>
                  <h3 className="font-serif text-[32px] md:text-[40px] leading-[1.1] text-[#0A0A0A] mb-4">
                    {step.title}
                  </h3>
                  <p className="font-sans text-[17px] leading-[1.65] text-[#0A0A0A]/72 max-w-[50ch] font-light">
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

