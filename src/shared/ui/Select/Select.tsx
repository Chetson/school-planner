import { forwardRef, useMemo, useState } from 'react';

import { deriveStrValue } from './helpers';
import { Dropdown } from '../Dropdown';
import { SelectInput } from '../inputs';
import { SwitchIcon } from '../SwitchIcon';

import type { DropdownItemType, DropdownProps } from '../Dropdown';
import type { SelectInputProps } from '../inputs';
import type { Ref } from 'react';

export type SelectProps<
  Id = number,
  Item extends DropdownItemType<Id> = DropdownItemType<Id>,
> = {
  ref?: Ref<HTMLInputElement>;
  setDropdownRef?: (element: HTMLDivElement | null) => void;
  onBlur?: VoidFunction;
  text?: string | null;
} & DropdownProps<Id, Item> &
  Omit<SelectInputProps, 'onBlur' | 'rightElement'>;

const Select = <Id, Item extends DropdownItemType<Id>>(
  {
    caption,
    isError,
    isLoading,
    label,
    variant,
    color,
    leftElement,
    inputClassName,
    containerClassName,
    labelClassName,
    name,
    disabled,
    text: externalText,
    anchorClassName = 'w-full',
    setDropdownRef,
    onOpenChange,
    ...props
  }: SelectProps<Id, Item>,
  ref?: Ref<HTMLButtonElement>,
) => {
  const [opened, setOpened] = useState(false);

  const title = useMemo(() => deriveStrValue(props.value), [props.value]);

  const hanldeOpenChange = (opened: boolean) => {
    if (!opened) {
      props.onBlur?.();
    }

    setOpened(opened);
    onOpenChange?.(opened);
  };

  const input = (
    <SelectInput
      inputClassName={inputClassName}
      containerClassName={containerClassName}
      labelClassName={labelClassName}
      title={title}
      caption={caption}
      isError={isError}
      isLoading={isLoading}
      label={label}
      variant={variant}
      color={color}
      disabled={disabled}
      name={name}
      leftElement={leftElement}
      rightElement={<SwitchIcon opened={opened && !disabled} />}
    />
  );

  if (disabled) {
    return input;
  }

  return (
    <Dropdown
      {...props}
      anchorClassName={anchorClassName}
      onOpenChange={hanldeOpenChange}
      setRef={setDropdownRef}
    >
      <Dropdown.Trigger ref={ref} className="w-full">
        {input}
      </Dropdown.Trigger>
    </Dropdown>
  );
};

export default forwardRef(Select) as typeof Select;
