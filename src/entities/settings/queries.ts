import { api, apiUrls, createApiFn } from '@shared/api';

import type { QuartersSettings, TimeslotsSettings } from './types';

export const timeslotsSettingsQueryFn = createApiFn<
  TimeslotsSettings,
  unknown[],
  number
>(({ signal }) => api.get(apiUrls.SETTINGS.TIMESLOTS, { signal }));

export const quartersQueryFn = createApiFn<QuartersSettings, unknown[], number>(
  ({ signal }) => api.get(apiUrls.SETTINGS.QUARTERS, { signal }),
);
