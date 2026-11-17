import { api, apiUrls, createApiFn } from '@shared/api';

import type { ActivityModel, UpdateActivityPayload } from './types';

export const deleteActivityMutationFn = createApiFn<void, ActivityModel>(
  ({ id }) => api.delete(apiUrls.ACTIVITIES.ACTIVITY(id)),
);

export const updateActivityMutationFn = createApiFn<
  ActivityModel,
  UpdateActivityPayload
>(({ id, data }) => api.patch(apiUrls.ACTIVITIES.ACTIVITY(id), data));
