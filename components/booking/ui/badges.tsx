'use client';

export function SaturdayHalfBadge({ text }: { text: string }) {
  return (
    <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700 dark:bg-blue-950/30 dark:text-blue-300">
      {text}
    </span>
  );
}

export function EmptyState({ text }: { text: string }) {
  return (
    <div className="col-span-2 rounded-xl border border-dashed border-slate-300 p-4 text-center text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400 sm:col-span-3 md:col-span-4">
      {text}
    </div>
  );
}

export function ClosedSunday({ text }: { text: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400">
      ⛔ {text}
    </div>
  );
}
