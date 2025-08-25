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
  return (
    !!el &&
    (el.tagName === 'INPUT' ||
      el.tagName === 'TEXTAREA' ||
      el.getAttribute('contenteditable') === 'true')
  );
};

export default function ScrollManager(): null {
  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    restoreSectionFromSession();
    setTimeout(scrollPageTop, 0);

    type Sample = { dy: number; t: number };
    const samples: Sample[] = [];
    let lastDir: 1 | -1 | 0 = 0;
    let inputKind: 'wheel' | 'touch' = 'wheel';

    let navLocked = false;
    const NAV_COOLDOWN_MS = 420;
    const lockNav = () => {
      navLocked = true;
    };
    const unlockNav = () => {
      navLocked = false;
      samples.length = 0;
      lastDir = 0;
    };

    // const WHEEL_WINDOW_MS = 80;
    // const WHEEL_THRESHOLD = 110;

    const TOUCH_WINDOW_MS = 90;
    const TOUCH_THRESHOLD = 120;

    let touchPrevY = 0;

    let pressStartTime = 0;

    let isPressing = false;
    const PRESS_BLOCK_MS = 120;

    let idleTimer: number | undefined;

    let keyboardOpen = isKeyboardOpenNow();
    const offKeyboard = onKeyboardChange(({ open }) => {
      keyboardOpen = open;
    });

    const goToSection = (newIndex: number) => {
      if (navLocked) return;
      lockNav();

      const target = clamp(newIndex);
      setActiveSection(target);

      if (target !== 8) setTimeout(scrollPageTop, 0);

      setTimeout(unlockNav, NAV_COOLDOWN_MS);
    };

    const processScroll = (deltaY: number, kind: 'wheel' | 'touch') => {
      if (keyboardOpen || hasTextFocus()) return;

      if (isPressing && performance.now() - pressStartTime > PRESS_BLOCK_MS) {
        return;
      }

      if (kind === 'wheel') {
        samples.length = 0;
        lastDir = 0;
        return;
      }

      if (navLocked) return;

      clearTimeout(idleTimer);
      idleTimer = window.setTimeout(() => {
        unlockNav();
      }, NAV_COOLDOWN_MS);

      const content = getCurrentStoryContentElement();
      if (!content) return;

      const scrollable = isScrollable(content);
      const top = atTop(content);
      const bottom = atBottom(content);
      const currentRaw = getActiveSection();
      const current = Number.isFinite(currentRaw) ? currentRaw : MIN_SECTION;

      if (scrollable && !top && !bottom) {
        samples.length = 0;
        return;
      }

      const shouldSwipe = !scrollable || (deltaY < 0 ? top : bottom);
      if (!shouldSwipe) return;

      const now = performance.now();
      const dir: 1 | -1 = deltaY > 0 ? 1 : -1;

      if (lastDir !== 0 && (dir !== lastDir || kind !== inputKind)) {
        samples.length = 0;
      }
      lastDir = dir;
      inputKind = kind;

      samples.push({ dy: deltaY, t: now });

      const cap = (v: number) => Math.max(-240, Math.min(240, v));
      samples[samples.length - 1].dy = cap(samples[samples.length - 1].dy);

      const windowMs = TOUCH_WINDOW_MS;
      while (samples.length && now - samples[0].t > windowMs) {
        samples.shift();
      }

      const sumAbs = samples.reduce(
        (acc, s) => (Math.sign(s.dy) === dir ? acc + Math.abs(s.dy) : acc),
        0,
      );

      const threshold = TOUCH_THRESHOLD;
      if (sumAbs >= threshold) {
        if (dir > 0) goToSection(current + 1);
        else goToSection(current - 1);

        samples.length = 0;
        lastDir = 0;
      }
    };

    const handleWheel = (e: WheelEvent) => {
      processScroll(e.deltaY, 'wheel');
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchPrevY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const y = e.touches[0].clientY;
      const dy = touchPrevY - y;
      touchPrevY = y;
      processScroll(dy, 'touch');
    };

    const handleMouseDown = () => {
      pressStartTime = performance.now();
      isPressing = true;
    };

    const handleMouseUp = () => {
      isPressing = false;
      pressStartTime = 0;
      samples.length = 0;
      lastDir = 0;
    };

    const handleTouchStartPress = (e: TouchEvent) => {
      touchPrevY = e.touches[0].clientY;
      pressStartTime = performance.now();
      isPressing = true;
    };

    const handleTouchEndPress = () => {
      isPressing = false;
      pressStartTime = 0;
      samples.length = 0;
      lastDir = 0;
    };

    const saved = sessionStorage.getItem('activeSection') || MIN_SECTION;
    setTimeout(() => {
      setActiveSection(clamp(saved as number));
      scrollPageTop();
    }, 200);

    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });
    window.addEventListener('touchstart', handleTouchStartPress, { passive: true });
    window.addEventListener('touchend', handleTouchEndPress, { passive: true });

    return () => {
      offKeyboard?.();
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchstart', handleTouchStartPress);
      window.removeEventListener('touchend', handleTouchEndPress);
    };
  }, []);

  return null;
}
