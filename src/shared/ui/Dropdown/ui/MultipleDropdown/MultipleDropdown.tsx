import { forwardRef, useMemo, useState } from 'react';

import { useUpdate } from '@shared/helpers';
import { Button } from '@shared/ui';

import { RESET_ID } from './config';
import { DropdownContent } from '../DropdownContent';

import type { DropdownItemType } from '../DropdownItem';
import type { DropdownItemProps } from '@shared/ui';
import type { ComponentType, Ref, UIEvent } from 'react';

type MultipleDropdownProps<Id, Item extends DropdownItemType<Id>> = {
  items: Item[];
  selectedItems: Item[];
  withReset?: boolean;
  resetText?: string;
  ref?: Ref<HTMLDivElement>;
  itemClassName?: string;
  DropdownItem?: ComponentType<DropdownItemProps<Id, Item>>;
  onScroll?: (event: UIEvent<HTMLDivElement>) => void;
  onChange?: (items: Item[]) => void;
  close: () => void;
};

const MultipleDropdown = <Id, Item extends DropdownItemType<Id>>(
  {
    items: externalItems,
    selectedItems: externalSelectedItems,
    withReset,
    resetText = 'Не выбрано',
    itemClassName,
    DropdownItem,
    onChange,
    onScroll,
    close,
  }: MultipleDropdownProps<Id, Item>,
  ref: Ref<HTMLDivElement>,
) => {
  const [hasBeenChanged, setHasBeenChanged] = useState(false);

  const [selectedItems, setSelectedItems] = useState<Item[]>(
    externalSelectedItems,
  );

  const items = useMemo<Item[]>(() => {
    if (!withReset) return externalItems;

    return [
      {
        title: resetText,
        id: RESET_ID,
      } as Item,
      ...externalItems,
    ];
  }, [externalItems, withReset, resetText]);

  const isEmpty = !selectedItems.length;

  const getIsSelected = (item: Item) =>
    selectedItems.some(({ id }) => id === item.id);

  const handleSelectItem = (item: Item) => {
    if (isEmpty && item.id === RESET_ID) {
      return;
    }

    setHasBeenChanged(true);

    if (item.id === RESET_ID) {
      return setSelectedItems([]);
    }

    if (getIsSelected(item)) {
      setSelectedItems(selectedItems.filter(({ id }) => item.id !== id));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const handleSave = () => {
    onChange?.(selectedItems);
    close();
  };

  const handleCancel = () => {
    setSelectedItems(externalSelectedItems ?? []);
    close();
  };

  useUpdate(() => {
    setSelectedItems(externalSelectedItems ?? []);
  }, [externalSelectedItems]);

  return (
    <>
      <DropdownContent
        onScroll={onScroll}
        isSelected={getIsSelected}
        onChange={handleSelectItem}
        DropdownItem={DropdownItem}
        itemClassName={itemClassName}
        items={items}
        ref={ref}
      />
      {hasBeenChanged && (
        <div className="flex flex-col px-6 py-4 space-y-4 md:flex-row md:justify-end md:space-x-4 md:space-y-0">
          <Button variant="tertiary" size="s" onClick={handleCancel}>
            Отменить
          </Button>
          <Button size="s" onClick={handleSave}>
            Сохранить
          </Button>
        </div>
      )}
    </>
  );
};

export default forwardRef(MultipleDropdown) as typeof MultipleDropdown;
