import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, BookOpen, Clock, X, CheckCircle } from 'lucide-react';

interface Article {
  id: string;
  category: string;
  readTime: string;
  title: string;
  subtitle: string;
  excerpt: string;
  date: string;
  content: {
    sectionTitle: string;
    paragraphs: string[];
    takeaway: string;
  }[];
}

const ARTICLES_DATA: Article[] = [
  {
    id: 'brand-architecture',
    category: 'BRAND STRATEGY',
    readTime: '5 MIN READ',
    date: 'NOVEMBER 2026',
    title: 'The Architecture of Modern Brand Equity',
    subtitle: 'Why visual identity without commercial positioning fails to command a market premium.',
    excerpt:
      'A logo does not create authority. We examine how category-defining brands construct verbal, visual, and commercial narratives that insulate them from commoditization.',
    content: [
      {
        sectionTitle: 'Beyond the Aesthetic Layer',
        paragraphs: [
          'Too many founders treat branding as a graphic design exercise. While typographic craft and color discipline matter, real brand equity is built on clear differentiation and undeniable positioning.',
          'When every competitor speaks in generic platitudes, clarity of voice becomes your most defensible asset. Strategy defines the perimeter; design creates the memory.',
        ],
        takeaway: 'Brand equity is the commercial moat that turns discovery into pricing power.',
      },
      {
        sectionTitle: 'The 360° Alignment Rule',
        paragraphs: [
          'If your marketing makes promises that your delivery cannot fulfill, no amount of advertising spend can prevent customer churn.',
          'Aligning brand messaging with sales conversations, checkout UX, and post-purchase touchpoints creates compounding trust.',
        ],
        takeaway: 'Consistency across every customer touchpoint builds valuation faster than ad spend.',
      },
    ],
  },
  {
    id: 'd2c-unit-economics',
    category: 'GROWTH & COMMERCE',
    readTime: '7 MIN READ',
    date: 'NOVEMBER 2026',
    title: 'Unit Economics of Sustainable Ecommerce Scale',
    subtitle: 'Navigating ad inflation, prepaid order conversions, and marketplace algorithms.',
    excerpt:
      'Growing revenue is easy; growing profitably is an engineering discipline. A deep dive into contribution margins, retention funnels, and multi-channel marketplace leverage.',
    content: [
      {
        sectionTitle: 'The Trap of Blended ROAS',
        paragraphs: [
          'Relying solely on top-line platform ROAS blinds founders to rising return rates, inventory carrying costs, and payment gateway drop-offs.',
          'We advocate for strict contribution margin tracking on every campaign tier, separating new customer acquisition CAC from blended retention metrics.',
        ],
        takeaway: 'Scale what leaves cash in the bank, not what merely looks good in ad manager dashboards.',
      },
      {
        sectionTitle: 'Prepaid Velocity & Checkout CRO',
        paragraphs: [
          'In modern commerce, friction at checkout directly erodes margins. Structuring automated incentives for prepaid orders cuts fulfillment risk and accelerates working capital velocity.',
        ],
        takeaway: 'A 4% bump in checkout completion out-indexes a 20% increase in ad spend.',
      },
    ],
  },
  {
    id: 'cross-border-tax',
    category: 'FINANCIAL COMPLIANCE',
    readTime: '6 MIN READ',
    date: 'NOVEMBER 2026',
    title: 'Cross-Border Corporate Taxation for Global Founders',
    subtitle: 'Structuring multi-market compliance without bureaucratic friction.',
    excerpt:
      'International revenue brings complex regulatory obligations. Insights from a Chartered Accountant on entity structuring, transfer pricing, and maintaining audit readiness worldwide.',
    content: [
      {
        sectionTitle: 'Avoiding Multi-Jurisdiction Double Taxation',
        paragraphs: [
          'As modern startups invoice clients globally across North America, Europe, the Middle East, and Asia, understanding bilateral tax treaties and permanent establishment thresholds is critical.',
          'Having a dedicated Chartered Accountant structure cross-border transaction flows ensures compliance while protecting retained profits.',
        ],
        takeaway: 'Proactive tax structuring protects capital before international revenue expands.',
      },
    ],
  },
  {
    id: 'ai-automation',
    category: 'AI & AUTOMATION',
    readTime: '4 MIN READ',
    date: 'NOVEMBER 2026',
    title: 'The Autonomous Back Office: AI & API Workflows',
    subtitle: 'How agile founder teams move like companies ten times their size.',
    excerpt:
      'Connecting LLMs, computer vision, and API pipelines into intelligent digital machinery that eliminates repetitive manual tasks and frees leadership for strategic growth.',
    content: [
      {
        sectionTitle: 'High-Impact Automation Use Cases',
        paragraphs: [
          'From automated lead enrichment and CRM handoffs to instant contract parsing and real-time inventory reconciliations, custom automations save high-growth teams 20+ hours per week.',
          'The goal is not replacing human creativity, but removing friction so specialist talent focuses strictly on high-leverage commercial moves.',
        ],
        takeaway: 'Automate the routine so your team can focus exclusively on strategic craft.',
      },
    ],
  },
];

