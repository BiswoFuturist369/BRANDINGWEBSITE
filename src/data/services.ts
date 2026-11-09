export interface ServiceItem {
  id: string;
  number: string;
  name: string;
  tagline: string;
  ledBy: string;
  previewImage: string;
  headline: string;
  overview: string;
  deliverables: string[];
}

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'brand-strategy',
    number: '01',
    name: 'Brand Strategy & Positioning',
    tagline: 'Who you are, who you serve and how you should sound, so your brand is easy to recognise and remember.',
    ledBy: 'Vaishnavi Ahuja, Aarti Singh',
    previewImage: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=900&auto=format&fit=crop',
    headline: 'Brands engineered to define categories and transcend trends.',
    overview: 'We craft comprehensive identity systems rooted in rigorous strategy. From core brand philosophy to visual architecture and guidelines, our branding work builds instant equity across global markets.',
    deliverables: [
      'Brand Architecture & Positioning',
      'Visual Identity System & Monograms',
      'Verbal Identity & Editorial Voice',
      'Design Guidelines & Token Systems',
      'Brand Collateral & Digital Assets',
    ],
  },
  {
    id: 'commercial-marketing',
    number: '02',
    name: 'Commercial Marketing & Sales Strategy',
    tagline: 'Structured marketing plans and sales processes aligned with your goals.',
    ledBy: 'Aarti Singh',
    previewImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=900&auto=format&fit=crop',
    headline: 'High-conviction go-to-market strategies that convert awareness into revenue.',
    overview: 'We bridge commercial ambition with tactical execution. Our market strategies align product narratives, distribution channels, and revenue funnels for sustained momentum.',
    deliverables: [
      'Commercial Go-To-Market Roadmap',
      'Audience Persona & Customer Journey Mapping',
      'Multi-Channel Distribution Strategy',
      'Content Architecture & Messaging Pillars',
      'Attribution & KPI Scorecards',
    ],
  },
  {
    id: 'ecommerce-growth',
    number: '03',
    name: 'Ecommerce Growth & Marketplaces',
    tagline: 'Go-to-market and growth for D2C stores and marketplaces such as Shopify, Amazon, Flipkart and Walmart.',
    ledBy: 'Ajay Harshchandani',
    previewImage: 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?q=80&w=900&auto=format&fit=crop',
    headline: 'End-to-end commerce acceleration across storefronts and global marketplaces.',
    overview: 'From catalog listing optimization and storefront UI to inventory forecasting and marketplace algorithms, we scale high-volume commerce operations across platforms.',
    deliverables: [
      'Shopify & Headless Storefront Architecture',
      'Amazon, Flipkart & Walmart Marketplace Optimization',
      'Listing Optimization & A+ Content',
      'Catalog Merchandising & Pricing Strategy',
      'Logistics & Fulfillment Advisory',
    ],
  },
  {
    id: 'performance-marketing',
    number: '04',
    name: 'Performance Marketing',
    tagline: 'Meta Ads, Google Ads and marketplace advertising with a focus on return on ad spend.',
    ledBy: 'Ajay Harshchandani',
    previewImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=900&auto=format&fit=crop',
    headline: 'Disciplined capital allocation focused strictly on profitable ROAS.',
    overview: 'We engineer precision paid media campaigns across Meta, Google Search/Shopping, and marketplace ad networks, relentlessly testing creatives, copy, and audience clusters.',
    deliverables: [
      'Meta Ads (Facebook & Instagram) Scaling',
      'Google Ads (Search, Shopping, Performance Max)',
      'Marketplace Sponsored Ads (Amazon PPC / Walmart)',
      'Creative Testing & Dynamic Creative Optimization',
      'Full-Funnel ROAS Tracking & Blended CAC Management',
    ],
  },
  {
    id: 'conversion-optimisation',
    number: '05',
    name: 'Conversion & Customer Journey Optimisation',
    tagline: 'Funnel improvements, higher prepaid-order conversion, marketing automation and retention.',
    ledBy: 'Ajay Harshchandani',
    previewImage: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=900&auto=format&fit=crop',
    headline: 'Maximizing transaction velocity, prepaid conversion, and lifetime customer value.',
    overview: 'We inspect every step from landing page to checkout, eliminating drop-offs, boosting prepaid purchase rates, and implementing automated lifecycle retention flows.',
    deliverables: [
      'Checkout Friction & Cart Drop-off Removal',
      'Prepaid Order Conversion Systems',
      'Klaviyo & Retention Email/SMS Automation',
      'A/B Split Testing & Landing Page CRO',
      'Customer Lifetime Value (LTV) Optimization',
    ],
  },
  {
    id: 'business-consulting',
    number: '06',
    name: 'Business Consulting',
    tagline: 'Planning, operations and growth advice, including fractional marketing leadership for teams that need senior direction without a full-time hire.',
    ledBy: 'Vaishnavi Ahuja',
    previewImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=900&auto=format&fit=crop',
    headline: 'Navigating complexity with clarity, rigor, and strategic conviction.',
    overview: 'Senior advisory for founders and leadership teams preparing for expansion or capital events. We dissect unit economics, organizational design, and operational leverage.',
    deliverables: [
      'Fractional CMO & Growth Leadership',
      'Commercial Model Architecture & Scaling',
      'Operational Bottleneck Diagnostics',
      'Unit Economics & Margin Optimization',
      'Founder Advisory & Executive Steering',
    ],
  },
  {
    id: 'taxation-compliance',
    number: '07',
    name: 'Taxation & Financial Compliance',
    tagline: 'Chartered Accountant support on tax matters, including cross-border and international taxation.',
    ledBy: 'Sanjeev Panjwani',
    previewImage: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?q=80&w=900&auto=format&fit=crop',
    headline: 'Cross-border and international taxation, handled by a Chartered Accountant.',
    overview: 'Precise financial oversight and compliance strategies for modern global enterprises, navigating cross-border tax regulations, transfer pricing, and corporate financial health.',
    deliverables: [
      'Cross-Border Corporate Tax Strategy',
      'International Transfer Pricing & Compliance',
      'Multi-Currency Financial Structuring',
      'Entity Structuring & Regulatory Filings',
      'Chartered Accountant Advisory & Audits',
    ],
  },
  {
    id: 'ai-automation',
    number: '08',
    name: 'AI & Automation Solutions',
    tagline: 'Custom automation workflows, AI-assisted tools and API integrations that save your team time.',
    ledBy: 'Bisworanjan Nayak',
    previewImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=900&auto=format&fit=crop',
    headline: 'Eliminate friction. Unlock exponential operational leverage.',
    overview: 'Modern businesses scale through intelligent workflows. We build robust automated systems connecting APIs, LLMs, computer vision, CRM pipelines, and operations into cohesive digital machinery.',
    deliverables: [
      'End-to-End Workflow & Zapier/Make Automation',
      'Custom LLM & AI Assistant Deployments',
      'API Integrations & Data Pipelines',
      'Computer Vision & Automated Document Parsing',
      'Autonomous Back-Office Operational Systems',
    ],
  },
];
