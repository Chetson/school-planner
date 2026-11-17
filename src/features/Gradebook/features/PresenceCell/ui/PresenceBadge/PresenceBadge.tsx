import clsx from 'clsx';

import { Presence } from '@entities/gradebook';

import { PRESENCE_VALUES } from '../../lib';

import type { FC } from 'react';

export const PresenceBadge: FC<{ presence: Presence }> = ({ presence }) => {
  return (
    <div
      className={clsx(
        presence === Presence.PRESENT
          ? 'bg-decorative-beige'
          : 'bg-bg-secondary',
        'w-6 h-4 rounded-md text-xs flex items-center justify-center',
      )}
    >
      {PRESENCE_VALUES[presence]}
    </div>
  );
};
