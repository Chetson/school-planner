import { useMutation, useQuery } from '@tanstack/react-query';

import {
  createRoomMutationFn,
  deleteRoomMutationFn,
  updateRoomMutationFn,
} from './mutations';
import { roomQueryFn } from './queries';

import type { RoomQueryKeys } from './queryKeys';
import type {
  CreateRoomPayload,
  UpdateRoomPayload,
  RoomModel,
  SaveRoomError,
} from './types';
import type { CommonApiError } from '@shared/helpers';
import type {
  UseMutationOptions,
  UseQueryOptions,
} from '@tanstack/react-query';

export const useRoom = (
  options: UseQueryOptions<RoomModel, CommonApiError, RoomModel, RoomQueryKeys>,
) =>
  useQuery({
    ...options,
    queryFn: roomQueryFn,
  });

export const useCreateRoom = (
  options?: UseMutationOptions<RoomModel, SaveRoomError, CreateRoomPayload>,
) =>
  useMutation({
    ...options,
    mutationFn: createRoomMutationFn,
  });

export const useDeleteRoom = (
  options?: UseMutationOptions<void, CommonApiError, { id: number }>,
) =>
  useMutation({
    ...options,
    mutationFn: deleteRoomMutationFn,
  });

export const useUpdateRoom = (
  options?: UseMutationOptions<RoomModel, SaveRoomError, UpdateRoomPayload>,
) =>
  useMutation({
    ...options,
    mutationFn: updateRoomMutationFn,
  });
