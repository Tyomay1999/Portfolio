'use client';

export default function WeekdaysBar({ weekdaysShort }: { weekdaysShort: string[] }) {
  return (
    <div className="mb-2 grid grid-cols-7 gap-1 md:gap-2 lg:gap-3">
      {weekdaysShort.map((day, i) => {
        const sunday = i === 0;
        return (
          <div
            key={`${day}-${i}`}
            className={[
              'py-2 text-center text-xs font-medium md:text-sm lg:text-base',
              sunday ? 'text-slate-400 dark:text-slate-500' : 'text-slate-500 dark:text-slate-400',
            ].join(' ')}
          >
            {day}
          </div>
        );
      })}
    </div>
  );
}
