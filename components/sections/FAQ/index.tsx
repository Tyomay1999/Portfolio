'use client';
import React from 'react';
import { useTranslations } from 'next-intl';
import StorySectionWrapper from '../../../HOC/storySectionWrapper';

export default function FAQPhilosophySection() {
  const t = useTranslations('faqSection');
  const faqs = t.raw('faqs') as {
    question: string;
    answer: string;
  }[];

  return (
    <StorySectionWrapper sectionId={6} innerClassName="max-w-4xl mx-auto px-4">
      <h2 className="font-serif text-3xl md:text-4xl lg:text-6xl font-light text-slate-900 dark:text-slate-100 text-center mb-8 md:mb-12">
        {t('title')}
      </h2>

      {/* Philosophy Text */}
      <div className="text-center mb-12 md:mb-16">
        <p className="text-justify text-lg md:text-xl text-slate-700 dark:text-slate-300 font-sans leading-relaxed max-w-3xl mx-auto">
          {t('philosophy')}
        </p>
      </div>

      {/* FAQ Items */}
      <div className="space-y-8 md:space-y-12">
        {faqs.map((faq, idx) => (
          <div
            key={idx}
            className={
              idx < faqs.length - 1
                ? 'border-b border-slate-200 dark:border-slate-700 pb-6 md:pb-8'
                : 'pb-6 md:pb-8'
            }
          >
            <h3 className="font-serif text-xl md:text-2xl font-medium text-slate-900 dark:text-slate-100 mb-4">
              {faq.question}
            </h3>
            <p className="text-justify text-slate-700 dark:text-slate-300 font-sans leading-relaxed text-sm md:text-base">
              {faq.answer}
            </p>
          </div>
        ))}
      </div>

      <div className="w-16 h-0.5 bg-slate-400 dark:bg-slate-500 mx-auto mt-12 md:mt-16" />
    </StorySectionWrapper>
  );
}
