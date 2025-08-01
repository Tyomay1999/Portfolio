import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const intlMiddleware = createMiddleware({
  locales: ['en', 'hy', 'ru'],
  defaultLocale: 'en',
});

const allowedLocales = ['en', 'hy', 'ru'];

export default function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const cookieLang = request.cookies.get('language')?.value || 'en';

  const isStaticFile = pathname === '/sitemap.xml' || pathname === '/robots.txt';

  if (isStaticFile) {
    return NextResponse.next();
  }

  const firstSegment = pathname.split('/')[1];
  const secondSegment = pathname.split('/')[2];

  const isValid = allowedLocales.includes(firstSegment) && !secondSegment;

  if (pathname === '/') {
    return NextResponse.redirect(new URL(`/${cookieLang}`, request.url));
  }

  if (!isValid) {
    return NextResponse.redirect(new URL(`/${cookieLang}`, request.url));
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: [
    '/((?!_next|favicon\\.ico|api|assets|.*\\.(?:svg|png|jpg|jpeg|ico|xml|txt)$).*)',
  ],
};
