import { Role, useCreateUsers } from '@entities/user';
import { CreateUserForm } from '@features/UserForm';
import { withRoleAccess } from '@features/withRoleAccess';
import {
  ApiErrorKind,
  IconKind,
  parseDateToServerFormat,
  useGoBack,
} from '@shared/helpers';
import { ErrorStub, PageLayout, SuccessStub } from '@shared/ui';

import { SuccessMessage } from './ui/SuccessMessage';

import type { CreateUserData } from '@features/UserForm';
import type { FC } from 'react';

const CreateUserPage: FC = () => {
  const goBack = useGoBack();

  const { mutate, isPending, isSuccess, data, error, reset } = useCreateUsers();

  const handleSubmit = (data: CreateUserData) =>
    mutate({
      users: [
        {
          ...data,
          birthDate: parseDateToServerFormat(data.birthDate),
        },
      ],
    });

  if (isSuccess) {
    const [user] = data;

    return (
      <SuccessStub
        description={<SuccessMessage email={user.email} />}
        buttonText="Ко всем пользователям"
        onClick={goBack}
      />
    );
  }

  if (error?.id === ApiErrorKind.COMMON) {
    return <ErrorStub onClick={reset} />;
  }

  return (
    <PageLayout className="flex flex-col h-full">
      <CreateUserForm
        title="Новый пользователь"
        isLoading={isPending}
        illustration={IconKind.USER_ADD_ILLUSTRATION}
        onSubmit={handleSubmit}
        errors={error?.detail[0]}
      />
    </PageLayout>
  );
};

export default withRoleAccess(CreateUserPage)(Role.ADMIN);
