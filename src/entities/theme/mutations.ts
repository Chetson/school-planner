import { api, apiUrls, createApiFn } from '@shared/api';

import type { ThemeModel } from '@entities/theme/types';

export const deleteThemeMutationFn = createApiFn<void, ThemeModel>(({ id }) =>
  api.delete(apiUrls.THEMES.THEME(id)),
);
