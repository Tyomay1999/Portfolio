'use client';

import type { ReactNode } from 'react';
import { ThemeProvider } from 'next-themes';

interface ProvidersProps {
  children: ReactNode;
  initialTheme?: 'light' | 'dark' | 'system';
}

export function Providers({ children, initialTheme = 'system' }: ProvidersProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme={initialTheme}
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}
