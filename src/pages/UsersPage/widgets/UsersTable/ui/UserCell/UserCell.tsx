import { Link } from 'react-router-dom';

import { UserAvatar } from '@features/UserAvatar';
import { getLastNameAndInitials, PAGES } from '@shared/helpers';
import { Typography } from '@shared/ui';

import type { UserName } from '@entities/user';
import type { FC } from 'react';

export interface UserCellProps extends UserName {
  email: string;
  userId: number;
}

export const UserCell: FC<UserCellProps> = ({
  firstName,
  lastName,
  patronim,
  email,
  userId,
}) => (
  <Link to={PAGES.USER.create(userId)} className="flex gap-2 items-center">
    <UserAvatar src="" className="w-10 h-10" />
    <div className="flex truncate flex-col justify-center">
      <Typography className="truncate block" variant="regular3">
        {getLastNameAndInitials({ firstName, lastName, patronim })}
      </Typography>
      <Typography className="truncate" variant="caption1" color="secondary">
        {email}
      </Typography>
    </div>
  </Link>
);
