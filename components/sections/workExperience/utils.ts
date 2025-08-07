export const workKeys = ['genieWeb', 'pixeria', 'beeOnCode1', 'instructor', 'beeOnCode2'] as const;

export const getVisibleWorkKeys = (allKeys: readonly string[], step: 0 | 1): string[] => {
  if (allKeys.length <= 2) return allKeys;
  return step === 0 ? allKeys.slice(0, 2) : allKeys;
};

export const getNextWorkStep = (currentStep: 0 | 1): 0 | 1 => {
  return currentStep === 0 ? 1 : 0;
};

export const shouldShowWorkButton = (allKeys: readonly string[]): boolean => {
  return allKeys.length > 2;
};

export const getWorkButtonLabel = (
  step: 0 | 1,
  total: number,
  t: (key: string) => string,
): string => {
  if (total <= 2) return '';
  return step === 0 ? t('viewAll') : t('viewLess');
};
