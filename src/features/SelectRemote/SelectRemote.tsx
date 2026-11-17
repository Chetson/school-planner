import { forwardRef, useCallback, useMemo, useState } from 'react';

import { DropdownRemote } from '@features/DropdownRemote';
import { Dropdown, SwitchIcon } from '@shared/ui';
import { SelectInput } from '@shared/ui';

import type { DropdownRemoteProps } from '@features/DropdownRemote';
import type { SelectInputProps } from '@shared/ui';
import type { Ref } from 'react';

export type SelectRemoteProps<
  IdType,
  Model extends object,
  QueryKey extends unknown[],
> = {
  ref?: Ref<HTMLButtonElement>;
  getTitle: (value: Model) => string;
} & SelectInputProps &
  DropdownRemoteProps<IdType, Model, QueryKey>;

const SelectRemote = <IdType, Model extends object, QueryKey extends unknown[]>(
  {
    getTitle,
    anchorClassName = 'w-full',
    ...props
  }: SelectRemoteProps<IdType, Model, QueryKey>,
  ref: Ref<HTMLButtonElement>,
) => {
  const [opened, setOpened] = useState(false);

  const title = useMemo(() => {
    if (!props.value) return '';

    return props.isMultiselect
      ? (props.value || []).map(getTitle).join(', ')
      : getTitle(props.value);
  }, [props.isMultiselect, props.value, getTitle]);

  const handleOpenChange = useCallback(
    (opened: boolean) => {
      if (!props.disabled) {
        setOpened(opened);
      }
    },
    [props.disabled],
  );

  return (
    <DropdownRemote
      {...props}
      onOpenChange={handleOpenChange}
      isOpened={opened}
      anchorClassName={anchorClassName}
    >
      <Dropdown.Trigger ref={ref} className="w-full">
        <SelectInput
          {...props}
          title={title}
          rightElement={<SwitchIcon opened={opened && !props.disabled} />}
        />
      </Dropdown.Trigger>
    </DropdownRemote>
  );
};

export default forwardRef(SelectRemote) as typeof SelectRemote;
