'use client';
import React, { useRef } from 'react';
import { useTranslations } from 'next-intl';
import Modal from './ui/Modal';
import { useScrollLock } from './hooks/useScrollLock';
import { useEscapeToClose } from './hooks/useEscapeToClose';
import { useAutoFocus } from './hooks/useAutoFocus';
import { CheckCircle } from './ui/icons';

export default function SuccessModal({
  open,
  email,
  onClose,
}: {
  open: boolean;
  email: string;
  onClose: () => void;
}) {
  const t = useTranslations('successModal');

  const tr = t as unknown as {
    rich?: (key: string, values: Record<string, unknown>) => React.ReactNode;
  };

  useScrollLock(open);
  useEscapeToClose(open, onClose);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  useAutoFocus(closeBtnRef as React.RefObject<HTMLElement>, open);

  const titleId = 'successTitle';

  return (
    <Modal open={open} onClose={onClose} labelledBy={titleId}>
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 text-center shadow-lg dark:bg-slate-900">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600">
          <CheckCircle className="h-9 w-9 text-white" />
        </div>

        <h3 id={titleId} className="mb-2 text-xl font-semibold text-slate-900 dark:text-slate-100">
          {t('title')}
        </h3>

        <p className="mb-6 text-sm text-slate-600 dark:text-slate-400">
          {tr.rich ? (
            tr.rich('text', {
              email: (chunks: React.ReactNode) => (
                <span className="break-all font-medium text-slate-900 dark:text-slate-100">
                  {chunks}
                </span>
              ),
              emailValue: email,
            })
          ) : (
            <>
              {t('textPrefix')}{' '}
              <span className="break-all font-medium text-slate-900 dark:text-slate-100">
                {email}
              </span>{' '}
              {t('textSuffix')}
            </>
          )}
        </p>

        <button
          ref={closeBtnRef}
          onClick={onClose}
          className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {t('actions.close')}
        </button>
      </div>
    </Modal>
  );
}
