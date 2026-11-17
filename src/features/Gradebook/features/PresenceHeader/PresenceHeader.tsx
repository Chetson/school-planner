import { SubHeader } from '@features/Gradebook/ui';
import { Typography } from '@shared/ui';

import { AddDummyActivityButton } from '../AddDummyActivityButton';

import type { FC } from 'react';

export type PresenceHeaderProps = {
  withAddButton: boolean;
  lessonId: number;
};

export const PresenceHeaderReadonly: FC = () => (
  <SubHeader>
    <Typography variant="caption1" className="grow text-left">
      Н/Б
    </Typography>
  </SubHeader>
);

export const PresenceHeaderEdit: FC<PresenceHeaderProps> = ({
  withAddButton,
  lessonId,
}) => (
  <div className="flex justify-between h-full">
    <PresenceHeaderReadonly />
    {withAddButton && <AddDummyActivityButton lessonId={lessonId} />}
  </div>
);
