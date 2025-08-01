'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { usePathname, useRouter } from 'next/navigation';

const supportedLanguages = ['en', 'hy', 'ru'] as const;

const LanguageThemeToggle: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  const [language, setLanguage] = useState<string>('en');
  const [mounted, setMounted] = useState<boolean>(false);

  const extractLocaleFromPathname = (path: string): string => {
    const firstSegment = path.split('/')[1];
    return supportedLanguages.includes(firstSegment as any) ? firstSegment : 'en';
  };

  useEffect(() => {
    const currentLangFromURL = extractLocaleFromPathname(pathname);
    setLanguage(currentLangFromURL);
    localStorage.setItem('language', currentLangFromURL);
    setMounted(true);
  }, [pathname]);

  const changeLanguage = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const selected = e.target.value;
    setLanguage(selected);
    localStorage.setItem('language', selected);
    document.cookie = `language=${selected}; path=/; max-age=31536000`;

    router.push(`/${selected}`);
  };

  const toggleTheme = (): void => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  };

  if (!mounted) return null;

  return (
    <div className="fixed right-6 top-6 z-50 flex items-center space-x-4">
      <select
        value={language}
        onChange={changeLanguage}
        id="languageSelect"
        aria-label="Change language"
        className="rounded-lg border border-slate-200 bg-white/80 px-3 py-2 text-sm backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-slate-400 dark:border-slate-700 dark:bg-slate-800/80"
      >
        {supportedLanguages.map(lang => (
          <option key={lang} value={lang}>
            {lang.toUpperCase()}
          </option>
        ))}
      </select>

      <button
        onClick={toggleTheme}
        id="themeToggle"
        aria-label="Toggle theme"
        className="rounded-lg border border-slate-200 bg-white/80 p-2 backdrop-blur-sm transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800/80 dark:hover:bg-slate-700"
      >
        {theme === 'dark' ? (
          <svg className="hidden h-5 w-5 dark:block" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
            />
          </svg>
        ) : (
          <svg className="block h-5 w-5 dark:hidden" fill="currentColor" viewBox="0 0 20 20">
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
        )}
      </button>
    </div>
  );
};

export default LanguageThemeToggle;
