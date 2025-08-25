'use client';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import axios from 'axios';
import api from '@/lib/api';

import type { ServiceKey } from '../types';
import BookingForm from './bookingForm';
import { useScrollLock } from '../hooks/useScrollLock';
import Spinner from '../ui/spinner';

type Props = {
  open: boolean;
  onClose: () => void;
  date: Date | null;
  time: string | null;
  selectedService: ServiceKey;
  onServiceChange: (s: ServiceKey) => void;
  onConfirm: (email: string) => void;
  onRefetch?: () => void | Promise<void>;
};

const pad = (n: number) => String(n).padStart(2, '0');

export default function BookingModal({
  open,
  onClose,
  date,
  time,
  selectedService,
  onServiceChange,
  onConfirm,
  onRefetch,
}: Props) {
  const t = useTranslations('bookingModal');
  const tCal = useTranslations('bookingCalendar');
  const weekdaysLong = tCal.raw('calendar.weekdaysLong') as string[];
  const months = tCal.raw('calendar.months') as string[];
  const monthsGen = tCal.raw('calendar.monthsGen') as string[];

  useScrollLock(open);

  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [consent, setConsent] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const dateTimeText = useMemo(() => {
    if (!date || !time) return '';
    const weekday = weekdaysLong[date.getDay()];
    const month = months[date.getMonth()];
    const monthGen = monthsGen[date.getMonth()];
    const day = date.getDate();
    const label = t('dateTime', { weekday, month, monthGen, day });
    return `${label} • ${time}`;
  }, [date, time, t, weekdaysLong, months, monthsGen]);

  const reset = useCallback(() => {
    setEmail('');
    setFirstName('');
    setLastName('');
    setPhone('');
    setConsent(false);
    setErrorMsg(null);
    setSubmitting(false);
    onServiceChange(null);
  }, [onServiceChange]);

  const handleClose = useCallback(() => {
    reset();
    onClose();
  }, [reset, onClose]);

  useEffect(() => {
    if (open) {
      setErrorMsg(null);
      setSubmitting(false);
    } else {
      setSubmitting(false);
    }
  }, [open]);

  const canSubmit =
    !!email &&
    !!firstName &&
    !!lastName &&
    !!phone &&
    consent &&
    !!selectedService &&
    !!date &&
    !!time;

  const onBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && !submitting) handleClose();
  };
  useEffect(() => {
    if (!open) return;
    const onEsc = (e: KeyboardEvent) => e.key === 'Escape' && !submitting && handleClose();
    window.addEventListener('keydown', onEsc);
    return () => window.removeEventListener('keydown', onEsc);
  }, [open, submitting, handleClose]);

  const buildPayload = () => {
    if (!date || !time || !selectedService) return null;
    const [h, m] = time.split(':').map(Number);
    const localDT = new Date(date.getFullYear(), date.getMonth(), date.getDate(), h, m, 0, 0);

    const dateYMD = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
    const dateTimeLocal = `${dateYMD}T${pad(h)}:${pad(m)}`;

    return {
      firstName,
      lastName,
      email,
      phone,
      consent,
      service: t(`services.${selectedService}`),
      date: dateYMD,
      time,
      dateTimeLocal,
      dateTimeUTC: localDT.toISOString(),
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    };
  };

  const handleSubmit = async () => {
    if (!canSubmit) return;
    setErrorMsg(null);
    setSubmitting(true);
    try {
      const payload = buildPayload();
      if (!payload) throw new Error('Invalid booking data');
      const lang = localStorage.getItem('language');
      const language = lang === 'hy' ? 'am' : lang;
      const res = await api.post('/booking', { ...payload, language });

      if (res.status === 200 || res.status === 201) {
        await onRefetch?.();
        onConfirm(email);
        reset();
        onClose();
      } else {
        setErrorMsg(`${t('requestFailed')} (${res.status})`);
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const status = err.response?.status;
        if (status === 422) {
          setErrorMsg((err.response?.data?.message as string) || t('validationFailed'));
        } else if (status === 409) {
          await onRefetch?.();
          setErrorMsg((err.response?.data?.message as string) || t('bookingExists'));
        } else if (status === 500) {
          setErrorMsg((err.response?.data?.message as string) || t('serverError'));
        } else {
          setErrorMsg((err.response?.data?.message as string) || t('networkError'));
        }
      } else {
        setErrorMsg(t('unexpectedError'));
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="bookingDialogTitle"
      className="fixed inset-0 z-50 flex items-end justify-center sm:items-center"
    >
      {/* backdrop */}
      <div className="absolute inset-0 z-40 bg-black/60" onClick={onBackdrop} />

      {/* ===== Mobile bottom-sheet ===== */}
      <div className="relative z-50 w-full sm:hidden">
        <div
          className="/* шапка / контент / футер */ pointer-events-auto fixed inset-x-0 bottom-0 isolate grid max-h-[90svh] w-full grid-rows-[auto,1fr,auto] overflow-hidden rounded-t-3xl bg-white shadow-xl dark:bg-slate-900"
          style={{ transform: 'translateZ(0)' }}
        >
          {/* Drag handle */}
          <div className="mx-auto mb-2 mt-2 h-1.5 w-12 rounded-full bg-slate-200 dark:bg-slate-700" />

          {/* Header (row 1) */}
          <div
            className="sticky top-0 z-30 border-b border-slate-200 bg-white px-6 py-4 dark:border-slate-700 dark:bg-slate-900"
            style={{ transform: 'translateZ(0)' }}
          >
            <h3
              id="bookingDialogTitle"
              className="text-lg font-semibold text-slate-900 dark:text-slate-100"
            >
              {t('modal.title')}
            </h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{dateTimeText}</p>
          </div>

          {/* Scrollable content (row 2) */}
          <div
            className="overflow-y-auto overscroll-contain px-6 py-6"
            style={{
              WebkitOverflowScrolling: 'touch',
              paddingBottom: 'max(28px, env(safe-area-inset-bottom))',
            }}
          >
            <BookingForm
              firstName={firstName}
              setFirstName={setFirstName}
              lastName={lastName}
              setLastName={setLastName}
              email={email}
              setEmail={setEmail}
              phone={phone}
              setPhone={setPhone}
              selectedService={selectedService}
              onServiceChange={onServiceChange}
              consent={consent}
              setConsent={setConsent}
              submitting={submitting}
            />
            <div className="h-5 sm:h-0" />
          </div>

          {/* Footer (row 3) */}
          <div
            className="z-30 space-y-3 border-t border-slate-200 bg-white px-6 py-4 dark:border-slate-700 dark:bg-slate-900"
            style={{
              transform: 'translateZ(0)',
              paddingBottom: 'max(16px, env(safe-area-inset-bottom))',
            }}
          >
            {errorMsg && <div className="text-sm text-red-600 dark:text-red-400">{errorMsg}</div>}
            <button
              disabled={!canSubmit || submitting}
              onClick={handleSubmit}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-4 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
              aria-busy={submitting}
            >
              {submitting && <Spinner className="h-5 w-5" />}
              {submitting ? t('actions.processing') : t('actions.confirm')}
            </button>
            <button
              onClick={handleClose}
              disabled={submitting}
              className="w-full py-2 text-center text-slate-500 disabled:opacity-50 dark:text-slate-400"
            >
              {t('actions.cancel')}
            </button>
          </div>
        </div>
      </div>

      {/* ===== Desktop modal ===== */}
      <div className="relative z-50 hidden min-h-screen items-center justify-center p-4 sm:flex">
        <div
          className="isolate w-full max-w-lg overflow-hidden rounded-2xl bg-white dark:bg-slate-900"
          style={{ transform: 'translateZ(0)' }}
        >
          <div className="border-b border-slate-200 px-6 py-4 dark:border-slate-700">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              {t('modal.title')}
            </h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{dateTimeText}</p>
          </div>

          <div
            className="max-h-[70vh] overflow-y-auto px-6 py-6"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            <BookingForm
              firstName={firstName}
              setFirstName={setFirstName}
              lastName={lastName}
              setLastName={setLastName}
              email={email}
              setEmail={setEmail}
              phone={phone}
              setPhone={setPhone}
              selectedService={selectedService}
              onServiceChange={onServiceChange}
              consent={consent}
              setConsent={setConsent}
              submitting={submitting}
            />
          </div>

          <div className="space-y-3 border-t border-slate-200 px-6 py-4 dark:border-slate-700">
            {errorMsg && <div className="text-sm text-red-600 dark:text-red-400">{errorMsg}</div>}
            <button
              disabled={!canSubmit || submitting}
              onClick={handleSubmit}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
              aria-busy={submitting}
            >
              {submitting && <Spinner className="h-5 w-5" />}
              {submitting ? t('actions.processing') : t('actions.confirm')}
            </button>
            <button
              onClick={handleClose}
              disabled={submitting}
              className="w-full py-2 text-center text-slate-500 disabled:opacity-50 dark:text-slate-400"
            >
              {t('actions.cancel')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
