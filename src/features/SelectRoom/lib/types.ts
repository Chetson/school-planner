import type { RoomModel } from '@entities/room';
import type { DropdownItemType } from '@shared/ui';

export interface SelectRoomDropdownItemType extends DropdownItemType<number> {
  room: RoomModel;
}
