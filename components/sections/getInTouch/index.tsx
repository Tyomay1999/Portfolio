'use client';
import React from 'react';
import { useTranslations } from 'next-intl';
import { setActiveSection } from '@/lib/sectionStore';
import StorySectionWrapper from '@/HOC/storySectionWrapper';

export default function CallToActionSection() {
  const t = useTranslations('callToAction');

  const handleClick = () => setActiveSection(4);

  return (
    <StorySectionWrapper sectionId={7} innerClassName="max-w-3xl mx-auto text-center px-4">
      <h2 className="font-serif text-3xl md:text-4xl lg:text-6xl font-light text-slate-900 dark:text-slate-100 mb-8 md:mb-12">
        {t('title')}
      </h2>

      <p className="text-lg md:text-xl text-slate-700 dark:text-slate-300 font-sans leading-relaxed mb-8 md:mb-12 max-w-2xl mx-auto">
        {t('subtitle')}
      </p>

      <button
        onClick={handleClick}
        className="font-sans bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 px-8 md:px-12 py-4 md:py-5 text-lg md:text-xl rounded-lg hover:bg-slate-800 dark:hover:bg-slate-200 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
      >
        {t('button')}
      </button>

      <div className="mt-8 md:mt-12">
        <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base font-sans">
          {t('hint')}
        </p>
      </div>

      <div className="w-12 h-0.5 bg-slate-400 dark:bg-slate-500 mx-auto mt-8 md:mt-12" />
    </StorySectionWrapper>
  );
}
