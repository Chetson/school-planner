import { useCallback } from 'react';

import { SortDirection } from '@shared/types';

import { useQueryParams } from './useQueryParams';

export const useSorting = () => {
  const { queryParams, setQueryParams, removeQueryParams } = useQueryParams();

  const setSorting = useCallback(
    (id: string, dir = SortDirection.ASC) =>
      setQueryParams({ sortBy: `${id}.${dir}` }),
    [setQueryParams],
  );

  const clearSorting = useCallback(
    () => removeQueryParams('sortBy'),
    [removeQueryParams],
  );

  const [sortId, sortDir] = queryParams.sortBy?.[0]?.split('.') ?? [];

  return {
    sortId,
    sortDir: sortDir as SortDirection | undefined,
    setSorting,
    clearSorting,
  };
};
