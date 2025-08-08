import { ReactNode } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { languages } from '@/i18n/settings';
import { Providers } from './provider';
import './globals.css';
import type { Metadata } from 'next';

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateStaticParams() {
  return languages.map(lang => ({ locale: lang }));
}

export async function generateMetadata({ params }: Pick<Props, 'params'>): Promise<Metadata> {
  const fallbackLocale = 'en';
  const resolvedParams = await params;
  const locale = languages.includes(resolvedParams.locale) ? resolvedParams.locale : fallbackLocale;

  const t = await getTranslations({ locale });

  return {
    metadataBase: new URL('https://tyomay.dev'),
    title: t('seo.home.title'),
    description: t('seo.home.description'),
    keywords: t('seo.home.keywords'),
    openGraph: {
      title: t('seo.home.title'),
      description: t('seo.home.description'),
      url: `https://tyomay.dev/${locale}`,
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: 'Artyom Portfolio',
        },
      ],
    },
    icons: {
      icon: [
        { url: '/favicon.ico' },
        { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
        { url: '/favicon.svg', type: 'image/svg+xml' },
        { url: '/apple-touch-icon.png', sizes: '180x180', rel: 'apple-touch-icon' },
      ],
    },
    manifest: '/site.webmanifest',
    alternates: {
      canonical: `https://tyomay.dev/${locale}`,
      languages: {
        en: 'https://tyomay.dev/en',
        ru: 'https://tyomay.dev/ru',
        hy: 'https://tyomay.dev/hy',
      },
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const fallbackLocale = 'en';

  const resolvedParams = await params;

  const locale = languages.includes(resolvedParams.locale) ? resolvedParams.locale : fallbackLocale;

  const messages = await getMessages({ locale });

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className="min-h-[100dvh] overflow-x-hidden bg-white text-slate-800 transition-colors duration-300 dark:bg-slate-900 dark:text-slate-200">
        <Providers>
          <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  );
}
