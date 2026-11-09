import React, { useState } from 'react';
import { contactConfig } from '../config/contact';
import { SERVICES_DATA } from '../data/services';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';

export const CTASection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    location: '',
    selectedServices: [] as string[],
    budget: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const toggleService = (name: string) => {
    setFormData((prev) => {
      const exists = prev.selectedServices.includes(name);
      return {
        ...prev,
        selectedServices: exists
          ? prev.selectedServices.filter((s) => s !== name)
          : [...prev.selectedServices, name],
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      id="contact"
      className="relative w-full py-28 md:py-40 px-6 md:px-12 bg-[#0A0A0A] text-[#FFFFFF] border-t border-white/10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Eyebrow */}
        <div className="mb-6">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#E11D2A] font-semibold">
            GET IN TOUCH
          </span>
        </div>

        {/* Basic Display Heading H2 */}
        <div className="max-w-5xl mb-6">
          <h2 className="font-display text-[42px] md:text-[64px] lg:text-[78px] leading-[1.03] tracking-[-0.015em] text-white font-normal">
            Let’s build something <span className="italic text-[#E11D2A]">great together.</span>
          </h2>
        </div>

        <p className="font-sans text-[18px] md:text-[20px] leading-[1.65] text-white/75 font-light max-w-2xl mb-16">
          We would be happy to start with a no-obligation conversation about your goals.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Direct Contact Info (Referencing contact.ts TODO placeholders) */}
          <div className="lg:col-span-4 flex flex-col gap-10">
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#E11D2A] mb-3">
                DIRECT INQUIRIES
              </div>
              <div className="font-sans text-[16px] text-white/90 font-light mb-1">
                {contactConfig.email}
              </div>
              <div className="font-mono text-[11px] text-white/50 tracking-[0.1em]">
                (Placeholder for official studio inbox)
              </div>
            </div>

            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#E11D2A] mb-3">
                TELEPHONE & WHATSAPP
              </div>
              <div className="font-sans text-[16px] text-white/90 font-light mb-1">
                {contactConfig.phone}
              </div>
              <div className="font-sans text-[16px] text-white/90 font-light">
                {contactConfig.whatsapp}
              </div>
            </div>

            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#E11D2A] mb-3">
                STUDIO HEADQUARTERS
              </div>
              <div className="font-sans text-[16px] text-white/90 font-light leading-relaxed">
                {contactConfig.officeAddress.city}, {contactConfig.officeAddress.state}, {contactConfig.officeAddress.country}
              </div>
              <div className="font-mono text-[11px] text-white/50 tracking-[0.1em] mt-1">
                {contactConfig.officeAddress.note}
              </div>
            </div>

            <div className="pt-6 border-t border-white/10">
              <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#E11D2A] mb-4">
                SOCIAL PRESENCE
              </div>
              <div className="flex flex-col gap-2 font-mono text-[11px] uppercase tracking-[0.14em]">
                <span className="text-white/60">LinkedIn · {contactConfig.social.linkedin}</span>
                <span className="text-white/60">Instagram · {contactConfig.social.instagram}</span>
                <span className="text-white/60">Twitter / X · {contactConfig.social.twitter}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-8 bg-[#121212] border border-white/10 p-8 md:p-12 rounded-[16px]">
            {submitted ? (
              <div className="py-16 text-center flex flex-col items-center justify-center">
                <CheckCircle2 className="w-12 h-12 text-[#E11D2A] mb-4" />
                <h3 className="font-serif text-[32px] text-white mb-2">Message Received</h3>
                <p className="font-sans text-white/70 max-w-md">
                  Thank you for reaching out. A senior partner will review your inquiry and follow up within one business day.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                {/* Name & Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-mono text-[11px] uppercase tracking-[0.18em] text-white/70 mb-2">
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

                  <div>
                    <label className="block font-mono text-[11px] uppercase tracking-[0.18em] text-white/70 mb-2">
                      Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="jane@company.com"
                      className="w-full bg-[#181818] border border-white/15 rounded-[8px] px-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#E11D2A] transition-colors"
                    />
                  </div>
                </div>

                {/* Company & "Where are you based?" */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-mono text-[11px] uppercase tracking-[0.18em] text-white/70 mb-2">
                      Company / Venture
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="Acme Corp"
                      className="w-full bg-[#181818] border border-white/15 rounded-[8px] px-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#E11D2A] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[11px] uppercase tracking-[0.18em] text-white/70 mb-2">
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

                {/* Services of Interest (The 8 Services) */}
                <div>
                  <label className="block font-mono text-[11px] uppercase tracking-[0.18em] text-white/70 mb-3">
                    Services of Interest (Select all that apply)
                  </label>
                  <div className="flex flex-wrap gap-2.5">
                    {SERVICES_DATA.map((service) => {
                      const isSelected = formData.selectedServices.includes(service.name);
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

                {/* Budget Range */}
                <div>
                  <label className="block font-mono text-[11px] uppercase tracking-[0.18em] text-white/70 mb-2">
                    Estimated Budget Range
                  </label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full bg-[#181818] border border-white/15 rounded-[8px] px-4 py-3 text-white text-sm focus:outline-none focus:border-[#E11D2A] transition-colors"
                  >
                    <option value="">Select an investment tier...</option>
                    <option value="Under $10,000">Under $10,000</option>
                    <option value="$10,000 - $25,000">$10,000 - $25,000</option>
                    <option value="$25,000 - $50,000">$25,000 - $50,000</option>
                    <option value="$50,000+">$50,000+</option>
                    <option value="Flexible / Advisory">Flexible / Advisory</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block font-mono text-[11px] uppercase tracking-[0.18em] text-white/70 mb-2">
                    Project Scope & Objectives *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your venture, timeline, and what you aim to achieve..."
                    className="w-full bg-[#181818] border border-white/15 rounded-[8px] px-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#E11D2A] transition-colors resize-none"
                  />
                </div>

                {/* Submit Pill Button */}
                <button
                  type="submit"
                  className="w-full py-4 rounded-full bg-[#E11D2A] hover:bg-[#c91823] text-white font-mono text-[11px] uppercase tracking-[0.18em] font-medium transition-colors flex items-center justify-center gap-2 shadow-lg"
                >
                  <span>START A PROJECT</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
