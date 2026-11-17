import { useMutation, useQuery } from '@tanstack/react-query';

import { api, apiUrls, createApiFn } from '@shared/api';

import { updateActivityMutationFn } from './mutations';
import { activityQueryFn } from './queries';

import type { ActivityQueryKeys } from './queryKeys';
import type {
  CreateActivityPayload,
  ActivityModel,
  SaveActivityError,
  UpdateActivityPayload,
} from './types';
import type { CommonApiError } from '@shared/helpers';
import type { UseMutationOptions } from '@tanstack/react-query';
import type { UseQueryOptions } from '@tanstack/react-query';

export const useCreateActivity = (
  options?: UseMutationOptions<
    ActivityModel,
    SaveActivityError,
    CreateActivityPayload
  >,
) =>
  useMutation({
    ...options,
    mutationFn: createApiFn((data) =>
      api.post(apiUrls.ACTIVITIES.CREATE, data),
    ),
  });

export const useActivity = (
  options: UseQueryOptions<
    ActivityModel,
    CommonApiError,
    ActivityModel,
    ActivityQueryKeys
  >,
) =>
  useQuery({
    ...options,
    queryFn: activityQueryFn,
  });

export const useUpdateActivity = (
  options?: UseMutationOptions<
    ActivityModel,
    SaveActivityError,
    UpdateActivityPayload
  >,
) =>
  useMutation({
    ...options,
    mutationFn: updateActivityMutationFn,
  });
