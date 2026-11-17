import { ROLE_NAMES, Role } from '@entities/user';

import type { DropdownItemType } from '@shared/ui';

export const filterOptions: DropdownItemType<Role>[] = Object.values(Role).map(
  (role) => ({
    id: role,
    title: ROLE_NAMES[role],
  }),
);
