import { ServerBooking } from '../types';
import { ymdInTz, hmInTz } from './time';

export type BookingsMap = Record<string, string[]>;

export function toMap(items: ServerBooking[] = []): BookingsMap {
  const map: BookingsMap = {};
  for (const b of items) {
    if (b?.inTrash) continue;
    const s = (b?.status || '').toLowerCase();
    if (['cancelled', 'rejected', 'trash', 'archived'].includes(s)) continue;

    let day: string | null = null;
    let time: string | null = null;

    if (b?.dateTimeUTC) {
      day = ymdInTz(b.dateTimeUTC);
      time = hmInTz(b.dateTimeUTC);
    } else if (b?.date && b?.time) {
      day = b.date;
      time = b.time.slice(0, 5);
    }
    if (!day || !time) continue;
    (map[day] ||= []).push(time);
  }
  for (const k of Object.keys(map)) {
    map[k] = Array.from(new Set(map[k])).sort();
  }
  return map;
}

export function mergeMaps(a: BookingsMap, b: BookingsMap): BookingsMap {
  const out: BookingsMap = { ...a };
  for (const k of Object.keys(b)) {
    out[k] = Array.from(new Set([...(out[k] || []), ...b[k]])).sort();
  }
  return out;
}
