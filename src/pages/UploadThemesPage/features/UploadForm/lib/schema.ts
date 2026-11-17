import { z } from 'zod';

import { classBaseSchema } from '@entities/class';
import { subjectBaseSchema } from '@entities/subject';
import { VALIDATION_ERRORS } from '@shared/helpers';

import { FILE_ACCEPT_STRING, FILE_ACCEPT_HINT } from './config';

export const schema = z.object({
  cls: z
    .object({}, { message: VALIDATION_ERRORS.REQUIRED })
    .extend(classBaseSchema.shape),
  subject: z
    .object({}, { message: VALIDATION_ERRORS.REQUIRED })
    .extend(subjectBaseSchema.shape),
  file: z
    .instanceof(File)
    .refine((file) => FILE_ACCEPT_STRING.includes(file.type), FILE_ACCEPT_HINT),
});
