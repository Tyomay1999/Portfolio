'use client';

import { useTranslations } from 'next-intl';
import LanguageSwitcher from './LanguageSwitcher';

export default function Home() {
  const t = useTranslations();

  return (
    <div>
      <h1>{t('welcome')}</h1>
      <p>{t('about')}</p>
      <br />
      <br />
      <br />
      <LanguageSwitcher />
    </div>
  );
}
