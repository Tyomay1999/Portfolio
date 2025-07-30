'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import StorySectionWrapper from '@/HOC/storySectionWrapper';

const HeroSections = () => {
  const t = useTranslations();

  return (
    <StorySectionWrapper sectionId={-1}>
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="text-center hero-parallax">
          <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl font-light text-slate-900 dark:text-slate-100 tracking-wide drop-shadow-sm">
            {t('welcomeTxt')}
          </h1>

          <div className="w-24 h-0.5 bg-slate-300 dark:bg-slate-600 mx-auto mt-8" />

          <p className="font-sans text-lg md:text-xl text-slate-600 dark:text-slate-400 mt-6 tracking-wide">
            Full Stack Web Architect
          </p>
        </div>
      </div>
    </StorySectionWrapper>
  );
};

export default HeroSections;
