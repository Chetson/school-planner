import { useNavigate } from 'react-router-dom';

import { useUpdateGroup } from '@entities/group';
import { GroupForm } from '@features/GroupForm';
import {
  ApiErrorKind,
  getArrayChangesBy,
  IconKind,
  mapIds,
  PAGES,
} from '@shared/helpers';
import { ErrorStub, PageLayout, SuccessStub } from '@shared/ui';

import type { GroupModel } from '@entities/group';
import type { GroupFormData } from '@features/GroupForm';
import type { FC } from 'react';

export interface EditGroupFormProps {
  group: GroupModel;
}

export const EditGroupForm: FC<EditGroupFormProps> = ({ group }) => {
  const { mutate, isPending, isSuccess, error, reset } = useUpdateGroup();

  const navigate = useNavigate();

  const handleSubmit = (data: GroupFormData) => {
    const studentsChanges = getArrayChangesBy({
      current: group.students ?? [],
      updated: data.students ?? [],
      key: 'id',
    });

    mutate({
      id: group.id,
      data: {
        name: data.name,
        room: data.room?.id,
        teacher: data.teacher?.id,
        subject: data.subject?.id,
        studentRemoveIds: mapIds(studentsChanges.removed),
        studentAddIds: mapIds(studentsChanges.added),
      },
    });
  };

  const handleGoToGroups = () => navigate(PAGES.GROUPS.mask);

  if (isSuccess) {
    return (
      <SuccessStub
        description={`Группа ${group.name} обновлёна`}
        buttonText="Ко всем группам"
        onClick={handleGoToGroups}
      />
    );
  }

  if (error?.id === ApiErrorKind.COMMON) {
    return <ErrorStub onClick={reset} />;
  }

  return (
    <PageLayout>
      <GroupForm
        title="Редактирование группы"
        illustration={IconKind.EDIT_ILLUSTRATION}
        isLoading={isPending}
        onSubmit={handleSubmit}
        defaultValues={group}
        errors={error?.detail}
        onCancel={handleGoToGroups}
      />
    </PageLayout>
  );
};
