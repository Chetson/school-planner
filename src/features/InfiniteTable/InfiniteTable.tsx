import { memo, useCallback, useEffect, useMemo, useRef } from 'react';

import { useInfiniteQuery } from '@tanstack/react-query';
import { useThrottledCallback } from 'use-debounce';

import {
  flatMapInfiniteData,
  getNextPageParam,
  getTotalOfList,
  isFetchNextPageEnabled,
  useScrollToTop,
  useSorting,
} from '@shared/helpers';
import { SortDirection } from '@shared/types';
import { ErrorStub, NotFoundStub, PageSpinner, Table } from '@shared/ui';

import type { CommonApiError } from '@shared/helpers';
import type { ApiList } from '@shared/types';
import type { DataTableProps } from '@shared/ui';
import type { InfiniteData } from '@tanstack/react-query';
import type { QueryFunction } from '@tanstack/react-query';
import type { SortingState, Updater } from '@tanstack/react-table';
import type { UIEvent } from 'react';

type BaseTableProps<Model extends object> = Omit<
  DataTableProps<Model>,
  'data' | 'onSortingChange' | 'onScroll' | 'state' | 'manualSorting'
>;

export interface InfiniteTableProps<
  Model extends object,
  QueryKey extends unknown[],
  ModelList extends ApiList<Model> = ApiList<Model>,
> extends BaseTableProps<Model> {
  isEnabled?: boolean;
  queryKey: QueryKey;
  queryFn: QueryFunction<ModelList, QueryKey, number>;
}

const InfiniteTable = <
  Model extends object,
  QueryKey extends unknown[],
  ModelList extends ApiList<Model> = ApiList<Model>,
>({
  queryKey,
  isEnabled,
  queryFn,
  ...props
}: InfiniteTableProps<Model, QueryKey, ModelList>) => {
  const { sortDir, sortId, setSorting, clearSorting } = useSorting();

  const {
    data,
    isFetching,
    isLoading,
    fetchNextPage,
    isError,
    isFetched,
    refetch,
  } = useInfiniteQuery<
    ModelList,
    CommonApiError,
    InfiniteData<ModelList, number>,
    QueryKey,
    number
  >({
    queryKey,
    enabled: isEnabled,
    initialPageParam: 1,
    refetchOnMount: true,
    structuralSharing: false,
    getNextPageParam,
    queryFn,
  });

  const containerRef = useRef<HTMLDivElement | null>(null);

  const tableData = useMemo<Model[]>(() => flatMapInfiniteData(data), [data]);

  const state = useMemo(() => {
    const sorting = [];

    if (sortId) {
      sorting.push({
        id: sortId,
        desc: sortDir === SortDirection.DESC,
      });
    }

    return { sorting };
  }, [sortId, sortDir]);

  const handleSortingChange = useCallback(
    (sortUpdater: Updater<SortingState>) => {
      const [newSorting] =
        typeof sortUpdater === 'function'
          ? sortUpdater(state.sorting)
          : sortUpdater;

      if (newSorting) {
        setSorting?.(
          newSorting.id,
          newSorting.desc ? SortDirection.DESC : SortDirection.ASC,
        );
      } else {
        clearSorting?.();
      }
    },
    [state.sorting, setSorting, clearSorting],
  );

  const totalDB = getTotalOfList(data);
  const totalFetched = tableData.length ?? 0;

  const fetchNext = (container?: HTMLDivElement | null) => {
    if (isFetchNextPageEnabled(isFetching, totalFetched, totalDB, container)) {
      fetchNextPage();
    }
  };

  const handleScroll = useThrottledCallback(
    (event: UIEvent<HTMLDivElement>) =>
      fetchNext(event.target as HTMLDivElement),
    500,
  );

  /**
   * Запрос следующей страницы на случай,
   * если уже загруженные данные не заполнили
   * всю высоту таблицы.
   */
  useEffect(
    () => fetchNext(containerRef.current),
    [fetchNextPage, isFetching, totalFetched, totalDB],
  );

  useScrollToTop(containerRef, queryKey);

  if (isLoading) {
    return <PageSpinner />;
  }

  if (isError) {
    return <ErrorStub onClick={refetch} />;
  }

  if (tableData.length === 0 && isFetched) {
    return <NotFoundStub />;
  }

  if (tableData.length === 0) {
    return null;
  }

  return (
    <Table
      {...props}
      ref={containerRef}
      onSortingChange={handleSortingChange}
      onScroll={handleScroll}
      state={state}
      manualSorting={true}
      data={tableData}
    />
  );
};

export default memo(InfiniteTable) as typeof InfiniteTable;
