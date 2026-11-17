import clsx from 'clsx';
import { getDate } from 'date-fns';

import { getDateProperties, useSchedule } from '@features/Schedule/lib';
import { DAYS_OF_WEEK_MAP, getDayOfWeekInRange } from '@shared/helpers';

import type { DayOfWeek } from '@shared/helpers';
import type { FC } from 'react';

export interface DayOfWeekHeaderProps {
  className?: string;
  day: DayOfWeek;
}

export const DayOfWeekHeader: FC<DayOfWeekHeaderProps> = ({
  className,
  day,
}) => {
  const { range } = useSchedule();

  const date = getDayOfWeekInRange(range, day);

  if (!date) {
    return null;
  }

  const { isPast, isToday, isFuture, isWeekend } = getDateProperties(date);

  return (
    <div
      className={clsx(
        className,
        isPast && 'text-text-secondary',
        isFuture && 'text-text-default',
        isToday && 'bg-decorative-blue border-l-1 border-l-white',
        isToday &&
          !isWeekend &&
          '!text-text-default-inverted bg-decorative-blue',
        isWeekend && '!text-decorative-orange',
        'px-2 h-full flex items-center min-w-35',
      )}
    >
      {`${getDate(date)}, ${DAYS_OF_WEEK_MAP[day]}`}
    </div>
  );
};
