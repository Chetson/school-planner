import { z } from 'zod';

const MAX_GRADE = 100;

export const schema = z
  .string()
  .refine((val) => !isNaN(Number(val)))
  .transform((val) => (val.length ? Number(val) : undefined))
  .refine((val) => !val || val <= MAX_GRADE);
