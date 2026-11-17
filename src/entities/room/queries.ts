import { api, apiUrls, createApiFn } from '@shared/api';
import { createSortingString } from '@shared/helpers';

import type { RoomQueryKeys, RoomsListQueryKeys } from './queryKeys';
import type { RoomModel } from './types';
import type { RoomListModel } from '@entities/room';

export const roomQueryFn = createApiFn<RoomModel, RoomQueryKeys>(
  ({ queryKey, signal }) => {
    const id = queryKey[1];

    return api.get(apiUrls.ROOMS.ROOM(id), { signal });
  },
);

export const roomsQueryFn = createApiFn<
  RoomListModel,
  RoomsListQueryKeys,
  number
>(({ queryKey, signal, pageParam }) => {
  const { sortId, sortDir, search } = queryKey[1];

  return api.get(
    apiUrls.ROOMS.LIST(createSortingString(sortId, sortDir), pageParam, search),
    { signal },
  );
});
