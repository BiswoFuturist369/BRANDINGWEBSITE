import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { CustomCursor } from './components/CustomCursor';
import { SmoothScroll } from './components/SmoothScroll';
import { HomePage } from './pages/HomePage';

// Lazy load secondary routes for optimal initial bundle size and instant mobile LCP
const FounderPage = lazy(() => import('./pages/FounderPage').then((m) => ({ default: m.FounderPage })));
const EmployeesPage = lazy(() => import('./pages/EmployeesPage').then((m) => ({ default: m.EmployeesPage })));
const SplitScreenLayout = lazy(() => import('./components/split-screen/SplitScreenLayout').then((m) => ({ default: m.SplitScreenLayout })));
const ServicesPage = lazy(() => import('./pages/ServicesPage').then((m) => ({ default: m.ServicesPage })));
const InsightsPage = lazy(() => import('./pages/InsightsPage').then((m) => ({ default: m.InsightsPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then((m) => ({ default: m.ContactPage })));
const CareersPage = lazy(() => import('./pages/CareersPage').then((m) => ({ default: m.CareersPage })));

const ScrollToTop: React.FC = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) return;
    if (pathname !== '/about' && pathname !== '/work') {
      if (window.__lenis) {
        window.__lenis.scrollTo(0, { immediate: true });
      }
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
};

const AnimatedRoutes: React.FC = () => {
  const location = useLocation();

  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0A0A0A]" />}>
      <AnimatePresence mode="wait">
        <Routes
          location={location}
          key={
            location.pathname.startsWith('/about') || location.pathname.startsWith('/work')
              ? 'split-screen-shared'
              : location.pathname
          }
        >
          {/* Flagship Home Page */}
          <Route path="/" element={<HomePage />} />

          {/* Dedicated Sequential Leadership & Team Pages */}
          <Route path="/founder" element={<FounderPage />} />
          <Route path="/employees" element={<EmployeesPage />} />

          {/* Split Screen Shared Layout Routes */}
          <Route path="/about" element={<SplitScreenLayout initialPanel="about" />} />
          <Route path="/work" element={<SplitScreenLayout initialPanel="work" />} />

          {/* Inner Distinct Pages */}
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/insights" element={<InsightsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/careers" element={<CareersPage />} />

          {/* Fallback */}
          <Route path="*" element={<HomePage />} />
        </Routes>
      </AnimatePresence>
    </Suspense>
  );
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <SmoothScroll>
        {/* Subtle noise grain overlay */}
        <div className="fixed inset-0 pointer-events-none grain-overlay z-[9990] opacity-40" />

        {/* Morphing Custom Cursor */}
        <CustomCursor />

        <ScrollToTop />
        <AnimatedRoutes />
      </SmoothScroll>
    </BrowserRouter>
  );
};

export default App;
