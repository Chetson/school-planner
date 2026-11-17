import { FC } from 'react';

import {
  PatternPrimaryIcon,
  PatternSecondaryIcon,
  StarSharpIcon,
} from '@shared/assets';
import clsx from 'clsx';

export interface PatternsProps {
  isColorless?: boolean;
}

export const Patterns: FC<PatternsProps> = ({ isColorless }) => (
  <>
    <StarSharpIcon
      className={clsx(
        'absolute z-0 w-40 top-64 left-24',
        isColorless ? 'text-bg-secondary' : 'text-decorative-orange',
      )}
    />
    <StarSharpIcon
      className={clsx(
        'absolute z-0 w-52 right-32 bottom-32',
        isColorless ? 'text-bg-secondary' : 'text-decorative-yellow',
      )}
    />
    <PatternPrimaryIcon
      className={clsx(
        'absolute z-0 w-80 right-52 -top-11',
        isColorless ? 'text-bg-secondary' : 'text-decorative-beige',
      )}
    />
    <PatternSecondaryIcon
      className={clsx(
        'absolute z-0 w-80 left-52 bottom-4',
        isColorless ? 'text-bg-secondary' : 'text-decorative-pink',
      )}
    />
  </>
);
