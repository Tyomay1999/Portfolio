import { getRequestConfig } from 'next-intl/server';
import { languages, defaultLocale } from './i18n/settings';

export default getRequestConfig(async ({ locale }) => {
  if (!locale || !languages.includes(locale)) {
    // console.warn('⚠️ Skipped getRequestConfig: locale is missing or invalid:', locale);
    locale = defaultLocale;
  }
  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
