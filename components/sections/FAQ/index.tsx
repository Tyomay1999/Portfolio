'use client';

import React, { useId, useState, JSX } from 'react';
import { useTranslations } from 'next-intl';
import StorySectionWrapper from '@/HOC/storySectionWrapper';
import {
  FAQItem,
  getVisibleFaqs,
  getNextFaqStep,
  shouldShowFaqButton,
  getFaqButtonLabel,
} from './utils';
import FAQJsonLd from './FAQJsonLd';

export default function FAQPhilosophySection(): JSX.Element {
  const t = useTranslations('faqSection');
  const [step, setStep] = useState<0 | 1>(0);
  const uid = useId();

  const allFaqs = t.raw('faqs') as FAQItem[];
  const visible = getVisibleFaqs(allFaqs, step);
  const showButton = shouldShowFaqButton(allFaqs);
  const buttonText = getFaqButtonLabel(step, allFaqs.length, t);

  return (
    <StorySectionWrapper sectionId={6} innerClassName="max-w-4xl mx-auto px-4">
      <FAQJsonLd items={visible} />

      <section id="faq" aria-labelledby="faq-title">
        <h2
          id="faq-title"
          className="mb-8 text-center font-serif text-3xl font-light text-slate-900 dark:text-slate-100 md:mb-12 md:text-4xl lg:text-6xl"
        >
          {t('title')}
        </h2>

        <div className="mb-12 text-center md:mb-16">
          <p className="mx-auto max-w-3xl font-sans text-lg leading-relaxed text-slate-700 dark:text-slate-300 md:text-xl">
            {t('philosophy')}
          </p>
        </div>

        <div role="list" className="space-y-4 md:space-y-6">
          {visible.map((faq, idx) => {
            const qId = `faq-q-${uid}-${idx}`;
            const aId = `faq-a-${uid}-${idx}`;

            return (
              <details
                key={qId}
                role="listitem"
                className="group rounded-lg border border-slate-200 p-4 transition-colors duration-300 ease-out hover:border-slate-300 dark:border-slate-700 dark:hover:border-slate-600"
              >
                <summary
                  id={qId}
                  className="flex cursor-pointer select-none items-start gap-3 font-serif text-lg font-medium text-slate-900 outline-none transition-colors duration-300 ease-out hover:text-blue-600 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:text-slate-100 dark:hover:text-blue-400"
                  aria-controls={aId}
                >
                  <span
                    aria-hidden="true"
                    className="mt-1 inline-block transition-transform duration-[400ms] ease-[cubic-bezier(.22,.61,.36,1)] group-open:rotate-90"
                  >
                    ▸
                  </span>
                  <span>{faq.question}</span>
                </summary>

                <div
                  id={aId}
                  role="region"
                  aria-labelledby={qId}
                  className="mt-2 grid grid-rows-[0fr] transition-[grid-template-rows] duration-[400ms] ease-[cubic-bezier(.22,.61,.36,1)] group-open:grid-rows-[1fr] motion-reduce:transition-none"
                >
                  <div className="overflow-hidden">
                    <div className="translate-y-1 text-justify font-sans text-sm leading-relaxed text-slate-700 opacity-0 transition-[opacity,transform] duration-[400ms] ease-[cubic-bezier(.22,.61,.36,1)] group-open:translate-y-0 group-open:opacity-100 motion-reduce:transition-none dark:text-slate-300 md:text-base">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              </details>
            );
          })}
        </div>

        {showButton && (
          <div className="pt-10 text-center">
            <button
              type="button"
              onClick={() => setStep(getNextFaqStep(step))}
              className="rounded-full border border-slate-300 px-6 py-3 font-sans text-slate-900 transition duration-300 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:border-slate-600 dark:text-white dark:hover:bg-slate-800 dark:focus-visible:ring-blue-400"
              aria-describedby="faq-more-desc"
            >
              {buttonText}
            </button>
            <span id="faq-more-desc" className="sr-only">
              {t('moreA11yHint')}
            </span>
          </div>
        )}

        <div className="mx-auto mt-12 h-0.5 w-16 bg-slate-400 dark:bg-slate-500 md:mt-16" />
      </section>
    </StorySectionWrapper>
  );
}
