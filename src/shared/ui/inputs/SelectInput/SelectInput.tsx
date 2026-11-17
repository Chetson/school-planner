import clsx from 'clsx';

import { Input } from '../Input';

import type { InputProps } from '../Input';
import type { FC } from 'react';

export type SelectInputProps = { title?: string } & Omit<
  InputProps,
  'onChange' | 'value'
>;

/**
 * Неинтерактивный Input использующийся в Select и SelectRemote
 */
export const SelectInput: FC<SelectInputProps> = ({ title, ...props }) => (
  <Input
    {...props}
    readOnly
    tabIndex={-1}
    value={title}
    inputClassName={clsx('pointer-events-none', props.inputClassName)}
    containerClassName={clsx(
      !props.disabled && 'cursor-pointer',
      props.containerClassName,
    )}
    labelClassName={clsx(
      !props.disabled && '!cursor-pointer',
      'pointer-events-none',
      props.labelClassName,
    )}
  />
);
