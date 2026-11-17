import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';

import { api, apiUrls, createApiFn } from '@shared/api';
import { getNextPageParam } from '@shared/helpers';

import { themeQueryFn, themesQueryFn } from './queries';

import type { ThemeQueryKeys, ThemesQueryKeys } from './queryKeys';
import type {
  CreateThemesPayload,
  DuplicateThemesError,
  DuplicateThemesPayload,
  MoveThemePaylod,
  SaveThemeError,
  ThemeModel,
  UpdateThemePayload,
  UploadedThemes,
  UploadThemesPayload,
} from './types';
import type { CommonApiError } from '@shared/helpers';
import type {
  UseMutationOptions,
  UseQueryOptions,
} from '@tanstack/react-query';

export const useCreateThemes = (
  options?: UseMutationOptions<
    ThemeModel[],
    SaveThemeError,
    CreateThemesPayload
  >,
) =>
  useMutation({
    ...options,
    mutationFn: createApiFn(({ data }) =>
      api.post(apiUrls.THEMES.CREATE, data),
    ),
  });

export const useTheme = (
  options: UseQueryOptions<
    ThemeModel,
    CommonApiError,
    ThemeModel,
    ThemeQueryKeys
  >,
) =>
  useQuery({
    ...options,
    queryFn: themeQueryFn,
  });

export const useThemes = (queryKey: ThemesQueryKeys, enabled: boolean) =>
  useInfiniteQuery({
    queryKey,
    enabled,
    initialPageParam: 0,
    getNextPageParam: getNextPageParam,
    queryFn: themesQueryFn,
  });

export const useUpdateTheme = (
  options?: UseMutationOptions<ThemeModel, SaveThemeError, UpdateThemePayload>,
) =>
  useMutation({
    ...options,
    mutationFn: createApiFn(({ id, data }) =>
      api.patch(apiUrls.THEMES.THEME(id), data),
    ),
  });

export const useUploadThemes = (
  options?: UseMutationOptions<
    UploadedThemes,
    SaveThemeError,
    UploadThemesPayload
  >,
) =>
  useMutation({
    ...options,
    mutationFn: createApiFn(({ subjectId, classId, file }) => {
      const formData = new FormData();
      formData.append('file', file);

      return api.put(
        apiUrls.THEMES.VALIDATE_EXCEL(classId, subjectId),
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        },
      );
    }),
  });

export const useDuplicateThemes = (
  options?: UseMutationOptions<
    DuplicateThemesPayload,
    DuplicateThemesError,
    DuplicateThemesPayload
  >,
) =>
  useMutation({
    ...options,
    mutationFn: createApiFn((payload) =>
      api.post(apiUrls.THEMES.DUPLICATE, payload),
    ),
  });

export const useMoveTheme = (
  options?: UseMutationOptions<object, object, MoveThemePaylod>,
) =>
  useMutation({
    ...options,
    mutationFn: createApiFn(({ themeId, action }) =>
      api.patch(apiUrls.THEMES.MOVE(themeId, action)),
    ),
  });
