import { memo, forwardRef } from 'react';

import { useDeleteRoom } from '@entities/room';
import { IconKind } from '@shared/helpers';
import { Button, ErrorStub, VerticalTemplate } from '@shared/ui';

import type { RoomModel } from '@entities/room';
import type { ForwardRefRenderFunction } from 'react';

export interface DeleteRoomProps {
  room?: RoomModel | null;
  onCancel?: VoidFunction;
  onSettled?: VoidFunction;
}

// TODO Удалить. Использовать createOperationModal
const DeleteRoom: ForwardRefRenderFunction<
  HTMLButtonElement,
  DeleteRoomProps
> = ({ room, onCancel, onSettled }: DeleteRoomProps, targetButtonRef) => {
  const { isPending, isError, mutate } = useDeleteRoom({ onSettled });

  const handleDeleteRoom = () => {
    if (room) {
      mutate({ id: room.id });
    }
  };

  if (!room) {
    return null;
  }

  if (isError) {
    return <ErrorStub />;
  }

  return (
    <VerticalTemplate
      icon={IconKind.DELETE_ILLUSTRATION}
      title="Удалить кабинет"
      description={`Вы действительно хотите удалить кабинет ${room.roomName}`}
    >
      <Button disabled={isPending} variant="tertiary" onClick={onCancel}>
        Отменить
      </Button>
      <Button
        ref={targetButtonRef}
        isLoading={isPending}
        variant="destructive"
        onClick={handleDeleteRoom}
        className="capitalize"
      >
        Удалить
      </Button>
    </VerticalTemplate>
  );
};

export default memo(forwardRef(DeleteRoom));
