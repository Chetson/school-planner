import { Typography } from '@shared/ui';

import type { FC } from 'react';

export interface CommonTableCellProps {
  title?: string | null;
  subtitle?: string | null;
}

export const CommonTableCell: FC<CommonTableCellProps> = ({
  title,
  subtitle,
}) => (
  <div className="space-y-1">
    <Typography className="block truncate" variant="regular3">
      {title}
    </Typography>
    <Typography className="block" variant="regular3" color="secondary">
      {subtitle}
    </Typography>
  </div>
);
