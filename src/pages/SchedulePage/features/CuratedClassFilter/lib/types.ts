import type { ClassBaseModel } from '@entities/class';
import type { DropdownItemType } from '@shared/ui';

export type ClassDropdownItemType = DropdownItemType<number> & {
  value: ClassBaseModel;
};
