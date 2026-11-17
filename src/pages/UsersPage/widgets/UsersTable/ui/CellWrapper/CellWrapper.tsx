import clsx from 'clsx';

import type { FC, PropsWithChildren } from 'react';

interface CellWrapperWithBlockProps extends PropsWithChildren {
  isBlocked?: boolean;
}

export const CellWrapperWithBlock: FC<CellWrapperWithBlockProps> = ({
  isBlocked,
  children,
}) => (
  <div className={clsx('truncate', isBlocked && 'grayscale opacity-50')}>
    {children}
  </div>
);
