import { ROLE_NAMES, Role } from '@entities/user';
import { Badge } from '@shared/ui';

import type { BadgeProps } from '@shared/ui';
import type { FC } from 'react';

interface RoleBadgeProps extends BadgeProps {
  role: Role;
}

const getColor = (variant: Role): BadgeProps['color'] => {
  switch (variant) {
    case Role.TEACHER:
      return 'mint';

    case Role.ADMIN:
      return 'orange';

    case Role.STUDENT:
      return 'pink';

    case Role.PARENT:
      return 'yellow';

    default:
      return variant satisfies never;
  }
};

export const RoleBadge: FC<RoleBadgeProps> = ({ role, className }) => {
  return (
    <Badge className={className} color={getColor(role)}>
      {ROLE_NAMES[role]}
    </Badge>
  );
};
