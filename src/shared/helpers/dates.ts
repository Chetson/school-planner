import {
  format,
  startOfWeek,
  endOfWeek,
  addDays,
  isWithinInterval,
  set,
  parse,
  isValid,
} from 'date-fns';

export type DateRange = {
  from: Date | undefined;
  to?: Date;
};

export type NonNullableDateRange = Required<{
  [key in keyof DateRange]: NonNullable<DateRange[key]>;
}>;

export enum DayOfWeek {
  MONDAY,
  TUESDAY,
  WEDNESDAY,
  THURSDAY,
  FRIDAY,
  SATURDAY,
  SUNDAY,
}

export const DAYS_OF_WEEK_MAP: Record<DayOfWeek, string> = {
  [DayOfWeek.MONDAY]: 'Пн',
  [DayOfWeek.TUESDAY]: 'Вт',
  [DayOfWeek.WEDNESDAY]: 'Ср',
  [DayOfWeek.THURSDAY]: 'Чт',
  [DayOfWeek.FRIDAY]: 'Пт',
  [DayOfWeek.SATURDAY]: 'Сб',
  [DayOfWeek.SUNDAY]: 'Вс',
};

export const DAYS_OF_WEEK_FULL_MAP: Record<DayOfWeek, string> = {
  [DayOfWeek.MONDAY]: 'Понедельник',
  [DayOfWeek.TUESDAY]: 'Вторник',
  [DayOfWeek.WEDNESDAY]: 'Среда',
  [DayOfWeek.THURSDAY]: 'Четверг',
  [DayOfWeek.FRIDAY]: 'Пятница',
  [DayOfWeek.SATURDAY]: 'Суббота',
  [DayOfWeek.SUNDAY]: 'Воскресенье',
};

export const getDayOfWeekInRange = (
  range: DateRange,
  day: DayOfWeek,
): Date | null => {
  const { from, to } = range;

  if (!(from && to)) {
    return null;
  }

  const weekStart = startOfWeek(from, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(to, { weekStartsOn: 1 });

  const targetDate = addDays(weekStart, day);

  if (isWithinInterval(targetDate, { start: weekStart, end: weekEnd })) {
    return targetDate;
  }

  return null;
};

export const isDateWithinRange = (range: DateRange, date = new Date()) => {
  if (!(range.from && range.to)) {
    return false;
  }

  return isWithinInterval(date, { start: range.from, end: range.to });
};

export const applyTimeToDate = (time: string, date = new Date()) => {
  const [hours, minutes] = time.split(':');

  return set(date, { hours: Number(hours), minutes: Number(minutes) });
};

export const getWeekRange = (date: Date): DateRange => ({
  from: startOfWeek(date, { weekStartsOn: 1 }),
  to: endOfWeek(date, { weekStartsOn: 1 }),
});

export const getTimeslotRange = (startTime: string, endTime: string) =>
  `${parseTimeToFrontFormat(startTime)} - ${parseTimeToFrontFormat(endTime)}`;

export const parseTimeToFrontFormat = (time: string) =>
  format(applyTimeToDate(time), 'H:mm');

export const parseDateToFrontFormat = (date?: Date | string | null) => {
  if (typeof date === 'string') {
    const parsedDate = parse(String(date), 'yyyy-MM-dd', new Date());

    return isValid(parsedDate) ? format(parsedDate, 'dd.MM.yyyy') : undefined;
  }

  return date ? format(date, 'dd.MM.yyyy') : undefined;
};

export const parseDateToServerFormat = (date?: Date | null) =>
  date ? format(date, 'yyyy-MM-dd') : undefined;
export const parseDateWithTime = (date?: Date | null) =>
  date ? format(date, "yyyy-MM-dd'T'HH:mm") : undefined;

export const parseDateWithTimeZone = (date?: Date | null) =>
  date ? format(date, "yyyy-MM-dd'T'HH:mmxxxxx") : undefined;

export const convertToCurrentTimeZone = (timeWithOffset: string) => {
  const match = timeWithOffset.match(/^(\d{2}:\d{2})([+-]\d{4})$/);

  if (!match) {
    return timeWithOffset;
  }

  const time = match[1];
  const offset = match[2];

  const isoTime = `1970-01-01T${time}${offset}`;

  const date = new Date(isoTime);

  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const formatter = new Intl.DateTimeFormat('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone,
  });

  return formatter.format(date);
};
