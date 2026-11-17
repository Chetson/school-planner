import type { SortDirection } from '@shared/types';

const CLASSES_LIST_QUERY_KEY = 'CLASSES_LIST_QUERY_KEY';
const CLASS_QUERY_KEY = 'CLASS_QUERY_KEY';

export type ClasssesListQueryData = {
  search?: string;
  sortId?: string;
  sortDir?: SortDirection;
};

export type ClassesListQueryKeys = [
  key: typeof CLASSES_LIST_QUERY_KEY,
  data: ClasssesListQueryData,
];

export type ClassQueryKeys = [key: typeof CLASS_QUERY_KEY, id: number];

export const CLASS_QUERY_KEYS = (id: number): ClassQueryKeys => [
  CLASS_QUERY_KEY,
  id,
];

export const CLASSES_LIST_QUERY_KEYS = (
  data: ClasssesListQueryData,
): ClassesListQueryKeys => [CLASSES_LIST_QUERY_KEY, data];
