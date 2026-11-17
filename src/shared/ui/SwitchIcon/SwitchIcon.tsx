import clsx from 'clsx';

import { ArrowDownIcon } from '@shared/assets';

import type { FC } from 'react';

export const SwitchIcon: FC<{ opened?: boolean; className?: string }> = ({
  opened,
  className,
}) => (
  <ArrowDownIcon
    className={clsx(
      className,
      'transition-all ease-in-out duration-200',
      opened && 'rotate-180',
    )}
  />
);
