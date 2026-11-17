import type { ClassDropdownItemType } from './types';
import type { ClassBaseModel } from '@entities/class';

export const createDropdownItem = ({
  className,
  id,
}: ClassBaseModel): ClassDropdownItemType => ({
  title: className,
  id: id,
  value: { className, id },
});
