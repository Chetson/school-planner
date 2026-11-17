import { forwardRef, memo } from 'react';

import { DatePickerRange } from './features/DatePickerRange';
import { DatePickerSingle } from './features/DatePickerSingle';

import type { DatePickerInputProps } from './lib';
import type { DateRange } from '@shared/helpers';
import type { ForwardRefRenderFunction } from 'react';

export type DatePickerSelectProps =
  | {
      mode?: 'single';
      value?: Date;
      onChange?: (date?: Date) => void;
    }
  | {
      mode: 'range';
      value?: DateRange;
      onChange?: (range?: DateRange) => void;
    };

export type DatePickerProps = {
  anchorClassName?: string;
} & DatePickerSelectProps &
  DatePickerInputProps;

const DatePicker: ForwardRefRenderFunction<
  HTMLInputElement,
  DatePickerProps
> = (props, ref) =>
  props.mode === 'range' ? (
    <DatePickerRange ref={ref} {...props} />
  ) : (
    <DatePickerSingle ref={ref} {...props} />
  );
export default memo(forwardRef(DatePicker));
