import { useQuery } from '@tanstack/react-query';

import { api, apiUrls, createApiFn } from '@shared/api';

import { SETTINGS_QUERY_KEY } from './queryKeys';

import type { SettingsModel } from './types';
import type { CommonApiError } from '@shared/helpers';
import type { UseQueryOptions } from '@tanstack/react-query';

export const useSettings = (
  options: UseQueryOptions<SettingsModel, CommonApiError, SettingsModel>,
) =>
  useQuery({
    ...options,
    queryKey: [SETTINGS_QUERY_KEY],
    queryFn: createApiFn(({ signal }) =>
      api.get(apiUrls.SETTINGS.ALL, { signal }),
    ),
  });
