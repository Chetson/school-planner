import { getDayOfWeekInRange, parseDateWithTime } from '@shared/helpers';

import type { DateRange, DayOfWeek } from '@shared/helpers';

export const getRangeOfCell = (
  time: string,
  day: DayOfWeek,
  range: DateRange,
) => {
  const [hours, minutes] = time.split(':');
  const date = getDayOfWeekInRange(range, day);

  if (!date) return '';

  date.setHours(Number(hours));
  date.setMinutes(Number(minutes));

  return parseDateWithTime(date) ?? '';
};
