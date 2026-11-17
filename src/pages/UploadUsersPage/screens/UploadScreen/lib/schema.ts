import { z } from 'zod';

import { FILE_ACCEPT_STRING } from './config';

export const uploadSchema = z.object({
  file: z
    .instanceof(File)
    .refine((file) => FILE_ACCEPT_STRING.includes(file.type)),
});
