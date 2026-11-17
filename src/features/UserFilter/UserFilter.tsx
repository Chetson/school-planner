import { memo, useMemo } from 'react';

import {
  ROLE_NAMES,
  userBaseSchema,
  USERS_LIST_QUERY_KEYS,
  usersQueryFn,
} from '@entities/user';
import { FilterRemote } from '@features/FilterRemote';
import { getLastNameAndInitials, useFilter } from '@shared/helpers';
import { SortDirection } from '@shared/types';

import type { UserBaseModel, Role } from '@entities/user';
import type { DropdownRemoteItemType } from '@features/DropdownRemote';
import type { FC } from 'react';

interface UserFilterProps {
  role: Role;
  currentClassId?: number;
  curatedClassId?: number;
}

const normalize = (
  user: UserBaseModel,
): DropdownRemoteItemType<number, UserBaseModel> => ({
  title: getLastNameAndInitials(user),
  id: user.id,
  value: {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    patronim: user.patronim,
  },
});

export const useUserFilter = (role: Role) =>
  useFilter(role.toLowerCase(), userBaseSchema);

const UserFilter: FC<UserFilterProps> = ({
  role,
  currentClassId,
  curatedClassId,
}) => {
  const [user, setUser] = useUserFilter(role);

  const queryKey = useMemo(
    () =>
      USERS_LIST_QUERY_KEYS({
        role: [role],
        sortId: 'name',
        sortDir: SortDirection.ASC,
        isBlocked: false,
        currentClassId,
        curatedClassId,
      }),
    [role, currentClassId, curatedClassId],
  );

  return (
    <FilterRemote
      queryKey={queryKey}
      queryFn={usersQueryFn}
      value={user}
      onChange={setUser}
      normalize={normalize}
    >
      {user ? getLastNameAndInitials(user) : ROLE_NAMES[role]}
    </FilterRemote>
  );
};

export default memo(UserFilter);
