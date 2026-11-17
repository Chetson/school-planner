import type { EventKind, EventPeriod } from './config';
import type { eventSchema, lessonSchema } from './schema';
import type { CommonApiError, ValidationApiError } from '@shared/helpers';
import type { z } from 'zod';

export type EventModel = z.infer<typeof eventSchema>;

export type EventsData = {
  start: string;
  end: string;
  events: EventModel[][];
};

export type BaseEventPayload = {
  period: EventPeriod;
  timeslotId: number;
  eventType: EventKind;
  dateStart: string;
  dateEnd: string;
  comment?: string | null;
};

export type GroupEventPayload = BaseEventPayload & {
  data: {
    groupId: number;
  };
};

export type ClassEventPayload = BaseEventPayload & {
  data: {
    classId: number;
    teacherId: number;
    roomId?: number;
    subjectId: number;
  };
};

export type SaveEventPayload = GroupEventPayload | ClassEventPayload;

export type DeleteEventPayload = {
  id: number;
  data: {
    eventDate: string;
    isPermanent: boolean;
  };
};

export type UploadEventsPayload = {
  file: Blob;
  dateStart: string;
  dateEnd: string;
};

export type CreateEventsPayload = {
  data: SaveEventPayload[];
};

export type UpdateEventPayload = {
  id: number;
  data: {
    eventDate: string;
    isPermanent: boolean;
  } & SaveEventPayload;
};

export type SaveEventError =
  | CommonApiError
  | ValidationApiError<SaveEventPayload>;

export type TeacherEventListFilters = {
  userId?: number;
  classId?: number;
  roomId?: number;
};

export type AdminEventListFilters = {
  subjectId?: number;
} & TeacherEventListFilters;

export type ParentEventListFilters = {
  userId?: number;
  classId?: number;
  roomId?: number;
};

export type UploadedEventModel = {
  lesson: z.infer<typeof lessonSchema>;
  failures: Record<string, Array<string>>[];
};

export type UploadedEvents = {
  successful: SaveEventPayload[];
  failed: UploadedEventModel[];
};

export type StudentEventListFilters = Record<string, never>;

export type EventListFilters =
  | AdminEventListFilters
  | TeacherEventListFilters
  | ParentEventListFilters
  | StudentEventListFilters;
