import type { RoomModel } from '@entities/room';
import type { DropdownRemoteItemType } from '@features/DropdownRemote';

export const createDropdownItem = (
  room: RoomModel,
): DropdownRemoteItemType<number, RoomModel> => ({
  id: room.id,
  title: room.roomName,
  value: room,
});

export const getTitle = ({ roomName }: RoomModel) => roomName;
