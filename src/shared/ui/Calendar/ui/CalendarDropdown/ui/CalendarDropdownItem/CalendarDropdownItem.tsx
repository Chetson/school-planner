import clsx from 'clsx';

import { DropdownItem } from '@shared/ui/Dropdown';

import type { CalendarOption } from '@shared/ui/Calendar';
import type { DropdownItemProps } from '@shared/ui/Dropdown';
import type { FC } from 'react';

export const CalendarDropdownItem: FC<
  DropdownItemProps<number, CalendarOption>
> = ({ isSelected, ...props }) => (
  <DropdownItem
    {...props}
    className={clsx(
      isSelected && '!bg-decorative-beige',
      'capitalize !px-3 !py-1 h-auto',
    )}
  />
);
