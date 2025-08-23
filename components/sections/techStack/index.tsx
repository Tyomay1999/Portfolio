'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import StorySectionWrapper from '@/HOC/storySectionWrapper';
import FilterSelect from './filterSelect';
import TechGrid from './techGrid';
import {
  Category,
  getFilteredItems,
  getVisibleItems,
  shouldShowButton,
  getNextStep,
  getButtonLabel,
  techItems,
} from './utils';

const TechStack: React.FC = () => {
  const t = useTranslations('techStack');

  const [selected, setSelected] = useState<Category>('all');
  const [step, setStep] = useState<0 | 1 | 2>(0);

  const filtered = getFilteredItems(techItems, selected);
  const visible = getVisibleItems(filtered, step);
  const showButton = shouldShowButton(filtered);
  const buttonText = getButtonLabel(step, filtered.length, t);

  const onChangeCategory = (v: Category) => {
    setSelected(v);
    setStep(0);
  };

  return (
    <StorySectionWrapper sectionId={3} innerClassName="max-w-7xl mx-auto px-4">
      <h2 className="mb-6 text-center font-serif text-3xl font-light text-slate-900 dark:text-slate-100 md:mb-8 md:text-4xl lg:mb-10 lg:text-6xl">
        {t('title')}
      </h2>

      <div className="mb-8 flex justify-center md:mb-10">
        <FilterSelect value={selected} onChange={onChangeCategory} t={k => t(k)} />
      </div>

      <TechGrid items={visible} />

      {showButton && (
        <div className="pb-12 text-center">
          <button
            onClick={() => setStep(getNextStep(step, filtered.length))}
            className="rounded-full border border-slate-300 px-6 py-3 font-sans text-slate-900 transition duration-300 hover:bg-slate-50 dark:border-slate-600 dark:text-white dark:hover:bg-slate-800"
          >
            {buttonText}
          </button>
        </div>
      )}
    </StorySectionWrapper>
  );
};

export default TechStack;
