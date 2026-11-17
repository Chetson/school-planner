import type { SortDirection } from '@shared/types';

const ACTIVITY_QUERY_KEY = 'ACTIVITY_QUERY_KEY';
const ACTIVITIES_QUERY_KEY = 'ACTIVITIES_QUERY_KEY';

type ActivitiesQueryData = {
  sortId?: string;
  sortDir?: SortDirection;
  search?: string;
};

export type ActivitiesQueryKeys = [
  key: typeof ACTIVITIES_QUERY_KEY,
  data: ActivitiesQueryData,
];

export type ActivityQueryKeys = [key: typeof ACTIVITY_QUERY_KEY, id: number];

export const ACTIVITY_QUERY_KEYS = (id: number): ActivityQueryKeys => [
  ACTIVITY_QUERY_KEY,
  id,
];

export const ACTIVITIES_QUERY_KEYS = (
  data: ActivitiesQueryData,
): ActivitiesQueryKeys => [ACTIVITIES_QUERY_KEY, data];
