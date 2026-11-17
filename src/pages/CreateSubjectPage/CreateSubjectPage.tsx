import { useCreateSubject } from '@entities/subject';
import { SubjectForm } from '@features/SubjectForm';
import { ApiErrorKind, IconKind, useGoBack } from '@shared/helpers';
import { ErrorStub, PageLayout, SuccessStub } from '@shared/ui';

import type { SubjectFormData } from '@features/SubjectForm';

const CreateSubjectPage = () => {
  const { mutate, isPending, data, isSuccess, error } = useCreateSubject();
  const goBack = useGoBack();

  const handleSubmit = (data: SubjectFormData) => mutate(data);

  if (isSuccess) {
    return (
      <SuccessStub
        description={`Предмет ${data.name} добавлен`}
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
        title="Новый предмет"
        illustration={IconKind.SUBJECT_ILLUSTRATION}
        isLoading={isPending}
        onSubmit={handleSubmit}
        errors={error?.detail}
      />
    </PageLayout>
  );
};

export default CreateSubjectPage;
