import { getFullName } from '@shared/helpers';

import type { UserBaseModel } from '@entities/user';
import type { DropdownRemoteItemType } from '@features/DropdownRemote';

export const createDropdownItemFromUser = (
  user: UserBaseModel,
): DropdownRemoteItemType<number, UserBaseModel> => ({
  title: getFullName(user),
  id: user.id,
  value: user,
});
