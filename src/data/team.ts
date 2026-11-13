export interface FounderProfile {
  name: string;
  role: string;
  image: string;
  location: string;
  quote: string;
  bios: string[];
  principles: {
    label: string;
    detail: string;
  }[];
}

export interface EmployeeProfile {
  id: string;
  number: string;
  name: string;
  role: string;
  image: string;
  bio: string;
  note?: string;
}

export const FOUNDER_DATA: FounderProfile = {
  name: 'Vaishnavi Ahuja',
  role: 'FOUNDER & CEO, URBRAND 360',
  image: '/team/founder-vaishnavi-ahuja.jpg',
  location: 'Indore, Madhya Pradesh, India · Working worldwide',
  quote:
    'Our promise to you: a dedicated team, a clear plan, honest reporting and a founder who is personally accountable for the quality of our work.',
  bios: [
    'Vaishnavi is the founder and CEO of URBrand 360. She brings around 4 years of diverse corporate experience across several fast-paced industries, including serving as Vice President of a fractional marketing company, where she worked on marketing and growth for multiple businesses.',
    'Combining entrepreneurial vision with cross-industry experience, she brings a strategic, results-driven perspective to brand growth, operational leadership and market positioning.',
    'She leads URBrand 360 with one principle: clients should always feel informed, supported and confident in the direction we are taking their business.',
  ],
  principles: [
    {
      label: '01 · STRATEGIC POSITIONING',
      detail: 'Clarity on who you are, who you serve, and how your brand commands authority.',
    },
    {
      label: '02 · FRACTIONAL LEADERSHIP',
      detail: 'Senior executive marketing direction and operational rhythm without bloated overhead.',
    },
    {
      label: '03 · PERSONAL ACCOUNTABILITY',
      detail: 'Transparent communication, honest reporting, and founder-level ownership of outcomes.',
    },
  ],
};

export const EMPLOYEES_DATA: EmployeeProfile[] = [
  {
    id: 'sanjeev-panjwani',
    number: '01',
    name: 'Sanjeev Panjwani',
    role: 'CHARTERED ACCOUNTANT | TAXATION & FINANCE',
    image: '/team/team-sanjeev-panjwani.jpg',
    bio: 'CA with 6 years of corporate experience and specialised expertise in complex taxation within the international market; precise financial oversight and compliance strategies, helping businesses navigate cross-border tax regulations and optimise their financial operations.',
  },
  {
    id: 'prakash-tiwari',
    number: '02',
    name: 'Prakash Tiwari',
    role: 'MARKETING & SALES STRATEGY LEADER',
    image: '/team/Prakash_tiwari.jpg',
    bio: 'Strategic leader in commercial marketing, CMO-level leadership and sales management; strong in high-level networking; builds structured sales strategies that drive revenue growth and aligns operational planning with business goals so success can scale; website tester.',
  },
  {
    id: 'ajay-harshchandani',
    number: '03',
    name: 'Ajay Harshchandani',
    role: 'ECOMMERCE MARKETING HEAD',
    image: '/team/team-ajay-harshchandani.jpg',
    bio: '8+ years driving digital marketing and revenue growth across Shopify, Amazon, Flipkart, Google Ads and Meta Ads. Personal credentials: has managed monthly ad budgets of Rs. 18+ Lakhs while achieving 4.5x+ ROAS and has led strategies delivering 200%+ ARR growth.',
    note: 'Personal professional credentials prior to & alongside URBrand 360.',
  },
  {
    id: 'bisworanjan-nayak',
    number: '04',
    name: 'Bisworanjan Nayak',
    role: 'AI & AUTOMATION DEVELOPER',
    image: '/team/team-bisworanjan-nayak.jpg',
    bio: '3 years in AI and development, including facial recognition with OpenCV, the MediScan medicine information bot, e-commerce websites and text summarisation tools; builds automation workflows that connect APIs and AI to remove repetitive work.',
  },
];

