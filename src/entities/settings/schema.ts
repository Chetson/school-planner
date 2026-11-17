import { z } from 'zod';

export const timeslotInfoSchema = z.object({
  id: z.number(),
  startTime: z.string(),
  endTime: z.string(),
});

export const settingsSchema = z.object({
  timeslots: z.array(timeslotInfoSchema),
});

export const quarterSchema = z.object({
  number: z.number(),
  dateStart: z.string(),
  dateEnd: z.string(),
});
