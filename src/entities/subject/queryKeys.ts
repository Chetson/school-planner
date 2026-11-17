import type { SortDirection } from '@shared/types';

export const SUBJECT_QUERY_KEY = 'SUBJECT';
export const SUBJECTS_QUERY_KEY = 'SUBJECTS';

interface SubjectsQueryData {
  sortId?: string;
  sortDir?: SortDirection;
  name?: string;
}

export type SubjectListQueryKeys = [
  key: typeof SUBJECTS_QUERY_KEY,
  data: SubjectsQueryData,
];

export type SubjectQueryKeys = [key: typeof SUBJECT_QUERY_KEY, id: number];

export const SUBJECT_QUERY_KEYS = (id: number): SubjectQueryKeys => [
  SUBJECT_QUERY_KEY,
  id,
];
export const SUBJECT_LIST_QUERY_KEYS = (
  data: SubjectsQueryData,
): SubjectListQueryKeys => [SUBJECTS_QUERY_KEY, data];
