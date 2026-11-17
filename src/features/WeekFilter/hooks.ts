import { useCallback, useMemo } from 'react';

import { isValid } from 'date-fns';
import { z } from 'zod';

import {
  getWeekRange,
  parseDateToServerFormat,
  useQueryParams,
} from '@shared/helpers';

import type { DateRange } from '@shared/helpers';

const schema = z.object({
  date: z
    .array(z.string())
    .optional()
    .transform((value) => {
      if (!value) return new Date();

      const date = new Date(value[0]);

      return isValid(date) ? date : new Date();
    }),
});

export const useWeekFilter = () => {
  const {
    queryParams: { date },
    setQueryParams,
  } = useQueryParams(schema);

  const setWeek = useCallback(
    (range: DateRange) =>
      setQueryParams({ date: parseDateToServerFormat(range.from) ?? '' }),
    [setQueryParams],
  );

  const week = useMemo<DateRange>(() => getWeekRange(date), [date]);

  return { week, setWeek };
};
