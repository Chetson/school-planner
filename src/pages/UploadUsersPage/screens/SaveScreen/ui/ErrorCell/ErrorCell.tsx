import { IconKind } from '@shared/helpers';
import { Icon, Typography } from '@shared/ui';

import type { FC } from 'react';

export const ErrorCell: FC<{ isFailed: boolean }> = ({ isFailed }) =>
  isFailed ? (
    <div className="flex items-center gap-2.5">
      <Typography variant="regular2" color="critical">
        Ошибка загрузки
      </Typography>
      <Icon kind={IconKind.MARK} className="text-text-critical" />
    </div>
  ) : null;
