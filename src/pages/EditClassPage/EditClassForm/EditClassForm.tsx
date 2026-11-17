import { useUpdateClass } from '@entities/class';
import { ClassForm } from '@features/ClassForm';
import {
  ApiErrorKind,
  getArrayChangesBy,
  IconKind,
  mapIds,
  useGoBack,
} from '@shared/helpers';
import { ErrorStub, PageLayout, SuccessStub } from '@shared/ui';

import type { ClassModel } from '@entities/class';
import type { ClassFormData } from '@features/ClassForm';
import type { FC } from 'react';

export interface EditClassFormProps {
  cls: ClassModel;
}

export const EditClassForm: FC<EditClassFormProps> = ({ cls }) => {
  const { mutate, isPending, isSuccess, error } = useUpdateClass();

  const goBack = useGoBack();

  const handleSubmit = (data: ClassFormData) => {
    const studentsChanges = getArrayChangesBy({
      current: cls.students,
      updated: data.students,
      key: 'id',
    });

    const curatorsChanges = getArrayChangesBy({
      current: cls.curators,
      updated: data.curators,
      key: 'id',
    });

    mutate({
      id: cls.id,
      data: {
        className: data.className,
        baseClassroom: data.baseClassroom?.id,
        curatorIdsAdd: mapIds(curatorsChanges.added),
        curatorIdsRemove: mapIds(curatorsChanges.removed),
        studentIdsAdd: mapIds(studentsChanges.added),
        studentIdsRemove: mapIds(studentsChanges.removed),
      },
    });
  };

  if (isSuccess) {
    return (
      <SuccessStub
        description={`Класс ${cls.className} обновлён`}
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
        title="Редактирование класса"
        illustration={IconKind.EDIT_ILLUSTRATION}
        isLoading={isPending}
        onSubmit={handleSubmit}
        defaultValues={cls}
        errors={error?.detail}
        onCancel={goBack}
      />
    </PageLayout>
  );
};
