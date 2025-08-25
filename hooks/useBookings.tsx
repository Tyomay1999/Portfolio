import { useCallback, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import api from '@/lib/api';
import axios, { AxiosError } from 'axios';

type Booking = {
  consent: boolean;
  createdAt: string;
  date: string;
  dateTimeLocal: string;
  dateTimeUTC: string;
  email: string;
  firstName: string;
  id: number;
  inTrash: boolean;
  lastName: string;
  phone: string;
  service: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  time: string;
  timezone: string;
  updatedAt: string;
};

function getErrorMessage(err: unknown, fallback = 'Failed to load bookings'): string {
  if (axios.isAxiosError(err)) {
    const ax = err as AxiosError<{ message?: string }>;
    return ax.response?.data?.message ?? ax.message ?? fallback;
  }
  if (err instanceof Error) return err.message || fallback;
  return fallback;
}

export function useBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const t = useTranslations('bookingModal');

  const load = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.get('/booking');
      setBookings(res.data?.bookings ?? []);
      setError(null);
    } catch (err) {
      const staticMessage = 'failedToLoad';
      const errorMessage = getErrorMessage(err);
      const text = errorMessage === staticMessage ? t(staticMessage) : errorMessage;
      setError(text);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load().then(r => r);
  }, [load]);

  return { bookings, loading, error, refetch: load, setBookings };
}
