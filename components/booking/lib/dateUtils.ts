export function getDaysInMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

export function getFirstDayOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
}

export function isDateInPast(date: Date) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date < today;
}

export const isSameDay = (a: Date | null, b: Date | null) =>
  !!a &&
  !!b &&
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

export const isSunday = (d: Date) => d.getDay() === 0;
export const isSaturday = (d: Date) => d.getDay() === 6;

export const formatDateYmd = (d: Date) => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
};
