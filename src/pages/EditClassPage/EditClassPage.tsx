import { Navigate, useParams } from 'react-router-dom';

import { CLASS_QUERY_KEYS, useClass } from '@entities/class';
import { Role } from '@entities/user';
import { withRoleAccess } from '@features/withRoleAccess';
import { PAGES } from '@shared/helpers';
import { ErrorStub, PageLayout, PageSpinner } from '@shared/ui';

import { EditClassForm } from './EditClassForm';

import type { FC } from 'react';

const EditClassPage: FC = () => {
  const params = useParams<{ classId: string }>();
  const classId = Number(params.classId);

  const { data, isLoading, isError } = useClass({
    queryKey: CLASS_QUERY_KEYS(classId),
    enabled: Boolean(classId),
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

  if (!data) {
    return <Navigate to={PAGES.CLASSES.mask} />;
  }

  return <EditClassForm cls={data} />;
};

export default withRoleAccess(EditClassPage)(Role.ADMIN);
