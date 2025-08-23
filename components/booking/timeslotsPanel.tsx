'use client';
import { useTranslations } from 'next-intl';
import { Params, useEffectiveSlots } from './hooks/useEffectiveSlots';
import SlotButton from './ui/slotButton';
import { SaturdayHalfBadge, EmptyState, ClosedSunday } from './ui/badges';

type Props = {
  date: Date | null;
  bookings: Record<string, string[]>;
  timeSlots: string[];
  onSelectTime: (t: string) => void;
  onBookedTap: () => void;
  saturdayCutoff?: string;
  minLeadMinutes?: number;
};

export default function TimeslotsPanel({
  date,
  bookings,
  timeSlots,
  onSelectTime,
  onBookedTap,
  saturdayCutoff = '14:00',
  minLeadMinutes = 180,
}: Props) {
  const t = useTranslations('timeslotsPanel');

  const { booked, isSunday, isSaturday, effectiveSlots } = useEffectiveSlots({
    date,
    bookings,
    timeSlots,
    saturdayCutoff,
    minLeadMinutes,
  } as Params);

  if (!date) return null;

  return (
    <section className="mt-6">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{t('title')}</h3>
        {isSaturday && <SaturdayHalfBadge text={t('badge.saturdayHalf')} />}
      </div>

      {isSunday ? (
        <ClosedSunday text={t('notice.closedSunday')} />
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {effectiveSlots.map(tSlot => (
            <SlotButton
              key={tSlot}
              time={tSlot}
              isBooked={booked.includes(tSlot)}
              titleBooked={t('a11y.bookedTitle')}
              titleSelect={t('a11y.selectTitle')}
              onBookedTap={onBookedTap}
              onSelect={onSelectTime}
            />
          ))}

          {effectiveSlots.length === 0 && <EmptyState text={t('empty')} />}
        </div>
      )}
    </section>
  );
}
