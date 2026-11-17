import clsx from 'clsx';

import { DropdownItem } from '@shared/ui/Dropdown';

import type { DropdownItemProps, DropdownItemType } from '@shared/ui/Dropdown';

export const GradebookDropdownItem = <Id, Item extends DropdownItemType<Id>>({
  isSelected,
  ...props
}: DropdownItemProps<Id, Item>) => (
  <DropdownItem
    {...props}
    className={clsx(isSelected && '!bg-decorative-beige', '!px-3 !py-1 h-auto')}
  />
);
