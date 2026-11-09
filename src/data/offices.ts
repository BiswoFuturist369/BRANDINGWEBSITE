export interface OfficeData {
  id: string;
  country: string;
  city: string;
  address: string;
  district: string;
  postal: string;
  timezone: string;
  ianaTimezone: string;
  email: string;
  phone: string;
  image: string;
  coordinates: string;
  highlights: string[];
}

export const OFFICES_DATA: OfficeData[] = [
  {
    id: 'studio-indore',
    country: 'India',
    city: 'Indore',
    address: 'URBrand 360 Studio',
    district: 'Madhya Pradesh',
    postal: '452001',
    timezone: 'IST (UTC+5:30)',
    ianaTimezone: 'Asia/Kolkata',
    email: 'hello@urbrand360.com',
    phone: 'TODO: +91 XXXXX XXXXX',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop',
    coordinates: '22.7196° N, 75.8577° E',
    highlights: ['Headquarters & Strategy Hub', 'Cross-Border Execution', 'Remote-First Worldwide Delivery'],
  },
];
