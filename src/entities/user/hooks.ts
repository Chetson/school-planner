import { useMutation, useQuery } from '@tanstack/react-query';

import { getTokens } from '@shared/api';

import { createUsersMutationFn, updateUserMutationFn } from './mutations';
import { currentUserQueryFn, userQueryFn } from './queries';
import { CURRENT_USER_QUERY_KEYS } from './queryKeys';

import type { UserQueryKeys } from './queryKeys';
import type {
  CreateUserPayload,
  SaveUserError,
  UpdateUserPayload,
  UserModel,
} from './types';
import type { CommonApiError } from '@shared/helpers';
import type {
  DefaultError,
  UseMutationOptions,
  UseQueryOptions,
} from '@tanstack/react-query';

const isCurrentUserQueryEnabled = () => Boolean(getTokens()?.refresh);

export const useUser = (
  options: UseQueryOptions<UserModel, CommonApiError, UserModel, UserQueryKeys>,
) =>
  useQuery({
    ...options,
    queryFn: userQueryFn,
  });

export const useCurrentUser = () =>
  useQuery<UserModel, DefaultError, UserModel, string[]>({
    queryFn: currentUserQueryFn,
    enabled: isCurrentUserQueryEnabled,
    queryKey: CURRENT_USER_QUERY_KEYS,
    retryOnMount: false,
    retry: false,
  });

export const useCreateUsers = (
  options?: UseMutationOptions<
    UserModel[],
    SaveUserError,
    { users: CreateUserPayload[] }
  >,
) =>
  useMutation({
    ...options,
    mutationFn: createUsersMutationFn,
  });

export const useUpdateUser = (
  options?: UseMutationOptions<UserModel, SaveUserError, UpdateUserPayload>,
) =>
  useMutation({
    ...options,
    mutationFn: updateUserMutationFn,
  });
