import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { URBrandLogo } from './Logo';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  isPanelExpanded?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ isPanelExpanded = false }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
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
    { label: 'SERVICES', href: '#services' },
    { label: 'PROCESS', href: '#process' },
    { label: 'RESULTS', href: '#results' },
    { label: 'FOUNDER', href: '#founder' },
    { label: 'CONTACT', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuOpen(false);

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
            {navItems.map((item) => (
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
            ))}
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

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className={`fixed inset-x-0 top-20 z-[8999] lg:hidden p-6 border-b shadow-xl ${
              isLight
                ? 'bg-[#FFFFFF] border-[#0A0A0A]/10 text-[#0A0A0A]'
                : 'bg-[#0A0A0A] border-white/10 text-white'
            }`}
          >
            <div className="flex flex-col gap-5 py-2">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`font-mono text-[12px] uppercase tracking-[0.18em] py-1 border-b ${
                    isLight ? 'border-[#0A0A0A]/10' : 'border-white/10'
                  }`}
                >
                  {item.label}
                </a>
              ))}
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
