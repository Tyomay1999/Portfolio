'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import StorySectionWrapper from '@/HOC/storySectionWrapper';

export default function AboutMe() {
  const t = useTranslations('summary');

  return (
    <StorySectionWrapper sectionId={0}>
      <div className="max-w-3xl mx-auto text-center px-4 text-my-light-text dark:text-my-dark-text transition-colors duration-300">
        <h1 className="font-serif text-3xl md:text-4xl lg:text-6xl font-light text-slate-900 dark:text-slate-100 mb-8 md:mb-12">
          {t('aboutMe')}
        </h1>
        <div className="space-y-6 md:space-y-8 text-base md:text-lg lg:text-xl leading-relaxed text-slate-700 dark:text-slate-300 font-sans">
          <p className="text-justify mb-6">{t('intro')}</p>
          <p className="text-justify mb-6">{t('specialization')}</p>

          <ul className="text-justify ml-10 list-disc pl-6 space-y-2 mb-6">
            <li>{t('experience.list1')}</li>
            <li>{t('experience.list2')}</li>
            <li>{t('experience.list3')}</li>
            <li>{t('experience.list4')}</li>
            <li>{t('experience.list5')}</li>
          </ul>

          <p className="text-justify italic">{t('focus')}</p>
        </div>
        <div className="w-24 h-0.5 bg-slate-300 dark:bg-slate-600 mx-auto mt-8" />
      </div>
    </StorySectionWrapper>
  );
}
