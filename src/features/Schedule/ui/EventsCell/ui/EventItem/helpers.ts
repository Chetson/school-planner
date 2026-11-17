import type { TypographyColor } from '@shared/ui';

export const getTypographyColor = (
  isPast: boolean,
  isNow: boolean,
): TypographyColor => {
  if (isNow) return 'default-inverted';
  if (isPast) return 'secondary';

  return 'default';
};
