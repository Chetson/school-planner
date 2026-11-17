import { api, apiUrls, createApiFn } from '@shared/api';
import { parseDateToServerFormat } from '@shared/helpers';

import type { EventListQueryKeys, EventQueryKeys } from './queryKeys';
import type { EventModel, EventsData } from './types';

export const eventsQueryFn = createApiFn<EventsData, EventListQueryKeys>(
  ({ queryKey, signal }) => {
    const { from, to, ...filters } = queryKey[1];

    const fromStr = parseDateToServerFormat(from);
    const toStr = parseDateToServerFormat(to);

    return api.get(
      apiUrls.EVENTS.LIST({
        ...filters,
        start: fromStr,
        end: toStr,
      }),
      { signal },
    );
  },
);

export const eventQueryFn = createApiFn<EventModel, EventQueryKeys>(
  ({ queryKey, signal }) =>
    api.get(apiUrls.EVENTS.EVENT(queryKey[1], queryKey[2]), { signal }),
);
