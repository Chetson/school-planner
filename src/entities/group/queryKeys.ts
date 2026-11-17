import type { SortDirection } from '@shared/types';

const GROUP_QUERY_KEY = 'GROUP_QUERY_KEY';
const GROUPS_LIST_QUERY_KEY = 'GROUPS_LIST';

interface GroupsListQueryData {
  sortId?: string;
  sortDir?: SortDirection;
  subjectId?: number;
  classId?: number;
  teacherId?: number;
  search?: string;
}

export type GroupsListQueryKeys = [
  key: typeof GROUPS_LIST_QUERY_KEY,
  data: GroupsListQueryData,
];

export type GroupQueryKeys = [key: typeof GROUP_QUERY_KEY, id: number];

export const GROUP_QUERY_KEYS = (id: number): GroupQueryKeys => [
  GROUP_QUERY_KEY,
  id,
];

export const GROUPS_LIST_QUERY_KEYS = (
  data: GroupsListQueryData,
): GroupsListQueryKeys => [GROUPS_LIST_QUERY_KEY, data];
