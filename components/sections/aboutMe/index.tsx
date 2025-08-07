'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import StorySectionWrapper from '@/HOC/storySectionWrapper';

const AboutMe: React.FC = () => {
  const t = useTranslations('summary');

  return (
    <StorySectionWrapper sectionId={0}>
      <div className="text-my-light-text dark:text-my-dark-text mx-auto max-w-3xl px-2 sm:px-4 text-center transition-colors duration-300">
        <h1 className="mb-8 font-serif text-3xl font-light text-slate-900 dark:text-slate-100 md:mb-12 md:text-4xl lg:text-6xl">
          {t('aboutMe')}
        </h1>

        <div className="space-y-6 font-sans text-base leading-relaxed text-slate-700 dark:text-slate-300 md:space-y-8 md:text-lg lg:text-xl">
          <p className="mb-6 text-justify">{t('intro')}</p>
          <p className="mb-6 text-justify">{t('specialization')}</p>

          <ul className="mb-6 ml-4 sm:ml-6 list-disc space-y-2 pl-5 text-justify">
            <li>{t('experience.list1')}</li>
            <li>{t('experience.list2')}</li>
            <li>{t('experience.list3')}</li>
            <li>{t('experience.list4')}</li>
            <li>{t('experience.list5')}</li>
          </ul>

          <p className="text-justify italic">{t('focus')}</p>
        </div>

        <div className="mx-auto mt-8 h-0.5 w-24 bg-slate-300 dark:bg-slate-600" />
      </div>
    </StorySectionWrapper>
  );
};

export default AboutMe;