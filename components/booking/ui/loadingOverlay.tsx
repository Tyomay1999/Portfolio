import Spinner from './spinner';

export default function LoadingOverlay({ text = 'Loading bookings…' }: { text?: string }) {
  return (
    <div
      className="absolute inset-0 z-10 flex items-center justify-center bg-white/40 backdrop-blur-sm dark:bg-slate-900/30"
      role="status"
      aria-live="polite"
    >
      <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
        <Spinner />
        <span className="animate-pulse">{text}</span>
      </div>
    </div>
  );
}
