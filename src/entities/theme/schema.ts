import { z } from 'zod';

import { classSchema } from '@entities/class';
import { subjectSchema } from '@entities/subject';
import { VALIDATION_ERRORS } from '@shared/helpers';

export const duplicateThemeSchema = z.object({
  originalClass: z
    .object({}, { message: VALIDATION_ERRORS.REQUIRED })
    .extend(classSchema.shape),
  newClass: z
    .object({}, { message: VALIDATION_ERRORS.REQUIRED })
    .extend(classSchema.shape),
  subject: z
    .object({}, { message: VALIDATION_ERRORS.REQUIRED })
    .extend(subjectSchema.shape),
});
