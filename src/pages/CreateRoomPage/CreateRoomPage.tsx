import { useCreateRoom } from '@entities/room';
import { Role } from '@entities/user';
import { RoomForm } from '@features/RoomForm';
import { withRoleAccess } from '@features/withRoleAccess';
import { ApiErrorKind, IconKind, useGoBack } from '@shared/helpers';
import { ErrorStub, PageLayout, SuccessStub } from '@shared/ui';

import type { RoomFormData } from '@features/RoomForm';
import type { FC } from 'react';

const CreateRoomPage: FC = () => {
  const { mutate, isPending, data, isSuccess, error } = useCreateRoom();
  const goBack = useGoBack();

  const handleSubmit = (data: RoomFormData) =>
    mutate({
      roomName: data.roomName,
      staffIds: data.staff?.map(({ id }) => id) ?? [],
      basedClassId: data.basedClass?.id ?? null,
    });

  if (isSuccess) {
    return (
      <SuccessStub
        description={`Кабинет ${data.roomName} добавлен`}
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
        title="Новый кабинет"
        isLoading={isPending}
        illustration={IconKind.KEY_ILLUSTRATION}
        onSubmit={handleSubmit}
        errors={error?.detail}
      />
    </PageLayout>
  );
};

export default withRoleAccess(CreateRoomPage)(Role.ADMIN);
