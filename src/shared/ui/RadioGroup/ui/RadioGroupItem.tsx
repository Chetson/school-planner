import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';

import { Icon } from '@shared/ui';

import type { RadioGroupItemProps as RadioGroupItemPrimitiveProps } from '@radix-ui/react-radio-group';
import type { IconKind } from '@shared/helpers';
import type { FC } from 'react';

interface RadioGroupItemProps extends RadioGroupItemPrimitiveProps {
  icon?: IconKind;
}

export const RadioGroupItem: FC<RadioGroupItemProps> = ({ icon, ...rest }) => (
  <RadioGroupPrimitive.Item {...rest}>
    {icon && (
      <RadioGroupPrimitive.Indicator className="flex justify-center">
        <Icon kind={icon} />
      </RadioGroupPrimitive.Indicator>
    )}
  </RadioGroupPrimitive.Item>
);
