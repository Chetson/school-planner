import { forwardRef } from 'react';

import { cn } from '@shared/helpers';
import { renderIcon, Spinner } from '@shared/ui';

import { buttonVariants } from './button.theme.ts';

import type { IconKind } from '@shared/helpers';
import type { VariantProps } from 'class-variance-authority';
import type {
  ForwardRefRenderFunction,
  ButtonHTMLAttributes,
  ReactNode,
} from 'react';

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  leftElement?: IconKind | ReactNode;
  rightElement?: IconKind | ReactNode;
  isLoading?: boolean;
  isFullSize?: boolean;
}

const Button: ForwardRefRenderFunction<HTMLButtonElement, ButtonProps> = (
  {
    className,
    variant = 'primary',
    size = 'm',
    leftElement,
    rightElement,
    isLoading,
    disabled,
    isFullSize = true,
    children,
    ...props
  },
  ref,
) => {
  return (
    <button
      ref={ref}
      {...props}
      className={cn(
        buttonVariants({ variant, size, className }),
        isFullSize && 'w-full',
      )}
      disabled={disabled || isLoading}
    >
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {renderIcon(leftElement)}
          {children}
          {renderIcon(rightElement)}
        </>
      )}
    </button>
  );
};

export default forwardRef(Button);
