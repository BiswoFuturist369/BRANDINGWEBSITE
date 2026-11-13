import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { URBrandLogo } from './Logo';
import { Menu, X, ChevronDown } from 'lucide-react';

interface HeaderProps {
  isPanelExpanded?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ isPanelExpanded = false }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const dropdownTimerRef = useRef<NodeJS.Timeout | null>(null);

  const [theme, setTheme] = useState<'light' | 'dark'>(
    location.pathname === '/' ? 'light' : 'dark'
  );

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 40);

      // On home page, light header covers HeroReel, Studio, Statement, Services, Moving Blocks & Process
      // until #global reaches the top dark transition
      if (location.pathname === '/') {
        const globalEl = document.getElementById('global');

        if (globalEl && globalEl.getBoundingClientRect().height > 0) {
          const globalTop = globalEl.getBoundingClientRect().top;
          setTheme(globalTop > 80 ? 'light' : 'dark');
        } else {
          setTheme('light');
        }
      } else {
        setTheme('dark');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();
    const rafId = requestAnimationFrame(handleScroll);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [location.pathname]);

  const navItems = [
    { label: 'STUDIO', href: '#studio' },
    { label: 'SERVICES', href: '#services', isDropdown: true },
    { label: 'PROCESS', href: '#process' },
    { label: 'RESULTS', href: '#results' },
    { label: 'FOUNDER', href: '#founder' },
    { label: 'CONTACT', href: '#contact' },
  ];

  // Interbrand-style 3 Columns
  const createServices = [
    { label: 'BRAND STRATEGY & POSITIONING', href: '/services?tab=brand-strategy' },
    { label: 'COMMERCIAL MARKETING & SALES', href: '/services?tab=commercial-marketing' },
    { label: 'VISUAL IDENTITY & MONOGRAMS', href: '/services?tab=brand-strategy' },
    { label: 'EXPERIENCE & DIGITAL DESIGN', href: '/services?tab=brand-strategy' },
  ];

  const accelerateServices = [
    { label: 'ECOMMERCE GROWTH & MARKETPLACES', href: '/services?tab=ecommerce-growth' },
    { label: 'PERFORMANCE MARKETING & ADS', href: '/services?tab=performance-marketing' },
    { label: 'CONVERSION & FUNNEL OPTIMISATION', href: '/services?tab=conversion-optimisation' },
    { label: 'FULL-FUNNEL PAID MEDIA', href: '/services?tab=performance-marketing' },
  ];

  const measureServices = [
    { label: 'TAXATION & CA FINANCIAL COMPLIANCE', href: '/services?tab=taxation-compliance' },
    { label: 'AI & AUTOMATION SOLUTIONS', href: '/services?tab=ai-automation' },
    { label: 'FRACTIONAL CMO & CONSULTING', href: '/services?tab=business-consulting' },
    { label: 'BUSINESS IMPACT & KPI ATTRIBUTION', href: '/services?tab=business-consulting' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuOpen(false);
    setServicesDropdownOpen(false);

    if (location.pathname !== '/') {
      navigate('/' + href);
      return;
    }

    const target = document.querySelector(href) as HTMLElement | null;
    if (target) {
      if (window.__lenis) {
        window.__lenis.scrollTo(target, { duration: 1.1 });
      } else {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleServicesMouseEnter = () => {
    if (dropdownTimerRef.current) {
      clearTimeout(dropdownTimerRef.current);
    }
    setServicesDropdownOpen(true);
  };

  const handleServicesMouseLeave = () => {
    dropdownTimerRef.current = setTimeout(() => {
      setServicesDropdownOpen(false);
    }, 240);
  };

  const isLight = theme === 'light';

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[9000] transition-colors duration-300 ${
          isScrolled
            ? isLight
              ? 'bg-[#FFFFFF]/95 backdrop-blur-md border-b border-[#0A0A0A]/10 shadow-sm'
              : 'bg-[#0A0A0A]/95 backdrop-blur-md border-b border-white/10 shadow-sm'
            : isLight
            ? 'bg-[#FFFFFF]/90 backdrop-blur-md border-b border-[#0A0A0A]/10'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-8 h-20 flex items-center justify-between">
          {/* Logo with real emblem + wordmark */}
          <URBrandLogo theme={theme} />

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7">
            {navItems.map((item) => {
              if (item.isDropdown) {
                return (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={handleServicesMouseEnter}
                    onMouseLeave={handleServicesMouseLeave}
                  >
                    <button
                      type="button"
                      onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                      className={`font-mono text-[11px] uppercase tracking-[0.18em] transition-colors duration-200 flex items-center gap-1.5 py-2 cursor-pointer focus:outline-none ${
                        servicesDropdownOpen
                          ? 'text-[#E11D2A]'
                          : isLight
                          ? 'text-[#0A0A0A]/80 hover:text-[#E11D2A]'
                          : 'text-white/80 hover:text-[#E11D2A]'
                      }`}
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        size={14}
                        className={`transition-transform duration-200 ${
                          servicesDropdownOpen ? 'rotate-180 text-[#E11D2A]' : ''
                        }`}
                      />
                    </button>
                  </div>
                );
              }

              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`font-mono text-[11px] uppercase tracking-[0.18em] transition-colors duration-200 draw-underline ${
                    isLight
                      ? 'text-[#0A0A0A]/80 hover:text-[#E11D2A]'
                      : 'text-white/80 hover:text-[#E11D2A]'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Right Action: Outlined Pill Button */}
          <div className="hidden lg:flex items-center">
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className={`font-mono text-[11px] uppercase tracking-[0.18em] px-5 py-2.5 rounded-full border transition-all duration-300 ${
                isLight
                  ? 'border-[#0A0A0A] text-[#0A0A0A] hover:bg-[#E11D2A] hover:border-[#E11D2A] hover:text-white'
                  : 'border-white text-white hover:bg-[#E11D2A] hover:border-[#E11D2A] hover:text-white'
              }`}
            >
              START A PROJECT
            </a>
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
            className={`lg:hidden p-2 rounded-full transition-colors ${
              isLight ? 'text-[#0A0A0A]' : 'text-white'
            }`}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Desktop Interbrand Mega Dropdown Menu */}
      <AnimatePresence>
        {servicesDropdownOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            onMouseEnter={handleServicesMouseEnter}
            onMouseLeave={handleServicesMouseLeave}
            className="fixed top-20 inset-x-0 z-[8995] bg-[#0A0A0A] text-white border-b border-white/15 shadow-[0_30px_90px_rgba(0,0,0,0.85)]"
          >
            <div className="max-w-7xl mx-auto px-6 md:px-8 py-10">
              {/* 3 Distinct Interbrand Categorized Columns */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-8">
                {/* Column 1: Create */}
                <div>
                  <h3 className="font-serif italic text-[32px] md:text-[36px] text-white mb-5 select-none tracking-tight">
                    Create
                  </h3>
                  <div className="flex flex-col space-y-2.5">
                    {createServices.map((service) => (
                      <Link
                        key={service.label}
                        to={service.href}
                        onClick={() => setServicesDropdownOpen(false)}
                        className="font-sans text-[13px] md:text-[14px] uppercase tracking-[0.12em] text-white/75 hover:text-[#E11D2A] transition-colors py-1 flex items-center justify-between group"
                      >
                        <span>{service.label}</span>
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[#E11D2A] text-xs font-mono">→</span>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Column 2: Accelerate */}
                <div>
                  <h3 className="font-serif italic text-[32px] md:text-[36px] text-white mb-5 select-none tracking-tight">
                    Accelerate
                  </h3>
                  <div className="flex flex-col space-y-2.5">
                    {accelerateServices.map((service) => (
                      <Link
                        key={service.label}
                        to={service.href}
                        onClick={() => setServicesDropdownOpen(false)}
                        className="font-sans text-[13px] md:text-[14px] uppercase tracking-[0.12em] text-white/75 hover:text-[#E11D2A] transition-colors py-1 flex items-center justify-between group"
                      >
                        <span>{service.label}</span>
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[#E11D2A] text-xs font-mono">→</span>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Column 3: Measure */}
                <div>
                  <h3 className="font-serif italic text-[32px] md:text-[36px] text-white mb-5 select-none tracking-tight">
                    Measure
                  </h3>
                  <div className="flex flex-col space-y-2.5">
                    {measureServices.map((service) => (
                      <Link
                        key={service.label}
                        to={service.href}
                        onClick={() => setServicesDropdownOpen(false)}
                        className="font-sans text-[13px] md:text-[14px] uppercase tracking-[0.12em] text-white/75 hover:text-[#E11D2A] transition-colors py-1 flex items-center justify-between group"
                      >
                        <span>{service.label}</span>
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[#E11D2A] text-xs font-mono">→</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Hairline Divider + Direct Link to All Services */}
              <div className="pt-6 border-t border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <Link
                  to="/services"
                  onClick={() => setServicesDropdownOpen(false)}
                  className="font-mono text-[12px] uppercase tracking-[0.2em] text-white hover:text-[#E11D2A] transition-colors flex items-center gap-2 font-bold group"
                >
                  <span>SEE ALL OF OUR SERVICES</span>
                  <span className="text-[#E11D2A] transition-transform duration-300 group-hover:translate-x-1">→</span>
                </Link>

                <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/50">
                  08 SPECIALISED DISCIPLINES · 01 DEDICATED POD
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className={`fixed inset-x-0 top-20 z-[8999] lg:hidden p-6 border-b shadow-xl max-h-[calc(100vh-80px)] overflow-y-auto ${
              isLight
                ? 'bg-[#FFFFFF] border-[#0A0A0A]/10 text-[#0A0A0A]'
                : 'bg-[#0A0A0A] border-white/10 text-white'
            }`}
          >
            <div className="flex flex-col gap-4 py-2">
              {navItems.map((item) => {
                if (item.isDropdown) {
                  return (
                    <div key={item.label} className="border-b pb-2 border-inherit/10">
                      <button
                        type="button"
                        onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                        className="w-full flex items-center justify-between font-mono text-[12px] uppercase tracking-[0.18em] py-2"
                      >
                        <span>{item.label}</span>
                        <ChevronDown
                          size={16}
                          className={`transition-transform ${mobileServicesOpen ? 'rotate-180 text-[#E11D2A]' : ''}`}
                        />
                      </button>

                      {mobileServicesOpen && (
                        <div className="pl-3 pt-2 pb-1 space-y-3">
                          <div>
                            <span className="font-serif italic text-base text-[#E11D2A] block mb-1">Create</span>
                            <div className="space-y-1.5 pl-2">
                              {createServices.map((s) => (
                                <Link
                                  key={s.label}
                                  to={s.href}
                                  onClick={() => setMenuOpen(false)}
                                  className="block font-sans text-xs uppercase tracking-wider text-inherit opacity-75 hover:opacity-100 hover:text-[#E11D2A]"
                                >
                                  {s.label}
                                </Link>
                              ))}
                            </div>
                          </div>

                          <div>
                            <span className="font-serif italic text-base text-[#E11D2A] block mb-1">Accelerate</span>
                            <div className="space-y-1.5 pl-2">
                              {accelerateServices.map((s) => (
                                <Link
                                  key={s.label}
                                  to={s.href}
                                  onClick={() => setMenuOpen(false)}
                                  className="block font-sans text-xs uppercase tracking-wider text-inherit opacity-75 hover:opacity-100 hover:text-[#E11D2A]"
                                >
                                  {s.label}
                                </Link>
                              ))}
                            </div>
                          </div>

                          <div>
                            <span className="font-serif italic text-base text-[#E11D2A] block mb-1">Measure</span>
                            <div className="space-y-1.5 pl-2">
                              {measureServices.map((s) => (
                                <Link
                                  key={s.label}
                                  to={s.href}
                                  onClick={() => setMenuOpen(false)}
                                  className="block font-sans text-xs uppercase tracking-wider text-inherit opacity-75 hover:opacity-100 hover:text-[#E11D2A]"
                                >
                                  {s.label}
                                </Link>
                              ))}
                            </div>
                          </div>

                          <Link
                            to="/services"
                            onClick={() => setMenuOpen(false)}
                            className="block pt-2 font-mono text-[11px] uppercase tracking-wider text-[#E11D2A] font-bold"
                          >
                            SEE ALL OF OUR SERVICES →
                          </Link>
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="font-mono text-[12px] uppercase tracking-[0.18em] py-2 border-b border-inherit/10"
                  >
                    {item.label}
                  </a>
                );
              })}

              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                className="mt-3 text-center font-mono text-[11px] uppercase tracking-[0.18em] px-6 py-3 rounded-full bg-[#E11D2A] text-white"
              >
                START A PROJECT
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
