import type { SortDirection } from '@shared/types';

const ROOM_QUERY_KEY = 'ROOM_QUERY_KEY';
const ROOMS_LIST_QUERY_KEY = 'ROOMS_LIST';

interface RoomsListQueryData {
  sortId?: string;
  sortDir?: SortDirection;
  search?: string;
}

export type RoomsListQueryKeys = [
  key: typeof ROOMS_LIST_QUERY_KEY,
  data: RoomsListQueryData,
];

export type RoomQueryKeys = [key: typeof ROOM_QUERY_KEY, id: number];

export const ROOM_QUERY_KEYS = (id: number): RoomQueryKeys => [
  ROOM_QUERY_KEY,
  id,
];
export const ROOMS_LIST_QUERY_KEYS = (
  data: RoomsListQueryData,
): RoomsListQueryKeys => [ROOMS_LIST_QUERY_KEY, data];
