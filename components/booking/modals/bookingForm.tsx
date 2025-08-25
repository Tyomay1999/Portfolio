'use client';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import type { ServiceKey } from '../types';
import { SERVICE_KEYS } from '../constants';

type Setter<T> = React.Dispatch<React.SetStateAction<T>>;

export type BookingFormProps = {
  firstName: string;
  setFirstName: Setter<string>;
  lastName: string;
  setLastName: Setter<string>;
  email: string;
  setEmail: Setter<string>;
  phone: string;
  setPhone: Setter<string>;
  selectedService: ServiceKey;
  onServiceChange: (s: ServiceKey) => void;
  consent: boolean;
  setConsent: Setter<boolean>;
  submitting: boolean;
};

export default function BookingForm(props: BookingFormProps) {
  const {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    phone,
    setPhone,
    selectedService,
    onServiceChange,
    submitting,
  } = props;

  const t = useTranslations('bookingModal');
  const [ddOpen, setDdOpen] = useState(false);
  const ddRef = useRef<HTMLDivElement | null>(null);

  const labelClass = 'mb-2 block text-sm font-medium text-slate-900 dark:text-slate-100';
  const inputClass =
    'w-full rounded-xl px-4 py-3 border transition ' +
    'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 ' +
    'text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 ' +
    'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500';

  useEffect(() => {
    if (!ddOpen) return;
    const onDoc = (e: MouseEvent) => {
      if (ddRef.current && !ddRef.current.contains(e.target as Node)) setDdOpen(false);
    };
    const onEsc = (e: KeyboardEvent) => e.key === 'Escape' && setDdOpen(false);
    document.addEventListener('mousedown', onDoc);
    window.addEventListener('keydown', onEsc);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      window.removeEventListener('keydown', onEsc);
    };
  }, [ddOpen]);

  return (
    <form className="space-y-4" onSubmit={e => e.preventDefault()}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass}>{t('form.firstName')}</label>
          <input
            className={inputClass}
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            placeholder={t('form.firstNamePh')}
            required
            disabled={submitting}
          />
        </div>
        <div>
          <label className={labelClass}>{t('form.lastName')}</label>
          <input
            className={inputClass}
            value={lastName}
            onChange={e => setLastName(e.target.value)}
            placeholder={t('form.lastNamePh')}
            required
            disabled={submitting}
          />
        </div>
      </div>

      <div>
        <label className={labelClass}>{t('form.email')}</label>
        <input
          type="email"
          className={inputClass}
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder={t('form.emailPh')}
          required
          disabled={submitting}
        />
      </div>

      <div>
        <label className={labelClass}>{t('form.phone')}</label>
        <input
          type="tel"
          className={inputClass}
          value={phone}
          onChange={e => setPhone(e.target.value)}
          placeholder={t('form.phonePh')}
          required
          disabled={submitting}
        />
      </div>

      <div ref={ddRef}>
        <label className={labelClass}>{t('form.serviceLabel')}</label>
        <div className="relative">
          <button
            type="button"
            aria-haspopup="listbox"
            aria-expanded={ddOpen}
            aria-controls="service-listbox"
            onClick={() => !submitting && setDdOpen(v => !v)}
            onKeyDown={e => {
              if ((e.key === 'Enter' || e.key === ' ') && !submitting) {
                e.preventDefault();
                setDdOpen(v => !v);
              }
              if ((e.key === 'ArrowDown' || e.key === 'ArrowUp') && !submitting) {
                e.preventDefault();
                setDdOpen(true);
              }
            }}
            className={`flex w-full items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-left text-slate-900 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:[color-scheme:dark] ${submitting ? 'cursor-not-allowed opacity-60' : ''}`}
          >
            <span className="truncate">
              {selectedService ? t(`services.${selectedService}`) : t('form.servicePlaceholder')}
            </span>
            <span className="ml-3">▾</span>
          </button>

          {ddOpen && !submitting && (
            <div
              id="service-listbox"
              role="listbox"
              className="absolute left-0 right-0 top-full z-50 mt-1 max-h-60 overflow-auto rounded-xl border border-slate-200 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-900"
            >
              {SERVICE_KEYS.map(key => {
                const active = selectedService === key;
                return (
                  <div
                    key={key}
                    role="option"
                    aria-selected={active}
                    tabIndex={-1}
                    onClick={() => {
                      onServiceChange(key);
                      setDdOpen(false);
                    }}
                    className={[
                      'cursor-pointer px-4 py-3 text-sm',
                      'text-slate-900 dark:text-slate-100',
                      active
                        ? 'bg-blue-50 dark:bg-blue-950/30'
                        : 'hover:bg-blue-50 dark:hover:bg-blue-950/30',
                    ].join(' ')}
                  >
                    {t(`services.${key}`)}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-start gap-3">
        <input
          id="consent"
          type="checkbox"
          className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 dark:border-slate-600"
          checked={props.consent}
          onChange={e => props.setConsent(e.target.checked)}
          required
          disabled={submitting}
        />
        <label htmlFor="consent" className="text-sm text-slate-600 dark:text-slate-400">
          {t('form.consent')}
        </label>
      </div>
    </form>
  );
}
