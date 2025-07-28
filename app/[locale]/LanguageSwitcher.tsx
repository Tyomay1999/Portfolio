'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useTransition } from 'react';

const LanguageSwitcher = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const changeLanguage = (locale: string) => {
    const segments = pathname.split('/');
    segments[1] = locale;
    const newPath = segments.join('/');
    startTransition(() => {
      router.push(newPath);
    });
  };

  return (
    <div style={{ display: 'flex', gap: '12px' }}>
      <button onClick={() => changeLanguage('en')} disabled={isPending}>
        English
      </button>
      <button onClick={() => changeLanguage('ru')} disabled={isPending}>
        Русский
      </button>
      <button onClick={() => changeLanguage('hy')} disabled={isPending}>
        Հայերեն
      </button>
    </div>
  );
};

export default LanguageSwitcher;
