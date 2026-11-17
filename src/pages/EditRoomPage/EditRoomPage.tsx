import { Navigate, useParams } from 'react-router-dom';

import { ROOM_QUERY_KEYS, useRoom } from '@entities/room';
import { Role } from '@entities/user';
import { withRoleAccess } from '@features/withRoleAccess';
import { PAGES } from '@shared/helpers';
import { ErrorStub, PageLayout, PageSpinner } from '@shared/ui';

import { EditRoomForm } from './EditRoomForm';

import type { FC } from 'react';

const EditRoomPage: FC = () => {
  const params = useParams<{ roomId: string }>();
  const roomId = Number(params.roomId);

  const { data, isLoading, isError, refetch } = useRoom({
    queryKey: ROOM_QUERY_KEYS(roomId),
    enabled: Boolean(roomId),
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
    return <Navigate to={PAGES.ROOMS.mask} />;
  }

  return <EditRoomForm room={data} />;
};

export default withRoleAccess(EditRoomPage)(Role.ADMIN);
