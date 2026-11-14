import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Header } from '../components/Header';
import { HeroReel } from '../components/HeroReel';
import { BrandHero } from '../components/BrandHero';
import { StatementStats } from '../components/StatementStats';
import { ServicesSection } from '../components/ServicesSection';
import { MovingBlocksSection } from '../components/MovingBlocksSection';
import { AboutSection } from '../components/AboutSection';
import { ProcessSection } from '../components/ProcessSection';
import { FreeAssessmentSection } from '../components/FreeAssessmentSection';
import { GlobalSection } from '../components/GlobalSection';
import { LeadershipGatewaySection } from '../components/LeadershipGatewaySection';
import { TrustSection } from '../components/TrustSection';
import { ArticlesSection } from '../components/ArticlesSection';
import { FAQSection } from '../components/FAQSection';
import { CTASection } from '../components/CTASection';
import { Footer } from '../components/Footer';

export const HomePage: React.FC = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    // Wait a tick for AnimatePresence route transition / DOM layout
    const timer = setTimeout(() => {
      const target = document.querySelector(hash);
      if (target) {
        if (window.__lenis) {
          window.__lenis.scrollTo(target as HTMLElement, { duration: 1.1 });
        } else {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }, 120);
    return () => clearTimeout(timer);
  }, [hash]);

  return (
    <div className="relative w-full min-h-screen bg-[#FFFFFF] text-[#0A0A0A]">
      {/* Dynamic Header switching theme on scroll */}
      <Header />

      {/* 1. Reel Hero (Silent Video, auto-scrolls on completion) */}
      <HeroReel />

      {/* 2. Brand Hero (#home / #studio, Interbrand Starting Reveal H1 URBrand 360) */}
      <BrandHero />

      {/* 3. Statement + Stats (#statement, Tagline, real stats) */}
      <StatementStats />

      {/* 4. Services (#services, 8 numbered rows) */}
      <ServicesSection />

      {/* 5. Middle Section: Moving Blocks Upon Scrolling ("DID YOU KNOW?") */}
      <MovingBlocksSection />

      {/* 6. About URBrand 360 & Why Choose Us (Mission, Vision & Strategic Pillars) */}
      <AboutSection />

      {/* 7. How We Work (#process, 3D Rotating Gyroscope Quadrant Diagram) */}
      <ProcessSection />

      {/* 8. Book a Free Assessment (Outlook Integration & Intake Modal) */}
      <FreeAssessmentSection />

      {/* 9. Global Reach (#global, 3D Canvas Continents Globe & Worldwide Hubs) */}
      <GlobalSection />

      {/* 10. Leadership Gateway (#founder, Links to /founder -> /employees) */}
      <LeadershipGatewaySection />

      {/* 11. Why Clients Trust Us (#trust, 6 items in hairline grid) */}
      <TrustSection />

      {/* 12. Strategic Perspectives & Articles (#results, Replaces ad-like case studies) */}
      <ArticlesSection />

      {/* 13. Frequently Asked Questions (#faq, Accordion) */}
      <FAQSection />

      {/* 14. Contact (#contact, WhatsApp Direct Modal & Email Brief) */}
      <CTASection />

      {/* 15. Footer (Wordmark, Navigation, Worldwide metadata) */}
      <Footer />
    </div>
  );
};

export default HomePage;
