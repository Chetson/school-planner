import { useMutation, useQuery } from '@tanstack/react-query';

import {
  createClassMutationFn,
  updateClassMutationFn,
  deleteClassMutationFn,
} from './mutations';
import { classQueryFn } from './queries';

import type { ClassQueryKeys } from './queryKeys';
import type {
  ClassModel,
  CreateClassPayload,
  SaveClassError,
  UpdateClassPayload,
} from './types';
import type { CommonApiError } from '@shared/helpers';
import type {
  UseMutationOptions,
  UseQueryOptions,
} from '@tanstack/react-query';

export const useUpdateClass = (
  options?: UseMutationOptions<ClassModel, SaveClassError, UpdateClassPayload>,
) =>
  useMutation({
    ...options,
    mutationFn: updateClassMutationFn,
  });

export const useCreateClass = (
  options?: UseMutationOptions<ClassModel, SaveClassError, CreateClassPayload>,
) =>
  useMutation({
    ...options,
    mutationFn: createClassMutationFn,
  });

export const useDeleteClass = (
  options?: UseMutationOptions<void, CommonApiError, { id: number }>,
) =>
  useMutation({
    ...options,
    mutationFn: deleteClassMutationFn,
  });

export const useClass = (
  options: UseQueryOptions<
    ClassModel,
    CommonApiError,
    ClassModel,
    ClassQueryKeys
  >,
) =>
  useQuery({
    ...options,
    queryFn: classQueryFn,
  });
