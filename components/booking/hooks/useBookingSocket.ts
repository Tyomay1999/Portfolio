// components/booking/hooks/useBookingSocket.ts
'use client';
import React, { useEffect } from 'react';
import { getSocket } from '@/lib/socket';
import type { BookingCreatedPayload, ServerToClientEvents } from '@/lib/socket';

export type SetLocalAdds = React.Dispatch<React.SetStateAction<Record<string, string[]>>>;

export function useBookingSocket(setLocalAdds: SetLocalAdds): void {
  // 👇 ЯВНО укажем тип возврата эффекта: void | () => void
  useEffect((): void | (() => void) => {
    const s = getSocket();

    const onCreated: ServerToClientEvents['booking:created'] = ({
      date,
      time,
    }: BookingCreatedPayload) => {
      setLocalAdds(prev => {
        const nextTimes = Array.from(new Set([...(prev[date] || []), time])).sort();
        return { ...prev, [date]: nextTimes };
      });
    };

    s.on('booking:created', onCreated);

    // ⬅️ Возвращаем именно функцию-очистку
    return () => {
      s.off('booking:created', onCreated);
    };
  }, [setLocalAdds]);
}
