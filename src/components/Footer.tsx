import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { contactConfig } from '../config/contact';
import { SERVICES_DATA } from '../data/services';

export const Footer: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleHashClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/' + hash);
      return;
    }
    const el = document.querySelector(hash) as HTMLElement | null;
    if (el) {
      if (window.__lenis) {
        window.__lenis.scrollTo(el, { duration: 1.1 });
      } else {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="relative w-full max-w-full bg-[#0A0A0A] text-[#FFFFFF] pt-20 md:pt-24 pb-12 px-4 sm:px-6 md:px-12 border-t border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Top 3 Columns: Services / Company / Contact */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-20 border-b border-white/10">
          {/* Column 1: Services (8 services) */}
          <div className="lg:col-span-5">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#FF3B47] block mb-6 font-bold">
              SERVICES &amp; CAPABILITIES
            </span>
            <ul className="flex flex-col gap-3 font-sans text-[14px] text-white/85 font-normal">
              {SERVICES_DATA.map((service) => (
                <li key={service.id}>
                  <a
                    href="#services"
                    onClick={(e) => handleHashClick(e, '#services')}
                    className="hover:text-white transition-colors duration-200"
                  >
                    {service.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Company Navigation */}
          <div className="lg:col-span-3">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#FF3B47] block mb-6 font-bold">
              COMPANY
            </span>
            <ul className="flex flex-col gap-3 font-sans text-[14px] text-white/85 font-normal">
              <li>
                <a
                  href="#home"
                  onClick={(e) => handleHashClick(e, '#home')}
                  className="hover:text-white transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#statement"
                  onClick={(e) => handleHashClick(e, '#statement')}
                  className="hover:text-white transition-colors"
                >
                  Our Philosophy
                </a>
              </li>
              <li>
                <a
                  href="#highlights"
                  onClick={(e) => handleHashClick(e, '#highlights')}
                  className="hover:text-white transition-colors"
                >
                  Did You Know?
                </a>
              </li>
              <li>
                <a
                  href="#process"
                  onClick={(e) => handleHashClick(e, '#process')}
                  className="hover:text-white transition-colors"
                >
                  How We Work (360°)
                </a>
              </li>
              <li>
                <a
                  href="#global"
                  onClick={(e) => handleHashClick(e, '#global')}
                  className="hover:text-white transition-colors"
                >
                  Global Reach
                </a>
              </li>
              <li>
                <Link to="/founder" className="hover:text-white transition-colors">
                  Founder &amp; Leadership
                </Link>
              </li>
              <li>
                <Link to="/employees" className="hover:text-white transition-colors">
                  The Specialists
                </Link>
              </li>
              <li>
                <a
                  href="#results"
                  onClick={(e) => handleHashClick(e, '#results')}
                  className="hover:text-white transition-colors"
                >
                  Selected Work
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Headquarters */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#FF3B47] block font-bold">
              HEADQUARTERS &amp; INQUIRIES
            </span>

            <div className="font-sans text-[14px] text-white/85 font-normal leading-relaxed">
              <p className="text-white font-medium mb-1">URBrand 360</p>
              <p>
                {contactConfig.officeAddress.city}, {contactConfig.officeAddress.state}
              </p>
              <p>{contactConfig.officeAddress.country} · Working worldwide</p>
            </div>

            <div className="flex flex-col gap-1.5 font-sans text-[14px] text-white/85 font-normal">
              <p className="text-white/75 font-mono text-[11px] uppercase tracking-[0.14em]">
                Email
              </p>
              <a
                href={`mailto:${contactConfig.email}`}
                className="hover:text-white transition-colors"
              >
                {contactConfig.email}
              </a>
            </div>

            <div className="flex flex-col gap-1.5 font-sans text-[14px] text-white/85 font-normal">
              <p className="text-white/75 font-mono text-[11px] uppercase tracking-[0.14em]">
                Direct Communication &amp; Booking
              </p>
              <p>{contactConfig.phone}</p>
              <p className="text-white">WhatsApp: <span className="text-[#FF3B47] font-bold">{contactConfig.whatsapp}</span></p>
              <a
                href={contactConfig.calendarUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 text-[#FF3B47] hover:underline font-mono text-[12px] uppercase tracking-[0.12em] inline-flex items-center gap-1 font-semibold"
              >
                <span>Book a Strategy Call</span>
                <span>→</span>
              </a>
            </div>

            <div className="pt-2">
              <p className="text-white/75 font-mono text-[11px] uppercase tracking-[0.14em] mb-2">
                Social Channels
              </p>
              <div className="flex items-center gap-4 font-mono text-[11px] text-white/80">
                <span className="hover:text-[#FF3B47] transition-colors">LinkedIn</span>
                <span>·</span>
                <span className="hover:text-[#FF3B47] transition-colors">Instagram</span>
                <span>·</span>
                <span className="hover:text-[#FF3B47] transition-colors">Twitter / X</span>
              </div>
            </div>
          </div>
        </div>

        {/* Giant Basic Serif Wordmark "urbrand 360" with #FF3B47 Accent (Fluids Clamped for All Screens) */}
        <div className="w-full max-w-full py-10 sm:py-16 md:py-20 overflow-hidden flex items-center justify-center select-none px-2">
          <h2 className="font-display text-[clamp(30px,10vw,132px)] leading-[0.9] tracking-[-0.02em] text-white text-center font-normal whitespace-nowrap max-w-full">
            urbrand <span className="italic text-[#FF3B47]">360</span>
          </h2>
        </div>

        {/* Bottom Metadata Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-center sm:text-left font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.16em] sm:tracking-[0.18em] text-white/75">
          <div>© 2026 · Indore, India · Working worldwide</div>
          <div>Where Vision Meets Strategy</div>
        </div>
      </div>
    </footer>
  );
};
