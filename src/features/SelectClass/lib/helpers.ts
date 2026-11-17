import type { ClassModel } from '@entities/class';
import type { DropdownRemoteItemType } from '@features/DropdownRemote';

export const createDropdownItem = (
  cls: ClassModel,
): DropdownRemoteItemType<number, ClassModel> => ({
  id: cls.id,
  title: cls.className,
  value: cls,
});

export const getTitle = ({ className }: ClassModel) => className;
