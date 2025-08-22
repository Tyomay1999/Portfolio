'use client';

type Props = {
  time: string;
  isBooked: boolean;
  titleBooked: string;
  titleSelect: string;
  onBookedTap: () => void;
  onSelect: (t: string) => void;
};

export default function SlotButton({
  time,
  isBooked,
  titleBooked,
  titleSelect,
  onBookedTap,
  onSelect,
}: Props) {
  const base =
    'w-full rounded-xl px-4 py-3 text-sm font-medium transition border ' +
    'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 ' +
    'text-slate-900 dark:text-slate-100';

  const available =
    'hover:-translate-y-px hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500';

  const bookedCls =
    'cursor-not-allowed opacity-60 ' +
    'bg-slate-100 dark:bg-slate-800/60 ' +
    'text-slate-400 dark:text-slate-500';

  return (
    <button
      type="button"
      aria-disabled={isBooked}
      tabIndex={isBooked ? -1 : 0}
      onClick={() => (isBooked ? onBookedTap() : onSelect(time))}
      className={[base, isBooked ? bookedCls : available].join(' ')}
      title={isBooked ? titleBooked : titleSelect}
    >
      <span className="inline-flex items-center">
        {time}
        {isBooked && (
          <span className="ml-2 text-xs" aria-hidden>
            🔒
          </span>
        )}
      </span>
      {isBooked && <span className="sr-only">{titleBooked}</span>}
    </button>
  );
}
