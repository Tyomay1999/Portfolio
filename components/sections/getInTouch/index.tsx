'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { setActiveSection } from '@/lib/sectionStore';
import StorySectionWrapper from '@/HOC/storySectionWrapper';
import ContactIcons from '@/components/contact/contactIcons';

export default function CallToActionSection(): JSX.Element {
  const t = useTranslations('callToAction');

  const handleClick = (): void => setActiveSection(4);

  return (
    <StorySectionWrapper sectionId={7} innerClassName="max-w-3xl mx-auto text-center px-4">
      <h2 className="mb-8 font-serif text-3xl font-light text-slate-900 dark:text-slate-100 md:mb-12 md:text-4xl lg:text-6xl">
        {t('title')}
      </h2>

      <p className="mx-auto mb-8 max-w-2xl font-sans text-lg leading-relaxed text-slate-700 dark:text-slate-300 md:mb-12 md:text-xl">
        {t('subtitle')}
      </p>

      <button
        onClick={handleClick}
        className="mb-8 transform rounded-lg bg-slate-900 px-8 py-4 font-sans text-lg text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-slate-800 hover:shadow-xl dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200 md:px-12 md:py-5 md:text-xl"
      >
        {t('button')}
      </button>

      {/*<div className="mt-8 md:mt-12">*/}
      {/*  <p className="font-sans text-sm text-slate-500 dark:text-slate-400 md:text-base">*/}
      {/*    {t('hint')}*/}
      {/*  </p>*/}
      {/*</div>*/}
      <ContactIcons />

      <div className="mx-auto h-0.5 w-12 bg-slate-400 dark:bg-slate-500 md:mt-12" />
    </StorySectionWrapper>
  );
}
