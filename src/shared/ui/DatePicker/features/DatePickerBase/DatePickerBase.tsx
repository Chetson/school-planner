import { forwardRef, useCallback } from 'react';

import { composeRefs } from '@radix-ui/react-compose-refs';
import MaskedInput from 'react-text-mask';

import { CalendarIcon } from '@shared/assets';
import { Calendar } from '@shared/ui/Calendar';
import { Input } from '@shared/ui/inputs';
import { PopoverTrigger } from '@shared/ui/Popover';

import type { DatePickerInputProps } from '../../lib';
import type { DateRange } from '@shared/helpers';
import type { ChangeEvent, ForwardRefRenderFunction } from 'react';

type SelectProps =
  | {
      mode: 'single';
      selected?: Date;
      onSelect?: (date?: Date) => void;
    }
  | {
      mode: 'range';
      selected?: DateRange;
      onSelect?: (range?: DateRange) => void;
    };

export type DatePickerBaseProps = {
  opened: boolean;
  onOpenChange: (opened: boolean) => void;
  onBlur?: VoidFunction;
  anchorClassName?: string;
  onChangeText: (value: string) => void;
  text: string;
  mask: (string | RegExp)[];
  initialCalendarDate?: Date | null;
} & SelectProps &
  DatePickerInputProps;

const DatePickerBase: ForwardRefRenderFunction<
  HTMLInputElement,
  DatePickerBaseProps
> = (
  {
    disabled,
    anchorClassName = 'w-full',
    text,
    opened,
    onBlur: onBlurExternal,
    onOpenChange,
    onChangeText,
    mode,
    selected,
    mask,
    initialCalendarDate,
    onSelect,
    ...props
  },
  externalRef,
) => {
  const handleOpenChange = useCallback(
    (opened: boolean) => {
      if (disabled) return;

      if (!opened) {
        onBlurExternal?.();
      }
      onOpenChange(opened);
    },
    [onBlurExternal, onOpenChange, disabled],
  );

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      onChangeText(event.target.value);
    },
    [onChangeText],
  );

  return (
    <Calendar
      onOpenChange={handleOpenChange}
      isOpened={opened}
      required={false}
      anchorClassName={anchorClassName}
      initialCalendarDate={initialCalendarDate}
      {...({ mode, selected, onSelect } as SelectProps)}
    >
      <MaskedInput
        mask={mask}
        value={text}
        guide={false}
        onBlur={onBlurExternal}
        onChange={handleChange}
        render={(maskRef, { defaultValue, onBlur, onChange }) => (
          <Input
            {...props}
            value={text}
            ref={(element) => {
              element && composeRefs(maskRef, externalRef)(element);
            }}
            disabled={disabled}
            defaultValue={defaultValue}
            onChange={onChange}
            onBlur={onBlur}
            leftElement={
              disabled ? (
                <CalendarIcon />
              ) : (
                <PopoverTrigger asChild className="cursor-pointer">
                  <CalendarIcon />
                </PopoverTrigger>
              )
            }
          />
        )}
      />
    </Calendar>
  );
};

export default forwardRef(DatePickerBase);
