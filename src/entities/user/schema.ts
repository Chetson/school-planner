import { z } from 'zod';

import {
  PHONE_NUMBER_REG_EXP,
  userNameSchema,
  VALIDATION_ERRORS,
} from '@shared/helpers';

import { Role } from './config';

export const userBaseSchema = userNameSchema.extend({
  id: z.number(),
});

export const userSchema = userBaseSchema.extend({
  email: z
    .string({ message: VALIDATION_ERRORS.REQUIRED })
    .min(1, VALIDATION_ERRORS.REQUIRED)
    .email(VALIDATION_ERRORS.EMAIL),
  comment: z.string().max(500, VALIDATION_ERRORS.MAX(500)).optional(),
  birthDate: z.string().optional(),
  city: z.string().optional(),
  phoneNumber: z
    .string()
    .regex(PHONE_NUMBER_REG_EXP, VALIDATION_ERRORS.PHONE)
    .or(z.literal(''))
    .optional(),
  role: z.nativeEnum(Role, { message: VALIDATION_ERRORS.REQUIRED }),
  isBlocked: z.boolean().optional(),
  rawPassword: z.string(),
});
