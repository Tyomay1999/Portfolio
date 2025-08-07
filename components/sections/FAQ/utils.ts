export type FAQItem = {
  question: string;
  answer: string;
};

export const getVisibleFaqs = (faqs: FAQItem[], step: 0 | 1): FAQItem[] => {
  if (faqs.length <= 2) return faqs;
  return step === 0 ? faqs.slice(0, 2) : faqs;
};

export const getNextFaqStep = (current: 0 | 1): 0 | 1 => {
  return current === 0 ? 1 : 0;
};

export const shouldShowFaqButton = (faqs: FAQItem[]): boolean => {
  return faqs.length > 2;
};

export const getFaqButtonLabel = (
  step: 0 | 1,
  total: number,
  t: (key: string) => string
): string => {
  if (total <= 2) return '';
  return step === 0 ? t('viewAll') : t('viewLess');
};
