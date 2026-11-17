import { forwardRef } from 'react';

import * as HoverCardPrimitive from '@radix-ui/react-hover-card';
import clsx from 'clsx';

import { useAutoWidth } from '@shared/helpers';

import styles from './hoverCard.module.css';

import type { ElementRef, ComponentPropsWithoutRef, ReactNode } from 'react';

export const HoverCardTrigger = HoverCardPrimitive.Trigger;

export type HoverCardProps = {
  anchor: ReactNode;
  isAutoWidth?: boolean;
  onOpenChange?: (val: boolean) => void;
  isOpened?: boolean;
  triggerClassName?: string;
} & ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content>;

export const HoverCard = forwardRef<
  ElementRef<typeof HoverCardPrimitive.Content>,
  HoverCardProps
>(
  (
    {
      className,
      align = 'center',
      sideOffset = 4,
      anchor,
      isAutoWidth,
      isOpened,
      triggerClassName,
      onOpenChange,
      ...props
    },
    ref,
  ) => {
    const { parentRef, width } = useAutoWidth<HTMLAnchorElement>(isAutoWidth);

    return (
      <HoverCardPrimitive.Root
        open={isOpened}
        openDelay={300}
        onOpenChange={onOpenChange}
      >
        <HoverCardPrimitive.Trigger
          className={triggerClassName}
          ref={parentRef}
        >
          {anchor}
        </HoverCardPrimitive.Trigger>
        <HoverCardPrimitive.Content
          style={{ width }}
          ref={ref}
          align={align}
          sideOffset={sideOffset}
          className={clsx(
            styles.hoverCard,
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
            className,
          )}
          {...props}
        />
      </HoverCardPrimitive.Root>
    );
  },
);

HoverCard.displayName = HoverCardPrimitive.Content.displayName;
