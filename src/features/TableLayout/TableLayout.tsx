import { Typography } from '@shared/ui';

import type { TypographyProps } from '@shared/ui';
import type { FC, PropsWithChildren, ReactNode } from 'react';

export interface TableLayoutProps extends PropsWithChildren {
  titleVariant?: TypographyProps['variant'];
  title?: ReactNode;
  tools?: ReactNode;
}

export const TableLayout: FC<TableLayoutProps> = ({
  titleVariant,
  title,
  tools,
  children,
}) => (
  <div className="h-full flex flex-col w-full gap-6">
    <div className="flex items-center flex-wrap w-full gap-4">
      {title && (
        <Typography className="grow" variant={titleVariant}>
          {title}
        </Typography>
      )}
      <div className="flex gap-4 flex-wrap">{tools}</div>
    </div>
    {children}
  </div>
);
