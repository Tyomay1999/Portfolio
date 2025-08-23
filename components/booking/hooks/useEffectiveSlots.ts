'use client';
import { useMemo } from 'react';
import { combineDateAndTime, formatDateYmd } from '../lib/slotUtils';

export type Params = {
  date: Date | null;
  bookings: Record<string, string[]>;
  timeSlots: string[];
  saturdayCutoff: string;
  minLeadMinutes: number;
};

export function useEffectiveSlots({
  date,
  bookings,
  timeSlots,
  saturdayCutoff,
  minLeadMinutes,
}: Params) {
  const booked = useMemo(() => (date ? bookings[formatDateYmd(date)] || [] : []), [bookings, date]);

  const isSunday = date ? date.getDay() === 0 : false;
  const isSaturday = date ? date.getDay() === 6 : false;

  const effectiveSlots = useMemo(() => {
    if (!date) return [];
    if (isSunday) return [];

    const slots = isSaturday ? timeSlots.filter(s => s < saturdayCutoff) : timeSlots.slice();

    const now = new Date();
    const threshold = new Date(now.getTime() + minLeadMinutes * 60_000);

    return slots.filter(s => combineDateAndTime(date, s) >= threshold);
  }, [date, isSunday, isSaturday, timeSlots, saturdayCutoff, minLeadMinutes]);

  return { booked, isSunday, isSaturday, effectiveSlots };
}
