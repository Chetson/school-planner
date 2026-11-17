import { api, apiUrls, createApiFn } from '@shared/api';

import type { EventModel } from './types';

export const deleteEventMutation = createApiFn<void, EventModel>(
  ({ id, eventDate }: EventModel) =>
    api.delete(apiUrls.EVENTS.DELETE(id, { eventDate })),
);
