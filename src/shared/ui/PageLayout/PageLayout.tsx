import clsx from 'clsx';

import { Breadcrumbs } from '@shared/ui/Breadcrumbs';

import type { FC, PropsWithChildren } from 'react';

export interface PageLayoutProps extends PropsWithChildren {
  className?: string;
}

export const PageLayout: FC<PageLayoutProps> = ({ children, className }) => (
  <div
    className={clsx(
      className,
      'bg-bg-default flex flex-col rounded-3xl w-full relative p-8',
    )}
  >
    <Breadcrumbs />
    {children}
  </div>
);
