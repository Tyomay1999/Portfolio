'use client';

import React from 'react';
import LanguageDropdown from './languageDropdown';
import ThemeToggleButton from './themeToggleButton';
import BookingShortcutButton from '@/components/booking/bookingShortcutButton';

export default function LanguageThemeToggle() {
  return (
    <div className="fixed left-0 right-0 top-6 z-50 flex items-center justify-between px-6">
      <LanguageDropdown />

      <div className="flex items-center gap-3">
        <ThemeToggleButton />
        <BookingShortcutButton />
      </div>
    </div>
  );
}
