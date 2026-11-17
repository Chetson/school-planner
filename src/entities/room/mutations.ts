import { api, apiUrls, createApiFn } from '@shared/api';
import { DEFAULT_ERROR_MATCH } from '@shared/helpers';

import type { CreateRoomPayload, RoomModel, UpdateRoomPayload } from './types';

export const createRoomMutationFn = createApiFn<RoomModel, CreateRoomPayload>(
  (data) => api.post(apiUrls.ROOMS.CREATE, data),
  DEFAULT_ERROR_MATCH,
);

export const deleteRoomMutationFn = createApiFn<void, { id: number }>(
  ({ id }) => api.delete(apiUrls.ROOMS.ROOM(id)),
);

export const updateRoomMutationFn = createApiFn<RoomModel, UpdateRoomPayload>(
  ({ id, data }) => api.patch(apiUrls.ROOMS.ROOM(id), data),
  DEFAULT_ERROR_MATCH,
);
