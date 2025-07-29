'use client';

import React, { useEffect, useRef, useState } from 'react';
import { getActiveSection, subscribe } from '../lib/sectionStore';

export default function StorySectionWrapper({
  children,
  sectionId,
}: {
  children: React.ReactNode;
  sectionId: number;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribe(id => {
      const isNowActive = id === sectionId;
      setIsExiting(isActive && !isNowActive);
      setIsActive(isNowActive);
    });

    const current = getActiveSection();
    if (current === sectionId) {
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
        <div className="story-inner">{children}</div>
      </div>
    </section>
  );
}
