import type { RoomModel } from '@entities/room';

export enum TableAccessorKey {
  ROOM = 'room_name',
  TEACHER = 'teacher',
  UTILITY = 'utility',
}

export type TableAction = (user: RoomModel) => void;
