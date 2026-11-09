import React, { useState } from 'react';
import { PageTransition } from '../components/PageTransition';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { ArrowRight, Check, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface JobRole {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
}

export const CareersPage: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<JobRole | null>(null);
  const [applied, setApplied] = useState(false);
  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');

  const roles: JobRole[] = [
    {
      id: 'brand-director',
      title: 'Senior Brand Strategist',
      department: 'Brand Systems',
      location: 'Indore, India / Remote',
      type: 'Full-time',
      description: 'Lead typographic identity systems, brand architecture, and strategic positioning for global corporate clients.',
      requirements: [
        '5+ years in branding, identity design, or brand consultancy',
        'Mastery of typographic hierarchies, design tokens, and editorial tone',
        'Proven portfolio of high-conviction identity systems',
      ],
    },
    {
      id: 'automation-lead',
      title: 'AI & Automation Engineer',
      department: 'Computational Operations',
      location: 'Remote',
      type: 'Full-time',
      description: 'Architect resilient backend API pipelines, automated CRM/ERP integrations, and LLM-assisted workflows.',
      requirements: [
        '3+ years architecting webhooks, REST/GraphQL APIs, and automated business workflows',
        'Strong focus on data security, low latency, and exception handling',
        'Experience building custom tools and API connectors',
      ],
    },
    {
      id: 'media-lead',
      title: 'Performance Marketing Strategist',
      department: 'Growth Marketing',
      location: 'Remote',
      type: 'Full-time',
      description: 'Orchestrate high-performing paid media acquisition across Meta, Google Ads, and marketplaces for international brands.',
      requirements: [
        'Demonstrated track record scaling ad spend with high ROAS',
        'Deep fluency in attribution modeling and cohort analytics',
        'Rigorous testing discipline and creative iteration',
      ],
    },
    {
      id: 'tax-analyst',
      title: 'International Compliance Associate',
      department: 'Taxation & Fiscal Advisory',
      location: 'Indore, India / Remote',
      type: 'Full-time',
      description: 'Coordinate international regulatory workflows and corporate financial compliance in partnership with Chartered Accountant practice leads.',
      requirements: [
        'Strong knowledge of cross-border compliance, corporate tax filings, and international reporting',
        'Rigorous attention to statutory detail and accounting standards',
        'CA or progressive accounting qualifications preferred',
      ],
    },
  ];

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setApplied(true);
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#0A0A0A] text-white">
        <Header />

        {/* Hero */}
        <section className="pt-40 pb-20 px-6 md:px-14 lg:px-20 max-w-7xl mx-auto border-b border-white/10">
          <div className="max-w-4xl">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#E11D2A] font-semibold block mb-4">
              CULTURE & CAREERS
            </span>
            <h1 className="font-display text-[44px] md:text-[68px] leading-[1.02] text-white">
              Join a team of specialists <span className="italic text-[#E11D2A]">working worldwide.</span>
            </h1>
            <p className="font-sans text-[17px] leading-[1.65] text-white/70 mt-6 max-w-3xl font-light">
              We seek disciplined thinkers, senior specialists, and computational builders who thrive on high-conviction work, remote-first agility, and measurable client results.
            </p>
          </div>
        </section>

        {/* Open Roles Section */}
        <section className="py-20 md:py-28 px-6 md:px-14 lg:px-20 max-w-7xl mx-auto">
          <div className="space-y-6">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/40 block mb-8">
              OPEN SPECIALIST POSITIONS
            </span>

            <div className="grid grid-cols-1 gap-4">
              {roles.map((role) => (
                <div
                  key={role.id}
                  onClick={() => {
                    setSelectedRole(role);
                    setApplied(false);
                  }}
                  className="p-8 rounded-[16px] bg-white/[0.02] border border-white/10 hover:border-[#E11D2A] hover:bg-white/[0.04] transition-all duration-300 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-6 group"
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#E11D2A]">
                        {role.department}
                      </span>
                      <span className="text-white/20">·</span>
                      <span className="font-mono text-[11px] text-white/60">
                        {role.location}
                      </span>
                    </div>
                    <h3 className="font-serif text-2xl sm:text-3xl text-white group-hover:text-[#E11D2A] transition-colors">
                      {role.title}
                    </h3>
                    <p className="font-sans text-sm text-white/70 max-w-2xl font-light">
                      {role.description}
                    </p>
                  </div>

                  <div className="flex-shrink-0 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-white group-hover:text-[#E11D2A]">
                    <span>View Role</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Modal for Role Details */}
        <AnimatePresence>
          {selectedRole && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[9999] bg-black/85 backdrop-blur-md flex items-center justify-center p-6"
            >
              <div className="relative w-full max-w-2xl bg-[#121212] border border-white/15 rounded-[16px] p-8 md:p-10 text-white max-h-[90vh] overflow-y-auto">
                <button
                  type="button"
                  onClick={() => setSelectedRole(null)}
                  className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-[#E11D2A] text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                {applied ? (
                  <div className="py-12 text-center space-y-4">
                    <div className="w-12 h-12 rounded-full bg-[#E11D2A] mx-auto flex items-center justify-center">
                      <Check className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-serif text-2xl">Application Received</h3>
                    <p className="font-sans text-sm text-white/70 max-w-md mx-auto">
                      Thank you, {applicantName}. Our leadership team will review your credentials and get in touch if there is a mutual alignment.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div>
                      <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#E11D2A] block mb-1">
                        {selectedRole.department} · {selectedRole.location}
                      </span>
                      <h2 className="font-serif text-3xl md:text-4xl">{selectedRole.title}</h2>
                    </div>

                    <p className="font-sans text-sm text-white/80 leading-relaxed font-light">
                      {selectedRole.description}
                    </p>

                    <div>
                      <h4 className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/60 mb-3">
                        Candidate Requirements
                      </h4>
                      <ul className="space-y-2">
                        {selectedRole.requirements.map((req, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-sm text-white/80 font-light">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#E11D2A] mt-2 flex-shrink-0" />
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <form onSubmit={handleApplySubmit} className="pt-6 border-t border-white/10 space-y-4">
                      <h4 className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/60">
                        Quick Application
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input
                          type="text"
                          required
                          placeholder="Full Name"
                          value={applicantName}
                          onChange={(e) => setApplicantName(e.target.value)}
                          className="bg-white/5 border border-white/15 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#E11D2A]"
                        />
                        <input
                          type="email"
                          required
                          placeholder="Email Address"
                          value={applicantEmail}
                          onChange={(e) => setApplicantEmail(e.target.value)}
                          className="bg-white/5 border border-white/15 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#E11D2A]"
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full py-3 rounded-full bg-[#E11D2A] text-white font-mono text-[11px] uppercase tracking-[0.18em] font-medium hover:bg-white hover:text-black transition-colors"
                      >
                        Submit Credentials
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <Footer />
      </div>
    </PageTransition>
  );
};
export default CareersPage;
