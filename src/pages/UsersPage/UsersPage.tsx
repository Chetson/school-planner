import { useMemo } from 'react';

import { Role } from '@entities/user';
import { AccessRole } from '@features/AccessRole';
import { FiltersList } from '@features/FiltersList';
import { TableLayout } from '@features/TableLayout';
import { withRoleAccess } from '@features/withRoleAccess';
import { useSorting } from '@shared/helpers';

import { useUsersFilters } from './hooks';
import { ROLE_NAMES, UsersTable } from './widgets/UsersTable';
import { UsersToolbar } from './widgets/UsersToolbar';

const UsersPage = () => {
  const { filters, setFilter } = useUsersFilters();
  const { sortId, sortDir } = useSorting();

  const selectedFilters = useMemo(
    () => filters.map((role) => ({ title: ROLE_NAMES[role], id: role })),
    [filters],
  );

  return (
    <TableLayout
      title="Пользователи"
      tools={
        <AccessRole role={Role.ADMIN}>
          <UsersToolbar
            selectedFilters={selectedFilters}
            onFiltersChange={setFilter}
          />
        </AccessRole>
      }
    >
      <FiltersList items={selectedFilters} onChange={setFilter} />
      <UsersTable sortId={sortId} sortDir={sortDir} filters={filters} />
    </TableLayout>
  );
};

export default withRoleAccess(UsersPage)(Role.ADMIN, Role.TEACHER);
