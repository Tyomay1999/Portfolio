import { ReactNode } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { languages } from '@/i18n/settings';
import { Providers } from './provider';
import './globals.css';

type Props = {
  children: ReactNode;
  params?: { locale: string };
};

export async function generateStaticParams() {
  return languages.map(lang => ({ locale: lang }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const fallbackLocale = 'en';
  const delta = await params;

  const locale = delta?.locale && languages.includes(delta.locale) ? delta.locale : fallbackLocale;

  const messages = await getMessages({ locale });

  return (
    <html lang={locale} suppressHydrationWarning>
      {/*<Head>*/}
      {/*    <link*/}
      {/*      href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@300;400;500;600;700&display=swap"*/}
      {/*      rel="stylesheet"*/}
      {/*    />*/}
      {/*    <title>Portfolio</title>*/}
      {/*</Head>*/}
      <body className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 overflow-x-hidden transition-colors duration-300">
        <Providers>
          <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  );
}
