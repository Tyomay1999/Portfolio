'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import StorySectionWrapper from '@/HOC/storySectionWrapper';
import TypingText from './typingText';
import ContactIcons from '@/components/contact/contactIcons';

const HeroSections: React.FC = () => {
  const t = useTranslations();
  const typingPhrases = t.raw('typingPhrases') as string[];

  return (
    <StorySectionWrapper sectionId={-1}>
      <div className="fixed inset-0">
        <div className="mx-auto flex h-full w-full max-w-[1200px] items-center justify-center px-4 pb-[calc(env(safe-area-inset-bottom,0px)+0.5rem)] pt-[calc(env(safe-area-inset-top,0px)+0.5rem)] text-center sm:px-6 md:px-12 lg:px-16 xl:px-20">
          <div className="hero-parallax w-full">
            <h1 className="mb-4 font-serif text-4xl font-light leading-tight tracking-wide text-slate-900 drop-shadow-sm dark:text-slate-100 md:text-6xl lg:text-7xl">
              {t('welcomeTxt')} <span className="whitespace-nowrap">( Tyomay )</span>
            </h1>

            <div className="mt-4 flex h-8 items-center justify-center md:mt-6 md:h-10">
              <TypingText phrases={typingPhrases} />
            </div>

            <div className="px-2 sm:px-4 md:px-6">
              <ContactIcons />
            </div>
            <div className="mx-auto mt-8 h-0.5 w-24 bg-slate-300 dark:bg-slate-600" />
            <h2 className="mt-6 font-sans text-lg tracking-wide text-slate-600 dark:text-slate-400 md:text-xl">
              Full-Stack Web Developer (Architect)
            </h2>
          </div>
        </div>
      </div>
    </StorySectionWrapper>
  );
};

export default HeroSections;
