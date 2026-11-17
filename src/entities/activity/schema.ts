import { z } from 'zod';

import { VALIDATION_ERRORS } from '@shared/helpers';

export const activitySchema = z.object({
  id: z.number(),
  name: z.string({ message: VALIDATION_ERRORS.REQUIRED }),
  shortname: z.string({ message: VALIDATION_ERRORS.REQUIRED }),
  koef: z.number(),
  defaultActivity: z.boolean().optional(),
});
