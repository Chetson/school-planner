import { z } from 'zod';

import { groupSchema } from '@entities/group';
import { timeslotInfoSchema } from '@entities/settings';
import { VALIDATION_ERRORS } from '@shared/helpers';

import { EventKind, EventPeriod } from './config';

export const eventKindSchema = z.nativeEnum(EventKind);

export const periodSchema = z.nativeEnum(EventPeriod);

export const eventSchema = z.object({
  id: z.number(),
  isGroupEvent: z.boolean(),
  eventDate: z.string(),
  timeslot: z
    .object({}, { message: VALIDATION_ERRORS.REQUIRED })
    .extend(timeslotInfoSchema.shape),
  period: periodSchema,
  eventType: eventKindSchema,
  group: z
    .object({}, { message: VALIDATION_ERRORS.REQUIRED })
    .extend(groupSchema.shape),
  dateStart: z.string(),
  dateEnd: z.string(),
  comment: z
    .string()
    .max(256, VALIDATION_ERRORS.MAX(256))
    .optional()
    .nullable(),
});

export const lessonSchema = z.object({
  weekday: z.string(),
  timeslot: z.number(),
  className: z.string().nullable(),
  subject: z.string().nullable(),
  room: z.string().optional().nullable(),
  teacher: z.string().nullable(),
  group: z.string().nullable(),
});
