'use client';

import { useEffect } from 'react';
import {
  setActiveSection,
  getActiveSection,
  getCurrentStoryContentElement,
  restoreSectionFromSession,
} from '@/lib/sectionStore';


const isContentScrollable = (el: HTMLElement): boolean => el.scrollHeight > el.clientHeight;


const hasScrolledToBottom = (el: HTMLElement): boolean =>
  el.scrollTop + el.clientHeight >= el.scrollHeight - 2;


const hasScrolledToTop = (el: HTMLElement): boolean => el.scrollTop <= 2;

const ScrollManager = (): null => {
  useEffect(() => {
    restoreSectionFromSession();

    let wheelDelta = 0;
    let timeout: NodeJS.Timeout;
    let touchStartY = 0;

    const handleWheel = (e: WheelEvent): void => {
      processScroll(e.deltaY);
    };

    const handleTouchStart = (e: TouchEvent): void => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent): void => {
      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY - touchY;
      processScroll(deltaY);
    };

    const processScroll = (deltaY: number): void => {
      const storyContent = getCurrentStoryContentElement();
      if (!storyContent) return;

      const isScrollable = isContentScrollable(storyContent);
      const atTop = hasScrolledToTop(storyContent);
      const atBottom = hasScrolledToBottom(storyContent);

      if (isScrollable && !((deltaY > 0 && atBottom) || (deltaY < 0 && atTop))) return

      wheelDelta += deltaY;

      clearTimeout(timeout);
      timeout = setTimeout(() => {
        const current = getActiveSection();

        if (Math.abs(wheelDelta) > 50) {
          if (deltaY > 0 && current < 7) {
            setActiveSection(current + 1);
          } else if (deltaY < 0 && current > -1) {
            setActiveSection(current - 1);
          }
        }

        wheelDelta = 0;
      }, 60);
    };

    // Восстановление секции из sessionStorage
    const savedSection = Number(sessionStorage.getItem('activeSection')) || -1;
    setTimeout(() => {
      setActiveSection(savedSection);
    }, 400);

    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  return null;
};

export default ScrollManager;
