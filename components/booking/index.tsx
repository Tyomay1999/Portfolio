'use client';
import { useEffect, useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import Head from 'next/head';

import BookingCalendar from './bookingCalendar';
import TimeslotsPanel from './timeslotsPanel';
import BookingModal from './modals/bookingModal';
import SuccessModal from './successModal';

import LoadingOverlay from './ui/loadingOverlay';
import LanguageThemeToggle from '@/components/languageThemeToggle';
import { useBookings } from '@/hooks/useBookings';

import { TIME_SLOTS } from './constants';
import { ServiceKey } from './types';
import { toMap } from './lib/bookingsMap';
import { formatDateYmd } from './lib/time';
import { useLocalBookings } from './hooks/useLocalBookings';
import { useBookingSocket } from './hooks/useBookingSocket';

export default function Page() {
  const t = useTranslations('bookingPage');
  const year = new Date().getFullYear();

  const [currentDate, setCurrentDate] = useState(() => new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<ServiceKey>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successEmail, setSuccessEmail] = useState<string>('');
  const [, setToast] = useState<string>('');

  const { bookings: apiList, loading, error, refetch } = useBookings();
  const serverBookingsMap = useMemo(() => toMap(apiList), [apiList]);

  const { bookingsMap, setLocalAdds } = useLocalBookings(serverBookingsMap);

  useBookingSocket(setLocalAdds);

  const onSelectDate = (d: Date) => {
    setSelectedDate(d);
    setSelectedTime(null);
  };
  const onSelectTime = (t: string) => {
    setSelectedTime(t);
    setTimeout(() => setIsModalOpen(true), 150);
  };

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 1600);
  };

  const confirmBooking = (email: string) => {
    if (!selectedDate || !selectedTime) return;
    const key = formatDateYmd(selectedDate);
    setLocalAdds(prev => ({ ...prev, [key]: [...(prev[key] || []), selectedTime].sort() }));
    setIsModalOpen(false);
    setSuccessEmail(email);
    setSelectedService(null);
    setSelectedTime(null);
  };

  useEffect(() => {
    if (error) showToast(error);
  }, [error]);

  return (
    <div className="min-h-screen">
      <Head>
        <title>{t('seo.title')}</title>
        <meta name="description" content={t('seo.description')} />
        <meta name="robots" content="index,follow" />
        <meta property="og:title" content={t('seo.title')} />
        <meta property="og:description" content={t('seo.description')} />
      </Head>

      <LanguageThemeToggle />

      <main className="mx-auto max-w-md px-4 py-6 md:max-w-2xl md:px-6 lg:max-w-4xl lg:px-8">
        <h1 className="mb-6 mt-16 text-center text-3xl font-semibold md:text-4xl lg:text-5xl">
          {t('h1')}
        </h1>

        <div className="relative" aria-busy={loading}>
          <div
            className={
              loading ? 'pointer-events-none select-none blur-[2px] transition' : 'transition'
            }
          >
            <BookingCalendar
              currentDate={currentDate}
              setCurrentDate={setCurrentDate}
              bookings={bookingsMap}
              onSelectDate={onSelectDate}
              selectedDate={selectedDate}
            />

            <TimeslotsPanel
              date={selectedDate}
              bookings={bookingsMap}
              timeSlots={TIME_SLOTS}
              onSelectTime={onSelectTime}
              onBookedTap={() => showToast(t('toast.alreadyBooked'))}
            />
          </div>

          {loading && <LoadingOverlay text="Loading bookings…" />}
        </div>
      </main>

      <footer
        className="mt-12 border-t py-6 text-center"
        style={{ borderColor: 'var(--border-color)' }}
      >
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          {t('footer.copy', { year })}
        </p>
      </footer>

      <BookingModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        date={selectedDate}
        time={selectedTime}
        selectedService={selectedService}
        onServiceChange={setSelectedService}
        onConfirm={confirmBooking}
        onRefetch={refetch}
      />

      <SuccessModal
        open={!!successEmail}
        email={successEmail}
        onClose={() => setSuccessEmail('')}
      />
    </div>
  );
}
