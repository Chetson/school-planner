import { classBaseSchema } from '@entities/class';
import { useFilter } from '@shared/helpers';

export const useCuratedClassFilter = () =>
  useFilter('curated_cls', classBaseSchema);
