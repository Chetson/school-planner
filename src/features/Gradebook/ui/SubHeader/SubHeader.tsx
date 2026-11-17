import clsx from 'clsx';

import type { FC, HTMLAttributes, PropsWithChildren } from 'react';

export const SubHeader: FC<
  PropsWithChildren<HTMLAttributes<HTMLDivElement>>
> = ({ children, className, ...props }) => (
  <div
    {...props}
    className={clsx(
      'h-full flex items-center px-2 whitespace-nowrap',
      className,
    )}
  >
    {children}
  </div>
);
