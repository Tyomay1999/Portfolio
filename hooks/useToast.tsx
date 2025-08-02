'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Toast from '@/components/toast';

export function useToast() {
  const [messageKey, setMessageKey] = useState<string | null>(null);
  const t = useTranslations('toast');

  const showToast = (key: string) => setMessageKey(key);

  const ToastComponent = messageKey ? (
    <Toast message={t(messageKey)} onClose={() => setMessageKey(null)} />
  ) : null;

  return { showToast, ToastComponent };
}
