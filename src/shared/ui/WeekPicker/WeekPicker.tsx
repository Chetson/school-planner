import { useCallback, useMemo, useState } from 'react';

import { getWeekRange, isDateWithinRange, noop } from '@shared/helpers';

import { weekPickerTheme } from './weekPicker.theme';
import { Button } from '../Button';
import { Calendar } from '../Calendar';
import { PopoverTrigger } from '../Popover';
import { SwitchIcon } from '../SwitchIcon';
import { Typography } from '../Typography';

import type { DateRange } from '@shared/helpers';
import type { FC } from 'react';

export interface WeekPickerProps {
  value?: DateRange | null;
  onChange?: (range: DateRange) => void;
}

export const WeekPicker: FC<WeekPickerProps> = ({ value, onChange }) => {
  const [opened, setOpened] = useState(false);

  const handleDayClick = useCallback(
    (day: Date) => {
      if (!value || !isDateWithinRange(value, day)) {
        onChange?.(getWeekRange(day));
      }
    },
    [onChange, value],
  );

  const finalValue = useMemo(
    () => (value?.from ? getWeekRange(value.from) : undefined),
    [value],
  );

  const strValue = useMemo(() => {
    if (!finalValue?.from || !finalValue?.to) return;

    const dateTimeFormat = new Intl.DateTimeFormat('ru-RU', {
      day: 'numeric',
      month: 'long',
    });

    return dateTimeFormat.formatRange(finalValue.from, finalValue.to);
  }, [finalValue]);

  return (
    <Calendar
      isOpened={opened}
      classNames={weekPickerTheme}
      onOpenChange={setOpened}
      selected={finalValue}
      initialCalendarDate={finalValue?.from}
      mode="range"
      required
      onDayClick={handleDayClick}
      onSelect={noop}
    >
      <PopoverTrigger asChild>
        <Button variant="blank" rightElement={<SwitchIcon opened={opened} />}>
          <Typography className="truncate" variant="regular3" color="secondary">
            {strValue ?? 'Выбрать неделю'}
          </Typography>
        </Button>
      </PopoverTrigger>
    </Calendar>
  );
};
