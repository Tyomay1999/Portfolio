import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['en', 'hy', 'ru'] as const;
const intlMiddleware = createMiddleware({
  locales,
  defaultLocale: 'en',
});

export default function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const pathname = url.pathname;
  const cookieLang = request.cookies.get('language')?.value || 'en';

  if (pathname === '/robots.txt' || pathname === '/sitemap.xml') {
    return NextResponse.next();
  }

  if (pathname === '/') {
    return NextResponse.redirect(new URL(`/${cookieLang}`, url));
  }

  const [, first, second, third] = pathname.split('/');
  const isLocale = locales.includes(first as (typeof locales)[number]);

  if (!isLocale) {
    return NextResponse.redirect(new URL(`/${cookieLang}`, url));
  }

  const isLocaleRoot = isLocale && !second;
  const isBookingExact = isLocale && second === 'booking' && !third;

  if (isLocaleRoot || isBookingExact) {
    return intlMiddleware(request);
  }

  return NextResponse.redirect(new URL(`/${first}`, url));
}

export const config = {
  matcher: ['/((?!_next|favicon\\.ico|api|assets|.*\\.(?:svg|png|jpg|jpeg|ico|xml|txt)$).*)'],
};
