import clsx from 'clsx';

import { TickIcon } from '@shared/assets';
import { renderIcon } from '@shared/ui';
import { Typography } from '@shared/ui/Typography';

import type { IconKind } from '@shared/helpers';
import type { DropdownItemProps } from '@shared/ui';
import type { TypographyProps } from '@shared/ui/Typography';
import type { ReactNode } from 'react';

export interface DropdownItemType<Id> {
  title: string;
  color?: TypographyProps['color'];
  id: Id;
  icon?: IconKind | ReactNode;
}

export const DropdownItem = <Id, Type extends DropdownItemType<Id>>({
  item,
  isSelected,
  className,
  onChange,
}: DropdownItemProps<Id, Type>) => {
  return (
    <div
      className={clsx(
        className,
        'flex items-center px-6 h-11 hover:bg-bg-secondary transition-all ease-in-out duration-200 cursor-pointer overflow-hidden',
      )}
      onClick={() => onChange?.(item)}
    >
      {renderIcon(item.icon, 'text-decorative-blue pr-2', 16)}
      <Typography
        className="grow shrink overflow-hidden truncate"
        variant="regular3"
        color={item.color}
      >
        {item.title}
      </Typography>
      {isSelected && <TickIcon className="text-decorative-blue" />}
    </div>
  );
};
