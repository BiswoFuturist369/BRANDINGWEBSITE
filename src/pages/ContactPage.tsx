import React, { useState } from 'react';
import { PageTransition } from '../components/PageTransition';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { SERVICES_DATA } from '../data/services';
import { contactConfig } from '../config/contact';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    location: '',
    budget: '$10,000 - $25,000',
    message: '',
  });

  const [selectedServices, setSelectedServices] = useState<string[]>([SERVICES_DATA[0].name]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const budgetOptions = [
    'Under $10,000',
    '$10,000 - $25,000',
    '$25,000 - $50,000',
    '$50,000+',
    'Flexible / Advisory',
  ];

  const toggleService = (name: string) => {
    if (selectedServices.includes(name)) {
      if (selectedServices.length > 1) {
        setSelectedServices(selectedServices.filter((s) => s !== name));
      }
    } else {
      setSelectedServices([...selectedServices, name]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#0A0A0A] text-white">
        <Header />

        {/* Hero */}
        <section className="pt-40 pb-16 px-6 md:px-14 lg:px-20 max-w-7xl mx-auto border-b border-white/10">
          <div className="max-w-4xl">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#E11D2A] font-semibold block mb-4">
              DIRECT INQUIRIES · GLOBAL STUDIO
            </span>
            <h1 className="font-display text-[44px] md:text-[68px] leading-[1.02] text-white">
              Tell us where you're <span className="italic text-[#E11D2A]">headed.</span>
            </h1>
            <p className="font-sans text-[17px] leading-[1.65] text-white/70 mt-6 max-w-3xl font-light">
              We would be happy to start with a no-obligation conversation about your goals. Whether preparing for market expansion, restructuring corporate identity, or automating critical operations, let us examine your vision together.
            </p>
          </div>
        </section>

        {/* Form and Hub Details Section */}
        <section className="py-20 md:py-28 px-6 md:px-14 lg:px-20 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Form Column */}
            <div className="lg:col-span-8">
              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="p-10 md:p-16 rounded-[16px] border border-[#E11D2A] bg-white/[0.03] space-y-6 shadow-2xl"
                  >
                    <div className="w-14 h-14 rounded-full bg-[#E11D2A] flex items-center justify-center text-white">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#E11D2A] font-semibold block">
                      INQUIRY RECEIVED
                    </span>
                    <h2 className="font-serif text-[32px] md:text-[40px] text-white">
                      Thank you, {formData.name || 'Partner'}.
                    </h2>
                    <p className="font-sans text-[16px] font-light text-white/80 leading-relaxed max-w-xl">
                      Your brief has been delivered directly to the executive office of Vaishnavi Ahuja and our specialist leads. We will review your requirements and respond within one business day.
                    </p>
                    <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                      <span className="font-mono text-[11px] text-white/40">REF: URB-{Date.now().toString().slice(-6)}</span>
                      <button
                        type="button"
                        onClick={() => {
                          setIsSubmitted(false);
                          setFormData({ name: '', email: '', company: '', location: '', budget: '$10,000 - $25,000', message: '' });
                        }}
                        className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#E11D2A] hover:underline"
                      >
                        Send another inquiry
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Services Multi-Select */}
                    <div className="space-y-3">
                      <label className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/60 block">
                        Services of Interest
                      </label>
                      <div className="flex flex-wrap gap-2.5">
                        {SERVICES_DATA.map((service) => {
                          const isSelected = selectedServices.includes(service.name);
                          return (
                            <button
                              key={service.id}
                              type="button"
                              onClick={() => toggleService(service.name)}
                              className={`px-4 py-2 rounded-full font-mono text-[11px] uppercase tracking-[0.12em] transition-all duration-200 border ${
                                isSelected
                                  ? 'bg-[#E11D2A] border-[#E11D2A] text-white'
                                  : 'bg-[#181818] border-white/15 text-white/70 hover:border-white/30'
                              }`}
                            >
                              {service.name}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Inputs Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/60 block">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Jane Doe"
                          className="w-full bg-[#181818] border border-white/15 rounded-[8px] px-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#E11D2A] transition-colors"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/60 block">
                          Work Email *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="jane@organization.com"
                          className="w-full bg-[#181818] border border-white/15 rounded-[8px] px-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#E11D2A] transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/60 block">
                          Company / Venture
                        </label>
                        <input
                          type="text"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          placeholder="Acme Enterprises"
                          className="w-full bg-[#181818] border border-white/15 rounded-[8px] px-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#E11D2A] transition-colors"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/60 block">
                          Where are you based? *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.location}
                          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                          placeholder="e.g. India, Canada, Australia, Singapore, Worldwide..."
                          className="w-full bg-[#181818] border border-white/15 rounded-[8px] px-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#E11D2A] transition-colors"
                        />
                      </div>
                    </div>

                    {/* Budget Tier */}
                    <div className="space-y-2">
                      <label className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/60 block">
                        Estimated Budget Tier
                      </label>
                      <select
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full bg-[#181818] border border-white/15 rounded-[8px] px-4 py-3 text-white text-sm focus:outline-none focus:border-[#E11D2A] transition-colors"
                      >
                        {budgetOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Message Area */}
                    <div className="space-y-2">
                      <label className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/60 block">
                        Project Scope & Objectives *
                      </label>
                      <textarea
                        required
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell us about your venture, timeline, and what you aim to achieve..."
                        className="w-full bg-[#181818] border border-white/15 rounded-[8px] px-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#E11D2A] transition-colors resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 rounded-full bg-[#E11D2A] hover:bg-[#c91823] text-white font-mono text-[11px] uppercase tracking-[0.18em] font-medium transition-all duration-300 flex items-center justify-center gap-2 shadow-xl"
                    >
                      <span>{isSubmitting ? 'Routing Brief...' : 'START A PROJECT'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>
                )}
              </AnimatePresence>
            </div>

            {/* Hub Details Column (from contact.ts TODO placeholders) */}
            <div className="lg:col-span-4 space-y-12 border-t lg:border-t-0 lg:border-l border-white/10 pt-10 lg:pt-0 lg:pl-12">
              <div>
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#E11D2A] font-semibold block mb-3">
                  DIRECT CONTACT
                </span>
                <p className="font-sans text-[16px] text-white/90 font-light mb-1">{contactConfig.email}</p>
                <p className="font-sans text-[16px] text-white/90 font-light">{contactConfig.phone}</p>
                <p className="font-sans text-[16px] text-white/90 font-light">{contactConfig.whatsapp}</p>
              </div>

              <div>
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#E11D2A] font-semibold block mb-3">
                  HEADQUARTERS
                </span>
                <p className="font-sans text-[16px] text-white/90 font-light">{contactConfig.companyName}</p>
                <p className="font-sans text-[16px] text-white/70 font-light">{contactConfig.officeAddress.city}, {contactConfig.officeAddress.state}, {contactConfig.officeAddress.country}</p>
                <p className="font-mono text-[11px] text-white/50 tracking-[0.14em] mt-2">{contactConfig.reach}</p>
              </div>

              <div>
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#E11D2A] font-semibold block mb-3">
                  CONNECT
                </span>
                <div className="flex flex-col gap-2 font-mono text-[11px] text-white/60">
                  <span>LinkedIn · {contactConfig.social.linkedin}</span>
                  <span>Instagram · {contactConfig.social.instagram}</span>
                  <span>Twitter / X · {contactConfig.social.twitter}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </PageTransition>
  );
};
export default ContactPage;
