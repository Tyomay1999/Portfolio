'use client';

import { useEffect } from 'react';
import {
  setActiveSection,
  getActiveSection,
  getCurrentStoryContentElement,
  restoreSectionFromSession,
} from '@/lib/sectionStore';

const isScrollable = (el: HTMLElement) => el.scrollHeight > el.clientHeight + 1;
const atTop = (el: HTMLElement) => el.scrollTop <= 2;
const atBottom = (el: HTMLElement) =>
  el.scrollTop + el.clientHeight >= el.scrollHeight - 2;

const scrollPageTop = () => {
  window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  const c = getCurrentStoryContentElement();
  if (c) c.scrollTo({ top: 0, left: 0, behavior: 'auto' });
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

    const goToSection = (newIndex: number) => {
      setActiveSection(newIndex);
      // При каждом переключении секции всегда сбрасываем скролл
      setTimeout(scrollPageTop, 0);
    };

    const processScroll = (deltaY: number) => {
      const content = getCurrentStoryContentElement();
      if (!content) return;

      const scrollable = isScrollable(content);
      const top = atTop(content);
      const bottom = atBottom(content);
      const current = getActiveSection();

      // Логика:
      // вверх — листаем, если в самом верху
      // вниз — листаем, если в самом низу
      // короткая секция — листаем всегда
      const shouldSwipe =
        !scrollable || (deltaY < 0 && top) || (deltaY > 0 && bottom);

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

    const handleWheel = (e: WheelEvent) => {
      processScroll(e.deltaY);
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY - touchY;
      processScroll(deltaY);
    };

    // При открытии восстанавливаем секцию, но сбрасываем скролл внутри неё
    const savedSection = Number(sessionStorage.getItem('activeSection')) || 0;
    setTimeout(() => {
      setActiveSection(savedSection);
      scrollPageTop();
    }, 200);

    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      if (timeout) clearTimeout(timeout);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  return null;
}
