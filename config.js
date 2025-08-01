const { env } = require('@/utils/env') ;

const locales = ['en', 'hy', 'ru'];
const defaultLocale = env.DEFAULT_LOCALE;

module.exports = {
  locales,
  defaultLocale,
};
