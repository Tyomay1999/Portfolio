'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Index() {
  const router = useRouter();
  const [language, setLanguage] = useState('en');
  const [theme, setTheme] = useState('light');

  const changeLanguage = e => {
    const selected = e.target.value;
    setLanguage(selected);
    localStorage.setItem('language', selected);
    document.cookie = `language=${selected}; path=/; max-age=31536000`;

    const newPath = `/${selected}`;
    router.push(newPath);
  };

  useEffect(() => {
    const storedLang = localStorage.getItem('language') || 'en';
    const storedTheme = localStorage.getItem('theme') || 'light';
    changeLanguage({ target: { value: storedLang } });
    setTheme(storedTheme);

    const root = document.documentElement;
    root.classList.remove('dark', 'light');
    root.classList.add(storedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);

    const root = document.documentElement;
    if (newTheme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
    }
  };

  return (
    <div className="fixed top-6 right-6 z-50 flex items-center space-x-4">
      <select
        value={language}
        onChange={changeLanguage}
        className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
      >
        <option value="en">EN</option>
        <option value="hy">HY</option>
        <option value="ru">RU</option>
      </select>

      <button
        onClick={toggleTheme}
        className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200 dark:border-slate-700 rounded-lg p-2 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
      >
        {theme === 'dark' ? (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
            />
          </svg>
        )}
      </button>
    </div>
  );
}
