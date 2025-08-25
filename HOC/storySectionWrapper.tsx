'use client';

import React, { useEffect, useRef, useState, JSX } from 'react';
import { getActiveSection, subscribe } from '@/lib/sectionStore';

interface StorySectionWrapperProps {
  children: React.ReactNode;
  sectionId: number;
  innerClassName?: string;
}

export default function StorySectionWrapper({
  children,
  sectionId,
  innerClassName,
}: StorySectionWrapperProps): JSX.Element {
  const ref = useRef<HTMLElement | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribe((id: number) => {
      const isNowActive = id === sectionId;
      setIsExiting(isActive && !isNowActive);
      setIsActive(isNowActive);
    });
    if (getActiveSection() === sectionId) setIsActive(true);
    return () => unsubscribe();
  }, [sectionId, isActive]);

  const safePaddings = [
    'mx-auto max-w-screen-2xl',
    'px-2 sm:px-6',
    'md:px-12 lg:px-16 xl:px-20',
    'pt-[calc(env(safe-area-inset-top,0px)+0.5rem)] md:pt-8 lg:pt-10',
  ].join(' ');

  return (
    <section
      ref={ref}
      data-section={sectionId}
      className={`story-section ${isActive ? 'active' : ''} ${isExiting ? 'exiting' : ''}`}
    >
      <div className="story-overlay" />
      <div className="story-content">
        <div className={`story-inner ${safePaddings} ${innerClassName ?? ''}`}>{children}</div>
      </div>
    </section>
  );
}
