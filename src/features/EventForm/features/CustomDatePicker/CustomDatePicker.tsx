import { useMemo } from 'react';

import { useWatch } from 'react-hook-form';

import { EventPeriod } from '@entities/event';
import { DatePicker } from '@shared/ui';

import type { DatePickerSelectProps } from '@shared/ui';
import type { FC } from 'react';
import type { DateRange } from 'react-day-picker';

export const CustomDatePicker: FC<{
  value?: DateRange;
  onChange: (range?: DateRange) => void;
}> = ({ value, onChange, ...props }) => {
  const isUnique = useWatch({ name: 'period' }) === EventPeriod.UNIQUE;

  const datePickerProps = useMemo<DatePickerSelectProps>(() => {
    if (isUnique) {
      return {
        value: value?.from,
        onChange: (date?: Date) => onChange({ from: date, to: date }),
        mode: 'single',
        label: 'Дата',
      };
    } else {
      return {
        value,
        onChange,
        mode: 'range',
        label: 'Период',
      };
    }
  }, [value, onChange, isUnique]);

  return (
    <DatePicker {...datePickerProps} {...props} anchorClassName="flex-1" />
  );
};
