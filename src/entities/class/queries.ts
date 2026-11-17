import { api, apiUrls, createApiFn } from '@shared/api';
import { createSortingString } from '@shared/helpers';

import type { ClassesListQueryKeys, ClassQueryKeys } from './queryKeys';
import type { ClassesListModel, ClassModel } from './types';

export const classesQueryFn = createApiFn<
  ClassesListModel,
  ClassesListQueryKeys,
  number
>(({ queryKey, signal, pageParam }) => {
  const { search, sortId, sortDir } = queryKey[1];

  const sortStr = createSortingString(sortId, sortDir);

  return api.get(apiUrls.CLASSES.LIST(search, sortStr, pageParam), {
    signal,
  });
});

export const classQueryFn = createApiFn<ClassModel, ClassQueryKeys>(
  ({ queryKey, signal }) => {
    const id = queryKey[1];

    return api.get(apiUrls.CLASSES.CLASS(id), { signal });
  },
);
