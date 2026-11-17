import { useUpdateUser } from '@entities/user';
import { EditUserForm as EditUserFormBase } from '@features/UserForm';
import {
  ApiErrorKind,
  IconKind,
  parseDateToServerFormat,
  useGoBack,
} from '@shared/helpers';
import { ErrorStub, PageLayout, SuccessStub } from '@shared/ui';

import { getDefaultFormValues } from '../../helpers';

import type { UserModel } from '@entities/user';
import type { EditUserData } from '@features/UserForm';
import type { FC } from 'react';

export interface EditUserFormProps {
  user: UserModel;
}

export const EditUserForm: FC<EditUserFormProps> = ({ user }) => {
  const goBack = useGoBack();
  const { mutate, isPending, isSuccess, error } = useUpdateUser();

  const handleSubmit = (data: EditUserData) =>
    mutate({
      id: user.id,
      data: {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        patronim: data.patronim,
        comment: data.comment,
        birthDate: parseDateToServerFormat(data.birthDate),
        city: data.city,
        phoneNumber: data.phoneNumber,
      },
    });

  if (isSuccess) {
    return (
      <SuccessStub
        description="Пользователь сохранён"
        buttonText="Ко всем пользователям"
        onClick={goBack}
      />
    );
  }

  if (error?.id === ApiErrorKind.COMMON) {
    return <ErrorStub />;
  }

  return (
    <PageLayout className="flex flex-col h-full">
      <EditUserFormBase
        title="Редактирование пользователя"
        illustration={IconKind.EDIT_ILLUSTRATION}
        isLoading={isPending}
        onSubmit={handleSubmit}
        defaultValues={getDefaultFormValues(user)}
        errors={error?.detail[0]}
        onCancel={goBack}
      />
    </PageLayout>
  );
};
