import { add } from 'date-fns';

import { getWeekRange } from '@shared/helpers';

import { ShiftButton } from './ShiftButton';
import { useSchedule } from '../../lib';

import type { FC } from 'react';

export const ShiftPeriodCell: FC = () => {
  const { onChangeRange, range } = useSchedule();

  const handleShiftDate = (shift: number) => {
    if (range.from) {
      onChangeRange(getWeekRange(add(range.from, { weeks: shift })));
    }
  };

  return (
    <div className="flex justify-end gap-[1px] p-0.5 relative z-[100]">
      <ShiftButton
        onClick={() => handleShiftDate(-1)}
        className="rounded-l-md"
        iconClassName="rotate-90"
      />
      <ShiftButton
        onClick={() => handleShiftDate(1)}
        className="rounded-r-md"
        iconClassName="rotate-[270deg]"
      />
    </div>
  );
};
