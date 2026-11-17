import { useCallback, useMemo } from 'react';

import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

import { QUARTER_QUERY_KEY } from '@entities/settings';
import { quartersQueryFn } from '@entities/settings/queries';
import { isDateWithinRange, useQueryParams } from '@shared/helpers';

import type { QuarterModel } from '@entities/settings';
import type { DateRange } from '@shared/helpers';

const schema = z.object({
  quarter: z
    .array(z.string())
    .optional()
    .transform((value) => value && Number(value[0])),
});

export const useQuarterFilter = () => {
  const {
    queryParams: { quarter: quarterNumber },
    setQueryParams,
    removeQueryParams,
  } = useQueryParams(schema);

  const { data, isLoading } = useQuery({
    staleTime: Infinity,
    queryKey: [QUARTER_QUERY_KEY],
    queryFn: quartersQueryFn,
  });

  const quarter = useMemo(() => {
    let quarter = data?.results.find((q) => q.number === quarterNumber);

    if (!quarter) {
      quarter = data?.results.find((q) =>
        isDateWithinRange({
          from: new Date(q.dateStart),
          to: new Date(q.dateEnd),
        }),
      );
    }

    return quarter ?? null;
  }, [data, quarterNumber]);

  const setQuarter = useCallback(
    (quarter: QuarterModel | null) =>
      quarter
        ? setQueryParams({ quarter: String(quarter.number) })
        : removeQueryParams('quarter'),
    [removeQueryParams, setQueryParams],
  );

  const quarterRange = useMemo<DateRange | null>(() => {
    if (!quarter) return null;

    return {
      from: new Date(quarter.dateStart),
      to: new Date(quarter.dateEnd),
    };
  }, [quarter]);

  return {
    data,
    quarter,
    setQuarter,
    quarterRange,
    isLoading,
  };
};
