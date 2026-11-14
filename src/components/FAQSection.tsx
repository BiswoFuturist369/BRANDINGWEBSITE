import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: 'How does URBrand 360 differ from traditional marketing agencies?',
    answer:
      'Unlike traditional agencies that isolate creative, performance ads, and back-office finance into separate silos or hand work off to junior account managers, URBrand 360 provides an integrated 360° pod. Your brand identity, commercial sales funnels, CA-led international taxation, and custom AI automations are executed under one senior point of contact, ensuring true strategic cohesion.',
  },
  {
    question: 'What types of businesses do you work with?',
    answer:
      'We partner with ambitious SMEs, entrepreneurs, D2C brands, and growing enterprises worldwide who are looking to move from fragmented processes to structured, compounding growth. Whether preparing for market entry, scaling ad spend profitably, or restructuring financial compliance, we tailor our approach to your specific stage.',
  },
  {
    question: 'Can we engage URBrand 360 for specific disciplines, or only full packages?',
    answer:
      'Both. While our integrated model unlocks maximum leverage, we regularly execute focused sprints—such as comprehensive brand repositioning, paid media ROAS acceleration, cross-border corporate taxation audits, or custom AI operational workflows.',
  },
  {
    question: 'How is international and cross-border taxation handled?',
    answer:
      'All financial and tax compliance is managed directly by a qualified Chartered Accountant with 6+ years of international corporate experience. We handle multi-jurisdictional compliance, transfer pricing, bilateral tax treaties, and regulatory filings to ensure your profits and cross-border expansion remain secure and audit-ready.',
  },
  {
    question: 'What does fractional executive leadership look like?',
    answer:
      'Fractional leadership gives your company executive-level CMO and commercial direction without the multi-month search, high full-time executive salary, or equity dilution. Our leaders plug directly into your leadership cadence to build your go-to-market roadmaps, audit agency spend, and guide internal teams.',
  },
  {
    question: 'How quickly can we kick off a project?',
    answer:
      'Following an initial discovery conversation and strategy alignment, onboarding begins within 48 to 72 hours. We establish clear milestone deliverables, weekly progress reviews, and direct communication channels so you always know exactly where your business stands.',
  },
];

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      className="relative w-full max-w-full py-24 md:py-36 px-4 sm:px-6 md:px-12 bg-[#FFFFFF] text-[#0A0A0A] border-t border-[#0A0A0A]/12 overflow-hidden"
    >
      <div className="max-w-5xl mx-auto">
        {/* Eyebrow */}
        <div className="mb-6">
          <span className="font-mono text-[14px] sm:text-[15px] md:text-[16px] uppercase tracking-[0.22em] text-[#E11D2A] font-bold">
            FREQUENTLY ASKED QUESTIONS
          </span>
        </div>

        {/* Section Heading */}
        <div className="mb-14 md:mb-20">
          <h2 className="font-display text-[clamp(30px,4.5vw,66px)] leading-[1.03] tracking-[-0.015em] text-[#0A0A0A] font-normal max-w-full">
            Answers to help you{' '}
            <span className="italic text-[#E11D2A]">move with certainty.</span>
          </h2>
          <p className="font-sans text-[17px] md:text-[19px] leading-[1.65] text-[#0A0A0A]/70 font-light mt-4">
            Everything you need to know about our partnership structure, execution cadence, and global capabilities.
          </p>
        </div>

        {/* Accordion List */}
        <div className="border-t border-[#0A0A0A]/12 divide-y divide-[#0A0A0A]/12">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={index} className="py-6 md:py-8 transition-colors">
                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-start justify-between gap-6 text-left cursor-pointer focus:outline-none group"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif text-[22px] sm:text-[26px] md:text-[28px] leading-[1.2] text-[#0A0A0A] group-hover:text-[#E11D2A] transition-colors">
                    {faq.question}
                  </span>
                  <div
                    className={`flex-shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 mt-1 ${
                      isOpen
                        ? 'border-[#E11D2A] bg-[#E11D2A] text-white'
                        : 'border-[#0A0A0A]/20 text-[#0A0A0A] group-hover:border-[#E11D2A]'
                    }`}
                  >
                    {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="font-sans text-[16px] md:text-[17px] leading-[1.7] text-[#0A0A0A]/75 font-light pt-5 pr-8 max-w-4xl">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
