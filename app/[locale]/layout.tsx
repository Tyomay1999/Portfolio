import { ReactNode } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { languages } from '@/i18n/settings';
import { Providers } from './provider';
import './globals.css';
import type { Metadata } from 'next';
import JsonLd from '@/app/[locale]/JsonLd';

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateStaticParams() {
  return languages.map(lang => ({ locale: lang }));
}

const SITE_URL = 'https://tyomay.dev';

const PERSON = {
  name: 'Artyom Bordulanyuk',
  givenName: 'Artyom',
  familyName: 'Bordulanyuk',
  username: 'tyomay',
  jobTitle: 'Full‑Stack Web Engineer',
  image: `${SITE_URL}/og-image.png`,
  sameAs: [
    'https://www.instagram.com/_tyomay_',
    'https://www.tiktok.com/@_tyomay_',
    'https://www.linkedin.com/in/tyomay',
    'https://github.com/Tyomay1999',
  ],
};

export async function generateMetadata({ params }: Pick<Props, 'params'>): Promise<Metadata> {
  const fallbackLocale = 'en';
  const resolvedParams = await params;
  const locale = languages.includes(resolvedParams.locale) ? resolvedParams.locale : fallbackLocale;

  const t = await getTranslations({ locale });

  const title = t('seo.home.title');
  const description = t('seo.home.description');
  const keywords = t('seo.home.keywords');

  const url = `${SITE_URL}/${locale}`;

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: title,
      template: `%s — ${PERSON.name}`,
    },
    description,
    keywords,
    alternates: {
      canonical: url,
      languages: {
        'x-default': SITE_URL,
        en: `${SITE_URL}/en`,
        ru: `${SITE_URL}/ru`,
        hy: `${SITE_URL}/hy`,
      },
    },

    openGraph: {
      type: 'profile',
      siteName: PERSON.name,
      title,
      description,
      url,
      locale,
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: `${PERSON.name} — Portfolio`,
        },
      ],
      firstName: PERSON.givenName,
      lastName: PERSON.familyName,
      username: PERSON.username,
    },

    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/og-image.png'],
      site: '@_tyomay_',
      creator: '@_tyomay_',
    },

    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        'max-snippet': -1,
        'max-image-preview': 'large',
        'max-video-preview': -1,
      },
    },

    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || '',
    },

    referrer: 'origin-when-cross-origin',

    icons: {
      icon: [
        { url: '/favicon.ico' },
        { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
        { url: '/favicon.svg', type: 'image/svg+xml' },
        { url: '/apple-touch-icon.png', sizes: '180x180', rel: 'apple-touch-icon' },
      ],
    },

    manifest: '/site.webmanifest',
    applicationName: PERSON.name,
    authors: [{ name: PERSON.name, url: SITE_URL }],
    creator: PERSON.name,
    publisher: PERSON.name,
    category: 'Technology',
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const fallbackLocale = 'en';

  const resolvedParams = await params;

  const locale = languages.includes(resolvedParams.locale) ? resolvedParams.locale : fallbackLocale;

  const messages = await getMessages({ locale });

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className="overflow-x-hidden bg-white text-slate-800 transition-colors duration-300 dark:bg-slate-900 dark:text-slate-200">
        <JsonLd locale={locale} />
        <Providers>
          <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  );
}
