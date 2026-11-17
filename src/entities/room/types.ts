import type { roomBaseSchema, roomSchema } from './schema';
import type { CommonApiError, ValidationApiError } from '@shared/helpers';
import type { ApiList } from '@shared/types';
import type { z } from 'zod';

export type RoomBaseModel = z.infer<typeof roomBaseSchema>;

export type RoomModel = z.infer<typeof roomSchema>;

export interface CreateRoomPayload {
  roomName: string;
  basedClassId?: number | null;
  staffIds: number[];
}

export interface UpdateRoomPayload {
  id: number;
  data: {
    roomName: string;
    basedClassId?: number | null;
    addStaffIds: number[];
    removeStaffIds: number[];
  };
}

export type SaveRoomError =
  | CommonApiError
  | ValidationApiError<CreateRoomPayload>;

export type RoomListModel = ApiList<RoomModel>;
