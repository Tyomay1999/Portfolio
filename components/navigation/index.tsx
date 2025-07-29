'use client';

import React from 'react';
import { setActiveSection, useActiveSection } from '../../lib/sectionStore';

const Navigation = () => {
  const activeSection = useActiveSection();
  const sectionCount = 9;

  const handleDotClick = (index: number) => {
    setActiveSection(index);
  };

  return (
    <div className="scroll-indicator fixed top-1/2 right-4 transform -translate-y-1/2 z-50 flex flex-col gap-2">
      {Array.from({ length: sectionCount }, (_, i) => i - 1).map(index => (
        <div
          key={index}
          onClick={() => handleDotClick(index)}
          className={`scroll-dot ${activeSection === index ? 'active' : ''} w-3 h-3 rounded-full cursor-pointer transition-colors duration-300 ${
            activeSection === index
              ? 'bg-slate-900 dark:bg-slate-100 scale-110'
              : 'bg-slate-300 dark:bg-slate-700'
          }`}
        />
      ))}
    </div>
  );
};

export default Navigation;
