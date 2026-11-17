import { getFullName } from '@shared/helpers';
import { Typography } from '@shared/ui';

import type { UserName } from '@entities/user';
import type { FC } from 'react';

export interface UserCellProps extends UserName {
  email: string;
  isFailed: boolean;
}

export const UserCell: FC<UserCellProps> = ({
  email,
  isFailed,
  ...userName
}) => (
  <div className="flex truncate flex-col justify-center">
    <Typography
      className="truncate block"
      variant="regular3"
      color={isFailed ? 'secondary' : 'default'}
    >
      {getFullName(userName)}
    </Typography>
    <Typography variant="caption1" color="secondary">
      {email}
    </Typography>
  </div>
);
