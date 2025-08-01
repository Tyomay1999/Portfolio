'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import StorySectionWrapper from '@/HOC/storySectionWrapper';

const HeroSections = () => {
  const t = useTranslations();

  return (
    <StorySectionWrapper sectionId={-1}>
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="hero-parallax text-center">
          <h1 className="font-serif text-6xl font-light tracking-wide text-slate-900 drop-shadow-sm dark:text-slate-100 md:text-8xl lg:text-9xl">
            {t('welcomeTxt')}
          </h1>

          <div className="mx-auto mt-8 h-0.5 w-24 bg-slate-300 dark:bg-slate-600" />

          <p className="mt-6 font-sans text-lg tracking-wide text-slate-600 dark:text-slate-400 md:text-xl">
            Full Stack Web Architect
          </p>
        </div>
      </div>
    </StorySectionWrapper>
  );
};

export default HeroSections;
