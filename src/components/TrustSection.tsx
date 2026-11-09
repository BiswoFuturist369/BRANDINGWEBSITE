import React from 'react';

interface TrustPillar {
  number: string;
  title: string;
  description: string;
}

const PILLARS: TrustPillar[] = [
  {
    number: '01',
    title: 'Experienced people',
    description: '3 to 8+ years of hands-on experience across corporate, high-growth, and technical disciplines.',
  },
  {
    number: '02',
    title: 'Specialists, not generalists',
    description: 'Marketing, finance, ecommerce and AI each handled by someone who works in that area every single day.',
  },
  {
    number: '03',
    title: 'Founder-led',
    description: 'Personal accountability from the CEO on every strategic deliverable and client partnership.',
  },
  {
    number: '04',
    title: 'Clear communication',
    description: 'Regular updates, honest reporting, and zero agency jargon or opaque metrics.',
  },
  {
    number: '05',
    title: 'Strategy first',
    description: 'We plan before we spend, and we rigorously measure what we execute against commercial milestones.',
  },
  {
    number: '06',
    title: 'Flexible and remote',
    description: 'Nimble, remote-first execution without bloated agency retainers or administrative overhead.',
  },
];

export const TrustSection: React.FC = () => {
  return (
    <section
      id="trust"
      className="relative w-full py-28 md:py-36 px-6 md:px-12 bg-[#0A0A0A] text-[#FFFFFF] border-t border-white/10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Eyebrow */}
        <div className="mb-6">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#E11D2A] font-semibold">
            OUR FOUNDATION
          </span>
        </div>

        {/* Section Title */}
        <div className="max-w-4xl mb-16 md:mb-20">
          <h2 className="font-serif text-[38px] md:text-[52px] lg:text-[60px] leading-[1.08] text-white">
            Built on transparency, senior craft, and{' '}
            <span className="italic text-[#E11D2A]">real accountability.</span>
          </h2>
        </div>

        {/* 2x3 Grid Hairline Separated */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-white/10">
          {PILLARS.map((pillar) => (
            <div
              key={pillar.number}
              className="p-8 md:p-10 border-r border-b border-white/10 flex flex-col justify-between group hover:bg-[#111111] transition-colors duration-300"
            >
              <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#E11D2A] mb-8">
                {pillar.number}
              </div>

              <div>
                <h3 className="font-serif text-[24px] md:text-[28px] leading-[1.15] text-white mb-3 group-hover:text-[#E11D2A] transition-colors">
                  {pillar.title}
                </h3>
                <p className="font-sans text-[15px] leading-[1.65] text-white/70 font-light">
                  {pillar.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

