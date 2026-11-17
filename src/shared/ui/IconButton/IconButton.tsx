import clsx from 'clsx';

import { Icon } from '../Icon';

import type { IconKind } from '@shared/helpers';
import type { ButtonHTMLAttributes, FC } from 'react';

export interface IconButonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: IconKind;
  size?: number;
}

export const IconButton: FC<IconButonProps> = ({
  icon,
  className,
  size,
  ...props
}) => (
  <button {...props} className={clsx(className, 'text-decorative-gray-blue')}>
    <Icon kind={icon} size={size} />
  </button>
);
