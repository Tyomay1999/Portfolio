'use client';

import { FC } from 'react';
import { useTranslations } from 'next-intl';
import { contactItems } from './utils';
import { useToast } from '@/hooks/useToast';

const ContactIcons: FC = () => {
  const t = useTranslations('contactIcons');
  const { showToast, ToastComponent } = useToast();

  return (
    <>
      <div
        role="list"
        aria-label={t('listAriaLabel')}
        className="mx-auto mb-8 mt-8 grid max-w-2xl grid-cols-4 justify-items-center gap-4 md:mb-12 md:grid-cols-8 md:gap-6"
      >
        {contactItems(showToast).map((item, idx) => (
          <button
            key={idx}
            type="button"
            role="listitem"
            aria-label={t(item.ariaLabelKey)}
            className="contact-icon flex cursor-pointer flex-col items-center text-slate-600 transition-colors duration-300 hover:text-blue-500 dark:text-white dark:hover:text-blue-500"
            onClick={item.action}
          >
            <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 shadow-lg hover:scale-105 hover:shadow-xl dark:bg-slate-800 md:h-14 md:w-14">
              {item.icon}
            </div>
            <span className="font-sans text-xs text-slate-600 dark:text-slate-400">
              {t(item.labelKey)}
            </span>
          </button>
        ))}
      </div>
      {ToastComponent}
    </>
  );
};

export default ContactIcons;
