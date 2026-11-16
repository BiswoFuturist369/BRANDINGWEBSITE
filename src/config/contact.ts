// URBrand 360 - Contact Information Configuration
// Official contact details with TODO placeholders as required by the brand guidelines

export interface ContactConfig {
  companyName: string;
  tagline: string;
  headquarters: string;
  reach: string;
  email: string;
  phone: string;
  whatsapp: string;
  calendarUrl: string;
  website: string;
  domain: string;
  social: {
    linkedin: string;
    instagram: string;
    twitter: string;
  };
  officeAddress: {
    city: string;
    state: string;
    country: string;
    note: string;
  };
}

export const contactConfig: ContactConfig = {
  companyName: "URBrand 360",
  tagline: "Where Vision Meets Strategy",
  headquarters: "Indore, Madhya Pradesh, India",
  reach: "Indore, India · Working worldwide",
  email: "hello@urbrand360.com",
  phone: "+91 91313 53596",
  whatsapp: "+91 91313 53596",
  calendarUrl: "https://calendar.app.google/4U87pAwTRdixg25Y7",
  website: "https://urbrand360.com",
  domain: "urbrand360.com",
  social: {
    linkedin: "https://linkedin.com/company/urbrand360",
    instagram: "https://instagram.com/urbrand360",
    twitter: "https://twitter.com/urbrand360",
  },
  officeAddress: {
    city: "Indore",
    state: "Madhya Pradesh",
    country: "India",
    note: "Remote-first team serving brands worldwide",
  },
};

