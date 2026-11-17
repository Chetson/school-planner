import { z } from 'zod';

import { classBaseSchema } from '@entities/class';
import { subjectBaseSchema } from '@entities/subject';
import { VALIDATION_ERRORS } from '@shared/helpers';

export const schema = z.object({
  name: z.string({ message: VALIDATION_ERRORS.REQUIRED }),
  cls: z
    .object({}, { message: VALIDATION_ERRORS.REQUIRED })
    .extend(classBaseSchema.shape),
  subject: z
    .object({}, { message: VALIDATION_ERRORS.REQUIRED })
    .extend(subjectBaseSchema.shape),
  totalHours: z
    .any()
    .optional()
    .transform((value) => {
      if (!value) return;

      return Number(value);
    })
    .refine((value) => value !== undefined, {
      message: VALIDATION_ERRORS.REQUIRED,
    })
    .pipe(
      z
        .number({ message: VALIDATION_ERRORS.VALUE })
        .max(2516, { message: VALIDATION_ERRORS.MAX_COUNT(2516) })
        .min(1, { message: VALIDATION_ERRORS.MIN_COUNT(1) }),
    ),
});
