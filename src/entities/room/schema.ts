import { z } from 'zod';

import { userBaseSchema } from '@entities/user';
import { VALIDATION_ERRORS } from '@shared/helpers';

export const roomBaseSchema = z.object({
  id: z.number(),
  roomName: z
    .string({ message: VALIDATION_ERRORS.REQUIRED })
    .min(1, VALIDATION_ERRORS.REQUIRED),
});

export const roomSchema = roomBaseSchema.extend({
  basedClass: z
    .object({
      id: z.number(),
      className: z.string(),
      baseClassroom: roomBaseSchema.optional().nullable(),
    })
    .optional()
    .nullable(),
  staff: z.array(userBaseSchema).optional(),
});
