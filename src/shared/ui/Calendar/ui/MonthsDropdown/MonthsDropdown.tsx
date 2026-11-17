import { memo } from 'react';

import { getMonth } from 'date-fns';
import { useDayPicker } from 'react-day-picker';

import { getNormalizedOptions } from '../../lib';
import { CalendarSwitchMonths } from '../CalendarSwitchMonths';

import type { DropdownProps } from 'react-day-picker';

const MonthsDropdown = (props: DropdownProps) => {
  const { months, goToMonth } = useDayPicker();
  const [currentMonth] = months;

  const currentMonthNum = getMonth(currentMonth.date);

  const options = getNormalizedOptions(props.options);

  const value = options?.find((it) => it.id === currentMonthNum);

  const handleMonthChange = (date: Date) => {
    goToMonth(date);
  };

  return <CalendarSwitchMonths value={value} onChange={handleMonthChange} />;
};

export default memo(MonthsDropdown) as typeof MonthsDropdown;
