'use client';

import React, { useState, JSX } from 'react';
import { useTranslations } from 'next-intl';
import StorySectionWrapper from '@/HOC/storySectionWrapper';
import {
  FAQItem,
  getVisibleFaqs,
  getNextFaqStep,
  shouldShowFaqButton,
  getFaqButtonLabel,
} from './utils';

export default function FAQPhilosophySection(): JSX.Element {
  const t = useTranslations('faqSection');
  const [step, setStep] = useState<0 | 1>(0);

  const allFaqs = t.raw('faqs') as FAQItem[];
  const visible = getVisibleFaqs(allFaqs, step);
  const showButton = shouldShowFaqButton(allFaqs);
  const buttonText = getFaqButtonLabel(step, allFaqs.length, t);

  return (
    <StorySectionWrapper sectionId={6} innerClassName="max-w-4xl mx-auto px-4">
      {/* Заголовок */}
      <h2 className="mb-8 text-center font-serif text-3xl font-light text-slate-900 dark:text-slate-100 md:mb-12 md:text-4xl lg:text-6xl">
        {t('title')}
      </h2>

      {/* Философия */}
      <div className="mb-12 text-center md:mb-16">
        <p className="mx-auto max-w-3xl font-sans text-lg leading-relaxed text-slate-700 dark:text-slate-300 md:text-xl">
          {t('philosophy')}
        </p>
      </div>

      {/* FAQ */}
      <div className="space-y-8 md:space-y-12">
        {visible.map((faq, idx) => (
          <div
            key={idx}
            className={
              idx < visible.length - 1
                ? 'border-b border-slate-200 pb-6 dark:border-slate-700 md:pb-8'
                : 'pb-6 md:pb-8'
            }
          >
            <h3 className="mb-4 font-serif text-xl font-medium text-slate-900 dark:text-slate-100 md:text-2xl">
              {faq.question}
            </h3>
            <p className="font-sans text-sm leading-relaxed text-slate-700 dark:text-slate-300 md:text-base">
              {faq.answer}
            </p>
          </div>
        ))}
      </div>

      {showButton && (
        <div className="pt-10 text-center">
          <button
            onClick={() => setStep(getNextFaqStep(step))}
            className="rounded-full border border-slate-300 px-6 py-3 font-sans text-slate-900 transition duration-300 hover:bg-slate-50 dark:border-slate-600 dark:text-white dark:hover:bg-slate-800"
          >
            {buttonText}
          </button>
        </div>
      )}

      {/* Divider */}
      <div className="mx-auto mt-12 h-0.5 w-16 bg-slate-400 dark:bg-slate-500 md:mt-16" />
    </StorySectionWrapper>
  );
}
