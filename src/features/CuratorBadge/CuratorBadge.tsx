import { Badge } from '@shared/ui';

import type { BadgeProps } from '@shared/ui';
import type { FC } from 'react';

interface CuratorBadgeProps extends BadgeProps {
  clsName?: string;
}

export const CuratorBadge: FC<CuratorBadgeProps> = ({
  clsName,
  className = '',
}) => {
  return (
    <Badge className={className} color="beige">
      Куратор {clsName}
    </Badge>
  );
};
