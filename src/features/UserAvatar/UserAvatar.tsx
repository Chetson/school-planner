import { FC, memo } from 'react';

import { AvatarImageProps } from '@radix-ui/react-avatar';
import { AvatarImg } from '@shared/assets';
import { Avatar, AvatarFallback, AvatarImage } from '@shared/ui';

export interface UserAvatarProps extends Omit<AvatarImageProps, 'src'> {
  src: string;
}

// TODO доделать после появления бэкенда
const UserAvatar: FC<UserAvatarProps> = ({ src, className }) => {
  return (
    <Avatar className={className}>
      <AvatarImage src={src} />
      <AvatarFallback>
        <img src={AvatarImg} alt="user_avatar" />
      </AvatarFallback>
    </Avatar>
  );
};

export default memo(UserAvatar);
