'use client';
import { useEffect, useRef } from 'react';

let locks = 0;
let savedScrollY = 0;

export function useScrollLock(enabled: boolean) {
  const wasEnabled = useRef(false);

  useEffect(() => {
    if (enabled && !wasEnabled.current) {
      wasEnabled.current = true;
      locks += 1;

      // запоминаем текущий скролл
      savedScrollY = window.scrollY;

      const body = document.body;
      body.style.position = 'fixed';
      body.style.top = `-${savedScrollY}px`;
      body.style.left = '0';
      body.style.right = '0';
      body.style.width = '100%';
      body.style.overflow = 'hidden'; // для десктопов
    }

    if (!enabled && wasEnabled.current) {
      wasEnabled.current = false;
      locks = Math.max(0, locks - 1);

      if (locks === 0) {
        const body = document.body;
        body.style.position = '';
        body.style.top = '';
        body.style.left = '';
        body.style.right = '';
        body.style.width = '';
        body.style.overflow = '';
        window.scrollTo(0, savedScrollY);
      }
    }

    return () => {
      // очистка если размонтировали при включённом lock
      if (wasEnabled.current) {
        wasEnabled.current = false;
        locks = Math.max(0, locks - 1);

        if (locks === 0) {
          const body = document.body;
          body.style.position = '';
          body.style.top = '';
          body.style.left = '';
          body.style.right = '';
          body.style.width = '';
          body.style.overflow = '';
          window.scrollTo(0, savedScrollY);
        }
      }
    };
  }, [enabled]);
}
