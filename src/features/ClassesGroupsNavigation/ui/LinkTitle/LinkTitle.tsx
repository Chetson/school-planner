import clsx from 'clsx';

import { Typography } from '@shared/ui';

import type { FC } from 'react';

interface LinkTitleProps {
  text: string;
  count?: number;
  isActive: boolean;
}

export const LinkTitle: FC<LinkTitleProps> = ({ text, count, isActive }) => (
  <>
    <Typography
      className="inline"
      color={isActive ? 'default' : 'secondary'}
      variant="h2"
    >
      {text}
    </Typography>{' '}
    {count && (
      <Typography
        className={clsx(
          'inline',
          isActive ? '!text-decorative-mint' : '!text-decorative-gray-blue',
        )}
        variant="h2"
      >
        {count}
      </Typography>
    )}
  </>
);
