import { NextIntlClientProvider } from 'next-intl';
import { ReactNode } from 'react';
import { getMessages } from 'next-intl/server';
import { languages } from '../../i18n/settings';

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
      <body>
        <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
