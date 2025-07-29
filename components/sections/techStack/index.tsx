'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import clsx from 'clsx';
import StorySectionWrapper from '../../../HOC/storySectionWrapper';

type Category = 'all' | 'frontend' | 'backend' | 'tools';

interface TechItem {
  name: string;
  emoji: string;
  category: Category;
}

const techItems: TechItem[] = [
  { name: 'React', emoji: '⚛️', category: 'frontend' },
  { name: 'Vue.js', emoji: '💚', category: 'frontend' },
  { name: 'JavaScript', emoji: '⚡', category: 'frontend' },
  { name: 'TypeScript', emoji: '🔷', category: 'frontend' },
  { name: 'Tailwind CSS', emoji: '🎨', category: 'frontend' },
  { name: 'React Native', emoji: '📱', category: 'frontend' },

  { name: 'Node.js', emoji: '🟢', category: 'backend' },
  { name: 'Python', emoji: '🐍', category: 'backend' },
  { name: 'MongoDB', emoji: '🗄️', category: 'backend' },
  { name: 'PostgreSQL', emoji: '🐘', category: 'backend' },
  { name: 'Express.js', emoji: '🔥', category: 'backend' },

  { name: 'AWS', emoji: '☁️', category: 'tools' },
  { name: 'Docker', emoji: '🐳', category: 'tools' },
  { name: 'Git', emoji: '🔧', category: 'tools' },
  { name: 'Vercel', emoji: '🚀', category: 'tools' },
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
    <StorySectionWrapper sectionId={3}>
      <div className="max-w-7xl mx-auto px-4">
        <h2
          className="font-serif text-3xl md:text-4xl lg:text-6xl font-light text-slate-900 dark:text-slate-100 text-center mb-8 md:mb-12"
          data-en="Tech Stack"
          data-es="Stack Tecnológico"
        >
          {t('title')}
        </h2>

        {/* Filter Buttons */}
        <div className="block md:hidden mb-4">
          <select
            value={selected}
            onChange={e => setSelected(e.target.value as Category)}
            className="w-full px-4 py-2 rounded-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
          >
            {categories.map(cat => (
              <option key={cat.value} value={cat.value}>
                {t(cat.value)}
              </option>
            ))}
          </select>
        </div>
        <div className="hidden md:flex justify-center mb-8 md:mb-12">
          <div className="flex flex-wrap gap-2 md:gap-4 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-full p-2 border border-slate-200 dark:border-slate-700">
            {categories.map(cat => (
              <button
                key={cat.value}
                className={clsx(
                  'tech-filter px-4 md:px-6 py-2 rounded-full text-sm md:text-base font-sans transition-all duration-300',
                  selected === cat.value
                    ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100',
                )}
                onClick={() => setSelected(cat.value)}
                data-en={cat.label}
                data-es={cat.label === 'All' ? 'Todo' : cat.label}
                data-filter={cat.value}
                aria-pressed={selected === cat.value}
              >
                {t(cat.value)}
              </button>
            ))}
          </div>
        </div>

        {/* Tech Grid */}
        <div className="example tech-grid grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 lg:gap-8 mb-8 md:mb-12">
          {techItems
            .filter(item => selected === 'all' || item.category === selected)
            .map((item, idx) => (
              <div
                key={item.name}
                className="tech-item group cursor-pointer transform transition-all duration-300 hover:scale-105"
                style={{ transitionDelay: `${idx * 40}ms` }}
                data-category={item.category}
              >
                <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-slate-200 dark:border-slate-700 rounded-xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-all">
                  <div className="flex flex-col items-center space-y-3">
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-900/30 dark:to-slate-800/30 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <span className="text-xl md:text-2xl">{item.emoji}</span>
                    </div>
                    <span
                      className="font-sans text-sm md:text-base font-medium text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-slate-100 transition-colors duration-300"
                      data-en={item.name}
                      data-es={item.name}
                    >
                      {item.name}
                    </span>
                  </div>
                </div>
              </div>
            ))}
        </div>

        <div className="w-16 h-0.5 bg-slate-400 dark:bg-slate-500 mx-auto" />
      </div>
    </StorySectionWrapper>
  );
}
