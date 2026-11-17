import type { activitySchema } from './schema';
import type { CommonApiError, ValidationApiError } from '@shared/helpers';
import type { ApiList } from '@shared/types';
import type { z } from 'zod';

export type ActivityModel = z.infer<typeof activitySchema>;

export type CreateActivityPayload = Omit<ActivityModel, 'id'>;

export type ActivityUpdatePayload = {
  id: number;
  data: Partial<CreateActivityPayload>;
};

export type SaveActivityError =
  | CommonApiError
  | ValidationApiError<CreateActivityPayload>;

export type ActivitiesModel = ApiList<ActivityModel>;

export interface UpdateActivityPayload {
  id: number;
  data: Partial<CreateActivityPayload>;
}
