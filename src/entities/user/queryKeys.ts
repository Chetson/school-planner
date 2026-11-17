import type { Role } from '@entities/user/config';
import type { DropdownRole } from '@pages/UsersPage';
import type { SortDirection } from '@shared/types';

type UsersListQueryData = {
  sortId?: string;
  sortDir?: SortDirection;
  role?: DropdownRole[] | Role[];
  search?: string;
  isBlocked?: boolean;
  parentId?: number;
  isCurator?: boolean;
  currentClassId?: number;
  curatedClassId?: number;
};

const USER_QUERY_KEY = 'USER';
const CURRENT_USER_QUERY_KEY = 'CURRENT_USER';
const USERS_LIST_QUERY_KEY = 'USERS_LIST';

export type UserQueryKeys = [key: typeof USER_QUERY_KEY, userId: number];

export type UsersListQueryKeys = [
  key: typeof USERS_LIST_QUERY_KEY,
  data: UsersListQueryData,
];

export const CURRENT_USER_QUERY_KEYS = [CURRENT_USER_QUERY_KEY];
export const USER_QUERY_KEYS = (id: number): UserQueryKeys => [
  USER_QUERY_KEY,
  id,
];
export const USERS_LIST_QUERY_KEYS = (
  data: UsersListQueryData,
): UsersListQueryKeys => [USERS_LIST_QUERY_KEY, data];
