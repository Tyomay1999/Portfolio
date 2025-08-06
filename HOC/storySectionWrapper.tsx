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
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isExiting, setIsExiting] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = subscribe((id: number) => {
      const isNowActive = id === sectionId;
      setIsExiting(isActive && !isNowActive);
      setIsActive(isNowActive);
    });

    if (getActiveSection() === sectionId) {
      setIsActive(true);
    }

    return () => unsubscribe();
  }, [sectionId, isActive]);

  return (
    <section
      ref={ref}
      data-section={sectionId}
      className={`story-section ${isActive ? 'active' : ''} ${isExiting ? 'exiting' : ''}`}
    >
      <div className="story-overlay" />
      <div className="story-content">
        <div className={`story-inner ${innerClassName ?? ''}`}>{children}</div>
      </div>
    </section>
  );
}
