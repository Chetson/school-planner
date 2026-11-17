import { FC } from 'react';

import { IconKind } from '@shared/helpers';
import { Button, Icon } from '@shared/ui';

export const NotificationButton: FC = () => (
  <Button variant="blank" className="max-w-13 !px-0 text-text-default">
    <Icon kind={IconKind.NOTIFICATION} className="text-decorative-gray" />
  </Button>
);
