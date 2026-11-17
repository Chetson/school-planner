import type { ApiList } from '@shared/types';
import type { InfiniteData } from '@tanstack/react-query';

export const flatMapInfiniteData = <
  Model extends object,
  List extends ApiList<Model> = ApiList<Model>,
>(
  data?: InfiniteData<List, number>,
) => (data?.pages || []).flatMap((page) => page.results);
