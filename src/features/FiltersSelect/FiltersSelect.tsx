import { memo, useState } from 'react';

import { IconKind } from '@shared/helpers';
import { Button, Typography, Dropdown } from '@shared/ui';
import { SwitchIcon } from '@shared/ui/SwitchIcon';

import type { DropdownItemType } from '@shared/ui';

interface FiltersSelectProps<Id, Item extends DropdownItemType<Id>> {
  title: string;
  value: Item[];
  options: Item[];
  onChange: (items: Item[]) => void;
}

const FiltersSelect = <Id, Item extends DropdownItemType<Id>>({
  onChange,
  title,
  value,
  options,
}: FiltersSelectProps<Id, Item>) => {
  const [opened, setOpened] = useState(false);

  return (
    <Dropdown
      onOpenChange={setOpened}
      onChange={onChange}
      value={value}
      isMultiselect
      withReset
      resetText="Все"
      isAutoWidth={false}
      popoverClassName="w-81"
      items={options}
    >
      <Dropdown.Trigger asChild>
        <Button
          className="relative"
          isFullSize={false}
          variant="blank"
          leftElement={IconKind.CONFIGURE}
          rightElement={<SwitchIcon opened={opened} />}
        >
          {value.length ? (
            <div className="w-2 h-2 absolute top-2.5 right-2.5 bg-stroke-critical rounded-[50%]" />
          ) : null}
          <Typography variant="regular3" color="secondary">
            {title}
          </Typography>
        </Button>
      </Dropdown.Trigger>
    </Dropdown>
  );
};

export default memo(FiltersSelect) as typeof FiltersSelect;
