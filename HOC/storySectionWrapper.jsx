'use client';

import React, { useEffect, useRef, useState } from 'react';

export default function StorySectionWrapper({ children, sectionId }) {
    const ref = useRef(null);
    const [isActive, setIsActive] = useState(false);
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        const el = ref.current;
        const handleScroll = () => {
            if (!el) return;
            const rect = el.getBoundingClientRect();
            const isVisible = rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2;


            if (isVisible && !isActive) {
                console.log("HERE", isVisible)
                setIsActive(true);
                setIsExiting(false);
            } else if (!isVisible && isActive) {
                console.log("ANOTHER HERE")
                setIsActive(false);
                setIsExiting(true);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        // handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, [isActive]);

    return (
        <section
            ref={ref}
            data-section={sectionId}
            className={`
                story-section
                ${isActive ? "active" : ''}
                ${isExiting ? "exiting" : ''}
            `}
        >
            <div className={"story-overlay"} />
            <div className={"story-content"}>
                <div className={"story-inner"}>{children}</div>
            </div>
        </section>
    );
}
