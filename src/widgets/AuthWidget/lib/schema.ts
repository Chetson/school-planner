import { AuthOperationKind } from '@shared/types';
import { z } from 'zod';

const resetSchema = z.object({
  email: z.string().min(1, 'Обязательное поле'),
});

const loginSchema = resetSchema.extend({
  password: z.string().min(1, 'Обязательное поле'),
});

export const getAuthSchema = (opKind: AuthOperationKind) => {
  return opKind === AuthOperationKind.RESET ? resetSchema : loginSchema;
};
