import { useToggle } from '@shared/helpers';
import { Popover, PopoverTrigger } from '@shared/ui';

import { MultipleDropdown, SingleDropdown } from './ui';
import { DropdownSearch } from './ui/DropdownSearch';

import type { DropdownProps } from './types';
import type { DropdownItemType } from './ui';

export const Dropdown = <Id, Item extends DropdownItemType<Id>>({
  children,
  anchorClassName,
  popoverClassName,
  isAutoWidth = true,
  items = [],
  isMultiselect,
  value,
  isOpened,
  onChange,
  onOpenChange,
  setRef,
  ...props
}: DropdownProps<Id, Item>) => {
  const [opened, { setOpened, close }] = useToggle();

  const handleOpenChange = (opened: boolean) => {
    setOpened(opened);
    onOpenChange?.(opened);
  };

  const handleClose = () => {
    close();
    onOpenChange?.(false);
  };

  return (
    <Popover
      anchor={children}
      anchorClassName={anchorClassName}
      popoverClassName={popoverClassName}
      isAutoWidth={isAutoWidth}
      isOpened={isOpened ?? opened}
      onOpenChange={handleOpenChange}
    >
      {props.withSearch ? (
        <DropdownSearch
          hasItems={Boolean(items.length)}
          isLoading={props.isSearchLoading}
          searchText={props.searchText}
          onSearch={props.onSearch}
        />
      ) : null}
      {isMultiselect ? (
        <MultipleDropdown
          {...props}
          ref={setRef}
          items={items}
          selectedItems={value ?? []}
          onChange={onChange}
          close={handleClose}
        />
      ) : (
        <SingleDropdown
          {...props}
          ref={setRef}
          items={items}
          value={value}
          onChange={onChange}
          close={handleClose}
        />
      )}
    </Popover>
  );
};

Dropdown.Trigger = PopoverTrigger;
