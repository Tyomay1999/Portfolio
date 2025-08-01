'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import StorySectionWrapper from '@/HOC/storySectionWrapper';

const workKeys = ['genieWeb', 'pixeria', 'beeOnCode1', 'instructor', 'beeOnCode2'] as const;

type WorkKey = (typeof workKeys)[number];

const WorkExperience: React.FC = () => {
  const t = useTranslations('workExperience');

  return (
    <StorySectionWrapper sectionId={2} innerClassName="max-w-4xl mx-auto px-4">
      <h2 className="mb-12 text-center font-serif text-3xl font-light text-slate-900 dark:text-slate-100 md:mb-16 md:text-4xl lg:text-6xl">
        {t('title')}
      </h2>

      <div className="space-y-8 md:space-y-12">
        {workKeys.map((key: WorkKey, i: number) => {
          const jobDetails = t.raw(`${key}.details`) as string[];

          return (
            <div key={i} className="relative">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-8">
                <div className="md:text-right">
                  <div className="mb-1 font-sans text-sm text-slate-500 dark:text-slate-400 md:text-base">
                    {t(`${key}.period`)}
                  </div>
                  <div className="font-sans text-sm font-medium text-slate-600 dark:text-slate-300 md:text-base">
                    {t(`${key}.company`)}
                  </div>
                </div>

                <div className="md:col-span-2">
                  <h3 className="mb-3 font-serif text-xl font-medium text-slate-900 dark:text-slate-100 md:text-2xl">
                    {t(`${key}.position`)}
                  </h3>

                  <ul className="font-sans text-sm leading-relaxed text-slate-700 dark:text-slate-300 md:text-base list-disc list-inside">
                    {Array.isArray(jobDetails) &&
                    jobDetails.map((detail, index) => <li key={index}>{detail}</li>)}
                  </ul>

                  <div className="absolute bottom-0 left-1/3 top-0 hidden w-px bg-slate-200 dark:bg-slate-700 md:block" />
                </div>
              </div>

              <div className="bg-my-light-text/20 dark:bg-my-dark-text/20 absolute bottom-0 left-1/3 top-0 hidden w-px md:block" />
            </div>
          );
        })}
      </div>

      <div className="mx-auto mt-8 h-0.5 w-24 bg-slate-300 dark:bg-slate-600" />
    </StorySectionWrapper>
  );
};

export default WorkExperience;
