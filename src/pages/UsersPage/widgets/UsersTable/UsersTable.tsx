import { memo, useCallback, useMemo, useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import {
  Role,
  useCurrentUser,
  USER_QUERY_KEYS,
  USERS_LIST_QUERY_KEYS,
  usersQueryFn,
} from '@entities/user';
import { BlockUser } from '@features/BlockUser';
import { InfiniteTable } from '@features/InfiniteTable';
import { useSearchText } from '@features/SearchField';
import { CURATOR_ID } from '@pages/UsersPage';
import { PAGES } from '@shared/helpers';
import { unique } from '@shared/helpers';
import { withModal } from '@shared/ui';

import { replaceUserInList, USERS_TABLE_COLUMNS } from './lib';

import type { UserListModel, UserModel } from '@entities/user';
import type { DropdownRole } from '@pages/UsersPage';
import type { SortDirection } from '@shared/types';
import type { InfiniteData } from '@tanstack/react-query';
import type { FC } from 'react';

const BlockUserModal = withModal(BlockUser);

interface UsersTableProps {
  sortId?: string;
  sortDir?: SortDirection;
  filters: DropdownRole[];
}

const UsersTable: FC<UsersTableProps> = ({ filters, sortId, sortDir }) => {
  const navigate = useNavigate();
  const { data: user } = useCurrentUser();

  const [search] = useSearchText();

  const [blockedUser, setBlockedUser] = useState<UserModel | null>(null);

  const queryKey = useMemo(() => {
    const isCurator = filters.some((_role) => _role === CURATOR_ID)
      ? true
      : undefined;

    if (user?.role === Role.TEACHER) {
      const currentClassId =
        user.extra.curatedClasses?.[0] && user.extra.curatedClasses?.[0].id;

      return USERS_LIST_QUERY_KEYS({
        sortId,
        sortDir,
        search,
        role: [Role.TEACHER, Role.STUDENT],
        currentClassId: currentClassId,
        curatedClassId: currentClassId,
      });
    }

    return USERS_LIST_QUERY_KEYS({
      sortId,
      sortDir,
      role: isCurator
        ? unique(
            filters.map((_role) => {
              if (_role === CURATOR_ID) {
                return Role.TEACHER;
              }

              return _role;
            }),
          )
        : filters,
      search,
      isCurator,
    });
  }, [sortId, sortDir, filters, search, user]);

  const queryClient = useQueryClient();

  const handleModalOpenChange = useCallback(
    (opened: boolean) => !opened && setBlockedUser(null),
    [],
  );

  const handleCancelBlockUser = useCallback(() => setBlockedUser(null), []);

  const handleBlockUser = useCallback(
    (user: UserModel) => {
      setBlockedUser(null);
      queryClient.setQueryData(
        queryKey,
        (data: InfiniteData<UserListModel, number>) =>
          replaceUserInList(data, user),
      );
    },
    [queryKey, queryClient],
  );

  const handleGoToEditUser = useCallback(
    (user: UserModel) => {
      queryClient.setQueryData(USER_QUERY_KEYS(user.id), () => user);
      navigate(PAGES.EDIT_USER.create(user.id));
    },
    [navigate, queryClient],
  );

  const meta = useMemo(
    () => ({
      onBlock: setBlockedUser,
      onEdit: handleGoToEditUser,
    }),
    [handleGoToEditUser],
  );

  return (
    <>
      <InfiniteTable
        meta={meta}
        columns={USERS_TABLE_COLUMNS}
        queryKey={queryKey}
        queryFn={usersQueryFn}
        cellClassName="align-middle"
      />
      <BlockUserModal
        open={Boolean(blockedUser)}
        onOpenChange={handleModalOpenChange}
        user={blockedUser}
        onCancel={handleCancelBlockUser}
        onSuccess={handleBlockUser}
      />
    </>
  );
};

export default memo(UsersTable);
