import type { ForwardRefRenderFunction } from 'react';
import { forwardRef } from 'react';

import clsx from 'clsx';

import styles from './input.module.css';
import type { InputColor, InputVariant } from './types';
import type { InputBaseProps } from './ui/InputBase';
import { InputBase } from './ui/InputBase';

export interface InputProps extends InputBaseProps {
  variant?: InputVariant;
  color?: InputColor;
}

const Input: ForwardRefRenderFunction<HTMLInputElement | null, InputProps> = (
  {
    variant = 'outlined',
    color = 'default',
    label,
    placeholder,
    inputClassName,
    containerClassName,
    ...props
  },
  ref,
) => {
  if (variant === 'outlined') {
    return (
      <InputBase
        {...props}
        ref={ref}
        label={label}
        placeholder={placeholder}
        containerClassName={clsx(
          styles.container,
          containerClassName,
          `border-stroke-${color}`,
        )}
        inputClassName={clsx(inputClassName, 'placeholder-transparent')}
      />
    );
  }

  if (variant === 'contained') {
    return (
      <InputBase
        {...props}
        ref={ref}
        placeholder={placeholder}
        inputClassName={inputClassName}
        containerClassName={clsx(
          styles.container,
          containerClassName,
          'bg-bg-secondary',
          props.isError ? 'border' : 'border-none',
        )}
      />
    );
  }

  return (
    <InputBase
      {...props}
      ref={ref}
      placeholder={placeholder}
      inputClassName={inputClassName}
      containerClassName={clsx(
        styles.container,
        containerClassName,
        props.isError ? 'border' : 'border-none',
      )}
    />
  );
};

export default forwardRef(Input);
