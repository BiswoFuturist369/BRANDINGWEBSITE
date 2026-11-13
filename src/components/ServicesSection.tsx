import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SERVICES_DATA, ServiceItem } from '../data/services';

export const ServicesSection: React.FC = () => {
  const [hoveredService, setHoveredService] = useState<ServiceItem | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <section
      id="services"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full py-24 md:py-36 px-6 md:px-12 bg-[#FFFFFF] text-[#0A0A0A] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Floating Preview Image Following Cursor */}
        <AnimatePresence>
          {hoveredService && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{
                opacity: 1,
                scale: 1,
                x: mousePos.x + 24,
                y: mousePos.y - 100,
              }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{
                type: 'spring',
                stiffness: 350,
                damping: 30,
                mass: 0.35,
              }}
              className="pointer-events-none absolute top-0 left-0 z-40 hidden md:block w-72 h-44 rounded-[14px] overflow-hidden shadow-2xl border border-[#0A0A0A]/10 bg-[#0A0A0A]"
            >
              <img
                src={hoveredService.previewImage}
                alt={hoveredService.name}
                className="w-full h-full object-cover grayscale contrast-125"
              />
              <div className="absolute inset-0 bg-[#E11D2A]/15 mix-blend-multiply" />
              <div className="absolute bottom-3 left-3 bg-[#0A0A0A]/90 px-3 py-1 rounded text-[10px] font-mono tracking-[0.14em] text-white uppercase backdrop-blur-sm">
                {hoveredService.name}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Section Eyebrow — Increased font size */}
        <div className="mb-6">
          <span className="font-mono text-[14px] sm:text-[15px] md:text-[16px] uppercase tracking-[0.22em] text-[#E11D2A] font-bold">
            SERVICES & EXPERTISE
          </span>
        </div>

        {/* Basic Display Heading H2 */}
        <div className="max-w-5xl mb-16 md:mb-24">
          <h2 className="font-display text-[42px] md:text-[64px] lg:text-[78px] leading-[1.03] tracking-[-0.015em] text-[#0A0A0A] font-normal">
            Eight ways we help brands{' '}
            <span className="italic text-[#E11D2A]">find and command</span>{' '}
            their unique premium.
          </h2>
        </div>

        {/* 8 Hairline-Separated Service Rows */}
        <div className="border-b border-[#0A0A0A]/12">
          {SERVICES_DATA.map((service) => (
            <div
              key={service.id}
              onMouseEnter={() => setHoveredService(service)}
              onMouseLeave={() => setHoveredService(null)}
              className="group relative border-t border-[#0A0A0A]/12 py-8 md:py-10 transition-colors duration-300 hover:bg-[#F6F6F4]/50 cursor-pointer"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-baseline transition-transform duration-300 group-hover:translate-x-3">
                {/* Number + Red Dot on Hover */}
                <div className="md:col-span-2 flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#E11D2A] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="font-mono text-[12px] uppercase tracking-[0.18em] text-[#0A0A0A]/50 group-hover:text-[#E11D2A] transition-colors">
                    {service.number}
                  </span>
                </div>

                {/* Service Name & "Led by" */}
                <div className="md:col-span-6">
                  <h3 className="font-serif text-[28px] md:text-[34px] lg:text-[38px] leading-[1.1] text-[#0A0A0A] group-hover:text-[#E11D2A] transition-colors">
                    {service.name}
                  </h3>
                  <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#E11D2A] mt-2">
                    Led by {service.ledBy}
                  </div>
                </div>

                {/* Short line right: Tagline */}
                <div className="md:col-span-4 flex items-center">
                  <p className="font-sans text-[15px] leading-[1.6] text-[#0A0A0A]/70 font-light">
                    {service.tagline}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
