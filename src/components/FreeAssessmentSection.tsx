import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, CheckCircle2, ArrowRight, X, Mail } from 'lucide-react';

export const FreeAssessmentSection: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    website: '',
    stage: 'Growing SME ($250k - $1M)',
    bottleneck: 'Brand Positioning & Demand Generation',
    notes: '',
  });

  const handleOutlookSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    const subject = encodeURIComponent(`Free 360° Assessment Request: ${formData.company || formData.name}`);
    const body = encodeURIComponent(
      `Hello URBrand 360 Team,\n\nI would like to book a Free 360° Strategic Assessment for my business.\n\n` +
      `---------------------------------------\n` +
      `• Founder/Leader: ${formData.name}\n` +
      `• Work Email: ${formData.email}\n` +
      `• Company / Brand: ${formData.company}\n` +
      `• Website / Store: ${formData.website || 'Not specified'}\n` +
      `• Current Stage: ${formData.stage}\n` +
      `• Primary Growth Bottleneck: ${formData.bottleneck}\n` +
      `• Additional Notes: ${formData.notes || 'None'}\n` +
      `---------------------------------------\n\n` +
      `Please confirm an Outlook calendar invite for our strategy session.\n\nBest regards,\n${formData.name}`
    );

    // Open Microsoft Outlook client / mailto handler
    window.location.href = `mailto:vaishnavi@urbrand360.com?subject=${subject}&body=${body}`;
  };

  return (
    <>
      <section className="relative w-full max-w-full py-16 md:py-24 px-4 sm:px-6 md:px-12 bg-[#0A0A0A] text-white overflow-hidden border-t border-b border-white/10">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="rounded-[24px] sm:rounded-[28px] p-6 sm:p-10 md:p-16 bg-gradient-to-br from-[#161616] via-[#111111] to-[#1a0a0c] border border-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.8)] relative overflow-hidden flex flex-col lg:flex-row lg:items-center justify-between gap-8 lg:gap-10">
            {/* Subtle Crimson Glow */}
            <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-[#E11D2A]/15 blur-3xl pointer-events-none" />

            <div className="max-w-2xl">
              <span className="font-mono text-[11px] sm:text-[12px] uppercase tracking-[0.2em] text-[#FF3B47] font-bold block mb-3">
                FREE 360° STRATEGIC ASSESSMENT
              </span>

              <h2 className="font-serif text-[28px] sm:text-[40px] md:text-[52px] leading-[1.08] text-white mb-4">
                Discover your brand’s next tier of leverage.
              </h2>

              <p className="font-sans text-[15px] sm:text-[16px] md:text-[18px] leading-[1.65] text-white/85 font-normal">
                Receive an objective diagnostic across your positioning, commercial funnels,
                and international compliance with actionable recommendations directly from our specialists.
              </p>
            </div>

            <div className="flex-shrink-0 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="font-mono text-[11px] sm:text-[12px] uppercase tracking-[0.16em] sm:tracking-[0.2em] px-5 sm:px-8 py-3.5 sm:py-4 rounded-full bg-[#E11D2A] text-white hover:bg-white hover:text-[#0A0A0A] transition-all duration-300 font-bold shadow-[0_0_30px_rgba(225,29,42,0.4)] flex items-center justify-center gap-2.5 sm:gap-3 cursor-pointer"
              >
                <Calendar className="w-4 h-4 flex-shrink-0" />
                <span>BOOK A FREE ASSESSMENT</span>
              </button>

              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="font-mono text-[11px] sm:text-[12px] uppercase tracking-[0.16em] sm:tracking-[0.18em] px-5 sm:px-6 py-3.5 sm:py-4 rounded-full border border-white/20 text-white hover:bg-white/10 transition-colors flex items-center justify-center gap-2 cursor-pointer font-semibold"
              >
                <Mail className="w-4 h-4 text-[#FF3B47] flex-shrink-0" />
                <span>Outlook Form</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Assessment Modal with Outlook Form Integration */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99999] bg-black/85 backdrop-blur-md p-4 sm:p-6 md:p-10 flex items-center justify-center overflow-y-auto"
            onClick={() => setModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl bg-[#141414] border border-white/15 rounded-[20px] sm:rounded-[24px] p-6 sm:p-10 md:p-12 shadow-2xl text-white max-h-[90svh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-[#E11D2A] transition-colors text-white cursor-pointer"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>

              {submitted ? (
                <div className="py-12 text-center flex flex-col items-center justify-center">
                  <CheckCircle2 className="w-16 h-16 text-[#E11D2A] mb-4" />
                  <h3 className="font-serif text-[34px] text-white mb-3">Outlook Request Prepared</h3>
                  <p className="font-sans text-white/75 max-w-md mb-8">
                    Your assessment brief has been formatted. If your Microsoft Outlook client did not open automatically, you can send your brief to <strong className="text-white">vaishnavi@urbrand360.com</strong>.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setModalOpen(false);
                    }}
                    className="font-mono text-[11px] uppercase tracking-[0.18em] px-8 py-3 rounded-full bg-white text-black font-semibold"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#E11D2A] font-bold">
                      MICROSOFT OUTLOOK INTEGRATION
                    </span>
                  </div>

                  <h3 className="font-serif text-[30px] sm:text-[36px] text-white mb-2 leading-tight">
                    Book a Free 360° Assessment
                  </h3>

                  <p className="font-sans text-[15px] text-white/70 font-light mb-8">
                    Complete this brief and submit directly to our partners via Microsoft Outlook.
                  </p>

                  <form onSubmit={handleOutlookSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="assessment-name" className="block font-mono text-[11px] uppercase tracking-[0.16em] text-white/85 font-semibold mb-1.5">
                          Your Name *
                        </label>
                        <input
                          id="assessment-name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Jane Doe"
                          className="w-full bg-[#1c1c1c] border border-white/20 rounded-[10px] px-4 py-3 text-white placeholder-white/40 text-sm focus:outline-none focus:border-[#FF3B47]"
                        />
                      </div>

                      <div>
                        <label htmlFor="assessment-email" className="block font-mono text-[11px] uppercase tracking-[0.16em] text-white/85 font-semibold mb-1.5">
                          Work Email *
                        </label>
                        <input
                          id="assessment-email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="jane@company.com"
                          className="w-full bg-[#1c1c1c] border border-white/20 rounded-[10px] px-4 py-3 text-white placeholder-white/40 text-sm focus:outline-none focus:border-[#FF3B47]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="assessment-company" className="block font-mono text-[11px] uppercase tracking-[0.16em] text-white/85 font-semibold mb-1.5">
                          Company / Venture *
                        </label>
                        <input
                          id="assessment-company"
                          name="company"
                          type="text"
                          required
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          placeholder="Acme Corp"
                          className="w-full bg-[#1c1c1c] border border-white/20 rounded-[10px] px-4 py-3 text-white placeholder-white/40 text-sm focus:outline-none focus:border-[#FF3B47]"
                        />
                      </div>

                      <div>
                        <label htmlFor="assessment-website" className="block font-mono text-[11px] uppercase tracking-[0.16em] text-white/85 font-semibold mb-1.5">
                          Website or Store Link
                        </label>
                        <input
                          id="assessment-website"
                          name="website"
                          type="text"
                          value={formData.website}
                          onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                          placeholder="https://acme.com"
                          className="w-full bg-[#1c1c1c] border border-white/20 rounded-[10px] px-4 py-3 text-white placeholder-white/40 text-sm focus:outline-none focus:border-[#FF3B47]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="assessment-stage" className="block font-mono text-[11px] uppercase tracking-[0.16em] text-white/85 font-semibold mb-1.5">
                          Current Stage
                        </label>
                        <select
                          id="assessment-stage"
                          name="stage"
                          aria-label="Current Stage"
                          value={formData.stage}
                          onChange={(e) => setFormData({ ...formData, stage: e.target.value })}
                          className="w-full bg-[#1c1c1c] border border-white/20 rounded-[10px] px-4 py-3 text-white text-sm focus:outline-none focus:border-[#FF3B47]"
                        >
                          <option value="Early-Stage Startup (< $100k)">Early-Stage Startup (&lt; $100k)</option>
                          <option value="Growing SME ($100k - $500k)">Growing SME ($100k - $500k)</option>
                          <option value="Scaling Brand ($500k - $2M)">Scaling Brand ($500k - $2M)</option>
                          <option value="Mature Enterprise ($2M - $10M+)">Mature Enterprise ($2M - $10M+)</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor="assessment-bottleneck" className="block font-mono text-[11px] uppercase tracking-[0.16em] text-white/85 font-semibold mb-1.5">
                          Primary Growth Bottleneck
                        </label>
                        <select
                          id="assessment-bottleneck"
                          name="bottleneck"
                          aria-label="Primary Growth Bottleneck"
                          value={formData.bottleneck}
                          onChange={(e) => setFormData({ ...formData, bottleneck: e.target.value })}
                          className="w-full bg-[#1c1c1c] border border-white/20 rounded-[10px] px-4 py-3 text-white text-sm focus:outline-none focus:border-[#FF3B47]"
                        >
                          <option value="Brand Positioning & Market Authority">Brand Positioning &amp; Authority</option>
                          <option value="Paid Media Scaling & CAC Inefficiency">Paid Media Scaling &amp; CAC</option>
                          <option value="Cross-Border Tax & Compliance Audit">Cross-Border Tax &amp; Compliance</option>
                          <option value="AI Workflows & Strategic Bottlenecks">AI Workflows &amp; Strategy</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block font-mono text-[11px] uppercase tracking-[0.16em] text-white/70 mb-1.5">
                        Specific Questions or Context
                      </label>
                      <textarea
                        rows={3}
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        placeholder="Tell us what you want to achieve or any immediate challenges..."
                        className="w-full bg-[#1c1c1c] border border-white/15 rounded-[10px] px-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#E11D2A]"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full font-mono text-[12px] uppercase tracking-[0.2em] py-4 rounded-[12px] bg-[#E11D2A] text-white hover:bg-white hover:text-black transition-all duration-300 font-bold flex items-center justify-center gap-2 cursor-pointer mt-4 shadow-lg"
                    >
                      <span>SUBMIT ASSESSMENT VIA OUTLOOK</span>
                      <ArrowRight size={16} />
                    </button>
                  </form>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
