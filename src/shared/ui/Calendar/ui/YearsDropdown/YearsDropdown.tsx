import { memo, useMemo } from 'react';

import { getYear, setYear } from 'date-fns';
import { useDayPicker } from 'react-day-picker';

import { getNormalizedOptions } from '../../lib';
import { CalendarDropdown } from '../CalendarDropdown';

import type { CalendarOption } from '../../lib';
import type { DropdownProps } from 'react-day-picker';

const YearsDropdown = (props: DropdownProps) => {
  const { months, goToMonth } = useDayPicker();
  const [currentMonth] = months;
  const currentYear = getYear(currentMonth.date);

  const options = useMemo(
    () =>
      getNormalizedOptions(props.options).sort(
        (item1, item2) => item2.value - item1.value,
      ),
    [props.options],
  );

  const value = useMemo(
    () => options.find((it) => it.id === currentYear),
    [currentYear, options],
  );

  const handleYearChange = (item: CalendarOption | null) => {
    if (item?.value) {
      goToMonth(setYear(currentMonth.date, item.value));
    }
  };

  return (
    <CalendarDropdown
      items={options}
      value={value}
      onChange={handleYearChange}
    />
  );
};

export default memo(YearsDropdown) as typeof YearsDropdown;
