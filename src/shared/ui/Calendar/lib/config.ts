import { addYears, endOfYear } from 'date-fns';

export const CALENDAR_MAX_DATE = endOfYear(addYears(new Date(), 5));
