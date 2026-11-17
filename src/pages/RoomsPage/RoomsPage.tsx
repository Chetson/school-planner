import { useCallback, useMemo, useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';

import {
  ROOM_QUERY_KEYS,
  ROOMS_LIST_QUERY_KEYS,
  roomsQueryFn,
} from '@entities/room';
import { Role } from '@entities/user';
import { AccessRole } from '@features/AccessRole';
import { DeleteRoom } from '@features/DeleteRoom';
import { InfiniteTable } from '@features/InfiniteTable';
import { useSearchText } from '@features/SearchField';
import { TableLayout } from '@features/TableLayout';
import { withRoleAccess } from '@features/withRoleAccess';
import { IconKind, PAGES, useSorting } from '@shared/helpers';
import { Button, withModal } from '@shared/ui';

import { ROOMS_TABLE_COLUMNS } from './lib';

import type { RoomModel } from '@entities/room';
import type { FC } from 'react';

const DeleteRoomModal = withModal(DeleteRoom);

const RoomsPage: FC = () => {
  const [search] = useSearchText();

  const [deletedRoom, setDeletedRoom] = useState<RoomModel | null>(null);

  const { sortId, sortDir } = useSorting();

  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const queryKey = useMemo(
    () => ROOMS_LIST_QUERY_KEYS({ sortId, sortDir, search }),
    [sortId, sortDir, search],
  );

  const handleDeleteRoomSettled = useCallback(() => {
    setDeletedRoom(null);
    queryClient.invalidateQueries({ queryKey });
  }, [queryKey, queryClient]);

  const handleCancelDeleteRoom = useCallback(() => setDeletedRoom(null), []);

  const handleGoToEditRoom = useCallback(
    (room: RoomModel) => {
      queryClient.setQueryData(ROOM_QUERY_KEYS(room.id), () => room);
      navigate(PAGES.EDIT_ROOM.create(room.id));
    },
    [navigate, queryClient],
  );

  const handleModalOpenChange = useCallback(
    (opened: boolean) => !opened && setDeletedRoom(null),
    [],
  );

  const meta = useMemo(
    () => ({
      onDelete: setDeletedRoom,
      onEdit: handleGoToEditRoom,
    }),
    [handleGoToEditRoom],
  );

  return (
    <TableLayout
      title="Кабинеты"
      tools={
        <AccessRole role={Role.ADMIN}>
          <Link to={PAGES.CREATE_ROOM.mask}>
            <Button isFullSize={false} leftElement={IconKind.FOLDER_PLUS}>
              Добавить
            </Button>
          </Link>
        </AccessRole>
      }
    >
      <InfiniteTable
        meta={meta}
        columns={ROOMS_TABLE_COLUMNS}
        queryKey={queryKey}
        queryFn={roomsQueryFn}
      />
      <DeleteRoomModal
        open={Boolean(deletedRoom)}
        room={deletedRoom}
        onOpenChange={handleModalOpenChange}
        onSettled={handleDeleteRoomSettled}
        onCancel={handleCancelDeleteRoom}
      />
    </TableLayout>
  );
};

export default withRoleAccess(RoomsPage)(Role.ADMIN, Role.TEACHER);
