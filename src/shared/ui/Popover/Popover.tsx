import * as PopoverPrimitive from '@radix-ui/react-popover';
import clsx from 'clsx';

import { useAutoWidth } from '@shared/helpers';

import styles from './popover.module.css';

import type { ComponentProps, FC, ReactNode } from 'react';

export interface PopoverProps {
  isOpened?: boolean;
  onOpenChange?: (opened: boolean) => void;
  children?: ReactNode;
  anchor?: ReactNode;
  isAutoWidth?: boolean;
  anchorClassName?: string;
  popoverClassName?: string;
  align?: ComponentProps<typeof PopoverPrimitive.Content>['align'];
}

export const PopoverTrigger = PopoverPrimitive.Trigger;

export const Popover: FC<PopoverProps> = ({
  children,
  anchor,
  isAutoWidth = true,
  anchorClassName,
  popoverClassName,
  isOpened,
  align = 'center',
  onOpenChange,
}) => {
  const { parentRef, width } = useAutoWidth<HTMLDivElement>(
    isAutoWidth && isOpened,
  );

  return (
    <PopoverPrimitive.Root open={isOpened} onOpenChange={onOpenChange}>
      <PopoverPrimitive.Anchor
        ref={parentRef}
        className={clsx('inline', anchorClassName)}
      >
        {anchor}
      </PopoverPrimitive.Anchor>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          align={align}
          sideOffset={4}
          style={{ width }}
          className={clsx(
            styles.popover,
            'data-[state=open]:animate-in',
            'data-[state=closed]:animate-out',
            'data-[state=closed]:fade-out-0',
            'data-[state=open]:fade-in-0',
            'data-[state=closed]:zoom-out-95',
            'data-[state=open]:zoom-in-95',
            'data-[side=bottom]:slide-in-from-top-2',
            'data-[side=left]:slide-in-from-right-2',
            'data-[side=right]:slide-in-from-left-2',
            'data-[side=top]:slide-in-from-bottom-2',
            popoverClassName,
          )}
        >
          {children}
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
};
