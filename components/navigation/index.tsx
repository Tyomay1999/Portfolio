'use client';

import React from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { setActiveSection, useActiveSection } from '@/lib/sectionStore';

const sectionCount = 9; // количество точек (включая спец-страницу -1)

const Navigation: React.FC = () => {
  const activeSection = useActiveSection();

  // индексы: -1, 0, 1, ..., sectionCount-2
  const indices = React.useMemo(() => Array.from({ length: sectionCount }, (_, i) => i - 1), []);
  const minIndex = indices[0]; // -1
  const maxIndex = indices[indices.length - 1]; // sectionCount - 2

  const goPrev = () => {
    const pos = indices.indexOf(activeSection);
    if (pos > 0) setActiveSection(indices[pos - 1]);
  };

  const goNext = () => {
    const pos = indices.indexOf(activeSection);
    if (pos >= 0 && pos < indices.length - 1) setActiveSection(indices[pos + 1]);
  };

  return (
    <div
      className="scroll-indicator fixed right-4 top-1/2 z-50 flex -translate-y-1/2 transform flex-col items-center gap-2 md:gap-3"
      role="navigation"
      aria-label="Section navigation"
    >
      {/* Up arrow — desktop only */}
      <button
        type="button"
        onClick={goPrev}
        aria-label="Previous section"
        className="hidden items-center justify-center rounded-full border border-slate-300/60 bg-white/70 p-1.5 shadow-sm backdrop-blur transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700/60 dark:bg-slate-800/70 hover:dark:bg-slate-800 md:flex"
        disabled={activeSection === minIndex}
      >
        <ChevronUp className="h-4 w-4 lg:h-5 lg:w-5" />
      </button>

      {/* Dots */}
      {indices.map(index => {
        const isActive = activeSection === index;
        return (
          <button
            key={index}
            type="button"
            onClick={() => setActiveSection(index)}
            aria-label={`Scroll to section ${index}`}
            aria-current={isActive ? 'true' : undefined}
            className={[
              // базовая форма/размер
              'scroll-dot rounded-full transition-all duration-200',
              'h-3 w-3 md:h-3.5 md:w-3.5 lg:h-4 lg:w-4',
              'p-1 md:p-1.5', // hit area

              // состояние
              isActive
                ? [
                    'scale-110',
                    // контрастный обвод — виден и в light, и в dark
                    'bg-slate-900 dark:bg-slate-100',
                    'ring-2 ring-slate-900/80 dark:ring-slate-100/90',
                    'ring-offset-2 ring-offset-white dark:ring-offset-slate-900',
                    'shadow-sm',
                  ].join(' ')
                : ['bg-slate-300 dark:bg-slate-700', 'opacity-80 hover:opacity-100'].join(' '),

              // доступность при фокусе
              'focus-visible:outline-none focus-visible:ring-2',
              'focus-visible:ring-blue-500 focus-visible:ring-offset-2',
              'focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-900',
            ].join(' ')}
          />
        );
      })}

      {/* Down arrow — desktop only */}
      <button
        type="button"
        onClick={goNext}
        aria-label="Next section"
        className="hidden items-center justify-center rounded-full border border-slate-300/60 bg-white/70 p-1.5 shadow-sm backdrop-blur transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700/60 dark:bg-slate-800/70 hover:dark:bg-slate-800 md:flex"
        disabled={activeSection === maxIndex}
      >
        <ChevronDown className="h-4 w-4 lg:h-5 lg:w-5" />
      </button>
    </div>
  );
};

export default Navigation;
