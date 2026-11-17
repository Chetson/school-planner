import { z } from 'zod';

import { quarterSchema } from '@entities/settings';
import { VALIDATION_ERRORS } from '@shared/helpers';

import { FILE_ACCEPT_HINT, FILE_ACCEPT_STRING } from './config';

export const schema = z.object({
  file: z
    .instanceof(File)
    .refine((file) => FILE_ACCEPT_STRING.includes(file.type), FILE_ACCEPT_HINT),
  quarter: z
    .object({}, { message: VALIDATION_ERRORS.REQUIRED })
    .extend(quarterSchema.shape),
});
