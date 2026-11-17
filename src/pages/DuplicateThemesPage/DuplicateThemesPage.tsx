import { useDuplicateThemes } from '@entities/theme';
import { Role } from '@entities/user';
import { useClassFilter } from '@features/ClassFilter';
import { useSubjectFilter } from '@features/SubjectFilter';
import { withRoleAccess } from '@features/withRoleAccess';
import { ApiErrorKind, useGoBack } from '@shared/helpers';
import { ErrorStub, PageLayout, SuccessStub } from '@shared/ui';

import { DuplicateThemesForm } from './features/DuplicateThemesForm';

import type { duplicateThemeSchema } from '@entities/theme';
import type { FC } from 'react';
import type { z } from 'zod';

type DuplicateThemes = z.infer<typeof duplicateThemeSchema>;

const DuplicateThemesPage: FC = () => {
  const [cls] = useClassFilter();
  const [subject] = useSubjectFilter();
  const { mutate, isPending, isSuccess, error } = useDuplicateThemes();
  const goBack = useGoBack();

  const handleSubmit = (data: DuplicateThemes) => {
    mutate({
      originalClassId: data.originalClass.id,
      newClassId: data.newClass.id,
      subjectId: data.subject.id,
    });
  };

  if (isSuccess) {
    return (
      <SuccessStub
        description="Темы уроков успешно продублированы"
        buttonText="Обратно ко всем темам уроков"
        onClick={goBack}
      />
    );
  }

  if (error?.id === ApiErrorKind.COMMON) {
    return <ErrorStub />;
  }

  return (
    <PageLayout>
      <DuplicateThemesForm
        title="Дублирование тем уроков"
        onSubmit={handleSubmit}
        isLoading={isPending}
        onCancel={goBack}
        defaultValues={{
          originalClass: cls || undefined,
          subject: subject || undefined,
        }}
      />
    </PageLayout>
  );
};

export default withRoleAccess(DuplicateThemesPage)(Role.ADMIN, Role.TEACHER);
