'use client';

import { useState, useEffect } from 'react';

type SectionChangeCallback = (id: number) => void;

let listeners: SectionChangeCallback[] = [];
let currentSection: number = -1;


export function subscribe(callback: SectionChangeCallback): () => void {
  listeners.push(callback);
  return () => {
    listeners = listeners.filter(fn => fn !== callback);
  };
}

export function setActiveSection(id: number): void {
  if (currentSection !== id) {
    currentSection = id;

    if (typeof window !== 'undefined') {
      sessionStorage.setItem('activeSection', String(id));
    }

    listeners.forEach(fn => fn(id));
  }
}

export function getActiveSection(): number {
  return currentSection;
}

export function useActiveSection(): number {
  const [section, setSection] = useState<number>(currentSection);

  useEffect(() => {
    const unsubscribe = subscribe(setSection);
    return () => unsubscribe();
  }, []);

  return section;
}

export function getCurrentSectionElement(): HTMLElement | null {
  const currentIndex = getActiveSection();
  return document.querySelector(`[data-section="${currentIndex + 1}"]`);
}

export function getCurrentStoryContentElement(): HTMLElement | null {
  const sectionIndex = getActiveSection();
  const section = document.querySelector(`[data-section="${sectionIndex}"]`);
  return section?.querySelector('.story-content') ?? null;
}

export function restoreSectionFromSession(): void {
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
