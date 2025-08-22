export const SUPPORTED = ['en', 'hy', 'ru'] as const;
export type Locale = (typeof SUPPORTED)[number];

export function getLocaleFromPath(pathname: string): Locale {
  return (pathname.match(/^\/(en|hy|ru)(?=\/|$)/)?.[1] as Locale) ?? 'en';
}
