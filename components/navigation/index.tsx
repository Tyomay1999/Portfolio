'use client';

import React, { useEffect, useState } from 'react';

const Navigation = () => {
    const [activeSection, setActiveSection] = useState<number>(-1);
    const [sectionCount, setSectionCount] = useState<number>(0);
    const [isScrolling, setIsScrolling] = useState(false);

    useEffect(() => {
        const sections = document.querySelectorAll<HTMLElement>('[data-section]');
        setSectionCount(sections.length);

        let wheelDelta = 0;
        let scrollTimeout: NodeJS.Timeout;

        const handleWheel = (e: WheelEvent) => {
            if (isScrolling) return;

            const current = activeSection;
            wheelDelta += e.deltaY;

            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                if (Math.abs(wheelDelta) > 100) {
                    if (wheelDelta > 0 && current < sections.length - 1) {
                        scrollToSection(current + 1);
                    } else if (wheelDelta < 0 && current > 0) {
                        scrollToSection(current - 1);
                    }
                }
                wheelDelta = 0;
            }, 50);
        };

        const handleKeyDown = (e: KeyboardEvent) => {
            if (isScrolling) return;
            if (e.key === 'ArrowDown' && activeSection < sectionCount - 1) {
                scrollToSection(activeSection + 1);
            } else if (e.key === 'ArrowUp' && activeSection > 0) {
                scrollToSection(activeSection - 1);
            }
        };

        const handleTouchSwipe = (() => {
            let startY = 0;
            let endY = 0;

            return {
                start: (e: TouchEvent) => {
                    startY = e.touches[0].clientY;
                },
                end: (e: TouchEvent) => {
                    endY = e.changedTouches[0].clientY;
                    const diff = startY - endY;

                    if (Math.abs(diff) > 50 && !isScrolling) {
                        if (diff > 0 && activeSection < sections.length - 1) {
                            scrollToSection(activeSection + 1);
                        } else if (diff < 0 && activeSection > 0) {
                            scrollToSection(activeSection - 1);
                        }
                    }
                }
            };
        })();

        const scrollToSection = (index: number) => {
            const section = document.querySelector(`[data-section="${index}"]`);
            if (section) {
                setIsScrolling(true);
                section.scrollIntoView({ behavior: 'smooth' });
                setTimeout(() => {
                    setActiveSection(index);
                    setIsScrolling(false);
                }, 700); // time to finish scroll animation
            }
        };

        const onScroll = () => {
            const midpoint = window.innerHeight / 2;
            let found: number = -1;
            sections.forEach((section) => {
                const rect = section.getBoundingClientRect();
                const index = Number(section.getAttribute('data-section'));
                if (rect.top <= midpoint && rect.bottom >= midpoint) {
                    found = index;
                }
            });
            setActiveSection(found);
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('wheel', handleWheel, { passive: false });
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('touchstart', handleTouchSwipe.start);
        window.addEventListener('touchend', handleTouchSwipe.end);

        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('wheel', handleWheel);
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('touchstart', handleTouchSwipe.start);
            window.removeEventListener('touchend', handleTouchSwipe.end);
        };
    }, [activeSection, sectionCount]);

    const handleDotClick = (index: number) => {
        const target = document.querySelector(`[data-section="${index}"]`);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="scroll-indicator fixed top-1/2 right-4 transform -translate-y-1/2 z-50 flex flex-col gap-2">
            {Array.from({ length: sectionCount }).map((_, index) => (
                <div
                    key={index}
                    onClick={() => handleDotClick(index)}
                    className={`scroll-dot w-3 h-3 rounded-full cursor-pointer ${
                        activeSection === index
                            ? 'bg-slate-900 dark:bg-slate-100'
                            : 'bg-slate-300 dark:bg-slate-700'
                    }`}
                />
            ))}
        </div>
    );
};

export default Navigation;
