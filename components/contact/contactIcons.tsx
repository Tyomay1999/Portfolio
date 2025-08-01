'use client';

import { FC } from 'react';
import { useTranslations } from 'next-intl';
import { contactItems } from './utils';


const ContactIcons: FC = () => {
  const t = useTranslations('contactIcons');

  return (
    <div className="grid grid-cols-4 md:grid-cols-7 gap-4 md:gap-6 mb-8 mt-8 md:mb-12 max-w-2xl mx-auto justify-items-center">
      {contactItems.map((item, idx) => (
        <div key={idx} className="cursor-pointer contact-icon flex flex-col items-center text-slate-600 dark:text-white hover:text-blue-500 dark:hover:text-blue-500 transition-colors duration-300" onClick={item.action}>
          <div className="hover:scale-105 hover:shadow-xl w-12 h-12 md:w-14 md:h-14 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-2 shadow-lg">
            {item.icon}
          </div>
          <span className="text-xs text-slate-600 dark:text-slate-400 font-sans">{t(item.labelKey)}</span>
        </div>
      ))}
    </div>
  );
};

export default ContactIcons;
