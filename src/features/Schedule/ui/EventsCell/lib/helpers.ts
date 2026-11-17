import { isValid } from 'date-fns';

import { applyTimeToDate, getDayOfWeekInRange } from '@shared/helpers';

import type { TimeslotInfoModel } from '@entities/settings';
import type {
  DateRange,
  DayOfWeek,
  NonNullableDateRange,
} from '@shared/helpers';

export const getRangeOfCell = (
  row: TimeslotInfoModel,
  day: DayOfWeek,
  range: DateRange,
): NonNullableDateRange | null => {
  const date = getDayOfWeekInRange(range, day);

  if (!date) {
    return null;
  }

  const from = applyTimeToDate(row.startTime, date);
  const to = applyTimeToDate(row.endTime, date);

  if (!(isValid(from) && isValid(to))) {
    return null;
  }

  return { to, from };
};
