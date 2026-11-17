import { useUpdateActivity } from '@entities/activity';
import { ActivityForm } from '@features/ActivityForm';
import { ApiErrorKind, IconKind, useGoBack } from '@shared/helpers';
import { ErrorStub, PageLayout, SuccessStub } from '@shared/ui';

import type { ActivityModel } from '@entities/activity';
import type { ActivityFormData } from '@features/ActivityForm';
import type { FC } from 'react';

export interface EditActivityFormProps {
  activity: ActivityModel;
}

export const EditActivityForm: FC<EditActivityFormProps> = ({ activity }) => {
  const { mutate, isPending, isSuccess, error } = useUpdateActivity();

  const goBack = useGoBack();

  const handleSubmit = (data: ActivityFormData) =>
    mutate({ id: activity.id, data });

  if (isSuccess) {
    return (
      <SuccessStub
        description={`Вид деятельности "${activity.name}" обновлен`}
        buttonText="Обратно к видам деятельности"
        onClick={goBack}
      />
    );
  }

  if (error?.id === ApiErrorKind.COMMON) {
    return <ErrorStub />;
  }

  return (
    <PageLayout>
      <ActivityForm
        title="Редактирование вида деятельности"
        illustration={IconKind.EDIT_ILLUSTRATION}
        isLoading={isPending}
        onSubmit={handleSubmit}
        defaultValues={activity}
        errors={error?.detail}
        disabledFields={
          activity.defaultActivity ? ['name', 'shortname'] : undefined
        }
        onCancel={goBack}
      />
    </PageLayout>
  );
};
