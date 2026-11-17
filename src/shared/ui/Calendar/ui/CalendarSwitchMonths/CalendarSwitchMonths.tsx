import { add } from 'date-fns';
import { useDayPicker } from 'react-day-picker';

import { IconKind } from '@shared/helpers';
import { Icon, Typography } from '@shared/ui';

import type { CalendarOption } from '@shared/ui/Calendar';
import type { FC } from 'react';

export interface CalendarSwitchMonthsProps {
  value?: CalendarOption;
  onChange?: (item: Date) => void;
}

export const CalendarSwitchMonths: FC<CalendarSwitchMonthsProps> = ({
  value,
  onChange,
}) => {
  const { months } = useDayPicker();
  const [currentMonth] = months;

  const handleMonthChange = (count: number) =>
    onChange?.(add(currentMonth.date, { months: count }));

  return (
    <section className="px-1 select-none flex pt-3.5 relative justify-center ">
      <Icon
        kind={IconKind.ARROW_LEFT}
        className="text-decorative-gray-blue hover:cursor-pointer inline pt-0.25"
        onClick={() => handleMonthChange(-1)}
      />

      <Typography
        variant="regular3"
        className="truncate text-center capitalize pt-0.5 w-20"
      >
        {value?.title}
      </Typography>

      <Icon
        kind={IconKind.ARROW_RIGHT}
        className="text-decorative-gray-blue hover:cursor-pointer inline pt-0.25"
        onClick={() => handleMonthChange(1)}
      />
    </section>
  );
};
