import { IconKind } from '@shared/helpers';

import { CheckboxBase } from './ui/CheckboxBase';
import { ControlCaption } from '../ControlCaption';
import { ToggleItem } from '../ToggleItem';

import type { CheckboxProps as CheckboxPrimitiveProps } from '@radix-ui/react-checkbox';
import type { FC } from 'react';

interface CheckboxProps extends CheckboxPrimitiveProps {
  label?: string;
  caption?: string;
  isError?: boolean;
}

export const Checkbox: FC<CheckboxProps> = ({
  label,
  value,
  id,
  caption,
  isError,
  className,
  ...props
}) => (
  <div className={className}>
    <ToggleItem
      label={label}
      Component={CheckboxBase}
      componentProps={{ icon: IconKind.ARROW_CHECKED, value, id, ...props }}
      labelClassName={props.disabled ? '!text-text-disable' : ''}
    />

    <ControlCaption
      text={caption}
      isError={isError}
      isDisabled={props.disabled}
    />
  </div>
);
