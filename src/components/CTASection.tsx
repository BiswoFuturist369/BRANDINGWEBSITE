import React, { useState } from 'react';
import { contactConfig } from '../config/contact';
import { SERVICES_DATA } from '../data/services';
import { ArrowUpRight, CheckCircle2, MessageSquare, Mail, Send } from 'lucide-react';

export const CTASection: React.FC = () => {
  const [activeChannel, setActiveChannel] = useState<'whatsapp' | 'email'>('whatsapp');
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

  const handleSubmitEmail = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleSendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    const whatsappNumber = contactConfig.whatsapp.replace(/[^0-9]/g, '') || '919876543210';
    const text =
      `*New Partnership Inquiry · URBrand 360*\n` +
      `--------------------------------------\n` +
      `• *Name:* ${formData.name}\n` +
      `• *Work Email:* ${formData.email}\n` +
      `• *Company:* ${formData.company || 'Not specified'}\n` +
      `• *Location:* ${formData.location || 'Worldwide'}\n` +
      `• *Services of Interest:* ${formData.selectedServices.length > 0 ? formData.selectedServices.join(', ') : 'All 360° Disciplines'}\n` +
      `• *Budget Range:* ${formData.budget || 'Flexible'}\n` +
      `• *Project Scope / Goals:*\n${formData.message || 'We would like to explore strategy & brand growth.'}\n` +
      `--------------------------------------\n` +
      `_Sent via URBrand 360 Online Portal_`;

    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/${whatsappNumber}?text=${encoded}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section
      id="contact"
      className="relative w-full max-w-full py-20 md:py-40 px-4 sm:px-6 md:px-12 bg-[#0A0A0A] text-[#FFFFFF] border-t border-white/10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Eyebrow */}
        <div className="mb-6">
          <span className="font-mono text-[14px] sm:text-[15px] md:text-[16px] uppercase tracking-[0.22em] text-[#E11D2A] font-bold">
            GET IN TOUCH
          </span>
        </div>

        {/* Basic Display Heading H2 (Fluids Clamped) */}
        <div className="max-w-5xl mb-6">
          <h2 className="font-display text-[clamp(30px,4.5vw,66px)] leading-[1.03] tracking-[-0.015em] text-white font-normal max-w-full">
            Let’s build something <span className="italic text-[#E11D2A]">great together.</span>
          </h2>
        </div>

        <p className="font-sans text-[18px] md:text-[20px] leading-[1.65] text-white/75 font-light max-w-2xl mb-12">
          We would be happy to start with a no-obligation conversation about your goals. Reach us directly on WhatsApp or submit your brief below.
        </p>

        {/* WhatsApp Highlight Banner Button (Theme Palette: #0A0A0A / #E11D2A / #FFFFFF) */}
        <div className="mb-12">
          <div
            onClick={() => setActiveChannel('whatsapp')}
            className={`cursor-pointer rounded-[20px] p-6 sm:p-8 border transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-6 ${
              activeChannel === 'whatsapp'
                ? 'bg-gradient-to-r from-[#1a0a0c] via-[#120809] to-[#0A0A0A] border-[#E11D2A] shadow-[0_0_35px_rgba(225,29,42,0.22)]'
                : 'bg-[#121212] border-white/15 hover:border-[#E11D2A]/60'
            }`}
          >
            <div className="flex items-center gap-5">
              {/* WhatsApp Official Logo SVG in Brand Theme */}
              <div className="w-14 h-14 rounded-full bg-[#E11D2A] text-white flex items-center justify-center flex-shrink-0 shadow-[0_0_20px_rgba(225,29,42,0.45)]">
                <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.971.53 1.834.813 2.796.813 3.183 0 5.768-2.586 5.768-5.766 0-3.18-2.585-5.766-5.768-5.766zm9.969 5.766c0 5.514-4.486 10-10 10-1.748 0-3.385-.45-4.815-1.242l-5.185 1.358 1.385-5.056c-.886-1.488-1.385-3.218-1.385-5.06 0-5.514 4.486-10 10-10 5.514 0 10 4.486 10 10z"/>
                </svg>
              </div>

              <div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[12px] uppercase tracking-[0.2em] text-[#E11D2A] font-bold">
                    CONTACT US HERE ON WHATSAPP
                  </span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono bg-[#E11D2A]/20 text-white border border-[#E11D2A]/40">
                    FASTEST RESPONSE
                  </span>
                </div>
                <h3 className="font-serif text-[22px] sm:text-[26px] text-white mt-1">
                  Chat Directly with Our Leadership Team
                </h3>
                <p className="font-sans text-[14px] text-white/70 font-light mt-0.5">
                  Fill the brief below and click send — it instantly routes directly to our WhatsApp.
                </p>
              </div>
            </div>

            <div className="flex-shrink-0">
              <a
                href={`https://wa.me/919131353596?text=${encodeURIComponent("Hi URBrand 360 team, I would like to discuss brand strategy and growth for my business.")}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="font-mono text-[12px] uppercase tracking-[0.18em] px-6 py-3 rounded-full bg-[#E11D2A] text-white font-bold flex items-center gap-2 hover:bg-white hover:text-[#0A0A0A] transition-colors"
              >
                <span>OPEN WHATSAPP CHAT</span>
                <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Direct Contact Info */}
          <div className="lg:col-span-4 flex flex-col gap-10">
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#E11D2A] mb-3">
                DIRECT INQUIRIES
              </div>
              <div className="font-sans text-[16px] text-white/90 font-light mb-1">
                {contactConfig.email}
              </div>
              <div className="font-mono text-[11px] text-white/50 tracking-[0.1em]">
                Direct founder &amp; senior partner inbox
              </div>
            </div>

            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#E11D2A] mb-3">
                TELEPHONE &amp; WHATSAPP
              </div>
              <div className="font-sans text-[16px] text-white/90 font-light mb-1">
                {contactConfig.phone}
              </div>
              <div className="font-sans text-[16px] text-white/90 font-medium flex items-center gap-2">
                <span>WhatsApp: <span className="text-[#E11D2A]">{contactConfig.whatsapp}</span></span>
              </div>
            </div>

            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#E11D2A] mb-3">
                SCHEDULE A 1-ON-1 STRATEGY CALL
              </div>
              <a
                href={contactConfig.calendarUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] px-5 py-2.5 rounded-full border border-white/20 text-white hover:border-[#E11D2A] hover:bg-[#E11D2A] transition-all"
              >
                <span>OPEN GOOGLE CALENDAR</span>
                <ArrowUpRight size={14} />
              </a>
            </div>

            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#E11D2A] mb-3">
                HEADQUARTERS &amp; WORKING REGIONS
              </div>
              <div className="font-sans text-[16px] text-white/90 font-light leading-relaxed">
                {contactConfig.officeAddress.city}, {contactConfig.officeAddress.state}, {contactConfig.officeAddress.country}
              </div>
              <div className="font-mono text-[11px] text-white/50 tracking-[0.1em] mt-1">
                Serving brands and founders worldwide
              </div>
            </div>

            <div className="pt-6 border-t border-white/10">
              <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#E11D2A] mb-4">
                CHANNELS
              </div>
              <div className="flex flex-col gap-2 font-mono text-[11px] uppercase tracking-[0.14em]">
                <span className="text-white/60">LinkedIn · {contactConfig.social.linkedin}</span>
                <span className="text-white/60">Instagram · {contactConfig.social.instagram}</span>
                <span className="text-white/60">Twitter / X · {contactConfig.social.twitter}</span>
              </div>
            </div>
          </div>

          {/* Right Column: WhatsApp / Email Inquiry Form */}
          <div className="lg:col-span-8 bg-[#121212] border border-white/10 p-8 md:p-12 rounded-[20px]">
            {submitted ? (
              <div className="py-16 text-center flex flex-col items-center justify-center">
                <CheckCircle2 className="w-14 h-14 text-[#E11D2A] mb-4" />
                <h3 className="font-serif text-[32px] text-white mb-2">Inquiry Ready &amp; Transmitted</h3>
                <p className="font-sans text-white/70 max-w-md mb-6">
                  Thank you for reaching out. We have opened WhatsApp with your formatted brief. Our partners will respond promptly.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="font-mono text-[11px] uppercase tracking-[0.18em] px-8 py-3 rounded-full bg-white text-black font-semibold cursor-pointer"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form
                onSubmit={activeChannel === 'whatsapp' ? handleSendWhatsApp : handleSubmitEmail}
                className="flex flex-col gap-8"
              >
                {/* Form Header Channel Tabs */}
                <div className="flex items-center justify-between border-b border-white/10 pb-5">
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/60">
                    PREFERRED CONTACT MODE:
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setActiveChannel('whatsapp')}
                      className={`font-mono text-[11px] uppercase tracking-[0.16em] px-4 py-1.5 rounded-full transition-colors cursor-pointer ${
                        activeChannel === 'whatsapp'
                          ? 'bg-[#E11D2A] text-white font-bold'
                          : 'bg-white/10 text-white/70 hover:text-white'
                      }`}
                    >
                      WhatsApp Direct
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveChannel('email')}
                      className={`font-mono text-[11px] uppercase tracking-[0.16em] px-4 py-1.5 rounded-full transition-colors cursor-pointer ${
                        activeChannel === 'email'
                          ? 'bg-white text-[#0A0A0A] font-bold'
                          : 'bg-white/10 text-white/70 hover:text-white'
                      }`}
                    >
                      Email Form
                    </button>
                  </div>
                </div>

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
                      className="w-full bg-[#181818] border border-white/15 rounded-[10px] px-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#E11D2A] transition-colors"
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
                      className="w-full bg-[#181818] border border-white/15 rounded-[10px] px-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#E11D2A] transition-colors"
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
                      className="w-full bg-[#181818] border border-white/15 rounded-[10px] px-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#E11D2A] transition-colors"
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
                      className="w-full bg-[#181818] border border-white/15 rounded-[10px] px-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#E11D2A] transition-colors"
                    />
                  </div>
                </div>

                {/* Services Pills */}
                <div>
                  <label className="block font-mono text-[11px] uppercase tracking-[0.18em] text-white/70 mb-3">
                    Services of Interest (Select all that apply)
                  </label>
                  <div className="flex flex-wrap gap-2.5">
                    {SERVICES_DATA.map((service) => {
                      const selected = formData.selectedServices.includes(service.name);
                      return (
                        <button
                          key={service.id}
                          type="button"
                          onClick={() => toggleService(service.name)}
                          className={`font-mono text-[11px] uppercase tracking-[0.14em] px-4 py-2 rounded-full border transition-all duration-200 cursor-pointer ${
                            selected
                              ? 'bg-[#E11D2A] text-white border-[#E11D2A] font-semibold'
                              : 'bg-transparent border-white/15 text-white/75 hover:border-white/40'
                          }`}
                        >
                          {service.name}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Budget Range ($500 to $20,000) */}
                <div>
                  <label className="block font-mono text-[11px] uppercase tracking-[0.18em] text-white/70 mb-2">
                    Estimated Budget Range
                  </label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full bg-[#181818] border border-white/15 rounded-[10px] px-4 py-3 text-white text-sm focus:outline-none focus:border-[#E11D2A] transition-colors"
                  >
                    <option value="">Select an investment tier...</option>
                    <option value="$500 – $2,000">Starter / Sprint: $500 – $2,000</option>
                    <option value="$2,000 – $5,000">Growth: $2,000 – $5,000</option>
                    <option value="$5,000 – $10,000">Scale: $5,000 – $10,000</option>
                    <option value="$10,000 – $20,000">Full 360° Partnership: $10,000 – $20,000</option>
                    <option value="Ongoing Fractional Strategic Retainer">Ongoing Fractional Strategic Retainer</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block font-mono text-[11px] uppercase tracking-[0.18em] text-white/70 mb-2">
                    Project Scope &amp; Objectives *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Briefly describe your business goals, immediate timeline, or questions for our specialists..."
                    className="w-full bg-[#181818] border border-white/15 rounded-[10px] px-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#E11D2A] transition-colors"
                  />
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  className="w-full font-mono text-[12px] uppercase tracking-[0.2em] py-4 rounded-[12px] transition-all duration-300 font-bold flex items-center justify-center gap-3 cursor-pointer shadow-lg bg-[#E11D2A] text-white hover:bg-white hover:text-[#0A0A0A] shadow-[0_0_25px_rgba(225,29,42,0.35)]"
                >
                  {activeChannel === 'whatsapp' ? (
                    <>
                      <span>SEND INQUIRY TO OUR WHATSAPP</span>
                      <ArrowUpRight size={18} />
                    </>
                  ) : (
                    <>
                      <span>SEND MESSAGE TO STRATEGY INBOX</span>
                      <Send size={16} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
