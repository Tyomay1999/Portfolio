'use client';
import DayCell from './dayCell';
import {
  getDaysInMonth,
  getFirstDayOfMonth,
  isDateInPast,
  isSunday,
  isSaturday,
  formatDateYmd,
} from '../lib/dateUtils';

type Props = {
  currentDate: Date;
  selectedDate: Date | null;
  bookings: Record<string, string[]>;
  minMonthStart: Date;
  maxMonthStart: Date;
  t: (key: string) => string;
  onSelectDate: (d: Date) => void;
};

export default function DayGrid({
  currentDate,
  selectedDate,
  bookings,
  minMonthStart,
  maxMonthStart,
  t,
  onSelectDate,
}: Props) {
  const days = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const maxExclusive = new Date(maxMonthStart.getFullYear(), maxMonthStart.getMonth() + 1, 1);
  const inAllowedMonths = (d: Date) => d >= minMonthStart && d < maxExclusive;

  return (
    <div id="calendarDays" className="grid grid-cols-7 gap-1">
      {Array.from({ length: firstDay }).map((_, i) => (
        <div key={`e-${i}`} />
      ))}

      {Array.from({ length: days }).map((_, i) => {
        const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), i + 1);
        const key = formatDateYmd(date);
        const past = isDateInPast(date);
        const outOfRange = !inAllowedMonths(date);
        const disabled = past || isSunday(date);
        const bookedCount = bookings[key]?.length || 0;

        return (
          <DayCell
            key={key}
            date={date}
            indexLabel={i + 1}
            selectedDate={selectedDate}
            disabled={disabled || outOfRange}
            outOfRange={outOfRange}
            bookedCount={bookedCount}
            halfDayLabel={isSaturday(date) ? t('calendar.halfDay') : undefined}
            titleStrings={{
              outOfRange: t('titles.outOfRange'),
              closedSunday: t('titles.closedSunday'),
              openSaturdayHalf: t('titles.openSaturdayHalf'),
            }}
            onSelect={onSelectDate}
          />
        );
      })}
    </div>
  );
}
