'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import clsx from 'clsx';
import { categories, Category } from './utils';

type Props = {
  value: Category;
  onChange: (v: Category) => void;
  t: (k: string) => string;
  disabled?: boolean;
};

const FilterSelect: React.FC<Props> = ({ value, onChange, t, disabled }) => {
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  const idxByValue = useMemo(() => categories.findIndex(c => c.value === value), [value]);
  const [activeIdx, setActiveIdx] = useState(Math.max(idxByValue, 0));
  useEffect(() => setActiveIdx(Math.max(idxByValue, 0)), [idxByValue]);

  // закрытие по клику вне
  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (!btnRef.current || !listRef.current) return;
      if (btnRef.current.contains(e.target as Node)) return;
      if (listRef.current.contains(e.target as Node)) return;
      setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [open]);

  // клавиатура на кнопке
  const onButtonKeyDown: React.KeyboardEventHandler<HTMLButtonElement> = e => {
    if (disabled) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setOpen(o => !o);
      return;
    }
    if (['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(e.key)) {
      e.preventDefault();
      if (!open) setOpen(true);
      let next = activeIdx;
      if (e.key === 'ArrowDown') next = Math.min(activeIdx + 1, categories.length - 1);
      if (e.key === 'ArrowUp') next = Math.max(activeIdx - 1, 0);
      if (e.key === 'Home') next = 0;
      if (e.key === 'End') next = categories.length - 1;
      setActiveIdx(next);
      requestAnimationFrame(() => {
        const node = listRef.current?.querySelector<HTMLDivElement>(`[data-opt="${next}"]`);
        node?.scrollIntoView({ block: 'nearest' });
      });
    }
  };

  // клавиатура на списке
  const onListKeyDown: React.KeyboardEventHandler<HTMLDivElement> = e => {
    if (e.key === 'Escape') {
      e.preventDefault();
      setOpen(false);
      btnRef.current?.focus();
      return;
    }
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const chosen = categories[activeIdx];
      if (chosen) {
        onChange(chosen.value);
        setOpen(false);
        btnRef.current?.focus();
      }
      return;
    }
    if (['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(e.key)) {
      e.preventDefault();
      let next = activeIdx;
      if (e.key === 'ArrowDown') next = Math.min(activeIdx + 1, categories.length - 1);
      if (e.key === 'ArrowUp') next = Math.max(activeIdx - 1, 0);
      if (e.key === 'Home') next = 0;
      if (e.key === 'End') next = categories.length - 1;
      setActiveIdx(next);
      requestAnimationFrame(() => {
        const node = listRef.current?.querySelector<HTMLDivElement>(`[data-opt="${next}"]`);
        node?.scrollIntoView({ block: 'nearest' });
      });
    }
  };

  return (
    <div className="relative mx-auto w-full max-w-xl md:max-w-md">
      <button
        ref={btnRef}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls="tech-filter-listbox"
        disabled={disabled}
        onClick={() => !disabled && setOpen(o => !o)}
        onKeyDown={onButtonKeyDown}
        className={clsx(
          'flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-left font-sans transition',
          'bg-white/70 backdrop-blur dark:bg-slate-800/70',
          'border-slate-200 dark:border-slate-700',
          'text-slate-900 dark:text-slate-100',
          'focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500',
          disabled && 'cursor-not-allowed opacity-60',
        )}
      >
        <span className="truncate">{t(value)}</span>
        <svg
          className={clsx('ml-3 h-5 w-5 transition-transform', open ? 'rotate-180' : 'rotate-0')}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 10.94l3.71-3.71a.75.75 0 0 1 1.08 1.04l-4.25 4.25a.75.75 0 0 1-1.06 0L5.21 8.27a.75.75 0 0 1 .02-1.06z" />
        </svg>
      </button>

      {open && !disabled && (
        <div
          ref={listRef}
          id="tech-filter-listbox"
          role="listbox"
          tabIndex={-1}
          aria-activedescendant={`tech-opt-${activeIdx}`}
          onKeyDown={onListKeyDown}
          className="absolute left-0 right-0 top-full z-50 mt-2 max-h-64 overflow-auto rounded-2xl border border-slate-200 bg-white shadow-xl outline-none dark:border-slate-700 dark:bg-slate-900"
        >
          {categories.map((cat, i) => {
            const active = value === cat.value;
            const focused = i === activeIdx;
            return (
              <div
                key={cat.value}
                id={`tech-opt-${i}`}
                data-opt={i}
                role="option"
                aria-selected={active}
                tabIndex={-1}
                onMouseEnter={() => setActiveIdx(i)}
                onClick={() => {
                  onChange(cat.value);
                  setOpen(false);
                  btnRef.current?.focus();
                }}
                className={clsx(
                  'cursor-pointer px-4 py-3 text-sm md:text-base',
                  'text-slate-900 dark:text-slate-100',
                  active
                    ? 'bg-blue-50/70 dark:bg-blue-950/30'
                    : focused
                      ? 'bg-slate-50 dark:bg-slate-800/50'
                      : 'hover:bg-slate-50 dark:hover:bg-slate-800/50',
                )}
              >
                {t(cat.value)}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default FilterSelect;
