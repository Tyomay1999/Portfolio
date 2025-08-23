'use client';
import { Dispatch, SetStateAction, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import CalendarHeader from './calendar/calendarHeader';
import WeekdaysBar from './calendar/weekdaysBar';
import DayGrid from './calendar/dayGrid';

type Props = {
  currentDate: Date;
  setCurrentDate: Dispatch<SetStateAction<Date>>;
  bookings: Record<string, string[]>;
  onSelectDate: (d: Date) => void;
  selectedDate: Date | null;
};

export default function BookingCalendar({
  currentDate,
  setCurrentDate,
  bookings,
  onSelectDate,
  selectedDate,
}: Props) {
  const t = useTranslations('bookingCalendar');
  const months = t.raw('calendar.months') as string[];
  const weekdaysShort = t.raw('calendar.weekdaysShort') as string[];

  // clamp to [this month .. this month + 3]
  const now = new Date();
  const minMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const maxMonthStart = new Date(now.getFullYear(), now.getMonth() + 3, 1);

  const isAtMin =
    currentDate.getFullYear() === minMonthStart.getFullYear() &&
    currentDate.getMonth() === minMonthStart.getMonth();

  const isAtMax =
    currentDate.getFullYear() === maxMonthStart.getFullYear() &&
    currentDate.getMonth() === maxMonthStart.getMonth();

  const goPrev = () => {
    const d = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
    if (d >= minMonthStart) setCurrentDate(d);
  };
  const goNext = () => {
    const d = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
    if (d <= maxMonthStart) setCurrentDate(d);
  };

  const monthLabel = useMemo(() => {
    const name = months[currentDate.getMonth()] || '';
    return `${name} ${currentDate.getFullYear()}`;
  }, [currentDate, months]);

  return (
    <div className="mx-auto max-w-sm md:max-w-xl lg:max-w-3xl">
      <CalendarHeader
        label={monthLabel}
        onPrev={goPrev}
        onNext={goNext}
        disablePrev={isAtMin}
        disableNext={isAtMax}
        ariaPrev={t('aria.prevMonth')}
        ariaNext={t('aria.nextMonth')}
      />

      <WeekdaysBar weekdaysShort={weekdaysShort} />

      <DayGrid
        currentDate={currentDate}
        selectedDate={selectedDate}
        bookings={bookings}
        minMonthStart={minMonthStart}
        maxMonthStart={maxMonthStart}
        t={(key: string) => t(key as string)}
        onSelectDate={onSelectDate}
      />
    </div>
  );
}
