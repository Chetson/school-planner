import { useCreateClass } from '@entities/class';
import { Role } from '@entities/user';
import { ClassForm } from '@features/ClassForm';
import { withRoleAccess } from '@features/withRoleAccess';
import { ApiErrorKind, IconKind, mapIds, useGoBack } from '@shared/helpers';
import { ErrorStub, PageLayout, SuccessStub } from '@shared/ui';

import type { ClassFormData } from '@features/ClassForm';
import type { FC } from 'react';

const CreateClassPage: FC = () => {
  const { mutate, isPending, data, isSuccess, error } = useCreateClass();

  const goBack = useGoBack();

  const handleSubmit = (data: ClassFormData) =>
    mutate({
      className: data.className,
      baseClassroom: data.baseClassroom?.id,
      curatorIds: mapIds(data.curators),
      studentIds: mapIds(data.students),
    });

  if (isSuccess) {
    return (
      <SuccessStub
        description={`Класс ${data.className} добавлен`}
        buttonText="Ко всем классам"
        onClick={goBack}
      />
    );
  }

  if (error?.id === ApiErrorKind.COMMON) {
    return <ErrorStub />;
  }

  return (
    <PageLayout>
      <ClassForm
        title="Новый класс"
        illustration={IconKind.USERS_ILLUSTRATION}
        isLoading={isPending}
        onSubmit={handleSubmit}
        errors={error?.detail}
      />
    </PageLayout>
  );
};

export default withRoleAccess(CreateClassPage)(Role.ADMIN);
