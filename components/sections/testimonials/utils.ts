export type Testimonial = {
  initials: string;
  name: string;
  role: string;
  message: string;
};

export const getVisibleTestimonials = (
  all: Testimonial[],
  step: 0 | 1
): Testimonial[] => {
  if (all.length <= 3) return all;
  return step === 0 ? all.slice(0, 3) : all;
};

export const getNextTestimonialsStep = (step: 0 | 1): 0 | 1 => {
  return step === 0 ? 1 : 0;
};

export const shouldShowTestimonialsButton = (all: Testimonial[]): boolean => {
  return all.length > 3;
};

export const getTestimonialsButtonLabel = (
  step: 0 | 1,
  total: number,
  t: (key: string) => string
): string => {
  if (total <= 3) return '';
  return step === 0 ? t('viewAll') : t('viewLess');
};

export class type {
}