import { subjectSchema } from '@entities/subject';

import type { z } from 'zod';

export const subjectFormData = subjectSchema.omit({ id: true });

export type SubjectFormData = z.infer<typeof subjectFormData>;
