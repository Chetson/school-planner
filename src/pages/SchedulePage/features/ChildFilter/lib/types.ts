import type { UserBaseModel } from '@entities/user';
import type { DropdownItemType } from '@shared/ui';

export type ChildDropdownItemType = DropdownItemType<number> & {
  value: UserBaseModel;
};
