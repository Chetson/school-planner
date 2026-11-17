import { useCreateGroup } from '@entities/group';
import { Role } from '@entities/user';
import { GroupForm } from '@features/GroupForm';
import { withRoleAccess } from '@features/withRoleAccess';
import { ApiErrorKind, IconKind, mapIds, useGoBack } from '@shared/helpers';
import { ErrorStub, PageLayout } from '@shared/ui';
import { SuccessStub } from '@shared/ui';

import type { GroupFormData } from '@features/GroupForm';
import type { FC } from 'react';

const CreateGroupPage: FC = () => {
  const { mutate, isPending, data, isSuccess, error, reset } = useCreateGroup();
  const goBack = useGoBack();

  const handleSubmit = (data: GroupFormData) =>
    mutate({
      name: data.name,
      subject: data.subject?.id,
      room: data.room?.id,
      teacher: data.teacher.id,
      students: mapIds(data.students ?? []),
    });

  if (isSuccess) {
    return (
      <SuccessStub
        description={`Группа ${data.name} добавлена`}
        buttonText="Ко всем группам"
        onClick={goBack}
      />
    );
  }

  if (error?.id === ApiErrorKind.COMMON) {
    return <ErrorStub onClick={reset} />;
  }

  return (
    <PageLayout>
      <GroupForm
        title="Новая группа"
        illustration={IconKind.USERS_ILLUSTRATION}
        isLoading={isPending}
        onSubmit={handleSubmit}
        errors={error?.detail}
      />
    </PageLayout>
  );
};

export default withRoleAccess(CreateGroupPage)(Role.ADMIN);
