import { forwardRef, memo, useCallback, useEffect, useState } from 'react';

import {
  DATE_MASK,
  getDateValueFromString,
  getValueStringFromDate,
} from '../../lib';
import { DatePickerBase } from '../DatePickerBase';

import type { DatePickerInputProps } from '../../lib';
import type { ForwardRefRenderFunction } from 'react';

export type DatePickerSingleProps = {
  value?: Date | null;
  anchorClassName?: string;
  onChange?: (date?: Date) => void;
  onBlur?: VoidFunction;
} & DatePickerInputProps;

const DatePickerSingle: ForwardRefRenderFunction<
  HTMLInputElement,
  DatePickerSingleProps
> = ({ value, onChange, onBlur, ...props }, ref) => {
  const [opened, setOpened] = useState(false);
  const [valueStr, setValueStr] = useState(() => getValueStringFromDate(value));

  const handleOpenChange = useCallback(
    (opened: boolean) => {
      if (!opened) {
        onBlur?.();
      }
      setOpened(opened);
    },
    [onBlur],
  );

  const handleSelect = useCallback(
    (date?: Date) => {
      onChange?.(date);
      handleOpenChange(false);
    },
    [onChange, handleOpenChange],
  );

  const handleBlur = useCallback(() => {
    const date = getDateValueFromString(valueStr);

    onChange?.(date);

    if (!date) {
      setValueStr('');
    }

    onBlur?.();
  }, [onChange, onBlur, valueStr]);

  useEffect(() => {
    setValueStr(getValueStringFromDate(value));
  }, [value]);

  return (
    <DatePickerBase
      ref={ref}
      onOpenChange={handleOpenChange}
      onChangeText={setValueStr}
      mask={DATE_MASK}
      text={valueStr}
      opened={opened}
      mode="single"
      selected={value ?? undefined}
      onSelect={handleSelect}
      onBlur={handleBlur}
      initialCalendarDate={value}
      {...props}
    />
  );
};

export default memo(forwardRef(DatePickerSingle));
