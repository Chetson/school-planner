import { cn } from '@shared/helpers';

import { TYPOGRAPHY_COLORS, TYPOGRAPHY_KINDS } from './typography.theme.ts';

import type { TypographyColor, TypographyVariant } from './types';
import type { FC, PropsWithChildren } from 'react';

export interface TypographyProps extends PropsWithChildren {
  variant?: TypographyVariant;
  color?: TypographyColor;
  className?: string;
}

export const Typography: FC<TypographyProps> = ({
  variant = 'h1',
  color = 'default',
  className,
  children,
  ...props
}) => {
  const { className: kindClassName, Component } = TYPOGRAPHY_KINDS[variant];

  return (
    <Component
      {...props}
      className={cn(kindClassName, TYPOGRAPHY_COLORS[color], className)}
    >
      {children}
    </Component>
  );
};
