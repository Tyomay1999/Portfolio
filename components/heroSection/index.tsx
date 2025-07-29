'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import StorySectionWrapper from '../../HOC/storySectionWrapper';

const HeroSections = () => {
  const t = useTranslations();

  return (
    <StorySectionWrapper sectionId={-1}>
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="text-center hero-parallax">
          <h1 className="text-slate-800 font-serif text-6xl md:text-8xl lg:text-9xl font-light tracking-wide drop-shadow-sm opacity-0 animate-fade-in delay-300 dark:text-slate-100">
            {t('welcomeTxt')}
          </h1>

          <div className="w-0 h-0.5 bg-slate-300 dark:bg-slate-600 mx-auto mt-8 animate-grow-line delay-500"></div>

          <p className="font-sans text-lg md:text-xl text-slate-600 dark:text-slate-400 mt-6 tracking-wide opacity-0 animate-fade-in delay-700">
            Full Stack Web Architect
          </p>
        </div>
      </div>
    </StorySectionWrapper>
  );
};

export default HeroSections;
