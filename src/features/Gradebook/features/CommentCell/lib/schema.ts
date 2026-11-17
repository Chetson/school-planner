import { z } from 'zod';

export const schema = z.string().max(255);
