import { ReactNode } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { languages } from '../../i18n/settings';
import './globals.scss';

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
    <html lang={locale}>
      <body className="bg-white text-black dark:bg-slate-900 dark:text-white transition-colors duration-500">
        <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
