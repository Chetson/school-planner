import { getLastNameAndInitials } from '@shared/helpers';
import { CollapseList } from '@shared/ui';

import type { UserBaseModel } from '@entities/user';
import type { FC } from 'react';

export interface UsersCollapseListProps {
  users: UserBaseModel[];
  getUserName?: (user: UserBaseModel) => string;
}

export const UsersCollapseList: FC<UsersCollapseListProps> = ({
  users,
  getUserName = getLastNameAndInitials,
}) => <CollapseList list={users.map(getUserName)} />;
