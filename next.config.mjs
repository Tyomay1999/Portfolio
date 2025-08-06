import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_CONTACT_API: process.env.NEXT_PUBLIC_CONTACT_API,
    NEXT_PUBLIC_CONTACT_PHONE: process.env.NEXT_PUBLIC_CONTACT_PHONE,
    NEXT_PUBLIC_CONTACT_EMAIL: process.env.NEXT_PUBLIC_CONTACT_EMAIL,
    NEXT_PUBLIC_CONTACT_TELEGRAM: process.env.NEXT_PUBLIC_CONTACT_TELEGRAM,
    NEXT_PUBLIC_CONTACT_GITHUB: process.env.NEXT_PUBLIC_CONTACT_GITHUB,
    NEXT_PUBLIC_CONTACT_LINKEDIN: process.env.NEXT_PUBLIC_CONTACT_LINKEDIN,
    NEXT_PUBLIC_CONTACT_WHATSAPP: process.env.NEXT_PUBLIC_CONTACT_WHATSAPP,
    NEXT_PUBLIC_CONTACT_UPWORK: process.env.NEXT_PUBLIC_CONTACT_UPWORK,
  }
};

const withNextIntl = createNextIntlPlugin('./i18n.ts');

export default withNextIntl(nextConfig);
