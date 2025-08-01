'use client';

import React from 'react';
import { setActiveSection, useActiveSection } from '@/lib/sectionStore';

const sectionCount: number = 9;

const Navigation: React.FC = () => {
  const activeSection: number = useActiveSection();

  const handleDotClick = (index: number): void => {
    setActiveSection(index);
  };

  return (
    <div
      className="scroll-indicator fixed right-4 top-1/2 z-50 flex -translate-y-1/2 transform flex-col gap-2"
      role="navigation"
      aria-label="Section navigation"
    >
      {Array.from({ length: sectionCount }, (_, i) => i - 1).map((index: number) => (
        <button
          key={index}
          onClick={() => handleDotClick(index)}
          aria-label={`Scroll to section ${index + 1}`}
          aria-current={activeSection === index ? 'true' : undefined}
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
