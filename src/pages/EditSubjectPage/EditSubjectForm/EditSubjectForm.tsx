import { useUpdateSubject } from '@entities/subject';
import { SubjectForm } from '@features/SubjectForm';
import { ApiErrorKind, IconKind, useGoBack } from '@shared/helpers';
import { ErrorStub, PageLayout, SuccessStub } from '@shared/ui';

import type { SubjectModel } from '@entities/subject';
import type { SubjectFormData } from '@features/SubjectForm';
import type { FC } from 'react';

export interface EditSubjectFormProps {
  subject: SubjectModel;
}

export const EditSubjectForm: FC<EditSubjectFormProps> = ({ subject }) => {
  const { mutate, isPending, isSuccess, error } = useUpdateSubject();

  const goBack = useGoBack();

  const handleSubmit = (data: SubjectFormData) =>
    mutate({ id: subject.id, data });

  if (isSuccess) {
    return (
      <SuccessStub
        description={`Предмет ${subject.name} обновлён`}
        buttonText="Ко всем предметам"
        onClick={goBack}
      />
    );
  }

  if (error?.id === ApiErrorKind.COMMON) {
    return <ErrorStub />;
  }

  return (
    <PageLayout>
      <SubjectForm
        title="Редактирование предмета"
        illustration={IconKind.EDIT_ILLUSTRATION}
        isLoading={isPending}
        onSubmit={handleSubmit}
        defaultValues={subject}
        errors={error?.detail}
        onCancel={goBack}
      />
    </PageLayout>
  );
};
