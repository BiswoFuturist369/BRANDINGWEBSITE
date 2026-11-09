import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SERVICES_DATA } from '../../data/services';

export const AboutAccordion: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(SERVICES_DATA[0].id);

  const toggleRow = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="w-full">
      {SERVICES_DATA.map((service) => {
        const isOpen = openId === service.id;

        return (
          <div
            key={service.id}
            className="border-b border-[#0A0A0A]/12 last:border-b-0 transition-colors duration-200"
          >
            <button
              type="button"
              onClick={() => toggleRow(service.id)}
              className="w-full py-6 md:py-8 flex items-center justify-between text-left group focus:outline-none"
              aria-expanded={isOpen}
            >
              <div className="flex items-center gap-6">
                <span className="font-mono text-xs text-[#E11D2A] font-semibold">
                  {service.number}
                </span>
                <span className="font-serif text-2xl sm:text-3xl text-[#0A0A0A] group-hover:text-[#E11D2A] transition-colors">
                  {service.name}
                </span>
              </div>

              <div
                className={`w-8 h-8 rounded-full border border-[#0A0A0A]/20 flex items-center justify-center transition-transform duration-300 ${
                  isOpen ? 'rotate-45 bg-[#E11D2A] border-[#E11D2A] text-white' : 'text-[#0A0A0A] group-hover:border-[#E11D2A]'
                }`}
              >
                <Plus className="w-4 h-4" />
              </div>
            </button>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="pb-8 pt-2 pl-12 pr-4 space-y-6">
                    <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#E11D2A]">
                      Led by {service.ledBy}
                    </div>

                    <p className="font-sans text-sm sm:text-base leading-relaxed text-[#0A0A0A]/75 max-w-2xl font-light">
                      {service.tagline}
                    </p>

                    <div>
                      <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#0A0A0A]/50 block mb-3 font-semibold">
                        Key Deliverables
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {service.deliverables.map((item, index) => (
                          <div key={index} className="flex items-center gap-2 text-xs text-[#0A0A0A]/85">
                            <span className="w-1 h-1 rounded-full bg-[#E11D2A]" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2">
                      <Link
                        to="/contact"
                        className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-[#0A0A0A] hover:text-[#E11D2A] transition-colors"
                      >
                        <span>Consult on this discipline</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};
