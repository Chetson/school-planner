import type { ApiList } from '@shared/types';
import type { InfiniteData } from '@tanstack/react-query';

export const getTotalOfList = (list?: InfiniteData<ApiList, unknown>) =>
  list?.pages.at(-1)?.count ?? 0;
