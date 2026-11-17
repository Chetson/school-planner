import { getStudentName } from '@shared/helpers';

import type { ChildDropdownItemType } from './types';
import type { UserBaseModel } from '@entities/user';

export const createDropdownItem = (
  user: UserBaseModel,
): ChildDropdownItemType => ({
  title: getStudentName(user),
  id: user.id,
  value: {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    patronim: user.patronim,
  },
});
