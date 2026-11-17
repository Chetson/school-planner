import { SortDirection } from '@shared/types';

export const createSortingString = (
  sortId?: string,
  sortDir?: SortDirection,
): string | undefined => {
  if (sortId) {
    return (sortDir === SortDirection.DESC ? '-' : '') + sortId;
  }
};
