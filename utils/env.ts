export const env = {
  SITE_NAME: process.env.NEXT_PUBLIC_SITE_NAME || 'Default Site',
  DEFAULT_LOCALE: process.env.NEXT_PUBLIC_DEFAULT_LOCALE || 'en',
  TOTAL_SECTIONS: process.env.NEXT_PUBLIC_TOTAL_SECTIONS || '7',

  CONTACT: {
    API: process.env.NEXT_PUBLIC_CONTACT_API || 'http://localhost:3000/api/contact',
    PHONE: process.env.NEXT_PUBLIC_CONTACT_PHONE,
    EMAIL: process.env.NEXT_PUBLIC_CONTACT_EMAIL,
    TELEGRAM: process.env.NEXT_PUBLIC_CONTACT_TELEGRAM,
    GITHUB: process.env.NEXT_PUBLIC_CONTACT_GITHUB,
    LINKEDIN: process.env.NEXT_PUBLIC_CONTACT_LINKEDIN,
    WHATSAPP: process.env.NEXT_PUBLIC_CONTACT_WHATSAPP,
    UPWORK: process.env.NEXT_PUBLIC_CONTACT_UPWORK,
  },
};
