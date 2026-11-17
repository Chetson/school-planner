import { IconKind } from '@shared/helpers';
import { IconButton } from '@shared/ui/IconButton';

import type { FC } from 'react';

export const AddButton: FC<{ onClick: VoidFunction }> = ({ onClick }) => (
  <IconButton
    onClick={onClick}
    icon={IconKind.PLUS}
    className="!bg-decorative-green h-full w-8 border-l-2 border-bg-secondary text-text-default-inverted flex items-center justify-center"
  />
);
