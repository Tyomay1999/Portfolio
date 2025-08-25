'use client';
import { isSameDay, isSunday, isSaturday } from '../lib/dateUtils';

type Props = {
  date: Date;
  indexLabel: number;
  selectedDate: Date | null;
  disabled: boolean;
  outOfRange: boolean;
  bookedCount: number;
  titleStrings: {
    outOfRange: string;
    closedSunday: string;
    openSaturdayHalf: string;
  };
  halfDayLabel?: string;
  onSelect: (d: Date) => void;
};

export default function DayCell({
  date,
  indexLabel,
  selectedDate,
  disabled,
  outOfRange,
  bookedCount,
  titleStrings,
  halfDayLabel,
  onSelect,
}: Props) {
  const sun = isSunday(date);
  const sat = isSaturday(date);

  let subtitle = sat ? (halfDayLabel ?? '') : '';
  if (bookedCount > 0) {
    const bookedText = `${bookedCount}×`;
    subtitle = subtitle ? `${subtitle} • ${bookedText}` : bookedText;
  }

  const base =
    'rounded-xl p-2 text-center transition border min-h-[44px] ' +
    'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700';
  const state = disabled
    ? 'cursor-not-allowed opacity-50'
    : 'cursor-pointer hover:bg-blue-50 hover:dark:bg-blue-950/30 hover:ring-1 hover:ring-blue-400/60 dark:hover:ring-blue-500/60';
  const selected = isSameDay(selectedDate, date)
    ? 'bg-blue-50 dark:bg-blue-950/40 ring-2 ring-blue-500 dark:ring-blue-400 ring-offset-2 ring-offset-white dark:ring-offset-slate-900'
    : '';

  return (
    <button
      disabled={disabled}
      title={
        outOfRange
          ? titleStrings.outOfRange
          : sun
            ? titleStrings.closedSunday
            : sat
              ? titleStrings.openSaturdayHalf
              : undefined
      }
      onClick={() => !disabled && onSelect(date)}
      className={[base, state, selected].join(' ')}
    >
      <div className="font-medium text-slate-900 dark:text-slate-100">{indexLabel}</div>

      {subtitle && (
        <div
          className="mt-1 w-full min-w-0 overflow-hidden text-ellipsis whitespace-nowrap px-1 text-center text-[11px] leading-3 text-slate-500 dark:text-slate-400"
          title={subtitle}
        >
          {subtitle}
        </div>
      )}
    </button>
  );
}
