import { forwardRef } from 'react';

import clsx from 'clsx';

import { ControlCaption, Spinner, renderIcon } from '@shared/ui';

import styles from './inputBase.module.css';

import type { IconKind } from '@shared/helpers';
import type {
  ForwardRefRenderFunction,
  InputHTMLAttributes,
  ReactNode,
} from 'react';

export interface InputBaseProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'value'> {
  value?: string | null;
  leftElement?: IconKind | ReactNode;
  rightElement?: IconKind | ReactNode;
  caption?: string;
  isError?: boolean;
  isLoading?: boolean;
  label?: string;
  inputClassName?: string;
  containerClassName?: string;
  labelClassName?: string;
}

export const InputBase: ForwardRefRenderFunction<
  HTMLInputElement | null,
  InputBaseProps
> = (
  {
    leftElement,
    rightElement,
    placeholder = '',
    label,
    caption,
    isError,
    disabled,
    name,
    id,
    inputClassName,
    containerClassName,
    labelClassName,
    required,
    isLoading,
    value,
    ...props
  },
  ref,
) => {
  const makeRequired = (str: string) => str + (required ? ' *' : '');

  return (
    <div className="w-full text-left">
      <div
        className={clsx(
          containerClassName,
          styles.container,
          isError && '!border-stroke-critical',
        )}
      >
        {leftElement && (
          <span className="mr-2">
            {renderIcon(
              leftElement,
              clsx('text-decorative-gray', disabled && 'text-text-disable'),
            )}
          </span>
        )}
        <input
          {...props}
          value={value ?? undefined}
          ref={ref}
          name={name}
          id={name ?? id}
          disabled={disabled || isLoading}
          // Без строки в placeholder некорректо отрабатывает
          // псевдокласс peer-placeholder-shown в сафари
          placeholder={makeRequired(placeholder) || ' '}
          className={clsx(`peer`, styles.input, inputClassName)}
        />
        {label ? (
          <label
            htmlFor={name ?? id}
            className={clsx(
              styles.label,
              labelClassName,
              `peer-placeholder-shown:!text-sm peer-placeholder-shown:top-3.5 peer-placeholder-shown:cursor-text 
              peer-focus:cursor-default peer-focus:bg-bg-default peer-focus:-top-2.5 peer-focus:!text-xs
              peer-disabled:text-text-disable peer-disabled:cursor-default`,
              leftElement && 'peer-placeholder-shown:left-12 peer-focus:left-4',
              isError && '!text-text-critical',
            )}
          >
            {makeRequired(label)}
          </label>
        ) : null}
        {isLoading ? (
          <Spinner className="text-decorative-gray-blue" />
        ) : (
          renderIcon(
            rightElement,
            clsx('text-decorative-gray', disabled && 'text-text-disable'),
          )
        )}
      </div>

      <ControlCaption text={caption} isError={isError} isDisabled={disabled} />
    </div>
  );
};

export default forwardRef(InputBase);
