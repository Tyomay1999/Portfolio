'use client';

import { useTranslations } from 'next-intl';
import Root from '../../components/root';

export default function Home() {
  const t = useTranslations();

  return (
    <div>
      <Root />
    </div>
  );
}
