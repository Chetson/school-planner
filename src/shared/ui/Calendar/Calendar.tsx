import { memo, useMemo, useState } from 'react';

import clsx from 'clsx';
import { ru } from 'date-fns/locale/ru';
import { DayPicker } from 'react-day-picker';

import { calendarTheme } from './calendar.theme';
import { CALENDAR_MAX_DATE } from './lib';
import { MonthsDropdown } from './ui/MonthsDropdown';
import { YearsDropdown } from './ui/YearsDropdown';
import { Popover } from '../Popover';

import type { PopoverProps } from '../Popover';
import type { FC } from 'react';
import type { DayPickerProps } from 'react-day-picker';

export type CalendarProps = {
  initialCalendarDate?: Date | null;
} & DayPickerProps &
  PopoverProps;

const components: DayPickerProps['components'] = {
  MonthsDropdown,
  YearsDropdown,
};

const Calendar: FC<CalendarProps> = ({
  children,
  isOpened,
  onOpenChange,
  isAutoWidth,
  anchorClassName,
  popoverClassName,
  className,
  classNames,
  initialCalendarDate,
  endMonth,
  ...props
}) => {
  const [currentMonth, setCurrentMonth] = useState<Date>(
    () => initialCalendarDate ?? new Date(),
  );

  const theme = useMemo(
    () => (classNames ? { ...calendarTheme, ...classNames } : calendarTheme),
    [classNames],
  );

  return (
    <Popover
      isOpened={isOpened}
      onOpenChange={onOpenChange}
      anchorClassName={anchorClassName}
      popoverClassName={popoverClassName}
      isAutoWidth={false}
      anchor={children}
    >
      <DayPicker
        hideNavigation
        captionLayout="dropdown"
        month={currentMonth}
        locale={ru}
        endMonth={endMonth ?? CALENDAR_MAX_DATE}
        onMonthChange={setCurrentMonth}
        showOutsideDays
        className={clsx('p-3', className)}
        classNames={theme}
        components={components}
        {...props}
      />
    </Popover>
  );
};

export default memo(Calendar);
