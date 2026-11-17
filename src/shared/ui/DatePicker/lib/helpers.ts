import { startOfDay, parse, isValid } from 'date-fns';

import { getDigitsFromString, parseDateToFrontFormat } from '@shared/helpers';

import type { DateRange } from '@shared/helpers';

export const DATE_INPUT_MASK_DIGITS_LENGTH = 8;

export const parseDateInput = (dateInput: string) => {
  const date = startOfDay(parse(dateInput, 'dd.MM.yyyy', new Date()));

  return isValid(date) ? date : undefined;
};

export const getDateValueFromString = (value?: string) => {
  if (!value) return;

  const digits = getDigitsFromString(value);

  if (digits.length !== DATE_INPUT_MASK_DIGITS_LENGTH) {
    return;
  }

  const date = parseDateInput(value);

  return date;
};

export const getValueStringFromDate = (date?: Date | null) =>
  parseDateToFrontFormat(date) ?? '';

export const getValueStringFromRange = (range?: DateRange | null) => {
  if (!(range?.from && range.to)) {
    return '';
  }

  return `${parseDateToFrontFormat(range.from)}-${parseDateToFrontFormat(range.to)}`;
};

export const parseDateRange = (dateRangeStr: string) => {
  const [fromStr, toStr] = dateRangeStr.split('-');

  if (!fromStr && !toStr) {
    return;
  }

  const fromDate = parse(fromStr, 'dd.MM.yyyy', new Date());

  let toDate: Date | undefined;
  if (toStr) {
    toDate = parse(toStr, 'dd.MM.yyyy', new Date());
  }

  if (!isValid(fromDate) || !isValid(toDate)) return;

  return {
    from: fromDate,
    to: toDate,
  };
};
