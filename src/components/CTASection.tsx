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

    const subject = encodeURIComponent(`New Partnership Inquiry · ${formData.name || 'URBrand 360'}`);
    const body = encodeURIComponent(
      `New Partnership Inquiry · URBrand 360\n` +
      `--------------------------------------\n` +
      `• Name: ${formData.name}\n` +
      `• Work Email: ${formData.email}\n` +
      `• Company: ${formData.company || 'Not specified'}\n` +
      `• Location: ${formData.location || 'Worldwide'}\n` +
      `• Services of Interest: ${formData.selectedServices.length > 0 ? formData.selectedServices.join(', ') : 'All 360° Disciplines'}\n` +
      `• Budget Range: ${formData.budget || 'Flexible'}\n` +
      `• Project Scope / Goals:\n${formData.message || 'We would like to explore strategy & brand growth.'}\n` +
      `--------------------------------------\n` +
      `Sent via URBrand 360 Online Portal`
    );

    window.location.href = `mailto:${contactConfig.email}?subject=${subject}&body=${body}`;
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
          <span className="font-mono text-[14px] sm:text-[15px] md:text-[16px] uppercase tracking-[0.22em] text-[#FF3B47] font-bold">
            GET IN TOUCH
          </span>
        </div>

        {/* Basic Display Heading H2 (Fluids Clamped) */}
        <div className="max-w-5xl mb-6">
          <h2 className="font-display text-[clamp(30px,4.5vw,66px)] leading-[1.03] tracking-[-0.015em] text-white font-normal max-w-full">
            Let’s build something <span className="italic text-[#FF3B47]">great together.</span>
          </h2>
        </div>

        <p className="font-sans text-[18px] md:text-[20px] leading-[1.65] text-white/85 font-light max-w-2xl mb-12">
          We would be happy to start with a no-obligation conversation about your goals. Reach us directly on WhatsApp or submit your brief below.
        </p>

        {/* WhatsApp Highlight Banner Button (Theme Palette: #0A0A0A / #FF3B47 / #FFFFFF) */}
        <div className="mb-10 sm:mb-12">
          <div
            onClick={() => setActiveChannel('whatsapp')}
            className={`cursor-pointer rounded-[20px] p-5 sm:p-8 border transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-5 sm:gap-6 ${
              activeChannel === 'whatsapp'
                ? 'bg-gradient-to-r from-[#1a0a0c] via-[#120809] to-[#0A0A0A] border-[#FF3B47] shadow-[0_0_35px_rgba(255,59,71,0.25)]'
                : 'bg-[#121212] border-white/15 hover:border-[#FF3B47]/60'
            }`}
          >
            <div className="flex items-start sm:items-center gap-4 sm:gap-5">
              {/* WhatsApp Official Logo SVG in Brand Theme */}
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#E11D2A] text-white flex items-center justify-center flex-shrink-0 shadow-[0_0_20px_rgba(225,29,42,0.45)]">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 fill-current" viewBox="0 0 24 24">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.971.53 1.834.813 2.796.813 3.183 0 5.768-2.586 5.768-5.766 0-3.18-2.585-5.766-5.768-5.766zm9.969 5.766c0 5.514-4.486 10-10 10-1.748 0-3.385-.45-4.815-1.242l-5.185 1.358 1.385-5.056c-.886-1.488-1.385-3.218-1.385-5.06 0-5.514 4.486-10 10-10 5.514 0 10 4.486 10 10z"/>
                </svg>
              </div>

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  <span className="font-mono text-[11px] sm:text-[12px] uppercase tracking-[0.16em] sm:tracking-[0.2em] text-[#FF3B47] font-bold">
                    CONTACT US HERE ON WHATSAPP
                  </span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-[9px] sm:text-[10px] font-mono bg-[#E11D2A]/30 text-white font-semibold border border-[#FF3B47]/60">
                    FASTEST RESPONSE
                  </span>
                </div>
                <h3 className="font-serif text-[20px] sm:text-[26px] text-white mt-1 leading-tight">
                  Chat Directly with Our Leadership Team
                </h3>
                <p className="font-sans text-[13px] sm:text-[14px] text-white/85 font-light mt-1">
                  Fill the brief below and click send — it instantly routes directly to our WhatsApp.
                </p>
              </div>
            </div>

            <div className="flex-shrink-0 w-full md:w-auto">
              <a
                href={`https://wa.me/919131353596?text=${encodeURIComponent("Hi URBrand 360 team, I would like to discuss brand strategy and growth for my business.")}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="w-full md:w-auto justify-center font-mono text-[11px] sm:text-[12px] uppercase tracking-[0.16em] sm:tracking-[0.18em] px-5 sm:px-6 py-3 rounded-full bg-[#E11D2A] text-white font-bold flex items-center gap-2 hover:bg-white hover:text-[#0A0A0A] transition-colors"
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
              <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#FF3B47] font-bold mb-3">
                DIRECT INQUIRIES
              </div>
              <a
                href={`mailto:${contactConfig.email}`}
                className="font-sans text-[16px] text-white/95 font-normal mb-1 block hover:text-[#FF3B47] transition-colors"
              >
                {contactConfig.email}
              </a>
              <div className="font-mono text-[11px] text-white/80 tracking-[0.1em]">
                Direct founder &amp; senior partner inbox
              </div>
            </div>

            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#FF3B47] font-bold mb-3">
                TELEPHONE &amp; WHATSAPP
              </div>
              <div className="font-sans text-[16px] text-white/95 font-normal mb-1">
                {contactConfig.phone}
              </div>
              <div className="font-sans text-[16px] text-white/95 font-medium flex items-center gap-2">
                <span>WhatsApp: <span className="text-[#FF3B47] font-bold">{contactConfig.whatsapp}</span></span>
              </div>
            </div>

            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#FF3B47] font-bold mb-3">
                SCHEDULE A 1-ON-1 STRATEGY CALL
              </div>
              <a
                href={contactConfig.calendarUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] px-5 py-2.5 rounded-full border border-white/25 text-white hover:border-[#FF3B47] hover:bg-[#FF3B47] transition-all font-semibold"
              >
                <span>OPEN GOOGLE CALENDAR</span>
                <ArrowUpRight size={14} />
              </a>
            </div>

            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#FF3B47] font-bold mb-3">
                HEADQUARTERS &amp; WORKING REGIONS
              </div>
              <div className="font-sans text-[16px] text-white/95 font-normal leading-relaxed">
                {contactConfig.officeAddress.city}, {contactConfig.officeAddress.state}, {contactConfig.officeAddress.country}
              </div>
              <div className="font-mono text-[11px] text-white/80 tracking-[0.1em] mt-1">
                Serving brands and founders worldwide
              </div>
            </div>

            <div className="pt-6 border-t border-white/10">
              <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#FF3B47] font-bold mb-4">
                CHANNELS
              </div>
              <div className="flex flex-col gap-2 font-mono text-[11px] uppercase tracking-[0.14em] break-all">
                <span className="text-white/80">LinkedIn · {contactConfig.social.linkedin}</span>
                <span className="text-white/80">Instagram · {contactConfig.social.instagram}</span>
                <span className="text-white/80">Twitter / X · {contactConfig.social.twitter}</span>
              </div>
            </div>
          </div>

          {/* Right Column: WhatsApp / Email Inquiry Form */}
          <div className="lg:col-span-8 bg-[#121212] border border-white/10 p-5 sm:p-8 md:p-12 rounded-[20px]">
            {submitted ? (
              <div className="py-16 text-center flex flex-col items-center justify-center">
                <CheckCircle2 className="w-14 h-14 text-[#E11D2A] mb-4" />
                <h3 className="font-serif text-[28px] sm:text-[32px] text-white mb-2">Inquiry Ready &amp; Transmitted</h3>
                <p className="font-sans text-white/70 max-w-md mb-6">
                  {activeChannel === 'whatsapp'
                    ? 'Thank you for reaching out. We have opened WhatsApp with your formatted brief. Our partners will respond promptly.'
                    : `Thank you for reaching out. Your brief has been prepared for ${contactConfig.email}. Our partners will review and respond promptly.`}
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
                className="flex flex-col gap-6 sm:gap-8"
              >
                {/* Form Header Channel Tabs */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-5">
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/60">
                    PREFERRED CONTACT MODE:
                  </span>
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setActiveChannel('whatsapp')}
                      className={`font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.14em] sm:tracking-[0.16em] px-3.5 sm:px-4 py-1.5 rounded-full transition-colors cursor-pointer ${
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
                      className={`font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.14em] sm:tracking-[0.16em] px-3.5 sm:px-4 py-1.5 rounded-full transition-colors cursor-pointer ${
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
                    <label htmlFor="contact-form-name" className="block font-mono text-[11px] uppercase tracking-[0.18em] text-white/85 font-semibold mb-2">
                      Your Name *
                    </label>
                    <input
                      id="contact-form-name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Jane Doe"
                      className="w-full bg-[#181818] border border-white/20 rounded-[10px] px-4 py-3 text-white placeholder-white/40 text-sm focus:outline-none focus:border-[#FF3B47] transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-form-email" className="block font-mono text-[11px] uppercase tracking-[0.18em] text-white/85 font-semibold mb-2">
                      Work Email *
                    </label>
                    <input
                      id="contact-form-email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="jane@company.com"
                      className="w-full bg-[#181818] border border-white/20 rounded-[10px] px-4 py-3 text-white placeholder-white/40 text-sm focus:outline-none focus:border-[#FF3B47] transition-colors"
                    />
                  </div>
                </div>

                {/* Company & "Where are you based?" */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="contact-form-company" className="block font-mono text-[11px] uppercase tracking-[0.18em] text-white/85 font-semibold mb-2">
                      Company / Venture
                    </label>
                    <input
                      id="contact-form-company"
                      name="company"
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="Acme Corp"
                      className="w-full bg-[#181818] border border-white/20 rounded-[10px] px-4 py-3 text-white placeholder-white/40 text-sm focus:outline-none focus:border-[#FF3B47] transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-form-location" className="block font-mono text-[11px] uppercase tracking-[0.18em] text-white/85 font-semibold mb-2">
                      Where are you based? *
                    </label>
                    <input
                      id="contact-form-location"
                      name="location"
                      type="text"
                      required
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="e.g. India, Canada, Australia, Singapore, Worldwide..."
                      className="w-full bg-[#181818] border border-white/20 rounded-[10px] px-4 py-3 text-white placeholder-white/40 text-sm focus:outline-none focus:border-[#FF3B47] transition-colors"
                    />
                  </div>
                </div>

                {/* Services Pills */}
                <div>
                  <label className="block font-mono text-[11px] uppercase tracking-[0.18em] text-white/85 font-semibold mb-3">
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
                          className={`font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.12em] sm:tracking-[0.14em] px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border text-left transition-all duration-200 cursor-pointer ${
                            selected
                              ? 'bg-[#E11D2A] text-white border-[#E11D2A] font-semibold'
                              : 'bg-transparent border-white/20 text-white/85 hover:border-white/50'
                          }`}
                        >
                          {service.name}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Budget Range ($500 to $20,000) with explicit label & id */}
                <div>
                  <label htmlFor="budget-tier-select" className="block font-mono text-[11px] uppercase tracking-[0.18em] text-white/85 font-semibold mb-2">
                    Estimated Budget Range (Select Investment Tier)
                  </label>
                  <select
                    id="budget-tier-select"
                    name="budget"
                    aria-label="Select an investment tier"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full bg-[#181818] border border-white/20 rounded-[10px] px-4 py-3 text-white text-sm focus:outline-none focus:border-[#FF3B47] transition-colors"
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
                  <label htmlFor="contact-form-message" className="block font-mono text-[11px] uppercase tracking-[0.18em] text-white/85 font-semibold mb-2">
                    Project Scope &amp; Objectives *
                  </label>
                  <textarea
                    id="contact-form-message"
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Briefly describe your business goals, immediate timeline, or questions for our specialists..."
                    className="w-full bg-[#181818] border border-white/20 rounded-[10px] px-4 py-3 text-white placeholder-white/40 text-sm focus:outline-none focus:border-[#FF3B47] transition-colors"
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
