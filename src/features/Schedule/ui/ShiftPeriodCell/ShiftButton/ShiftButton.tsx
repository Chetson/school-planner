import clsx from 'clsx';

import { IconKind } from '@shared/helpers';
import { Icon } from '@shared/ui';

import type { FC } from 'react';

export interface ShiftButtonProps {
  onClick: VoidFunction;
  className: string;
  iconClassName: string;
}

export const ShiftButton: FC<ShiftButtonProps> = ({
  onClick,
  className,
  iconClassName,
}) => (
  <button
    onClick={onClick}
    className={clsx(className, 'bg-decorative-beige h-6 w-6')}
  >
    <Icon
      className={clsx(iconClassName, 'text-decorative-blue')}
      kind={IconKind.ARROW_DOWN}
    />
  </button>
);
