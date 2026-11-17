import type { ReactNode } from 'react';

import type { IconKind } from '@shared/helpers';
import { isIconKind } from '@shared/helpers';
import clsx from 'clsx';

import { Icon } from './Icon';

export const renderIcon = (
  icon?: IconKind | ReactNode,
  wrapperClassName?: string,
  size?: number,
) => {
  if (!icon) return null;

  return (
    <span className={clsx(wrapperClassName, 'flex items-center')}>
      {isIconKind(icon) ? <Icon kind={icon} size={size} /> : icon}
    </span>
  );
};
