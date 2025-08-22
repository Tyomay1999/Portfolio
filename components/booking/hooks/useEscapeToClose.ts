'use client';
import { useEffect } from 'react';

export function useEscapeToClose(enabled: boolean, onClose: () => void) {
  useEffect(() => {
    if (!enabled) return;
    const onEsc = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onEsc);
    return () => window.removeEventListener('keydown', onEsc);
  }, [enabled, onClose]);
}
