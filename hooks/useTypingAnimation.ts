import React, { useEffect } from 'react';

interface TypingOptions {
  phrases: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseTime?: number;
}

export default function useTypingAnimation(
  ref: React.RefObject<HTMLSpanElement | null>,
  {
    phrases,
    typingSpeed = 100,
    deletingSpeed = 50,
    pauseTime = 1500
  }: TypingOptions
) {
  useEffect(() => {
    if (!ref.current) return;

    let currentPhraseIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;

    const el = ref.current;

    const type = () => {
      const currentPhrase = phrases[currentPhraseIndex];

      if (!el) return;

      if (isDeleting) {
        el.textContent = currentPhrase.substring(0, currentCharIndex - 1);
        currentCharIndex--;

        if (currentCharIndex === 0) {
          isDeleting = false;
          currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
          setTimeout(type, 200);
          return;
        }

        setTimeout(type, deletingSpeed);
      } else {
        el.textContent = currentPhrase.substring(0, currentCharIndex + 1);
        currentCharIndex++;

        if (currentCharIndex === currentPhrase.length) {
          setTimeout(() => {
            isDeleting = true;
            type();
          }, pauseTime);
          return;
        }

        const randomVariation = Math.random() * 50 - 25;
        const currentSpeed = typingSpeed + randomVariation;

        setTimeout(type, Math.max(50, currentSpeed));
      }
    };

    const timeoutId = setTimeout(type, 500);

    return () => clearTimeout(timeoutId);
  }, [ref, phrases, typingSpeed, deletingSpeed, pauseTime]);
}
