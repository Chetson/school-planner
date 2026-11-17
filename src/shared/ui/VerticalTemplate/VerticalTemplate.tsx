import type { FC, ReactNode } from 'react';

import type { IconKind } from '@shared/helpers';
import { Icon } from '@shared/ui/Icon';
import { Typography } from '@shared/ui/Typography';
import clsx from 'clsx';

export interface VerticalTemplateProps {
  icon?: IconKind;
  title?: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  className?: string;
}

export const VerticalTemplate: FC<VerticalTemplateProps> = ({
  icon,
  title,
  description,
  children,
  className,
}) => (
  <div className={clsx(className, 'flex flex-col items-center gap-8 w-full')}>
    {icon && (
      <div className="flex justify-center">
        <Icon kind={icon} className="h-26" />
      </div>
    )}
    {title && (
      <Typography
        variant="h2"
        className="text-center leading-8 w-full max-w-121"
      >
        {title}
      </Typography>
    )}
    {description && (
      <Typography variant="regular1" className="text-center w-full max-w-121">
        {description}
      </Typography>
    )}
    {children && (
      <div className="flex w-full gap-4 flex-col max-w-108 md:flex-row md:justify-end">
        {children}
      </div>
    )}
  </div>
);
