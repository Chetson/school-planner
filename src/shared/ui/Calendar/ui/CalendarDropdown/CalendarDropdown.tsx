import { useState } from 'react';

import clsx from 'clsx';

import { SwitchIcon, Typography } from '@shared/ui';
import { Button } from '@shared/ui/Button';
import { Dropdown } from '@shared/ui/Dropdown';

import { CalendarDropdownItem } from './ui/CalendarDropdownItem';

import type { CalendarOption } from '../../lib';
import type { FC } from 'react';

export interface CalendarDropdownProps {
  value?: CalendarOption;
  items?: CalendarOption[];
  onChange?: (item: CalendarOption | null) => void;
}

export const CalendarDropdown: FC<CalendarDropdownProps> = ({
  items,
  value,
  onChange,
}) => {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <Dropdown
      isMultiselect={false}
      items={items}
      value={value}
      onOpenChange={setIsOpened}
      onChange={onChange}
      popoverClassName="rounded-lg"
      itemClassName="px-3"
      DropdownItem={CalendarDropdownItem}
    >
      <Dropdown.Trigger asChild>
        <Button
          variant="blank"
          className="flex px-1 py-3 justify-center"
          rightElement={
            <SwitchIcon
              className={clsx(
                isOpened && 'rotate-[180deg]',
                'text-decorative-gray-blue',
              )}
            />
          }
        >
          <div className="min-w-8">
            <Typography
              variant="regular3"
              className="truncate w-full text-left capitalize"
            >
              {value?.title}
            </Typography>
          </div>
        </Button>
      </Dropdown.Trigger>
    </Dropdown>
  );
};
