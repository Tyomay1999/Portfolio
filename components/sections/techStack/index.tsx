'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import clsx from 'clsx';
import StorySectionWrapper from '@/HOC/storySectionWrapper';

type Category = 'all' | 'frontend' | 'backend' | 'tools';

interface TechItem {
  name: string;
  emoji: string;
  category: Category;
  colorClass: string;
}

const techItems: TechItem[] = [
  {
    name: 'React',
    emoji: '⚛️',
    category: 'frontend',
    colorClass: 'from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30',
  },
  {
    name: 'Vue.js',
    emoji: '💚',
    category: 'frontend',
    colorClass: 'from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30',
  },
  {
    name: 'JavaScript',
    emoji: '⚡',
    category: 'frontend',
    colorClass: 'from-yellow-100 to-yellow-200 dark:from-yellow-900/30 dark:to-yellow-800/30',
  },
  {
    name: 'TypeScript',
    emoji: '🔷',
    category: 'frontend',
    colorClass: 'from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30',
  },
  {
    name: 'Tailwind CSS',
    emoji: '🎨',
    category: 'frontend',
    colorClass: 'from-cyan-100 to-cyan-200 dark:from-cyan-900/30 dark:to-cyan-800/30',
  },
  {
    name: 'React Native',
    emoji: '📱',
    category: 'frontend',
    colorClass: 'from-purple-100 to-purple-200 dark:from-purple-900/30 dark:to-purple-800/30',
  },

  {
    name: 'Node.js',
    emoji: '🟢',
    category: 'backend',
    colorClass: 'from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30',
  },
  {
    name: 'Python',
    emoji: '🐍',
    category: 'backend',
    colorClass: 'from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30',
  },
  {
    name: 'MongoDB',
    emoji: '🗄️',
    category: 'backend',
    colorClass: 'from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30',
  },
  {
    name: 'PostgreSQL',
    emoji: '🐘',
    category: 'backend',
    colorClass: 'from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30',
  },
  {
    name: 'Express.js',
    emoji: '🔥',
    category: 'backend',
    colorClass: 'from-red-100 to-red-200 dark:from-red-900/30 dark:to-red-800/30',
  },

  {
    name: 'AWS',
    emoji: '☁️',
    category: 'tools',
    colorClass: 'from-orange-100 to-orange-200 dark:from-orange-900/30 dark:to-orange-800/30',
  },
  {
    name: 'Docker',
    emoji: '🐳',
    category: 'tools',
    colorClass: 'from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30',
  },
  {
    name: 'Git',
    emoji: '🔧',
    category: 'tools',
    colorClass: 'from-gray-100 to-gray-200 dark:from-gray-900/30 dark:to-gray-800/30',
  },
  {
    name: 'Vercel',
    emoji: '🚀',
    category: 'tools',
    colorClass: 'from-indigo-100 to-indigo-200 dark:from-indigo-900/30 dark:to-indigo-800/30',
  },
];

const categories: { label: string; value: Category }[] = [
  { label: 'All', value: 'all' },
  { label: 'Frontend', value: 'frontend' },
  { label: 'Backend', value: 'backend' },
  { label: 'Tools', value: 'tools' },
];

export default function TechStack() {
  const [selected, setSelected] = useState<Category>('all');
  const t = useTranslations('techStack');

  return (
    <StorySectionWrapper sectionId={3} innerClassName="max-w-7xl mx-auto px-4">
      <h2 className="font-serif text-3xl md:text-4xl lg:text-6xl font-light text-slate-900 dark:text-slate-100 text-center mb-8 md:mb-12">
        {t('title')}
      </h2>

      {/* Filters */}
      <div className="block md:hidden mb-6">
        <select
          value={selected}
          onChange={e => setSelected(e.target.value as Category)}
          className="w-full px-4 py-2 rounded-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-white"
        >
          {categories.map(cat => (
            <option key={cat.value} value={cat.value}>
              {t(cat.value)}
            </option>
          ))}
        </select>
      </div>

      <div className="hidden md:flex justify-center mb-12">
        <div className="flex flex-wrap gap-2 md:gap-4 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-full p-2 border border-slate-200 dark:border-slate-700">
          {categories.map(cat => (
            <button
              key={cat.value}
              className={clsx(
                'px-4 md:px-6 py-2 rounded-full text-sm md:text-base font-sans transition-all duration-300',
                selected === cat.value
                  ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-black'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white',
              )}
              onClick={() => setSelected(cat.value)}
              aria-pressed={selected === cat.value}
              data-filter={cat.value}
            >
              {t(cat.value)}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 lg:gap-8 mb-8 md:mb-12">
        {techItems
          .filter(item => selected === 'all' || item.category === selected)
          .map((item, idx) => (
            <div
              key={item.name}
              className="tech-item group cursor-pointer transition duration-300"
              style={{ transitionDelay: `${idx * 40}ms` }}
            >
              <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-slate-200 dark:border-slate-700 rounded-xl p-4 md:p-6 shadow-lg hover:shadow-xl transform hover:scale-105 hover:bg-white dark:hover:bg-slate-800 transition-all duration-300">
                <div className="flex flex-col items-center space-y-3">
                  <div
                    className={clsx(
                      'w-12 h-12 md:w-16 md:h-16 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300',
                      `bg-gradient-to-br ${item.colorClass}`,
                    )}
                  >
                    <span className="text-xl md:text-2xl">{item.emoji}</span>
                  </div>
                  <span className="font-sans text-sm md:text-base font-medium text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors duration-300">
                    {item.name}
                  </span>
                </div>
              </div>
            </div>
          ))}
      </div>

      <div className="w-24 h-0.5 bg-slate-300 dark:bg-slate-600 mx-auto mt-8" />
    </StorySectionWrapper>
  );
}
