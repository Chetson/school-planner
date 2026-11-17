import { z } from 'zod';

import { roomBaseSchema } from '@entities/room';
import { userBaseSchema } from '@entities/user';
import { VALIDATION_ERRORS } from '@shared/helpers';

export const classBaseSchema = z.object({
  id: z.number(),
  className: z
    .string({ message: VALIDATION_ERRORS.REQUIRED })
    .min(1, VALIDATION_ERRORS.REQUIRED),
});

export const classSchema = classBaseSchema.extend({
  baseClassroom: roomBaseSchema.optional().nullable(),
  curators: z.array(userBaseSchema).optional(),
  students: z.array(userBaseSchema).optional(),
});
