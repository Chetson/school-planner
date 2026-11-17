import { useMutation, useQuery } from '@tanstack/react-query';

import { convertTimeslotToCurrentTimeZone } from '@entities/settings';
import { api, apiUrls, createApiFn } from '@shared/api';

import { eventQueryFn, eventsQueryFn } from './queries';

import type { EventListQueryKeys, EventQueryKeys } from './queryKeys';
import type {
  SaveEventPayload,
  EventModel,
  EventsData,
  SaveEventError,
  UpdateEventPayload,
  DeleteEventPayload,
  UploadedEvents,
  UploadEventsPayload,
  CreateEventsPayload,
} from './types';
import type { CommonApiError } from '@shared/helpers';
import type {
  UseMutationOptions,
  UseQueryOptions,
} from '@tanstack/react-query';

export const useCreateEvents = (
  options?: UseMutationOptions<
    EventModel[],
    SaveEventError,
    CreateEventsPayload
  >,
) =>
  useMutation({
    ...options,
    mutationFn: createApiFn(({ data }) =>
      api.post(apiUrls.EVENTS.CREATE, data),
    ),
  });

export const useEvents = (
  options: UseQueryOptions<
    EventsData,
    CommonApiError,
    EventModel[],
    EventListQueryKeys
  >,
) =>
  useQuery({
    ...options,
    refetchOnMount: true,
    queryFn: eventsQueryFn,
    select: (data) =>
      data.events
        .flatMap((events) => events)
        .map((event) => ({
          ...event,
          timeslot: convertTimeslotToCurrentTimeZone(event.timeslot),
        })),
  });

export const useCreateEvent = (
  options?: UseMutationOptions<EventModel, SaveEventError, SaveEventPayload>,
) =>
  useMutation({
    ...options,
    mutationFn: createApiFn((data) => api.post(apiUrls.EVENTS.CREATE, data)),
  });

export const useEvent = (
  options: UseQueryOptions<
    EventModel,
    CommonApiError,
    EventModel,
    EventQueryKeys
  >,
) =>
  useQuery({
    ...options,
    queryFn: eventQueryFn,
    select: (event) => ({
      ...event,
      timeslot: convertTimeslotToCurrentTimeZone(event.timeslot),
    }),
  });

export const useUpdateEvent = (
  options?: UseMutationOptions<EventModel, SaveEventError, UpdateEventPayload>,
) =>
  useMutation({
    ...options,
    mutationFn: createApiFn(({ id, data }) =>
      api.patch(apiUrls.EVENTS.EVENT(id, data.eventDate), data),
    ),
  });

export const useDeleteEvent = (
  options?: UseMutationOptions<EventModel, CommonApiError, DeleteEventPayload>,
) =>
  useMutation({
    ...options,
    mutationFn: createApiFn(({ id, data }) =>
      api.delete(apiUrls.EVENTS.DELETE(id, { ...data })),
    ),
  });

export const useUploadEvents = (
  options?: UseMutationOptions<
    UploadedEvents,
    SaveEventError,
    UploadEventsPayload
  >,
) =>
  useMutation({
    ...options,
    mutationFn: createApiFn(({ file, dateStart, dateEnd }) => {
      const formData = new FormData();
      formData.append('file', file);

      return api.put(
        apiUrls.EVENTS.VALIDATE_EXCEL(dateStart, dateEnd),
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        },
      );
    }),
  });
