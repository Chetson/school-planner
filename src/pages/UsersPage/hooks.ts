import { useCallback } from 'react';

import { useQueryParams } from '@shared/helpers';

import type { DropdownRole } from '@pages/UsersPage';

/**
 * Хук отвечает за фильтрацию.
 * Берёт значения из урла и может их изменять
 */
export const useUsersFilters = () => {
  const { queryParams, setQueryParams } = useQueryParams();

  const setFilter = useCallback(
    (roles: DropdownRole[]) => setQueryParams({ filter: roles }),
    [setQueryParams],
  );

  const filters = (queryParams.filter ?? []) as DropdownRole[];

  return { filters, setFilter };
};
