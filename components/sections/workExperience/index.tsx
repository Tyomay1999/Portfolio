'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import StorySectionWrapper from '@/HOC/storySectionWrapper';

const workKeys = ['genieWeb', 'pixeria', 'beeOnCode1', 'instructor', 'beeOnCode2'];

export default function WorkExperience() {
  const t = useTranslations('workExperience');

  return (
    <StorySectionWrapper sectionId={2} innerClassName={'max-w-4xl mx-auto px-4'}>
      <h2 className="font-serif text-3xl md:text-4xl lg:text-6xl font-light text-slate-900 dark:text-slate-100 text-center mb-12 md:mb-16">
        {t('title')}
      </h2>

      <div className="space-y-8 md:space-y-12">
        {workKeys.map((key, i) => {
          const jobDetails = t.raw(`${key}.details`) as string[];

          return (
            <div key={i} className="relative">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
                <div className="md:text-right">
                  <div className="text-slate-500 dark:text-slate-400 font-sans text-sm md:text-base mb-1">
                    {t(`${key}.period`)}
                  </div>
                  <div className="text-slate-600 dark:text-slate-300 font-sans text-sm md:text-base font-medium">
                    {t(`${key}.company`)}
                  </div>
                </div>

                <div className="md:col-span-2">
                  <h3 className="font-serif text-xl md:text-2xl font-medium text-slate-900 dark:text-slate-100 mb-3">
                    {t(`${key}.position`)}
                  </h3>

                  <ul className="text-slate-700 dark:text-slate-300 font-sans leading-relaxed text-sm md:text-base">
                    {Array.isArray(jobDetails) &&
                      jobDetails.map((detail, index) => <li key={index}>{detail}</li>)}
                  </ul>
                  <div className="hidden md:block absolute left-1/3 top-0 bottom-0 w-px bg-slate-200 dark:bg-slate-700" />
                </div>
              </div>

              <div className="hidden md:block absolute left-1/3 top-0 bottom-0 w-px bg-my-light-text/20 dark:bg-my-dark-text/20" />
            </div>
          );
        })}
      </div>

      <div className="w-24 h-0.5 bg-slate-300 dark:bg-slate-600 mx-auto mt-8" />
    </StorySectionWrapper>
  );
}
