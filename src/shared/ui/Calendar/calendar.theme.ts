import clsx from 'clsx';

import styles from './calendar.module.css';

import type { ClassNames } from 'react-day-picker';

export const calendarTheme: Partial<ClassNames> = {
  months: 'flex flex-col sm:flex-row space-y-4 sm:space-y-0',
  caption_label: 'invisible text-xs capitalize',
  dropdowns: 'flex',
  weekdays: 'flex capitalize',
  weekday: 'text-text-secondary rounded w-7.5 font-normal text-xs',
  week: 'flex w-full mt-2',
  day: 'h-6 w-7.5 text-xs p-0 relative focus-within:z-20',
  day_button:
    'flex items-center justify-center h-6 w-7.5 p-0 font-normal aria-value:opacity-100 cursor-pointer',
  outside: 'day-outside text-text-disable aria-value:opacity-30',
  range_start: clsx(
    styles['selected-day'],
    'bg-gradient-to-l from-decorative-beige',
  ),
  range_end: clsx(
    styles['selected-day'],
    'bg-gradient-to-r from-decorative-beige',
  ),
  range_middle: clsx(
    styles['range-middle'],
    'bg-decorative-beige text-text-default rounded-none',
  ),
  selected: clsx(styles['selected-day']),
};
