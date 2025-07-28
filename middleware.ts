import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['en', 'hy', 'ru'],
  defaultLocale: 'en',
});

export const config = {
  matcher: ['/', '/(en|hy|ru)/:path*'],
};
