import React, { useState } from 'react';
import { PageTransition } from '../components/PageTransition';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { SERVICES_DATA, ServiceItem } from '../data/services';
import { ArrowRight, Check, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MagneticPill } from '../components/MagneticPill';

export const ServicesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>(SERVICES_DATA[0].id);

  const currentService = SERVICES_DATA.find((s) => s.id === activeTab) || SERVICES_DATA[0];

  const methodologySteps = [
    {
      num: '01',
      title: 'Discovery call',
      desc: 'We learn your business, goals and challenges through an open, structured discovery conversation.',
    },
    {
      num: '02',
      title: 'Strategy & proposal',
      desc: 'A clear plan, scope, deliverables, and timeline for your review and approval before execution begins.',
    },
    {
      num: '03',
      title: 'Execution',
      desc: 'The right specialists get to work on your brand, marketing, operations, or tax compliance with a single point of contact for you.',
    },
    {
      num: '04',
      title: 'Reporting & review',
      desc: 'Regular results reviews, transparent metrics, and continuous data-driven improvement loops.',
    },
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#0A0A0A] text-white">
        <Header />

        {/* Page Hero */}
        <section className="pt-40 pb-20 px-6 md:px-14 lg:px-20 max-w-7xl mx-auto border-b border-white/10">
          <div className="max-w-4xl">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#E11D2A] font-semibold block mb-4">
              DISCIPLINES & METHODOLOGY
            </span>
            <h1 className="font-display text-[44px] md:text-[68px] leading-[1.02] text-white">
              Integrated capabilities engineered for <span className="italic text-[#E11D2A]">market authority.</span>
            </h1>
            <p className="font-sans text-[17px] leading-[1.65] text-white/70 mt-6 max-w-3xl font-light">
              We eliminate the friction of managing disconnected agencies. URBrand 360 delivers an integrated 360° suite bridging brand architecture, operational automation, performance acquisition, and international financial compliance, serving ambitious brands worldwide.
            </p>
          </div>
        </section>

        {/* Interactive Services Tab / Explorer */}
        <section className="py-20 md:py-28 px-6 md:px-14 lg:px-20 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Nav List */}
            <div className="lg:col-span-5 border-r border-white/10 pr-0 lg:pr-8">
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/40 block mb-6 font-normal">
                SELECT DISCIPLINE
              </span>
              <div className="flex flex-col space-y-2">
                {SERVICES_DATA.map((service) => {
                  const isActive = service.id === activeTab;
                  return (
                    <button
                      key={service.id}
                      type="button"
                      onClick={() => setActiveTab(service.id)}
                      className={`text-left p-4 md:p-5 rounded-[12px] transition-all duration-300 relative focus:outline-none flex items-center justify-between group ${
                        isActive
                          ? 'bg-white/10 text-white border-l-2 border-[#E11D2A]'
                          : 'text-white/60 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center space-x-4">
                        <span className="font-mono text-[12px] text-[#E11D2A]">{service.number}</span>
                        <span className="font-serif text-lg sm:text-xl tracking-tight">{service.name}</span>
                      </div>
                      <ArrowRight className={`w-4 h-4 transition-transform duration-300 ${
                        isActive ? 'text-[#E11D2A] translate-x-1' : 'opacity-0 group-hover:opacity-60'
                      }`} />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Detail Pane */}
            <div className="lg:col-span-7 pl-0 lg:pl-6 space-y-10">
              <div className="space-y-4">
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#E11D2A] block">
                  DISCIPLINE {currentService.number} · LED BY {currentService.ledBy}
                </span>
                <h2 className="font-serif text-[32px] md:text-[44px] leading-[1.08] text-white">
                  {currentService.headline}
                </h2>
                <p className="font-sans text-[17px] leading-[1.65] text-white/80 font-light pt-2">
                  {currentService.overview}
                </p>
              </div>

              {currentService.id === 'taxation-compliance' && (
                <div className="p-5 bg-white/[0.03] rounded-[12px] border-l-2 border-[#E11D2A] text-sm font-light text-white/80 leading-relaxed">
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#E11D2A] block mb-1">
                    Chartered Accountant Assurance
                  </span>
                  Cross-border and international taxation, handled by a Chartered Accountant, providing precise financial oversight and compliance strategies.
                </div>
              )}

              {/* Deliverables Checklist */}
              <div className="p-8 bg-white/[0.02] rounded-[16px] border border-white/10">
                <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/50 mb-6">
                  Scope of Deliverables
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {currentService.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-sm font-light text-white/90">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#E11D2A] mt-2 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Row */}
              <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <p className="text-sm font-light text-white/60">
                  Ready to deploy {currentService.name} for your organization?
                </p>
                <Link to="/contact">
                  <MagneticPill strength={0.3}>
                    <span className="px-6 py-3 rounded-full bg-[#E11D2A] text-white font-mono text-[11px] uppercase tracking-[0.18em] font-medium hover:bg-white hover:text-black transition-all duration-300 block shadow-lg">
                      Initiate Consultation
                    </span>
                  </MagneticPill>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* The 4-Step Methodology Section */}
        <section className="py-24 bg-[#F6F6F4] text-[#0A0A0A] px-6 md:px-14 lg:px-20">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16">
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#E11D2A] font-semibold block mb-2">
                HOW WE WORK
              </span>
              <h2 className="font-serif text-[38px] md:text-[54px] leading-[1.08] text-[#0A0A0A]">
                The 360° Consultative Process
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {methodologySteps.map((step, idx) => (
                <div key={idx} className="p-8 border-l border-black/15 flex flex-col justify-between space-y-8">
                  <span className="font-display text-[44px] text-[#E11D2A] leading-none">
                    {step.num}
                  </span>
                  <div className="space-y-3">
                    <h3 className="font-serif text-2xl text-[#0A0A0A]">
                      {step.title}
                    </h3>
                    <p className="font-sans text-[14px] font-light text-[#0A0A0A]/70 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </PageTransition>
  );
};
export default ServicesPage;
