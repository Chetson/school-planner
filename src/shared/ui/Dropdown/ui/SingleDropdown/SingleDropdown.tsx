import { forwardRef } from 'react';

import { DropdownContent } from '../DropdownContent';

import type { DropdownItemProps } from '../../types';
import type { DropdownItemType } from '../DropdownItem';
import type { ComponentType, Ref } from 'react';
import type { UIEvent } from 'react';

type SingleDropdownProps<Id, Item extends DropdownItemType<Id>> = {
  items: Item[];
  value?: Item | null;
  ref?: Ref<HTMLDivElement>;
  itemClassName?: string;
  DropdownItem?: ComponentType<DropdownItemProps<Id, Item>>;
  onScroll?: (event: UIEvent<HTMLDivElement>) => void;
  onChange?: (id: Item | null) => void;
  close: () => void;
};

const SingleDropdown = <Id, Item extends DropdownItemType<Id>>(
  {
    items,
    value,
    itemClassName,
    onScroll,
    onChange,
    close,
    DropdownItem,
  }: SingleDropdownProps<Id, Item>,
  ref: Ref<HTMLDivElement>,
) => {
  const handleSelectItem = (item: Item) => {
    onChange?.(item.id === value?.id ? null : item);
    close();
  };

  return (
    <DropdownContent
      ref={ref}
      items={items}
      itemClassName={itemClassName}
      DropdownItem={DropdownItem}
      isSelected={(item) => item.id === value?.id}
      onScroll={onScroll}
      onChange={handleSelectItem}
    />
  );
};

export default forwardRef(SingleDropdown) as typeof SingleDropdown;
