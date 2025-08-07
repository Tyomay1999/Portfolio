'use client';

import React, { useState, ChangeEvent } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import clsx from 'clsx';
import StorySectionWrapper from '@/HOC/storySectionWrapper';
import {
  categories,
  Category,
  getFilteredItems,
  getVisibleItems,
  shouldShowButton,
  getNextStep,
  getButtonLabel,
  techItems,
} from './utils';

const TechStack: React.FC = () => {
  const t = useTranslations('techStack');
  const [selected, setSelected] = useState<Category>('all');
  const [step, setStep] = useState<0 | 1 | 2>(0);

  const filtered = getFilteredItems(techItems, selected);
  const visible = getVisibleItems(filtered, step);
  const showButton = shouldShowButton(filtered);
  const buttonText = getButtonLabel(step, filtered.length, t);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelected(e.target.value as Category);
    setStep(0);
  };

  return (
    <StorySectionWrapper sectionId={3} innerClassName="max-w-7xl mx-auto px-4">
      <h2 className="mb-8 text-center font-serif text-3xl font-light text-slate-900 dark:text-slate-100 md:mb-12 md:text-4xl lg:text-6xl">
        {t('title')}
      </h2>

      {/* Mobile Filters */}
      <div className="mb-6 block md:hidden">
        <select
          value={selected}
          onChange={handleChange}
          className="w-full rounded-full border border-slate-300 bg-white px-4 py-2 text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
        >
          {categories.map(cat => (
            <option key={cat.value} value={cat.value}>
              {t(cat.value)}
            </option>
          ))}
        </select>
      </div>

      {/* Desktop Filters */}
      <div className="mb-12 hidden justify-center md:flex">
        <div className="flex flex-wrap gap-2 rounded-full border border-slate-200 bg-white/50 p-2 backdrop-blur-sm dark:border-slate-700 dark:bg-slate-800/50 md:gap-4">
          {categories.map(cat => (
            <button
              key={cat.value}
              className={clsx(
                'rounded-full px-4 py-2 font-sans text-sm transition-all duration-300 md:px-6 md:text-base',
                selected === cat.value
                  ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-black'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white',
              )}
              onClick={() => {
                setSelected(cat.value);
                setStep(0);
              }}
              aria-pressed={selected === cat.value}
            >
              {t(cat.value)}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="mb-8 grid min-h-[50vh] grid-cols-2 gap-4 md:mb-12 md:grid-cols-3 md:gap-6 lg:grid-cols-4 lg:gap-8 xl:grid-cols-5">
        {visible.map((item, idx) => (
          <div
            key={item.name}
            className="tech-item group cursor-pointer transition duration-300"
            style={{ transitionDelay: `${idx * 40}ms` }}
          >
            <div className="transform rounded-xl border border-slate-200 bg-white/70 p-4 shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-white hover:shadow-xl dark:border-slate-700 dark:bg-slate-800/70 dark:hover:bg-slate-800 md:p-6">
              <div className="flex flex-col items-center space-y-3">
                <div
                  className={clsx(
                    'flex h-12 w-12 items-center justify-center rounded-lg transition-transform duration-300 group-hover:scale-110 md:h-16 md:w-16',
                    `bg-gradient-to-br ${item.colorClass}`,
                  )}
                >
                  <Image
                    src={item.icon}
                    alt={item.name}
                    width={32}
                    height={32}
                    className="h-6 w-6 object-contain transition-transform duration-300 group-hover:scale-110 md:h-8 md:w-8"
                  />
                </div>
                <span className="font-sans text-sm font-medium text-slate-700 transition-colors duration-300 group-hover:text-slate-900 dark:text-slate-300 dark:group-hover:text-white md:text-base">
                  {item.name}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showButton && (
        <div className="pb-12 text-center">
          <button
            onClick={() => setStep(getNextStep(step, filtered.length))}
            className="rounded-full border border-slate-300 px-6 py-3 font-sans text-slate-900 transition duration-300 hover:bg-slate-50 dark:border-slate-600 dark:text-white dark:hover:bg-slate-800"
          >
            {buttonText}
          </button>
        </div>
      )}
    </StorySectionWrapper>
  );
};

export default TechStack;
