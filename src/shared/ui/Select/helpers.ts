import type { DropdownItemType, DropdownProps } from '../Dropdown';

export const deriveStrValue = <Id, Item extends DropdownItemType<Id>>(
  value: DropdownProps<Id, Item>['value'],
): string => {
  if (!value) return '';

  if (!Array.isArray(value)) {
    return value?.title ?? '';
  }

  return value.map(({ title }) => title).join(', ');
};
