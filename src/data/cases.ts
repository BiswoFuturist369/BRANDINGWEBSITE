export interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  client: string;
  category: 'Branding' | 'Marketing' | 'Ecommerce' | 'Consulting';
  market: string;
  year: string;
  heroImage: string;
  thumbnail: string;
  overview: string;
  challenge: string;
  strategy: string;
  execution: string;
  deliverables: string[];
  metrics: {
    label: string;
    value: string;
  }[];
}

export const CASE_STUDIES_DATA = [
  {
    id: 'case-1',
    slug: 'case-study-01',
    title: 'Brand Architecture & Category Creation',
    subtitle: 'Comprehensive brand identity and go-to-market framework',
    client: 'Case Study Coming Soon',
    category: 'Branding',
    market: 'Worldwide',
    year: '2026',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop',
    heightClass: 'h-[440px] md:h-[500px]',
  },
  {
    id: 'case-2',
    slug: 'case-study-02',
    title: 'D2C Commerce & Marketplace Acceleration',
    subtitle: 'Storefront optimization, marketplace scaling, and ad infrastructure',
    client: 'Case Study Coming Soon',
    category: 'Ecommerce',
    market: 'Worldwide',
    year: '2026',
    image: 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?q=80&w=800&auto=format&fit=crop',
    heightClass: 'h-[480px] md:h-[560px]',
  },
  {
    id: 'case-3',
    slug: 'case-study-03',
    title: 'Commercial Growth & Demand Engine',
    subtitle: 'Full-funnel performance marketing and conversion rate optimization',
    client: 'Case Study Coming Soon',
    category: 'Marketing',
    market: 'Worldwide',
    year: '2026',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
    heightClass: 'h-[420px] md:h-[480px]',
  },
  {
    id: 'case-4',
    slug: 'case-study-04',
    title: 'Intelligent Automation & Back-Office Stack',
    subtitle: 'Custom automated workflows and API integrations for scale',
    client: 'Case Study Coming Soon',
    category: 'Consulting',
    market: 'Worldwide',
    year: '2026',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop',
    heightClass: 'h-[460px] md:h-[520px]',
  },
];
