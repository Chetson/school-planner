import { api, apiUrls, createApiFn } from '@shared/api';
import { createSortingString } from '@shared/helpers';

import type { UserQueryKeys, UsersListQueryKeys } from './queryKeys';
import type { UserListModel, UserModel } from './types';
import type { QueryFunction } from '@tanstack/react-query';

export const userQueryFn = createApiFn<UserModel, UserQueryKeys, number>(
  ({ queryKey, signal }) => {
    return api.get(apiUrls.USERS.USER(queryKey[1]), { signal });
  },
);

export const currentUserQueryFn = createApiFn<UserModel, string[]>(() => {
  return api.get(apiUrls.USERS.CURRENT);
});

export const usersQueryFn: QueryFunction<
  UserListModel,
  UsersListQueryKeys,
  number
> = createApiFn<UserListModel, UsersListQueryKeys, number>(
  ({ queryKey, signal, pageParam: page }) => {
    const {
      sortId,
      sortDir,
      role,
      search,
      isBlocked,
      parentId,
      isCurator,
      currentClassId,
      curatedClassId,
    } = queryKey[1];
    const order = createSortingString(sortId, sortDir);

    return api.get(
      apiUrls.USERS.LIST({
        page,
        order,
        role,
        search,
        isBlocked,
        parentId,
        isCurator,
        currentClassId,
        curatedClassId,
      }),
      {
        signal,
      },
    );
  },
);
