import type { DateRange } from 'react-day-picker';

export const GRADEBOOK_QUERY_KEY = 'GRADEBOOK_QUERY_KEY';

export type GradebookQueryData = {
  classId?: number;
  subjectId?: number;
  studentId?: number;
} & DateRange;

export type GradebookQueryKeys = [
  typeof GRADEBOOK_QUERY_KEY,
  GradebookQueryData,
];

export const GRADEBOOK_QUERY_KEYS = (
  data: GradebookQueryData,
): GradebookQueryKeys => [GRADEBOOK_QUERY_KEY, data];
