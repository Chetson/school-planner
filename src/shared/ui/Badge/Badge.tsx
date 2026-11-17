import { FC, HTMLAttributes } from 'react';

import { cn } from '@shared/helpers';
import { VariantProps } from 'class-variance-authority';

import { badgeVariants } from './badge.theme.ts';

export interface BadgeProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'color'>,
    VariantProps<typeof badgeVariants> {}

export const Badge: FC<BadgeProps> = ({
  className,
  color = 'mint',
  ...props
}) => {
  return <div className={cn(badgeVariants({ color }), className)} {...props} />;
};
