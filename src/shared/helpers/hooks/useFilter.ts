import { useCallback, useMemo } from 'react';

import { z } from 'zod';

import { useQueryParams } from './useQueryParams';
import { safeParseJson } from '../safeParseJson';

export const useFilter = <
  Key extends string,
  Schema extends z.Schema,
  Model extends z.infer<Schema>,
>(
  key: Key,
  schema: Schema,
): [Model | null, (s: Model | null) => void] => {
  const schemaObj = useMemo(
    () =>
      z.object({
        [key]: z
          .array(z.string().transform(safeParseJson).pipe(schema))
          .optional(),
      }),
    [key, schema],
  );

  const { queryParams, setQueryParams, removeQueryParams } =
    useQueryParams(schemaObj);

  const setFilter = useCallback(
    (filter: Model | null) => {
      if (filter) {
        setQueryParams({ [key]: JSON.stringify(filter) });
      } else {
        removeQueryParams(key);
      }
    },
    [setQueryParams, removeQueryParams, key],
  );

  const filter = queryParams[key]?.[0] ?? null;

  return [filter, setFilter];
};
