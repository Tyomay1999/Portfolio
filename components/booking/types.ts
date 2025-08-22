export type ServiceKey = 'consultation' | 'onsite' | 'support' | 'demo' | null;

export type ServerBooking = {
  date?: string;
  time?: string;
  status?: string;
  dateTimeUTC?: string;
  inTrash?: boolean;
};
