import { SVGProps } from 'react';

import { cn, rem } from '@shared/helpers';

export interface SpinnerProps extends SVGProps<SVGSVGElement> {
  size?: number;
  className?: string;
}

export const Spinner = ({ size = 24, className, ...props }: SpinnerProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={rem(size)}
      height={rem(size)}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn('animate-spin', className)}
      {...props}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
};
