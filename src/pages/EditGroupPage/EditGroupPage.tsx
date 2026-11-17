import { useParams } from 'react-router-dom';

import { GROUP_QUERY_KEYS, useGroup } from '@entities/group';
import { Role } from '@entities/user';
import { withRoleAccess } from '@features/withRoleAccess';
import { ErrorStub, PageSpinner } from '@shared/ui';

import { EditGroupForm } from './EditGroupForm';

import type { FC } from 'react';

const EditGroupPage: FC = () => {
  const params = useParams<{ groupId: string }>();
  const groupId = Number(params.groupId);

  const { data, isLoading, isError, refetch } = useGroup({
    queryKey: GROUP_QUERY_KEYS(groupId),
    enabled: Boolean(groupId),
  });

  if (isError || !data) {
    return <ErrorStub onClick={refetch} />;
  }

  return isLoading ? <PageSpinner /> : <EditGroupForm group={data} />;
};

export default withRoleAccess(EditGroupPage)(Role.ADMIN);
