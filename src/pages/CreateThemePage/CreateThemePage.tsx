import { useCreateThemes } from '@entities/theme';
import { Role } from '@entities/user';
import { ThemeForm } from '@features/ThemeForm';
import { withRoleAccess } from '@features/withRoleAccess';
import { ApiErrorKind, useGoBack } from '@shared/helpers';
import { ErrorStub, PageLayout, SuccessStub } from '@shared/ui';

import type { ThemeFormData } from '@features/ThemeForm';
import type { FC } from 'react';

const CreateThemePage: FC = () => {
  const { data, mutate, isPending, isSuccess, error, reset } =
    useCreateThemes();

  const goBack = useGoBack();

  const handleSubmit = (data: ThemeFormData) =>
    mutate({
      data: [
        {
          name: data.name,
          subjectId: data.subject.id,
          classId: data.cls.id,
          totalHours: data.totalHours,
        },
      ],
    });

  if (isSuccess) {
    return (
      <SuccessStub
        description={`Тема урока ${data[0]?.name} добавлена`}
        buttonText="Ко всем темам уроков"
        onClick={goBack}
      />
    );
  }

  if (error?.id === ApiErrorKind.COMMON) {
    return <ErrorStub onClick={reset} />;
  }

  return (
    <PageLayout>
      <ThemeForm
        title="Новая тема урока"
        isLoading={isPending}
        onSubmit={handleSubmit}
        errors={error?.detail}
      />
    </PageLayout>
  );
};

export default withRoleAccess(CreateThemePage)(Role.ADMIN, Role.TEACHER);
