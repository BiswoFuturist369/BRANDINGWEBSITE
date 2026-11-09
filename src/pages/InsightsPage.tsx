import React, { useState } from 'react';
import { PageTransition } from '../components/PageTransition';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { INSIGHTS_DATA, InsightArticle } from '../data/insights';
import { ArrowRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const InsightsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeArticle, setActiveArticle] = useState<InsightArticle | null>(null);

  const categories = ['All', 'Strategy', 'Branding', 'Automation', 'Taxation'];

  const filteredArticles = selectedCategory === 'All'
    ? INSIGHTS_DATA
    : INSIGHTS_DATA.filter((a) => a.category === selectedCategory);

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#0A0A0A] text-white">
        <Header />

        {/* Hero */}
        <section className="pt-40 pb-20 px-6 md:px-14 lg:px-20 max-w-7xl mx-auto border-b border-white/10">
          <div className="max-w-4xl">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#E11D2A] font-semibold block mb-4">
              THOUGHT LEADERSHIP & RESEARCH
            </span>
            <h1 className="font-display text-[44px] md:text-[68px] leading-[1.02] text-white">
              Perspectives on brand, scale, and <span className="italic text-[#E11D2A]">market sovereignty.</span>
            </h1>
            <p className="font-sans text-[17px] leading-[1.65] text-white/70 mt-6 max-w-3xl font-light">
              In-depth strategic analyses, market observations, and architectural essays from our leadership in Indore, India, working with brands worldwide.
            </p>
          </div>
        </section>

        {/* Category Filter & List */}
        <section className="py-20 md:py-28 px-6 md:px-14 lg:px-20 max-w-7xl mx-auto">
          {/* Categories */}
          <div className="flex flex-wrap items-center gap-3 mb-16 border-b border-white/10 pb-6">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/40 mr-4 font-normal">
              Filter by Topic:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-full font-mono text-[11px] uppercase tracking-[0.14em] font-medium transition-all duration-300 focus:outline-none ${
                  selectedCategory === cat
                    ? 'bg-white text-black font-semibold'
                    : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Editorial Articles List */}
          <div className="space-y-12">
            {filteredArticles.map((article) => (
              <article
                key={article.id}
                onClick={() => setActiveArticle(article)}
                className="group border-b border-white/10 pb-12 cursor-pointer transition-colors duration-300"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* Metadata */}
                  <div className="lg:col-span-3 space-y-2">
                    <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#E11D2A] font-semibold block">
                      {article.category}
                    </span>
                    <span className="font-mono text-[11px] text-white/50 block font-light">
                      {article.date} · {article.readTime}
                    </span>
                    <p className="font-sans text-xs text-white/70 font-light pt-2">
                      By <span className="text-white font-medium">{article.author}</span> ({article.authorRole})
                    </p>
                  </div>

                  {/* Title & Excerpt */}
                  <div className="lg:col-span-7 space-y-4">
                    <h2 className="font-serif text-3xl md:text-4xl text-white group-hover:text-[#E11D2A] transition-colors duration-300">
                      {article.title}
                    </h2>
                    <p className="font-sans text-sm font-light text-white/70 leading-relaxed max-w-2xl">
                      {article.excerpt}
                    </p>
                  </div>

                  {/* Action arrow */}
                  <div className="lg:col-span-2 flex lg:justify-end items-center pt-2">
                    <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-white/70 group-hover:text-[#E11D2A] transition-colors">
                      <span>Read Essay</span>
                      <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Modal for Article Reading */}
        <AnimatePresence>
          {activeArticle && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[9999] bg-black/85 backdrop-blur-md flex items-center justify-center p-6"
            >
              <div className="relative w-full max-w-3xl bg-[#121212] border border-white/15 rounded-[16px] p-8 md:p-12 text-white max-h-[90vh] overflow-y-auto">
                <button
                  type="button"
                  onClick={() => setActiveArticle(null)}
                  className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-[#E11D2A] text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="space-y-6">
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#E11D2A] block">
                    {activeArticle.category} · {activeArticle.readTime}
                  </span>
                  <h1 className="font-serif text-3xl sm:text-5xl leading-tight">
                    {activeArticle.title}
                  </h1>

                  <div className="flex items-center gap-3 pt-2 pb-6 border-b border-white/10 text-xs font-mono text-white/50">
                    <span>{activeArticle.author}</span>
                    <span>·</span>
                    <span>{activeArticle.authorRole}</span>
                    <span>·</span>
                    <span>{activeArticle.date}</span>
                  </div>

                  <div className="space-y-4 font-sans text-base text-white/80 font-light leading-relaxed">
                    {activeArticle.content.map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <Footer />
      </div>
    </PageTransition>
  );
};
export default InsightsPage;
