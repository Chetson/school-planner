import type { EventListFilters } from './types';
import type { DateRange } from '@shared/helpers';

const EVENT_LIST_QUERY_KEY = 'EVENT_LIST_QUERY_KEY';
const EVENT_QUERY_KEY = 'EVENT_QUERY_KEY';

export type EventListQueryData = EventListFilters & DateRange;

export type EventListQueryKeys = [
  key: typeof EVENT_LIST_QUERY_KEY,
  data: EventListQueryData,
];

export type EventQueryKeys = [typeof EVENT_QUERY_KEY, number, string];

export const EVENT_LIST_QUERY_KEYS = (
  data: EventListQueryData,
): EventListQueryKeys => [EVENT_LIST_QUERY_KEY, data];

export const EVENT_QUERY_KEYS = (
  id: number,
  eventDate: string,
): EventQueryKeys => {
  return [EVENT_QUERY_KEY, id, eventDate];
};
