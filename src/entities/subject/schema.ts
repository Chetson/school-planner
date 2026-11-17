import { z } from 'zod';

import { SUBJECT_NAME_REG_EXP, VALIDATION_ERRORS } from '@shared/helpers';

export const subjectBaseSchema = z.object({
  id: z.number(),
  name: z
    .string({ message: VALIDATION_ERRORS.REQUIRED })
    .min(2, 'Минимум 2 символа')
    .max(128, 'Максимум 128 символов')
    .regex(SUBJECT_NAME_REG_EXP, VALIDATION_ERRORS.VALUE),
});

// TODO Добавить новые поля
export const subjectSchema = subjectBaseSchema.extend({});
