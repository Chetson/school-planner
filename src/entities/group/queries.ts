import { api, apiUrls, createApiFn } from '@shared/api';
import { createSortingString } from '@shared/helpers';

import type { GroupQueryKeys, GroupsListQueryKeys } from './queryKeys';
import type { GroupModel, GroupsListModel } from './types';
import type { QueryFunction } from '@tanstack/react-query';

export const groupsListQueryFn: QueryFunction<
  GroupsListModel,
  GroupsListQueryKeys,
  number
> = createApiFn(({ queryKey, signal, pageParam }) => {
  const { sortId, sortDir, subjectId, teacherId, classId, search } =
    queryKey[1];

  return api.get(
    apiUrls.GROUPS.LIST({
      subjectId,
      classId,
      teacherId,
      order: createSortingString(sortId, sortDir),
      page: pageParam,
      search,
    }),
    { signal },
  );
});

export const groupQueryFn = createApiFn<GroupModel, GroupQueryKeys>(
  ({ queryKey, signal }) => {
    const id = queryKey[1];

    return api.get(apiUrls.GROUPS.GROUP(id), { signal });
  },
);
