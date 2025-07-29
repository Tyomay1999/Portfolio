'use client';

import { useState, useEffect } from 'react';

// Internal variables
let listeners: ((id: number) => void)[] = [];
let currentSection = -1;

/**
 * Subscribes to section changes
 */
export function subscribe(callback: (id: number) => void) {
  listeners.push(callback);
  return () => {
    listeners = listeners.filter(fn => fn !== callback);
  };
}

/**
 * Sets the current active section
 */
export function setActiveSection(id: number) {
  if (currentSection !== id) {
    currentSection = id;

    // ✅ Сохраняем в sessionStorage
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('activeSection', String(id));
    }

    // Уведомляем подписчиков
    listeners.forEach(fn => fn(id));
  }
}

/**
 * Gets the current section (sync)
 */
export function getActiveSection() {
  return currentSection;
}

/**
 * React hook for listening to section changes
 */
export function useActiveSection() {
  const [section, setSection] = useState(currentSection);

  useEffect(() => {
    const unsubscribe = subscribe(setSection);
    return () => unsubscribe();
  }, []);

  return section;
}

export const getCurrentSectionElement = (): HTMLElement | null => {
  const currentIndex = getActiveSection();
  return document.querySelector(`[data-section="${currentIndex + 1}"]`);
};

export const getCurrentStoryContentElement = (): HTMLElement | null => {
  const sectionIndex = getActiveSection();
  const section = document.querySelector(`[data-section="${sectionIndex}"]`);
  if (!section) return null;

  return section.querySelector('.story-content') as HTMLElement | null;
};

export function restoreSectionFromSession() {
  if (typeof window === 'undefined') return;

  const saved = sessionStorage.getItem('activeSection');
  if (saved !== null) {
    const sectionId = parseInt(saved, 10);
    if (!isNaN(sectionId)) {
      requestAnimationFrame(() => {
        const el = document.querySelector(`[data-section="${sectionId}"]`);
        if (el) {
          el.scrollIntoView({ behavior: 'instant', block: 'start' });
          setActiveSection(sectionId);
        }
      });
    }
  }
}
