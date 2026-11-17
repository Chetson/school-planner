import { Icon, Typography } from '@shared/ui';

import type { CardListItemProps } from '@shared/ui/Card';
import type { FC } from 'react';

export const CardListItem: FC<CardListItemProps> = ({
  icon,
  title,
  subtitle,
  color = 'mint',
}) => {
  return (
    <li className="flex gap-1">
      {icon && <Icon kind={icon} className={`text-decorative-${color}`} />}
      <div className="flex flex-col">
        <Typography variant="regular2">{title}</Typography>
        {subtitle && (
          <Typography variant="caption1" color="secondary">
            {subtitle}
          </Typography>
        )}
      </div>
    </li>
  );
};
