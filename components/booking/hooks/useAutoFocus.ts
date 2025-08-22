'use client';
import React, { useEffect } from 'react';

export function useAutoFocus<T extends HTMLElement>(ref: React.RefObject<T>, enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;
    const id = setTimeout(() => ref.current?.focus(), 0);
    return () => clearTimeout(id);
  }, [enabled, ref]);
}
