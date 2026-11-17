import type { ActivityModel } from '@entities/activity';
import type { DropdownItemType } from '@shared/ui';

export type ActivityDropdownItem = {
  activity: ActivityModel;
} & DropdownItemType<number>;
