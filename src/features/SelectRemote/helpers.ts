import type { ApiList } from '@shared/types';
import type { DropdownItemType } from '@shared/ui';
import type { InfiniteData } from '@tanstack/react-query';

export const normalizeInfiniteList = <
  IdType,
  Item extends DropdownItemType<IdType>,
  Model extends object,
  ModelList extends ApiList<Model>,
>(
  data: InfiniteData<ModelList, number>,
  normalize: (model: Model) => Item,
) => (data?.pages || []).flatMap((page) => page.results.map(normalize));
