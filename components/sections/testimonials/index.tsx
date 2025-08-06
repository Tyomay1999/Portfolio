'use client';

import React, {JSX} from 'react';
import { useTranslations } from 'next-intl';
import StorySectionWrapper from '@/HOC/storySectionWrapper';
import clsx from 'clsx';

type Testimonial = {
  initials: string;
  name: string;
  role: string;
  message: string;
};

export default function TestimonialsSection(): JSX.Element {
  const t = useTranslations('testimonialsSection');

  const testimonials = t.raw('items') as Testimonial[];

  return (
    <StorySectionWrapper sectionId={5} innerClassName="max-w-6xl mx-auto px-4">
      <h2 className="mb-12 text-center font-serif text-3xl font-light text-slate-900 dark:text-slate-100 md:mb-16 md:text-4xl lg:text-6xl">
        {t('title')}
      </h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className={clsx(
              'rounded-lg border border-slate-200 bg-white/50 p-6 shadow-lg backdrop-blur-sm dark:border-slate-700 dark:bg-slate-800/50 md:p-8',
              index === 3 || index === 4 ? 'md:col-span-2 lg:col-span-1' : '',
            )}
          >
            <div className="mb-4 flex items-center">
              <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-600">
                <span className="text-my-light-text/80 dark:text-my-dark-text/70 font-serif text-lg font-medium">
                  {testimonial.initials}
                </span>
              </div>
              <div>
                <h4 className="font-sans font-medium text-slate-900 dark:text-slate-100">
                  {testimonial.name}
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">{testimonial.role}</p>
              </div>
            </div>
            <p className="font-sans text-sm leading-relaxed text-slate-700 dark:text-slate-300 md:text-base">
              “{testimonial.message}”
            </p>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-12 h-0.5 w-16 bg-slate-400 dark:bg-slate-500 md:mt-16" />
    </StorySectionWrapper>
  );
}
