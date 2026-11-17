import { Navigate, useParams } from 'react-router-dom';

import { EVENT_QUERY_KEYS, useEvent } from '@entities/event';
import { Role } from '@entities/user';
import { withRoleAccess } from '@features/withRoleAccess';
import { PAGES, useQueryParams } from '@shared/helpers';
import { ErrorStub, PageLayout, PageSpinner } from '@shared/ui';

import { EditEventForm } from './features/EditEventForm';

import type { FC } from 'react';

const EditEventPage: FC = () => {
  const params = useParams<{ eventId: string }>();
  const {
    queryParams: { eventDate },
  } = useQueryParams();
  const eventId = Number(params.eventId);

  const { data, isLoading, isError } = useEvent({
    queryKey: EVENT_QUERY_KEYS(eventId, eventDate[0]),
    enabled: Boolean(eventId && eventDate?.[0]),
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
    return <Navigate to={PAGES.SCHEDULE.mask} />;
  }

  return <EditEventForm event={data} />;
};

export default withRoleAccess(EditEventPage)(Role.ADMIN);
