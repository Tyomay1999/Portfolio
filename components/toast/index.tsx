'use client';

import { useEffect, useState } from 'react';

export default function Toast({ message, onClose }: { message: string; onClose: () => void }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const timeout = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 30); // Подождать, пока анимация скроется
    }, 5000);

    return () => clearTimeout(timeout);
  }, [onClose]);

  return (
    <div
      className={`fixed left-5 top-5 z-50 transform transition-all duration-300 ${
        visible ? 'translate-y-0 opacity-100' : '-translate-y-3 opacity-0'
      } rounded-lg bg-white px-4 py-3 text-sm text-gray-800 shadow-lg dark:bg-gray-800 dark:text-white`}
    >
      {message}
    </div>
  );
}
