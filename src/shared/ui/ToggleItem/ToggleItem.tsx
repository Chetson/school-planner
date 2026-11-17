import clsx from 'clsx';

import { Typography } from '@shared/ui/Typography';

import type { IconKind } from '@shared/helpers';
import type { ComponentType } from 'react';

type BaseComponentProps = {
  className?: string;
  id?: string;
  icon?: IconKind;
};

type ToggleItemProps<Props extends BaseComponentProps> = {
  Component: ComponentType<Props>;
  label?: string;
  labelClassName?: string;
  componentProps: Props;
};

export const ToggleItem = <Props extends BaseComponentProps>({
  componentProps,
  Component,
  label,
  labelClassName,
}: ToggleItemProps<Props>) => (
  <div className="flex items-center gap-2">
    <Component
      {...componentProps}
      className={clsx(
        'w-5 h-5 border-2 rounded-full data-[state=unchecked]:border-gray data-[state=checked]:border-green',
        componentProps.className,
      )}
    />

    {label && (
      <label htmlFor={componentProps.id}>
        <Typography
          className={clsx(
            'inline cursor-pointer whitespace-nowrap',
            labelClassName,
          )}
          variant="regular2"
        >
          {label}
        </Typography>
      </label>
    )}
  </div>
);
