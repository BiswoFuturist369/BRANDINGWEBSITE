import React, { useEffect, useRef, useState } from 'react';

interface CounterProps {
  end: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  trigger: boolean;
}

const Counter: React.FC<CounterProps> = ({
  end,
  prefix = '',
  suffix = '',
  duration = 1800,
  trigger,
}) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!trigger) return;
    let startTimestamp: number | null = null;
    let frameId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(eased * end));

      if (progress < 1) {
        frameId = requestAnimationFrame(step);
      } else {
        setValue(end);
      }
    };

    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [trigger, end, duration]);

  return (
    <span>
      {prefix}
      {value}
      {suffix}
    </span>
  );
};

export const StatementStats: React.FC = () => {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="statement"
      className="relative w-full bg-[#FFFFFF] text-[#0A0A0A] py-24 md:py-32 px-6 md:px-12 border-b border-[#0A0A0A]/12"
    >
      <div className="max-w-7xl mx-auto">
        {/* Eyebrow — Increased font size */}
        <div className="mb-6">
          <span className="font-mono text-[14px] sm:text-[15px] md:text-[16px] uppercase tracking-[0.22em] text-[#E11D2A] font-bold">
            THE STATEMENT
          </span>
        </div>

        {/* Clean Display Heading H2 (Halftone animation removed entirely) */}
        <div className="max-w-5xl mb-8">
          <h2 className="font-display text-[44px] md:text-[68px] lg:text-[88px] leading-[1.04] text-[#0A0A0A] font-normal tracking-[-0.015em]">
            Rewrite the way the world <span className="italic text-[#E11D2A]">sees you.</span>
          </h2>
        </div>

        {/* Short Statement Paragraph */}
        <div className="max-w-3xl mb-20">
          <p className="font-sans text-[18px] md:text-[20px] leading-[1.65] text-[#0A0A0A]/72 font-light">
            We are a startup, and we are open about that: the energy and personal attention
            of a new company, backed by specialists with years of experience in corporate roles,
            performance marketing, finance and technology.
          </p>
        </div>

        {/* Real Stats Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 pt-12 border-t border-[#0A0A0A]/12">
          {/* Stat 1 */}
          <div className="flex flex-col">
            <div className="font-display text-[56px] md:text-[76px] lg:text-[88px] leading-none text-[#0A0A0A] mb-3">
              <Counter end={5} trigger={inView} />
            </div>
            <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#0A0A0A]/60">
              SPECIALISTS ON YOUR PROJECT
            </div>
          </div>

          {/* Stat 2 */}
          <div className="flex flex-col">
            <div className="font-display text-[56px] md:text-[76px] lg:text-[88px] leading-none text-[#0A0A0A] mb-3">
              {inView ? (
                <span>
                  3–<Counter end={8} trigger={inView} />+
                </span>
              ) : (
                '3–8+'
              )}
            </div>
            <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#0A0A0A]/60">
              YEARS OF EXPERIENCE PER EXPERT
            </div>
          </div>

          {/* Stat 3 */}
          <div className="flex flex-col">
            <div className="font-display text-[56px] md:text-[76px] lg:text-[88px] leading-none text-[#0A0A0A] mb-3">
              <Counter end={100} suffix="%" trigger={inView} />
            </div>
            <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#0A0A0A]/60">
              REMOTE-FIRST, FLEXIBLE
            </div>
          </div>

          {/* Stat 4 */}
          <div className="flex flex-col">
            <div className="font-display text-[56px] md:text-[76px] lg:text-[88px] leading-none text-[#0A0A0A] mb-3">
              <Counter end={1} trigger={inView} />
            </div>
            <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#0A0A0A]/60">
              POINT OF CONTACT FOR YOU
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
