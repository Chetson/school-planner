import { useUpdateRoom } from '@entities/room';
import { RoomForm } from '@features/RoomForm';
import {
  ApiErrorKind,
  getArrayChangesBy,
  IconKind,
  useGoBack,
} from '@shared/helpers';
import { ErrorStub, PageLayout, SuccessStub } from '@shared/ui';

import type { RoomModel } from '@entities/room';
import type { RoomFormData } from '@features/RoomForm';
import type { FC } from 'react';

export interface EditRoomFormProps {
  room: RoomModel;
}

export const EditRoomForm: FC<EditRoomFormProps> = ({ room }) => {
  const { mutate, isPending, isSuccess, error } = useUpdateRoom();

  const goBack = useGoBack();

  const handleSubmit = (data: RoomFormData) => {
    const staffChanges = getArrayChangesBy({
      current: room.staff,
      updated: data.staff,
      key: 'id',
    });

    mutate({
      id: room.id,
      data: {
        roomName: data.roomName,
        addStaffIds: staffChanges.added.map(({ id }) => id),
        removeStaffIds: staffChanges.removed.map(({ id }) => id),
        basedClassId: data.basedClass?.id ?? null,
      },
    });
  };

  if (isSuccess) {
    return (
      <SuccessStub
        description={`Кабинет ${room.roomName} обновлён`}
        buttonText="Ко всем кабинетам"
        onClick={goBack}
      />
    );
  }

  if (error?.id === ApiErrorKind.COMMON) {
    return <ErrorStub />;
  }

  return (
    <PageLayout>
      <RoomForm
        title="Редактирование кабинета"
        illustration={IconKind.EDIT_ILLUSTRATION}
        isLoading={isPending}
        onSubmit={handleSubmit}
        defaultValues={room}
        errors={error?.detail}
        onCancel={goBack}
      />
    </PageLayout>
  );
};
