import { api, apiUrls, createApiFn } from '@shared/api';
import { createSortingString } from '@shared/helpers';

import type { ActivitiesQueryKeys, ActivityQueryKeys } from './queryKeys';
import type { ActivitiesModel, ActivityModel } from './types';

export const activitiesQueryFn = createApiFn<
  ActivitiesModel,
  ActivitiesQueryKeys,
  number
>(({ queryKey, signal, pageParam }) => {
  const { sortDir, sortId, search } = queryKey[1];

  const order = createSortingString(sortId, sortDir);

  return api.get(apiUrls.ACTIVITIES.LIST(order, search, pageParam), { signal });
});

export const activityQueryFn = createApiFn<ActivityModel, ActivityQueryKeys>(
  ({ queryKey, signal }) => {
    const id = queryKey[1];

    return api.get(apiUrls.ACTIVITIES.ACTIVITY(id), { signal });
  },
);
