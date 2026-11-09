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
  website: string;
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
  email: "TODO: hello@urbrand360.com",
  phone: "TODO: +91 XXXXX XXXXX",
  whatsapp: "TODO: +91 XXXXX XXXXX",
  website: "https://urbrand360.com",
  social: {
    linkedin: "TODO: https://linkedin.com/company/urbrand360",
    instagram: "TODO: https://instagram.com/urbrand360",
    twitter: "TODO: https://twitter.com/urbrand360",
  },
  officeAddress: {
    city: "Indore",
    state: "Madhya Pradesh",
    country: "India",
    note: "Remote-first studio serving brands worldwide",
  },
};

