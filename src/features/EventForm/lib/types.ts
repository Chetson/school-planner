import type { eventClassSchema, eventGroupSchema } from './schema';
import type { z } from 'zod';

export type EventFormData = z.infer<
  typeof eventGroupSchema | typeof eventClassSchema
>;
