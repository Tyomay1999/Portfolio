// middleware.ts
import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['en', 'hy', 'ru'] as const;
const defaultLocale = 'en';

const intl = createMiddleware({
  locales,
  defaultLocale,
});

function normalizeLocale(v?: string) {
  if (!v) return undefined;
  const s = v.toLowerCase();
  return s === 'am' ? 'hy' : s;
}

function pickLocale(req: NextRequest): (typeof locales)[number] {
  const cookieRaw = req.cookies.get('language')?.value;
  const cookie = normalizeLocale(cookieRaw);
  if (cookie && (locales as readonly string[]).includes(cookie)) {
    return cookie as (typeof locales)[number];
  }

  const al = (req.headers.get('accept-language') || '').toLowerCase();
  if (al.includes('ru')) return 'ru';
  if (al.includes('hy') || al.includes('am')) return 'hy';
  return defaultLocale;
}

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Служебные файлы
  if (pathname === '/robots.txt' || pathname === '/sitemap.xml') {
    return NextResponse.next();
  }

  // Если локаль уже есть в пути — дальше обрабатывает next-intl
  const hasLocale = locales.some(l => pathname === `/${l}` || pathname.startsWith(`/${l}/`));
  if (hasLocale) {
    return intl(req);
  }

  // Нет локали → добавляем, сохранив path + query
  const locale = pickLocale(req);
  const url = req.nextUrl.clone();
  url.pathname = `/${locale}${pathname}`;

  const res = NextResponse.redirect(url, 308);
  res.headers.set('Vary', 'Accept-Language, Cookie');
  return res;
}

export const config = {
  matcher: ['/((?!_next|favicon\\.ico|api|assets|.*\\.(?:svg|png|jpg|jpeg|ico|xml|txt)$).*)'],
};
