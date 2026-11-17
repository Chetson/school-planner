import { memo, useMemo, useRef } from 'react';

import { useInfiniteQuery } from '@tanstack/react-query';
import { useThrottledCallback } from 'use-debounce';

import {
  getNextPageParam,
  getTotalOfList,
  isFetchNextPageEnabled,
  uniqBy,
  useScrollToTop,
} from '@shared/helpers';
import { Dropdown } from '@shared/ui';

import { getDropdownProps, normalizeInfiniteList } from './lib/helpers';

import type {
  DropdownRemoteItemType,
  MultiselectDropdownRemoteProps,
} from './lib/types';
import type { CommonApiError } from '@shared/helpers';
import type { ApiList } from '@shared/types';
import type { PopoverProps, SearchDropdownProps } from '@shared/ui';
import type { InfiniteData, QueryFunction } from '@tanstack/react-query';
import type { ReactNode, UIEvent } from 'react';

export type DropdownRemotePropsBase<
  IdType,
  Model extends object,
  QueryKey extends unknown[],
  Item extends DropdownRemoteItemType<IdType, Model> = DropdownRemoteItemType<
    IdType,
    Model
  >,
  ModelList extends ApiList<Model> = ApiList<Model>,
> = {
  queryKey: QueryKey;
  normalize: (model: Model) => Item;
  queryFn: QueryFunction<ModelList, QueryKey, number>;
  children?: ReactNode;
};

export type DropdownRemoteProps<
  IdType,
  Model extends object,
  QueryKey extends unknown[],
  Item extends DropdownRemoteItemType<IdType, Model> = DropdownRemoteItemType<
    IdType,
    Model
  >,
  ModelList extends ApiList<Model> = ApiList<Model>,
> = DropdownRemotePropsBase<IdType, Model, QueryKey, Item, ModelList> &
  MultiselectDropdownRemoteProps<Model> &
  SearchDropdownProps &
  PopoverProps;

const DropdownRemote = <
  IdType,
  Model extends object,
  QueryKey extends unknown[],
  Item extends DropdownRemoteItemType<IdType, Model> = DropdownRemoteItemType<
    IdType,
    Model
  >,
  ModelList extends ApiList<Model> = ApiList<Model>,
>({
  queryFn,
  normalize,
  onOpenChange,
  onSearch,
  queryKey,
  children,
  isOpened,
  withSearch,
  searchText,
  isSearchLoading,
  ...props
}: DropdownRemoteProps<IdType, Model, QueryKey, Item, ModelList>) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { data, fetchNextPage, isFetching } = useInfiniteQuery<
    ModelList,
    CommonApiError,
    InfiniteData<ModelList, number>,
    QueryKey,
    number
  >({
    queryKey,
    initialPageParam: 1,
    enabled: isOpened,
    getNextPageParam,
    queryFn,
  });

  const dropdownProps = getDropdownProps<Model, IdType, Item>(props, normalize);

  /**
   * Помещаем выбранные опции первыми в общий список опций
   * для более удобного отображения
   */
  const options = useMemo(() => {
    if (!data) return [];

    const options = normalizeInfiniteList(data, normalize);

    if (!dropdownProps.value || searchText) {
      return options;
    }

    const selectedArray = Array.isArray(dropdownProps.value)
      ? dropdownProps.value
      : [dropdownProps.value];

    return uniqBy([...selectedArray, ...options], ({ id }) => id);
  }, [data, dropdownProps.value, searchText, normalize]);

  const totalFetched = options?.length ?? 0;
  const total = getTotalOfList(data);

  const handleScroll = useThrottledCallback(
    (event: UIEvent<HTMLDivElement>) => {
      if (
        isFetchNextPageEnabled(
          isFetching,
          totalFetched,
          total,
          event.target as HTMLDivElement,
        )
      ) {
        fetchNextPage();
      }
    },
    500,
  );

  const setContainerRef = (element: HTMLDivElement | null) => {
    containerRef.current = element;
  };

  useScrollToTop(containerRef, queryKey);

  return (
    <Dropdown
      {...dropdownProps}
      isOpened={isOpened && Boolean(data)}
      setRef={setContainerRef}
      onOpenChange={onOpenChange}
      onSearch={onSearch}
      withSearch={withSearch}
      searchText={searchText}
      onScroll={handleScroll}
      isSearchLoading={Boolean(searchText) && isFetching}
      items={options}
    >
      {children}
    </Dropdown>
  );
};

export default memo(DropdownRemote) as typeof DropdownRemote;
