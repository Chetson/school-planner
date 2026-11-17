import { forwardRef, memo, useCallback, useEffect, useState } from 'react';

import { getValueStringFromRange, parseDateRange, RANGE_MASK } from '../../lib';
import { DatePickerBase } from '../DatePickerBase';

import type { DatePickerInputProps } from '../../lib';
import type { DateRange } from '@shared/helpers';
import type { ForwardRefRenderFunction } from 'react';

export type DatePickerRangeProps = {
  value?: DateRange | null;
  anchorClassName?: string;
  onChange?: (range?: DateRange) => void;
  onBlur?: VoidFunction;
} & DatePickerInputProps;

const DatePickerRange: ForwardRefRenderFunction<
  HTMLInputElement,
  DatePickerRangeProps
> = ({ value, onChange, onBlur, ...props }, ref) => {
  const [opened, setOpened] = useState(false);
  const [valueStr, setValueStr] = useState(() =>
    getValueStringFromRange(value),
  );

  const handleOpenChange = useCallback(
    (opened: boolean) => {
      if (!opened) {
        onBlur?.();
      }
      setOpened(opened);
    },
    [onBlur],
  );

  const handleBlur = useCallback(() => {
    const range = parseDateRange(valueStr);

    onChange?.(range);

    if (!range) {
      setValueStr('');
    }

    onBlur?.();
  }, [onChange, onBlur, valueStr]);

  useEffect(() => {
    setValueStr(getValueStringFromRange(value));
  }, [value]);

  return (
    <DatePickerBase
      ref={ref}
      onOpenChange={handleOpenChange}
      onChangeText={setValueStr}
      mask={RANGE_MASK}
      text={valueStr}
      opened={opened}
      mode="range"
      selected={value ?? undefined}
      initialCalendarDate={value?.from}
      onSelect={onChange}
      onBlur={handleBlur}
      {...props}
    />
  );
};

export default memo(forwardRef(DatePickerRange));
