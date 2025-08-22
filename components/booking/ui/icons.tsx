'use client';
import React from 'react';

export function HomeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M3 10.5l9-7 9 7V20a2 2 0 0 1-2 2h-4a1 1 0 0 1-1-1v-5H10v5a1 1 0 0 1-1 1H5a2 2 0 0 1-2-2v-9.5z" />
    </svg>
  );
}

export function CalendarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M7 2a1 1 0 0 0-1 1v1H5a3 3 0 0 0-3 3v11a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3h-1V3a1 1 0 1 0-2 0v1H8V3a1 1 0 0 0-1-1zM4 8h16v10a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8z" />
      <path d="M7 11h5v2H7zM13 11h4v2h-4zM7 14h5v2H7zM13 14h4v2h-4z" />
    </svg>
  );
}

export function CheckCircle(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 2a10 10 0 1010 10A10.011 10.011 0 0012 2zm-1 15l-4-4 1.414-1.414L11 14.172l5.586-5.586L18 10z" />
    </svg>
  );
}
