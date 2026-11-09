export interface InsightArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: 'Strategy' | 'Branding' | 'Taxation' | 'Automation';
  readTime: string;
  date: string;
  author: string;
  authorRole: string;
  coverImage: string;
  content: string[];
}

export const INSIGHTS_DATA: InsightArticle[] = [
  {
    id: 'insight-1',
    slug: 'the-global-corridor',
    title: 'The Global Corridor: Navigating Brand Expansion Across International Markets',
    excerpt: 'Why high-growth scaleups and brands falter when exporting cultural nuances without strategic adaptation.',
    category: 'Strategy',
    readTime: '6 min read',
    date: 'February 2026',
    author: 'Vaishnavi Ahuja',
    authorRole: 'Founder & CEO',
    coverImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop',
    content: [
      'Expansion across international markets has long been considered the natural zenith for enterprise growth. Yet, over 60% of international entries experience unexpected friction within their first 18 months.',
      'The failure is rarely operational; it is linguistic, cognitive, and perceptual. Global brand resonance demands immediate quantification of impact, cultural calibration, and ruthless conciseness.',
      'URBrand 360’s practice advises founders to maintain a single core truth while calibrating tone, commercial packaging, and regulatory alignment across worldwide markets.'
    ]
  },
  {
    id: 'insight-2',
    slug: 'light-typography-monochromatic-luxury',
    title: 'The Architecture of Restraint: Why Light Typographic Systems Outperform Loud Displays',
    excerpt: 'Analyzing the visual psychology of modern premium brands in an era of sensory saturation.',
    category: 'Branding',
    readTime: '4 min read',
    date: 'January 2026',
    author: 'Design Direction',
    authorRole: 'URBrand 360 Studio',
    coverImage: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1000&auto=format&fit=crop',
    content: [
      'In luxury brand systems, confidence is communicated through what is omitted. When headlines are set in disciplined light weights with expansive tracking and intentional negative space, the viewer perceives an organisation that does not need to shout.',
      'By restricting the chromatic palette to stark contrast—Red #E11D2A, Black #0A0A0A, and pure White—color transforms from arbitrary decoration into an intentional structural cue.'
    ]
  },
  {
    id: 'insight-3',
    slug: 'silent-automation-human-capital',
    title: 'Silent Workflows: Freeing High-Value Talent From Operational Friction',
    excerpt: 'How leading consultancies and firms reclaim over 400 hours monthly through bespoke API architecture.',
    category: 'Automation',
    readTime: '5 min read',
    date: 'December 2025',
    author: 'Systems Practice',
    authorRole: 'URBrand 360 Automation',
    coverImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop',
    content: [
      'Automation in professional services is too often equated with rudimentary chatbots or off-the-shelf zaps that fragment data. True operational sovereignty requires an integrated, resilient nervous system.',
      'From automated client intake telemetry to instant proposal generation and multi-currency billing, computational elegance allows leadership to dedicate their undivided attention to strategy.'
    ]
  },
  {
    id: 'insight-4',
    slug: 'cross-border-tax-strategy',
    title: 'Fiscal Readiness: Cross-Border Compliance and International Taxation',
    excerpt: 'Cross-border and international taxation, handled by a Chartered Accountant.',
    category: 'Taxation',
    readTime: '8 min read',
    date: 'November 2025',
    author: 'Sanjeev Panjwani',
    authorRole: 'Chartered Accountant | Taxation & Finance',
    coverImage: 'https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?q=80&w=1000&auto=format&fit=crop',
    content: [
      'Operating across global jurisdictions brings multi-regulatory requirements that must be anticipated at the brand architecture stage, not retroactively patched.',
      'Cross-border and international taxation, handled by a Chartered Accountant, ensures transfer pricing documentation, international compliance thresholds, and corporate structuring maintain methodical financial integrity.'
    ]
  }
];