export const ArticlesSection: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  return (
    <section
      id="results"
      className="relative w-full max-w-full py-24 md:py-36 bg-[#0A0A0A] text-[#FFFFFF] border-t border-white/10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        {/* Top Header */}
        <div className="mb-14 md:mb-20">
          <div className="mb-6">
            <span className="font-mono text-[14px] sm:text-[15px] md:text-[16px] uppercase tracking-[0.22em] text-[#FF3B47] font-bold">
              STRATEGIC PERSPECTIVES · ARTICLES &amp; INSIGHTS
            </span>
          </div>

          <div className="max-w-5xl mb-6">
            <h2 className="font-display text-[clamp(30px,4.5vw,66px)] leading-[1.03] tracking-[-0.015em] text-white font-normal max-w-full">
              Thinking that drives{' '}
              <span className="italic text-[#FF3B47]">market conviction.</span>
            </h2>
          </div>

          <p className="font-sans text-[17px] md:text-[19px] leading-[1.65] text-white/85 font-light max-w-3xl">
            In-depth strategic briefs authored by our domain specialists on brand architecture,
            commercial growth, international compliance, and AI workflows.
          </p>
        </div>

        {/* Editorial Articles Grid (2x2) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {ARTICLES_DATA.map((article) => (
            <motion.div
              key={article.id}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => setSelectedArticle(article)}
              className="group cursor-pointer rounded-[20px] p-6 sm:p-8 md:p-10 bg-[#121212] border border-white/10 hover:border-[#FF3B47]/60 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Meta Header */}
                <div className="flex items-center justify-between gap-4 mb-6">
                  <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#FF3B47] font-bold">
                    {article.category}
                  </span>
                  <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-white/80 font-medium">
                    <Clock size={12} />
                    <span>{article.readTime}</span>
                  </div>
                </div>

                {/* Article Headline */}
                <h3 className="font-serif text-[26px] md:text-[32px] leading-[1.12] text-white group-hover:text-white transition-colors mb-4">
                  {article.title}
                </h3>

                <p className="font-sans text-[15px] leading-[1.6] text-white/85 font-light mb-6">
                  {article.excerpt}
                </p>
              </div>

              {/* Bottom Card Footer */}
              <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/80 font-medium">
                  {article.date}
                </span>

                <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-white group-hover:text-[#FF3B47] transition-colors font-semibold">
                  <span>Read Article</span>
                  <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Article Detail Reader Modal */}
      <AnimatePresence>
        {selectedArticle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-md p-4 sm:p-6 md:p-12 flex items-center justify-center overflow-y-auto"
            onClick={() => setSelectedArticle(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl bg-[#141414] border border-white/15 rounded-[20px] sm:rounded-[24px] p-6 sm:p-10 md:p-14 shadow-2xl max-h-[88svh] overflow-y-auto text-white"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedArticle(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-[#E11D2A] transition-colors text-white cursor-pointer focus:outline-none"
                aria-label="Close article"
              >
                <X size={20} />
              </button>

              {/* Modal Category & Time */}
              <div className="flex items-center gap-4 mb-4">
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#E11D2A] font-bold">
                  {selectedArticle.category}
                </span>
                <span className="text-white/30">·</span>
                <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/50">
                  {selectedArticle.readTime}
                </span>
              </div>

              {/* Title & Subtitle */}
              <h2 className="font-serif text-[32px] sm:text-[40px] leading-[1.08] text-white mb-4">
                {selectedArticle.title}
              </h2>
              <p className="font-sans text-[17px] leading-[1.6] text-white/75 font-light mb-8 pb-6 border-b border-white/10 italic">
                {selectedArticle.subtitle}
              </p>

              {/* Body Content */}
              <div className="space-y-8 font-sans text-[16px] leading-[1.7] text-white/80 font-light">
                {selectedArticle.content.map((sec, idx) => (
                  <div key={idx} className="space-y-4">
                    <h3 className="font-serif text-[24px] text-white mb-2">
                      {sec.sectionTitle}
                    </h3>
                    {sec.paragraphs.map((para, pIdx) => (
                      <p key={pIdx}>{para}</p>
                    ))}
                    <div className="p-4 rounded-[12px] bg-white/[0.04] border-l-2 border-[#E11D2A] text-sm text-white/90">
                      <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#E11D2A] block mb-1 font-bold">
                        KEY TAKEAWAY
                      </span>
                      {sec.takeaway}
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer CTA */}
              <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/50">
                  URBrand 360 Research &amp; Advisory
                </span>
                <a
                  href="#contact"
                  onClick={() => setSelectedArticle(null)}
                  className="font-mono text-[11px] uppercase tracking-[0.18em] px-6 py-2.5 rounded-full bg-[#E11D2A] text-white hover:bg-white hover:text-black transition-colors"
                >
                  Discuss with our strategists →
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
