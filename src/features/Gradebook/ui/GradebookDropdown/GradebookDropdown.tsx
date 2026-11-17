import clsx from 'clsx';

import { Dropdown } from '@shared/ui';

import { GradebookDropdownItem } from './GradebookDropdownItem';

import type { DropdownItemType, DropdownProps } from '@shared/ui';

export const GradebookDropdown = <Id, Item extends DropdownItemType<Id>>({
  children,
  anchorClassName,
  popoverClassName,
  ...props
}: DropdownProps<Id, Item>) => (
  <Dropdown
    anchorClassName={clsx('w-full h-full', anchorClassName)}
    popoverClassName={clsx('rounded-lg', popoverClassName)}
    itemClassName="px-3"
    DropdownItem={GradebookDropdownItem}
    {...props}
  >
    {children}
  </Dropdown>
);
