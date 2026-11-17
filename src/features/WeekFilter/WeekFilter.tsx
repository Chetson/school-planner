import { WeekPicker } from '@shared/ui/WeekPicker';

import { useWeekFilter } from './hooks';

import type { FC } from 'react';

export const WeekFilter: FC = () => {
  const { week, setWeek } = useWeekFilter();

  return <WeekPicker value={week} onChange={setWeek} />;
};
