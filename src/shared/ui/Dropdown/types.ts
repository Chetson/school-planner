import type { DropdownItemType } from './ui';
import type { PopoverProps } from '../Popover';
import type { ComponentType, PropsWithChildren, UIEvent } from 'react';

export type DropdownItemProps<Id, Item extends DropdownItemType<Id>> = {
  onChange?: (item: Item) => void;
  isSelected?: boolean;
  className?: string;
  item: Item;
};

export type MultiselectDropdownProps<Id, Item extends DropdownItemType<Id>> =
  | {
      isMultiselect: true;
      value?: Item[];
      onChange?: (items: Item[]) => void;
      withReset?: boolean;
      resetText?: string;
    }
  | {
      isMultiselect?: false;
      value?: Item | null;
      onChange?: (items: Item | null) => void;
    };

export type SearchDropdownProps = {
  withSearch?: boolean;
  searchText?: string;
  isSearchLoading?: boolean;
  onSearch?: (value: string) => void;
};

export type DropdownProps<Id, Item extends DropdownItemType<Id>> = {
  className?: string;
  itemClassName?: string;
  items?: Item[];
  setRef?: (element: HTMLDivElement | null) => void;
  onScroll?: (event: UIEvent<HTMLDivElement>) => void;
  DropdownItem?: ComponentType<DropdownItemProps<Id, Item>>;
} & MultiselectDropdownProps<Id, Item> &
  SearchDropdownProps &
  PropsWithChildren &
  PopoverProps;
