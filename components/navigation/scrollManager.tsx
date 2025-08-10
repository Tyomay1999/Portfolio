'use client';

import { useEffect } from 'react';
import {
  setActiveSection,
  getActiveSection,
  getCurrentStoryContentElement,
  restoreSectionFromSession,
} from '@/lib/sectionStore';
import { onKeyboardChange, isKeyboardOpenNow } from '@/lib/keyboard';
const MIN_SECTION = -1;
const MAX_SECTION = Number(process.env.NEXT_PUBLIC_TOTAL_SECTIONS ?? 7);

export const clamp = (n: number) => Math.min(MAX_SECTION, Math.max(MIN_SECTION, n), MAX_SECTION);

const isScrollable = (el: HTMLElement) => el.scrollHeight > el.clientHeight + 1;
const atTop = (el: HTMLElement) => el.scrollTop <= 2;
const atBottom = (el: HTMLElement) => el.scrollTop + el.clientHeight >= el.scrollHeight - 2;

const scrollPageTop = () => {
  window.scrollTo({ top: 5, left: 0, behavior: 'auto' });
  const c = getCurrentStoryContentElement();
  if (c) c.scrollTo({ top: 5, left: 0, behavior: 'auto' });
};

const hasTextFocus = () => {
  const el = document.activeElement as HTMLElement | null;
  return !!el && (
    el.tagName === 'INPUT' ||
    el.tagName === 'TEXTAREA' ||
    el.getAttribute('contenteditable') === 'true'
  );
};

export default function ScrollManager(): null {
  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    restoreSectionFromSession();
    setTimeout(scrollPageTop, 0);

    let wheelDelta = 0;
    let timeout: NodeJS.Timeout | null = null;
    let touchStartY = 0;
    let keyboardOpen = isKeyboardOpenNow();
    const offKeyboard = onKeyboardChange(({ open }) => {
      keyboardOpen = open;
    });

    const goToSection = (newIndex: number) => {
      setActiveSection(clamp(newIndex));
      if (newIndex !== 8) setTimeout(scrollPageTop, 0);
    };

    const processScroll = (deltaY: number) => {
      if (keyboardOpen || hasTextFocus()) return;
      const content = getCurrentStoryContentElement();
      if (!content) return;

      const scrollable = isScrollable(content);
      const top = atTop(content);
      const bottom = atBottom(content);
      const currentRaw = getActiveSection();
      const current = Number.isFinite(currentRaw) ? currentRaw : MIN_SECTION;

      // вверх — только с самого верха; вниз — только с самого низа; короткая — всегда
      const shouldSwipe = !scrollable || (deltaY < 0 && top) || (deltaY > 0 && bottom);
      if (!shouldSwipe) return;

      wheelDelta += deltaY;
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        if (Math.abs(wheelDelta) > 50) {
          if (deltaY > 0) goToSection(current + 1);
          else if (deltaY < 0) goToSection(current - 1);
        }
        wheelDelta = 0;
      }, 60);
    };

    const handleWheel = (e: WheelEvent) => processScroll(e.deltaY);
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    const handleTouchMove = (e: TouchEvent) => {
      const touchY = e.touches[0].clientY;
      processScroll(touchStartY - touchY);
    };

    const saved = sessionStorage.getItem('activeSection') || MIN_SECTION;
    setTimeout(() => {
      setActiveSection(clamp(saved as number));
      scrollPageTop();
    }, 200);

    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      if (timeout) clearTimeout(timeout);
      offKeyboard?.();
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  return null;
}
