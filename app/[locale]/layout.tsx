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
  return languages.map((lang) => ({ locale: lang }));
}

export async function generateMetadata(
  { params }: Pick<Props, "params">
): Promise<Metadata> {

  const fallbackLocale = 'en';
  const resolvedParams = await params;
  const locale = languages.includes(resolvedParams.locale)
    ? resolvedParams.locale
    : fallbackLocale;

  const t = await getTranslations({ locale });

  return {
    metadataBase: new URL('https://yourdomain.com'),
    title: t('seo.home.title'),
    description: t('seo.home.description'),
    keywords: t('seo.home.keywords'),
    openGraph: {
      title: t('seo.home.title'),
      description: t('seo.home.description'),
      url: `https://yourdomain.com/${locale}`,
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: 'Artyom Portfolio',
        },
      ],
    },
    alternates: {
      canonical: `https://yourdomain.com/${locale}`,
      languages: {
        en: 'https://yourdomain.com/en',
        ru: 'https://yourdomain.com/ru',
        hy: 'https://yourdomain.com/hy',
      },
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const fallbackLocale = 'en';

  const resolvedParams = await params;

  const locale = languages.includes(resolvedParams.locale)
    ? resolvedParams.locale
    : fallbackLocale;

  const messages = await getMessages({ locale });

  return (
    <html lang={locale} suppressHydrationWarning>
    <body className="overflow-x-hidden bg-white text-slate-800 transition-colors duration-300 dark:bg-slate-900 dark:text-slate-200">
    <Providers>
      <NextIntlClientProvider messages={messages}>
        {children}
      </NextIntlClientProvider>
    </Providers>
    </body>
    </html>
  );
}
