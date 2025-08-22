'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { getLocaleFromPath } from './lib/locale';
import { isBookingPath, toggleBookingPath } from './lib/routes';
import { HomeIcon, CalendarIcon } from './ui/icons';

export default function BookingShortcutButton() {
  const router = useRouter();
  const pathname = usePathname() || '/en';

  const locale = getLocaleFromPath(pathname);
  const onBooking = isBookingPath(pathname);

  const handleClick = () => {
    router.push(toggleBookingPath(pathname, locale));
  };

  return (
    <button
      onClick={handleClick}
      aria-label={onBooking ? 'Go to home' : 'Open booking'}
      className="rounded-lg border border-slate-200 bg-white/80 p-2 backdrop-blur-sm transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800/80 dark:hover:bg-slate-700"
    >
      {onBooking ? <HomeIcon className="h-5 w-5" /> : <CalendarIcon className="h-5 w-5" />}
    </button>
  );
}
