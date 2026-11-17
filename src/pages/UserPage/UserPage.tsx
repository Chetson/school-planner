import { useParams } from 'react-router-dom';

import { Role, useCurrentUser, USER_QUERY_KEYS, useUser } from '@entities/user';
import { withRoleAccess } from '@features/withRoleAccess';
import { ErrorStub, PageLayout, PageSpinner } from '@shared/ui';

import { UserDetails } from './features/UserDetails';

const UserPage = () => {
  const params = useParams<{ userId: string }>();
  const userId = Number(params.userId);

  const { data, isPending, isError, refetch } = useUser({
    queryKey: USER_QUERY_KEYS(userId),
    enabled: Boolean(userId),
  });

  const { isLoading: isLoadingUser } = useCurrentUser();

  if (isError) {
    return <ErrorStub onClick={refetch} />;
  }

  if (isPending || isLoadingUser) {
    return (
      <PageLayout className="h-full">
        <PageSpinner />
      </PageLayout>
    );
  }

  return <UserDetails user={data} />;
};

export default withRoleAccess(UserPage)(Role.ADMIN, Role.TEACHER);
