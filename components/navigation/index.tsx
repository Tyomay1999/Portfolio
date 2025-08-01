'use client';

import React from 'react';
import { setActiveSection, useActiveSection } from '@/lib/sectionStore';

const Navigation = () => {
  const activeSection = useActiveSection();
  const sectionCount = 9;

  const handleDotClick = (index: number) => setActiveSection(index);

  return (
    <div className="scroll-indicator fixed right-4 top-1/2 z-50 flex -translate-y-1/2 transform flex-col gap-2">
      {Array.from({ length: sectionCount }, (_, i) => i - 1).map(index => (
        <div
          key={index}
          onClick={() => handleDotClick(index)}
          className={`scroll-dot ${activeSection === index ? 'active' : ''} h-3 w-3 cursor-pointer rounded-full transition-colors duration-300 ${
            activeSection === index
              ? 'scale-110 bg-slate-900 dark:bg-slate-100'
              : 'bg-slate-300 dark:bg-slate-700'
          }`}
        />
      ))}
    </div>
  );
};

export default Navigation;
