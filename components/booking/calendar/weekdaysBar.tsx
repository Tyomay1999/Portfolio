'use client';
export default function WeekdaysBar({ weekdaysShort }: { weekdaysShort: string[] }) {
  return (
    <div className="mb-2 grid grid-cols-7 gap-1">
      {weekdaysShort.map((day, i) => {
        const sunday = i === 0;
        return (
          <div
            key={`${day}-${i}`}
            className={[
              'py-2 text-center text-sm font-medium',
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
