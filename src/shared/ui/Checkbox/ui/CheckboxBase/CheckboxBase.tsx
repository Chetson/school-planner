import * as CheckboxPrimitive from '@radix-ui/react-checkbox';

import { Icon } from '@shared/ui';

import type { CheckboxProps as CheckboxPrimitiveProps } from '@radix-ui/react-checkbox';
import type { IconKind } from '@shared/helpers';
import type { FC } from 'react';

interface CheckboxBaseProps extends CheckboxPrimitiveProps {
  icon?: IconKind;
}

export const CheckboxBase: FC<CheckboxBaseProps> = ({ icon, ...rest }) => (
  <CheckboxPrimitive.Root {...rest}>
    {icon && (
      <CheckboxPrimitive.Indicator className="flex justify-center">
        <Icon kind={icon} />
      </CheckboxPrimitive.Indicator>
    )}
  </CheckboxPrimitive.Root>
);
