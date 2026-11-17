import { array, z } from 'zod';

import { classBaseSchema } from '@entities/class';
import { roomBaseSchema } from '@entities/room';
import { subjectBaseSchema } from '@entities/subject';
import { userBaseSchema } from '@entities/user';
import { VALIDATION_ERRORS } from '@shared/helpers';

export const groupBaseSchema = z.object({
  id: z.number(),
  name: z
    .string({ message: VALIDATION_ERRORS.REQUIRED })
    .min(1, VALIDATION_ERRORS.REQUIRED),
});

export const groupSchema = groupBaseSchema.extend({
  groupClass: array(classBaseSchema).optional().nullable(),
  room: roomBaseSchema.optional().nullable(),
  subject: subjectBaseSchema.optional().nullable(),
  teacher: z
    .object({}, { message: VALIDATION_ERRORS.REQUIRED })
    .extend(userBaseSchema.shape),
  students: z.array(userBaseSchema).optional().nullable(),
});
