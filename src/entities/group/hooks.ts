import { useMutation, useQuery } from '@tanstack/react-query';

import { api, apiUrls, createApiFn } from '@shared/api';

import { groupQueryFn } from './queries';

import type { GroupQueryKeys } from './queryKeys';
import type {
  CreateGroupPayload,
  GroupModel,
  SaveGroupError,
  UpdateGroupPayload,
} from './types';
import type { CommonApiError } from '@shared/helpers';
import type {
  UseMutationOptions,
  UseQueryOptions,
} from '@tanstack/react-query';

export const useUpdateGroup = (
  options?: UseMutationOptions<GroupModel, SaveGroupError, UpdateGroupPayload>,
) =>
  useMutation({
    ...options,
    mutationFn: createApiFn(({ id, data }) =>
      api.patch(apiUrls.GROUPS.GROUP(id), data),
    ),
  });

export const useGroup = (
  options: UseQueryOptions<
    GroupModel,
    CommonApiError,
    GroupModel,
    GroupQueryKeys
  >,
) =>
  useQuery({
    ...options,
    queryFn: groupQueryFn,
  });

export const useCreateGroup = (
  options?: UseMutationOptions<GroupModel, SaveGroupError, CreateGroupPayload>,
) =>
  useMutation({
    ...options,
    mutationFn: createApiFn((data) => api.post(apiUrls.GROUPS.CREATE, data)),
  });
