import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '@/config';
import type { RequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }: { locale?: string }): Promise<RequestConfig> => {
  if (!locale || !locales.includes(locale)) notFound();

  return {
    messages: (await import(`@/messages/${locale}.json`)).default,
  };
});
