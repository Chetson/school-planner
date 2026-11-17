import { z } from 'zod';

import { userSchema } from '@entities/user';
import { validateBirthDate, VALIDATION_ERRORS } from '@shared/helpers';

export const createUserSchema = userSchema
  .omit({
    id: true,
    isBlocked: true,
    rawPassword: true,
    birthDate: true,
  })
  .extend({
    birthDate: z
      .date()
      .refine(validateBirthDate, { message: VALIDATION_ERRORS.BIRTH_DATE })
      .optional(),
  });
export const editUserSchema = createUserSchema.omit({
  role: true,
});

export type CreateUserData = z.infer<typeof createUserSchema>;
export type EditUserData = z.infer<typeof editUserSchema>;
