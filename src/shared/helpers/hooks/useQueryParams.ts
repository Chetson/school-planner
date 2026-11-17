import { useCallback, useMemo } from 'react';

import { useSearchParams } from 'react-router-dom';

import { removeExistingParams, parseExistingParams } from '../router';

import type { z, ZodRawShape } from 'zod';

type UseQueryParamsData<Qp = Record<string, string[]>> = {
  setQueryParams: (params: Record<string, string | string[]>) => void;
  removeQueryParams: (...keys: string[]) => void;
  queryParams: Qp;
};

/**
 * Обёртка над useSearchParams
 * для добавления, удаления и валидации queryParams
 */
export const useQueryParams = <
  Schema extends z.ZodObject<ZodRawShape> = z.ZodObject<ZodRawShape>,
>(
  schema?: Schema,
): UseQueryParamsData<z.infer<Schema>> => {
  const [searchParams, setSearchParams] = useSearchParams();

  const queryParams = useMemo(
    () => parseExistingParams(searchParams, schema),
    [schema, searchParams],
  );

  const setQueryParams = useCallback(
    (params: Record<string, string | string[]>) => {
      setSearchParams(
        {
          ...queryParams,
          ...params,
        },
        { replace: true },
      );
    },
    [queryParams, setSearchParams],
  );

  const removeQueryParams = useCallback(
    (...keys: string[]) =>
      setQueryParams(removeExistingParams(queryParams, keys)),
    [queryParams, setQueryParams],
  );

  return {
    queryParams,
    setQueryParams,
    removeQueryParams,
  };
};
