import type { Locale } from './locale';

export function isBookingPath(pathname: string): boolean {
  return /^\/(en|hy|ru)\/booking\/?$/.test(pathname);
}

export function toggleBookingPath(pathname: string, locale: Locale): string {
  return isBookingPath(pathname) ? `/${locale}` : `/${locale}/booking`;
}
