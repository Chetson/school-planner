import { forwardRef } from 'react';

import { DropdownItem as DropdownItemCommon } from '../DropdownItem';

import type { DropdownItemProps } from '../../types';
import type { DropdownItemType } from '../DropdownItem';
import type { UIEvent, Ref, ComponentType } from 'react';

type DropdownContentProps<Id, Item extends DropdownItemType<Id>> = {
  onChange?: (item: Item) => void;
  onScroll?: (event: UIEvent<HTMLDivElement>) => void;
  isSelected: (item: Item) => boolean;
  itemClassName?: string;
  items: Item[];
  ref?: Ref<HTMLDivElement>;
  DropdownItem?: ComponentType<DropdownItemProps<Id, Item>>;
};

const DropdownContent = <Id, Item extends DropdownItemType<Id>>(
  {
    onChange,
    isSelected,
    onScroll,
    items,
    itemClassName,
    DropdownItem = DropdownItemCommon,
  }: DropdownContentProps<Id, Item>,
  ref: Ref<HTMLDivElement>,
) => (
  <div ref={ref} onScroll={onScroll} className="max-h-56 overflow-auto">
    {items.map((item) => (
      <DropdownItem
        key={String(item.id)}
        className={itemClassName}
        onChange={onChange}
        isSelected={isSelected(item)}
        item={item}
      />
    ))}
  </div>
);

export default forwardRef(DropdownContent) as typeof DropdownContent;
