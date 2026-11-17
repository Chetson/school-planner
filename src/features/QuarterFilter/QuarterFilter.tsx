import { memo } from 'react';

import { QUARTER_QUERY_KEYS } from '@entities/settings';
import { quartersQueryFn } from '@entities/settings/queries';
import { FilterRemote } from '@features/FilterRemote';
import {
  normalize,
  quarterStringDecorator,
  useQuarterFilter,
} from '@features/QuarterFilter/lib';

const QuarterFilter = () => {
  const { quarter, setQuarter } = useQuarterFilter();

  return (
    <FilterRemote
      queryKey={QUARTER_QUERY_KEYS}
      queryFn={quartersQueryFn}
      value={quarter}
      onChange={setQuarter}
      normalize={normalize}
    >
      {quarter ? quarterStringDecorator(quarter.number) : 'Четверть'}
    </FilterRemote>
  );
};

export default memo(QuarterFilter);
