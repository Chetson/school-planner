import { useMutation, useQuery } from '@tanstack/react-query';

import {
  createSubjectMutationFn,
  deleteSubjectMutationFn,
  updateSubjectMutationFn,
} from './mutations';
import { subjectQueryFn } from './queries';

import type { SubjectQueryKeys } from './queryKeys';
import type {
  CreateSubjectPayload,
  SaveSubjectError,
  SubjectModel,
  UpdateSubjectPayload,
} from './types';
import type { CommonApiError } from '@shared/helpers';
import type {
  UseMutationOptions,
  UseQueryOptions,
} from '@tanstack/react-query';

export const useCreateSubject = (
  options?: UseMutationOptions<
    SubjectModel,
    SaveSubjectError,
    CreateSubjectPayload
  >,
) =>
  useMutation({
    ...options,
    mutationFn: createSubjectMutationFn,
  });

export const useDeleteSubject = (
  options?: UseMutationOptions<void, CommonApiError, { id: number }>,
) =>
  useMutation({
    ...options,
    mutationFn: deleteSubjectMutationFn,
  });

export const useSubject = (
  options: UseQueryOptions<
    SubjectModel,
    CommonApiError,
    SubjectModel,
    SubjectQueryKeys
  >,
) =>
  useQuery({
    ...options,
    queryFn: subjectQueryFn,
  });

export const useUpdateSubject = (
  options?: UseMutationOptions<
    SubjectModel,
    SaveSubjectError,
    UpdateSubjectPayload
  >,
) =>
  useMutation({
    ...options,
    mutationFn: updateSubjectMutationFn,
  });
