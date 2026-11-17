import { Navigate, useParams } from 'react-router-dom';

import { ACTIVITY_QUERY_KEYS, useActivity } from '@entities/activity';
import { Role } from '@entities/user';
import { withRoleAccess } from '@features/withRoleAccess';
import { PAGES } from '@shared/helpers';
import { ErrorStub, PageLayout, PageSpinner } from '@shared/ui';

import { EditActivityForm } from './EditActivityForm';

import type { FC } from 'react';

const EditActivityPage: FC = () => {
  const params = useParams<{ activityId: string }>();
  const activityId = Number(params.activityId);
  const queryKey = ACTIVITY_QUERY_KEYS(activityId);

  const { data, isLoading, isError, refetch } = useActivity({
    queryKey,
    enabled: Boolean(activityId),
  });

  if (isError) {
    return <ErrorStub onClick={refetch} />;
  }

  if (isLoading) {
    return (
      <PageLayout className="h-full">
        <PageSpinner />
      </PageLayout>
    );
  }

  if (!data) {
    return <Navigate to={PAGES.ACTIVITIES.mask} />;
  }

  return <EditActivityForm activity={data} />;
};

export default withRoleAccess(EditActivityPage)(Role.ADMIN);
