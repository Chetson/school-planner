import { Navigate, useParams } from 'react-router-dom';

import { SUBJECT_QUERY_KEYS, useSubject } from '@entities/subject';
import { Role } from '@entities/user';
import { withRoleAccess } from '@features/withRoleAccess';
import { PAGES } from '@shared/helpers';
import { ErrorStub, PageLayout, PageSpinner } from '@shared/ui';

import { EditSubjectForm } from './EditSubjectForm';

import type { FC } from 'react';

const EditSubjectPage: FC = () => {
  const params = useParams<{ subjectId: string }>();

  const subjectId = Number(params.subjectId);
  const queryKey = SUBJECT_QUERY_KEYS(subjectId);

  const { data, isLoading, isError, refetch } = useSubject({
    queryKey,
    enabled: Boolean(subjectId),
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
    return <Navigate to={PAGES.SUBJECTS.mask} />;
  }

  return <EditSubjectForm subject={data} />;
};

export default withRoleAccess(EditSubjectPage)(Role.ADMIN);
