import { Navigate, useParams } from 'react-router-dom';

import { Role, USER_QUERY_KEYS, useUser } from '@entities/user';
import { withRoleAccess } from '@features/withRoleAccess';
import { PAGES } from '@shared/helpers';
import { ErrorStub, PageLayout, PageSpinner } from '@shared/ui';

import { EditUserForm } from './features/EditUserForm';

import type { FC } from 'react';

const EditUserPage: FC = () => {
  const params = useParams<{ userId: string }>();
  const userId = Number(params.userId);

  const { data, isLoading, isError } = useUser({
    queryKey: USER_QUERY_KEYS(userId),
    enabled: Boolean(userId),
  });

  if (isError) {
    return <ErrorStub />;
  }

  if (isLoading) {
    return (
      <PageLayout className="h-full">
        <PageSpinner />
      </PageLayout>
    );
  }

  if (!data || data.isBlocked) {
    return <Navigate to={PAGES.USERS.mask} />;
  }

  return <EditUserForm user={data} />;
};

export default withRoleAccess(EditUserPage)(Role.ADMIN);
