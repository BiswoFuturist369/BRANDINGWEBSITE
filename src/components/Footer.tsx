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
    <footer className="relative w-full bg-[#0A0A0A] text-[#FFFFFF] pt-24 pb-12 px-6 md:px-12 border-t border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Top 3 Columns: Services / Company / Contact */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-20 border-b border-white/10">
          {/* Column 1: Services (8 services) */}
          <div className="lg:col-span-5">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#E11D2A] block mb-6 font-semibold">
              SERVICES &amp; CAPABILITIES
            </span>
            <ul className="flex flex-col gap-3 font-sans text-[14px] text-white/70 font-light">
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
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#E11D2A] block mb-6 font-semibold">
              COMPANY
            </span>
            <ul className="flex flex-col gap-3 font-sans text-[14px] text-white/70 font-light">
              <li>
                <a
                  href="#studio"
                  onClick={(e) => handleHashClick(e, '#studio')}
                  className="hover:text-white transition-colors"
                >
                  The Studio
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
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#E11D2A] block font-semibold">
              STUDIO &amp; INQUIRIES
            </span>

            <div className="font-sans text-[14px] text-white/75 font-light leading-relaxed">
              <p className="text-white font-medium mb-1">URBrand 360 Studio</p>
              <p>
                {contactConfig.officeAddress.city}, {contactConfig.officeAddress.state}
              </p>
              <p>{contactConfig.officeAddress.country} · Working worldwide</p>
            </div>

            <div className="flex flex-col gap-1.5 font-sans text-[14px] text-white/75 font-light">
              <p className="text-white/50 font-mono text-[11px] uppercase tracking-[0.14em]">
                Email
              </p>
              <p>{contactConfig.email}</p>
            </div>

            <div className="flex flex-col gap-1.5 font-sans text-[14px] text-white/75 font-light">
              <p className="text-white/50 font-mono text-[11px] uppercase tracking-[0.14em]">
                Direct Communication
              </p>
              <p>{contactConfig.phone}</p>
              <p>{contactConfig.whatsapp}</p>
            </div>

            <div className="pt-2">
              <p className="text-white/50 font-mono text-[11px] uppercase tracking-[0.14em] mb-2">
                Social Channels
              </p>
              <div className="flex items-center gap-4 font-mono text-[11px] text-white/60">
                <span className="hover:text-[#E11D2A] transition-colors">LinkedIn</span>
                <span>·</span>
                <span className="hover:text-[#E11D2A] transition-colors">Instagram</span>
                <span>·</span>
                <span className="hover:text-[#E11D2A] transition-colors">Twitter / X</span>
              </div>
            </div>
          </div>
        </div>

        {/* Giant Basic Serif Wordmark "urbrand 360" with #E11D2A Accent (No Halftone) */}
        <div className="py-14 md:py-20 overflow-hidden flex items-center justify-center select-none">
          <h2 className="font-display text-[68px] sm:text-[116px] md:text-[168px] lg:text-[216px] leading-[0.88] tracking-[-0.02em] text-white text-center font-normal whitespace-nowrap">
            urbrand <span className="italic text-[#E11D2A]">360</span>
          </h2>
        </div>

        {/* Bottom Metadata Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.18em] text-white/50">
          <div>© 2026 · Indore, India · Working worldwide</div>
          <div>Where Vision Meets Strategy</div>
        </div>
      </div>
    </footer>
  );
};
