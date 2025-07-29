import { useEffect } from 'react';
import {
  setActiveSection,
  getActiveSection,
  getCurrentStoryContentElement,
  restoreSectionFromSession,
} from '../../lib/sectionStore';

const isContentScrollable = (el: HTMLElement): boolean => el.scrollHeight > el.clientHeight;
const hasScrolledToBottom = (el: HTMLElement): boolean =>
  el.scrollTop + el.clientHeight >= el.scrollHeight - 2;
const hasScrolledToTop = (el: HTMLElement): boolean => el.scrollTop <= 2;

const ScrollManager = () => {
  useEffect(() => {
    restoreSectionFromSession();
    let wheelDelta = 0;
    let timeout: NodeJS.Timeout;
    let touchStartY = 0;

    const handleWheel = (e: WheelEvent) => {
      processScroll(e.deltaY, e);
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY - touchY;
      processScroll(deltaY, e);
    };

    const processScroll = (deltaY: number) => {
      const storyContent = getCurrentStoryContentElement();
      if (!storyContent) return;

      const isScrollable = isContentScrollable(storyContent);

      if (isScrollable) {
        const atTop = hasScrolledToTop(storyContent);
        const atBottom = hasScrolledToBottom(storyContent);

        if ((deltaY > 0 && atBottom) || (deltaY < 0 && atTop)) {
        } else {
          return;
        }
      }

      wheelDelta += deltaY;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        const current = getActiveSection();

        if (Math.abs(wheelDelta) > 50) {
          if (wheelDelta > 0 && current < 7) {
            setActiveSection(current + 1);
          } else if (wheelDelta < 0 && current > -1) {
            setActiveSection(current - 1);
          }
        }
        wheelDelta = 0;
      }, 60);
    };

    setActiveSection(-1);

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
