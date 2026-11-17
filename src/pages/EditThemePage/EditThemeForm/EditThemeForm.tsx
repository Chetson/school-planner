import { useUpdateTheme } from '@entities/theme';
import { ThemeForm } from '@features/ThemeForm';
import { ApiErrorKind, useGoBack } from '@shared/helpers';
import { ErrorStub, PageLayout, SuccessStub } from '@shared/ui';

import type { ThemeModel } from '@entities/theme';
import type { ThemeFormData } from '@features/ThemeForm';
import type { FC } from 'react';

export interface EditActivityFormProps {
  theme: ThemeModel;
}

export const EditThemeForm: FC<EditActivityFormProps> = ({ theme }) => {
  const { mutate, isPending, isSuccess, error } = useUpdateTheme();

  const goBack = useGoBack();

  const handleSubmit = (data: ThemeFormData) =>
    mutate({
      id: theme.id,
      data: {
        classId: data.cls.id,
        subjectId: data.subject.id,
        name: data.name,
        totalHours: data.totalHours,
      },
    });

  if (isSuccess) {
    return (
      <SuccessStub
        description={`Тема урока ${theme.name} обновлена`}
        buttonText="Обратно к темам уроков"
        onClick={goBack}
      />
    );
  }

  if (error?.id === ApiErrorKind.COMMON) {
    return <ErrorStub />;
  }

  return (
    <PageLayout>
      <ThemeForm
        title={theme.name}
        isLoading={isPending}
        onSubmit={handleSubmit}
        defaultValues={{ ...theme, cls: theme.themeClass }}
        errors={error?.detail}
        onCancel={goBack}
      />
    </PageLayout>
  );
};
