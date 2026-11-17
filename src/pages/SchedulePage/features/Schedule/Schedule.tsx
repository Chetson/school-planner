import { memo, useCallback, useState } from 'react';

import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import {
  EVENT_LIST_QUERY_KEYS,
  EVENT_QUERY_KEYS,
  useEvents,
} from '@entities/event';
import { TIMESLOTS_QUERY_KEYS } from '@entities/settings';
import { convertTimeslotToCurrentTimeZone } from '@entities/settings';
import { timeslotsSettingsQueryFn } from '@entities/settings/queries';
import { DeleteEvent } from '@features/DeleteEvent';
import { Schedule as ScheduleBase } from '@features/Schedule';
import { useWeekFilter } from '@features/WeekFilter';
import { flatMapInfiniteData, getNextPageParam, PAGES } from '@shared/helpers';
import { ErrorStub, NotFoundStub, PageSpinner, withModal } from '@shared/ui';

import { useScheduleFilters } from './lib/hooks';

import type { EventModel } from '@entities/event';
import type { TimeslotInfoModel } from '@entities/settings';
import type { FC } from 'react';

const DeleteEventModal = withModal(DeleteEvent);

const SchedulePage: FC = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { week, setWeek } = useWeekFilter();

  const filters = useScheduleFilters();

  const [deleted, setDeleted] = useState<EventModel | null>(null);

  const timeslotsQuery = useInfiniteQuery({
    getNextPageParam: getNextPageParam,
    initialPageParam: 0,
    refetchOnMount: false,
    queryKey: TIMESLOTS_QUERY_KEYS,
    queryFn: timeslotsSettingsQueryFn,
    select: (data) =>
      flatMapInfiniteData<TimeslotInfoModel>(data).map(
        convertTimeslotToCurrentTimeZone,
      ),
  });

  const eventsQuery = useEvents({
    queryKey: EVENT_LIST_QUERY_KEYS({ ...(filters || {}), ...week }),
    refetchOnMount: true,
    enabled: Boolean(filters),
    placeholderData: undefined,
  });

  const handleEditEvent = useCallback(
    (event: EventModel) => {
      queryClient.setQueryData(
        EVENT_QUERY_KEYS(event.id, event.eventDate),
        () => event,
      );
      navigate(PAGES.SCHEDULE_EDIT_EVENT.create(event.id, event.eventDate));
    },
    [queryClient, navigate],
  );

  const handleDeleteEvent = useCallback(() => {
    eventsQuery.refetch();
    setDeleted(null);
  }, [eventsQuery.refetch]);

  const handleOpenChange = useCallback(
    (open: boolean) => !open && setDeleted(null),
    [],
  );

  const handleCancelDelete = useCallback(() => setDeleted(null), []);

  const handleRefetch = () => {
    timeslotsQuery.refetch();
    eventsQuery.refetch();
  };

  if (timeslotsQuery.isLoading) {
    return <PageSpinner />;
  }

  if (timeslotsQuery.isError || eventsQuery.isError) {
    return <ErrorStub onClick={handleRefetch} />;
  }

  if (!timeslotsQuery.data?.length) {
    return <NotFoundStub />;
  }

  return (
    <>
      <ScheduleBase
        range={week}
        events={eventsQuery.data}
        timeslots={timeslotsQuery.data}
        onEditEvent={handleEditEvent}
        onDeleteEvent={setDeleted}
        onChangeRange={setWeek}
      />

      <DeleteEventModal
        open={Boolean(deleted)}
        event={deleted}
        onOpenChange={handleOpenChange}
        onSuccess={handleDeleteEvent}
        onCancel={handleCancelDelete}
      />
    </>
  );
};

export default memo(SchedulePage);
