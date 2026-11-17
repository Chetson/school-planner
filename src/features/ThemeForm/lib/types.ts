import type { schema } from './schema';
import type { z } from 'zod';

export type ThemeFormData = z.infer<typeof schema>;
