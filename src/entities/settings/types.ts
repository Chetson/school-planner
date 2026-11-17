import type { settingsSchema, timeslotInfoSchema } from './schema';
import type { quarterSchema } from './schema';
import type { ApiList } from '@shared/types';
import type { z } from 'zod';

export type TimeslotInfoModel = z.infer<typeof timeslotInfoSchema>;

export type TimeslotsSettings = ApiList<TimeslotInfoModel>;

export type SettingsModel = z.infer<typeof settingsSchema>;

export type QuarterModel = z.infer<typeof quarterSchema>;

export type QuartersSettings = ApiList<QuarterModel>;
