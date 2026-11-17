import { api, apiUrls, createApiFn } from '@shared/api';
import { createSortingString } from '@shared/helpers';

import type { SubjectListQueryKeys, SubjectQueryKeys } from './queryKeys';
import type { SubjectListModel, SubjectModel } from './types';

export const subjectsQueryFn = createApiFn<
  SubjectListModel,
  SubjectListQueryKeys,
  number
>(({ queryKey, signal, pageParam }) => {
  const { sortId, sortDir, name } = queryKey[1];
  const sortStr = createSortingString(sortId, sortDir);

  return api.get(apiUrls.SUBJECTS.LIST(sortStr, name, pageParam), {
    signal,
  });
});

export const subjectQueryFn = createApiFn<SubjectModel, SubjectQueryKeys>(
  ({ queryKey, signal }) => {
    const id = queryKey[1];

    return api.get(apiUrls.SUBJECTS.SUBJECT(id), { signal });
  },
);
