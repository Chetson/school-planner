import { z } from 'zod';

import { classSchema } from '@entities/class';
import { eventKindSchema, periodSchema } from '@entities/event';
import { groupSchema } from '@entities/group';
import { roomSchema } from '@entities/room';
import { timeslotInfoSchema } from '@entities/settings';
import { subjectSchema } from '@entities/subject';
import { userBaseSchema } from '@entities/user';
import { VALIDATION_ERRORS } from '@shared/helpers';

const eventBaseFields = {
  isGroupEvent: z.boolean().optional(),
  timeslot: z
    .object({}, { message: VALIDATION_ERRORS.REQUIRED })
    .extend(timeslotInfoSchema.shape),
  period: periodSchema,
  eventType: eventKindSchema,
  comment: z
    .string()
    .max(256, VALIDATION_ERRORS.MAX(256))
    .optional()
    .nullable(),
  range: z.object(
    {
      from: z.date(),
      to: z.date(),
    },
    {
      message: VALIDATION_ERRORS.REQUIRED,
    },
  ),
};

export const eventGroupSchema = z.object({
  ...eventBaseFields,
  group: z
    .object({}, { message: VALIDATION_ERRORS.REQUIRED })
    .extend(groupSchema.shape),
});

export const eventClassSchema = z.object({
  ...eventBaseFields,
  groupClass: z
    .object({}, { message: VALIDATION_ERRORS.REQUIRED })
    .extend(classSchema.shape),
  teacher: z
    .object({}, { message: VALIDATION_ERRORS.REQUIRED })
    .extend(userBaseSchema.shape),
  room: z.object({}).extend(roomSchema.shape).optional().nullable(),
  subject: z
    .object({}, { message: VALIDATION_ERRORS.REQUIRED })
    .extend(subjectSchema.shape),
});
