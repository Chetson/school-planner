import { Role } from '@entities/user';

import type { DropdownItemType } from '@shared/ui';

export const ROLE_COLORS: Record<Role, string> = {
  [Role.TEACHER]: 'text-decorative-mint',
  [Role.ADMIN]: 'text-decorative-orange',
  [Role.STUDENT]: 'text-decorative-pink',
  [Role.PARENT]: 'text-decorative-yellow',
};

export enum DropdownItemId {
  LOGOUT = 'LOGOUT',
}

export const PROFILE_DROPDOWN_ITEMS: DropdownItemType<DropdownItemId>[] = [
  {
    id: DropdownItemId.LOGOUT,
    title: 'Выйти',
    color: 'critical',
  },
];
