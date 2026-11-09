import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Header } from '../components/Header';
import { HeroReel } from '../components/HeroReel';
import { BrandHero } from '../components/BrandHero';
import { StatementStats } from '../components/StatementStats';
import { ServicesSection } from '../components/ServicesSection';
import { MovingBlocksSection } from '../components/MovingBlocksSection';
import { ProcessSection } from '../components/ProcessSection';
import { GlobalSection } from '../components/GlobalSection';
import { LeadershipGatewaySection } from '../components/LeadershipGatewaySection';
import { TrustSection } from '../components/TrustSection';
import { CaseStudiesGallery } from '../components/CaseStudiesGallery';
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

      {/* 1. Reel Hero (Silent Video, auto-scrolls to #studio on completion) */}
      <HeroReel />

      {/* 2. Brand Hero (#studio, HalftoneHeading H1 URBrand 360) */}
      <BrandHero />

      {/* 3. Statement + Stats (#statement, HalftoneHeading H2 Tagline, real stats) */}
      <StatementStats />

      {/* 4. Services (Basic Display H2, 8 numbered rows) */}
      <ServicesSection />

      {/* 5. Middle Section: Moving Blocks Upon Scrolling ("DID YOU KNOW?") */}
      <MovingBlocksSection />

      {/* 6. How We Work (#process, Basic Display H2, 360° ring quadrant diagram) */}
      <ProcessSection />

      {/* 7. Global (#global, Basic Display H2, dark ground transition, wireframe globe) */}
      <GlobalSection />

      {/* 8. Leadership Gateway (#founder, One big designed button linking to /founder -> /employees) */}
      <LeadershipGatewaySection />

      {/* 9. Why Clients Trust Us (#trust, 6 items in 2x3 hairline grid) */}
      <TrustSection />

      {/* 10. Case Studies Gallery (#results, Basic Display H2, horizontal drag gallery) */}
      <CaseStudiesGallery />

      {/* 11. CTA (#contact, Basic Display H2, contact form with "Where are you based?") */}
      <CTASection />

      {/* 12. Footer (Basic giant "urbrand 360" wordmark, 3 columns, Indore metadata) */}
      <Footer />
    </div>
  );
};

export default HomePage;
