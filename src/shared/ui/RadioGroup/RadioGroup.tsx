import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';

import { IconKind } from '@shared/helpers';
import { ControlCaption } from '@shared/ui';

import { RadioGroupItem } from './ui';
import { ToggleItem } from '../ToggleItem';

import type {
  RadioGroupProps as RadioGroupPrimitiveProps,
  RadioGroupItemProps as RadioGroupPrimitiveItemProps,
} from '@radix-ui/react-radio-group';
import type { MouseEvent } from 'react';

export interface RadioGroupItemType<Id> {
  id: Id;
  label: string;
}

interface RadioGroupProps<
  Id extends string,
  Item extends RadioGroupItemType<Id>,
> extends Omit<RadioGroupPrimitiveProps, 'value' | 'onChange'> {
  isClearable?: boolean;
  itemProps?: RadioGroupPrimitiveItemProps;
  data: Item[];
  isError?: boolean;
  caption?: string;
  value?: Id | null;
  isInline?: boolean;
  onChange?: (value: Id | null) => void;
}

export const RadioGroup = <
  Id extends string,
  Item extends RadioGroupItemType<Id>,
>({
  data,
  isClearable = false,
  itemProps,
  isError = false,
  caption,
  className,
  onChange,
  value,
  isInline = false,
  ...props
}: RadioGroupProps<Id, Item>) => {
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    const currentValue = (e.target as HTMLElement)?.closest('button')
      ?.value as Id;

    if (currentValue === value && isClearable) {
      onChange?.(null);
    } else {
      onChange?.(currentValue);
    }
  };

  return (
    <div className={className}>
      <RadioGroupPrimitive.Root
        value={value ?? ''}
        className={isInline ? 'space-x-4 flex' : 'space-y-4'}
        {...props}
      >
        {data.map((item) => (
          <ToggleItem
            key={String(item.id)}
            label={item?.label}
            Component={RadioGroupItem}
            labelClassName={props.disabled ? '!text-text-disable' : ''}
            componentProps={{
              icon: IconKind.ARROW_CHECKED,
              onClick: handleClick,
              value: String(item.id),
              id: String(item.id),
              ...itemProps,
            }}
          />
        ))}
      </RadioGroupPrimitive.Root>

      <ControlCaption
        text={caption}
        isError={isError}
        isDisabled={props?.disabled}
      />
    </div>
  );
};
