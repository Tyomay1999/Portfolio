'use client';

type Props = {
  label: string;
  onPrev: () => void;
  onNext: () => void;
  disablePrev?: boolean;
  disableNext?: boolean;
  ariaPrev: string;
  ariaNext: string;
};

export default function CalendarHeader({
  label,
  onPrev,
  onNext,
  disablePrev,
  disableNext,
  ariaPrev,
  ariaNext,
}: Props) {
  const btnBase =
    'flex items-center justify-center rounded-full transition-colors ' +
    'bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-100 ' +
    'h-9 w-9 md:h-10 md:w-10 lg:h-11 lg:w-11';

  return (
    <div className="mb-6 flex items-center justify-between">
      <button
        aria-label={ariaPrev}
        onClick={onPrev}
        disabled={disablePrev}
        className={[
          btnBase,
          disablePrev
            ? 'cursor-not-allowed opacity-40'
            : 'hover:bg-slate-200 dark:hover:bg-slate-700',
        ].join(' ')}
      >
        ←
      </button>

      <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 md:text-2xl lg:text-3xl">
        {label}
      </h2>

      <button
        aria-label={ariaNext}
        onClick={onNext}
        disabled={disableNext}
        className={[
          btnBase,
          disableNext
            ? 'cursor-not-allowed opacity-40'
            : 'hover:bg-slate-200 dark:hover:bg-slate-700',
        ].join(' ')}
      >
        →
      </button>
    </div>
  );
}
