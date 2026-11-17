import { useCreateActivity } from '@entities/activity/hooks';
import { Role } from '@entities/user';
import { ActivityForm } from '@features/ActivityForm';
import { withRoleAccess } from '@features/withRoleAccess';
import { ApiErrorKind, useGoBack } from '@shared/helpers';
import { ErrorStub, PageLayout, SuccessStub } from '@shared/ui';

import type { ActivityFormData } from '@features/ActivityForm';
import type { FC } from 'react';

const CreateActivityPage: FC = () => {
  const { data, mutate, isPending, isSuccess, error, reset } =
    useCreateActivity();

  const goBack = useGoBack();

  const handleSubmit = (data: ActivityFormData) => mutate(data);

  if (isSuccess) {
    return (
      <SuccessStub
        description={`Вид деятельности ${data.name} добавлен`}
        buttonText="Ко всем видам деятельности"
        onClick={goBack}
      />
    );
  }

  if (error?.id === ApiErrorKind.COMMON) {
    return <ErrorStub onClick={reset} />;
  }

  return (
    <PageLayout>
      <ActivityForm
        title="Новый вид деятельности"
        isLoading={isPending}
        onSubmit={handleSubmit}
        errors={error?.detail}
      />
    </PageLayout>
  );
};

export default withRoleAccess(CreateActivityPage)(Role.ADMIN);
