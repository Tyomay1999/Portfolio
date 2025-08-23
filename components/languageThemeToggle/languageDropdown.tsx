'use client';

import React, { useEffect, useRef, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const supportedLanguages = ['en', 'hy', 'ru'] as const;
export type SupportedLanguage = (typeof supportedLanguages)[number];

export default function LanguageDropdown() {
  const router = useRouter();
  const pathname = usePathname() || '/en';
  const searchParams = useSearchParams();

  const [language, setLanguage] = useState<SupportedLanguage>('en');
  const [mounted, setMounted] = useState(false);

  const [ddOpen, setDdOpen] = useState(false);
  const ddRef = useRef<HTMLDivElement | null>(null);

  const extractLocaleFromPathname = (path: string): SupportedLanguage => {
    const m = path.match(/^\/(en|hy|ru)(?=\/|$)/);
    return (m?.[1] as SupportedLanguage) || 'en';
  };

  const buildPathForLocale = (loc: SupportedLanguage) => {
    const stripped = pathname.replace(/^\/(en|hy|ru)(?=\/|$)/, '');
    let nextPath = `/${loc}${stripped || '/'}`;
    const qs = searchParams?.toString();
    if (qs) nextPath += `?${qs}`;
    if (typeof window !== 'undefined' && window.location.hash) {
      nextPath += window.location.hash;
    }
    return nextPath;
  };

  useEffect(() => {
    const current = extractLocaleFromPathname(pathname);
    setLanguage(current);
    localStorage.setItem('language', current);
    setMounted(true);
  }, [pathname]);

  // close on click outside
  useEffect(() => {
    if (!ddOpen) return;
    const onDoc = (e: MouseEvent) => {
      if (ddRef.current && !ddRef.current.contains(e.target as Node)) setDdOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [ddOpen]);

  // close on ESC
  useEffect(() => {
    if (!ddOpen) return;
    const onEsc = (e: KeyboardEvent) => e.key === 'Escape' && setDdOpen(false);
    window.addEventListener('keydown', onEsc);
    return () => window.removeEventListener('keydown', onEsc);
  }, [ddOpen]);

  const applyLanguage = (loc: SupportedLanguage) => {
    setLanguage(loc);
    localStorage.setItem('language', loc);
    document.cookie = `NEXT_LOCALE=${loc}; Path=/; Max-Age=31536000; SameSite=Lax`;
    router.push(buildPathForLocale(loc));
    setDdOpen(false);
  };

  if (!mounted) return null;

  return (
    <div ref={ddRef} className="relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={ddOpen}
        aria-controls="lang-listbox"
        onClick={() => setDdOpen(v => !v)}
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setDdOpen(v => !v);
          }
          if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            e.preventDefault();
            setDdOpen(true);
          }
        }}
        className="flex min-w-[92px] items-center justify-between rounded-lg border border-slate-200 bg-white/80 px-3 py-2 text-sm text-slate-900 backdrop-blur-sm transition focus:outline-none focus:ring-2 focus:ring-slate-400 dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-100 dark:[color-scheme:dark]"
      >
        <span className="font-medium">{language.toUpperCase()}</span>
        <span className="ml-2">▾</span>
      </button>

      {ddOpen && (
        <div
          id="lang-listbox"
          role="listbox"
          className="absolute left-0 z-50 mt-1 max-h-60 w-[140px] overflow-auto rounded-xl border border-slate-200 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-900 dark:[color-scheme:dark]"
        >
          {supportedLanguages.map(loc => {
            const active = loc === language;
            return (
              <button
                key={loc}
                type="button"
                role="option"
                aria-selected={active}
                onClick={() => applyLanguage(loc)}
                className={[
                  'w-full px-4 py-2.5 text-left text-sm focus:outline-none',
                  'text-slate-900 dark:text-slate-100',
                  active
                    ? 'bg-blue-50 dark:bg-blue-950/40'
                    : 'hover:bg-blue-50 dark:hover:bg-slate-800/70',
                ].join(' ')}
              >
                {loc.toUpperCase()}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
