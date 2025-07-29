'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import StorySectionWrapper from '../../../HOC/storySectionWrapper';

export default function AboutMe() {
  const t = useTranslations('summary');

  return (
    <StorySectionWrapper sectionId={0}>
      <div className="max-w-3xl mx-auto text-center px-4">
        <h1 className="text-3xl font-bold mb-6">{t('aboutMe')}</h1>
        <br />
        <p className="text-justify mb-6">{t('intro')}</p>
        <br />

        <p className="text-justify mb-6">{t('specialization')}</p>

        <ul className="text-justify ml-10 list-disc pl-6 space-y-2 mb-6">
          <li>{t('experience.list1')}</li>
          <li>{t('experience.list2')}</li>
          <li>{t('experience.list3')}</li>
          <li>{t('experience.list4')}</li>
          <li>{t('experience.list5')}</li>
        </ul>

        <p className="text-justify italic">{t('focus')}</p>
      </div>
    </StorySectionWrapper>
  );
}
