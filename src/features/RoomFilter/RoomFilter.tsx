import { memo } from 'react';

import {
  roomBaseSchema,
  ROOMS_LIST_QUERY_KEYS,
  roomsQueryFn,
} from '@entities/room';
import { FilterRemote } from '@features/FilterRemote';
import { useFilter } from '@shared/helpers';
import { SortDirection } from '@shared/types';

import type { RoomBaseModel } from '@entities/room';
import type { DropdownRemoteItemType } from '@features/DropdownRemote';

const normalize = ({
  roomName,
  id,
}: RoomBaseModel): DropdownRemoteItemType<number, RoomBaseModel> => ({
  title: roomName,
  id: id,
  value: { roomName, id },
});

const queryKey = ROOMS_LIST_QUERY_KEYS({
  sortId: 'room_name',
  sortDir: SortDirection.ASC,
});

export const useRoomFilter = () => useFilter('room', roomBaseSchema);

const RoomFilter = () => {
  const [room, setRoom] = useRoomFilter();

  return (
    <FilterRemote
      queryKey={queryKey}
      queryFn={roomsQueryFn}
      value={room}
      onChange={setRoom}
      normalize={normalize}
    >
      {room ? room.roomName : 'Кабинет'}
    </FilterRemote>
  );
};

export default memo(RoomFilter);
