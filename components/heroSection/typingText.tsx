'use client';

import React, { useRef } from 'react';
import useTypingAnimation from '@/hooks/useTypingAnimation';

interface TypingTextProps {
  phrases: string[];
  className?: string;
  cursorClassName?: string;
}

const TypingText: React.FC<TypingTextProps> = ({
                                                 phrases,
                                                 className = '',
                                                 cursorClassName = 'typing-cursor',
                                               }) => {
  const typingRef = useRef<HTMLSpanElement | null>(null);

  useTypingAnimation(typingRef, {
    phrases,
  });

  return (
    <span className={`inline-flex items-center gap-1 ${className}`}>
      <span ref={typingRef} className="typing-text" />
      <span className={cursorClassName}>|</span>
    </span>
  );
};

export default TypingText;
