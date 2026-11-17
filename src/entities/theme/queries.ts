import { api, apiUrls, createApiFn } from '@shared/api';

import type { ThemeQueryKeys, ThemesQueryKeys } from './queryKeys';
import type { ThemeModel, ThemesModel } from './types';

export const themeQueryFn = createApiFn<ThemeModel, ThemeQueryKeys>(
  ({ queryKey, signal }) => {
    const id = queryKey[1];

    return api.get(apiUrls.THEMES.THEME(id), { signal });
  },
);

export const themesQueryFn = createApiFn<ThemesModel, ThemesQueryKeys, number>(
  ({ signal, queryKey, pageParam }) => {
    const { subjectId, classId } = queryKey[1];

    return api.get(apiUrls.THEMES.LIST(classId, subjectId, pageParam), {
      signal,
    });
  },
);
