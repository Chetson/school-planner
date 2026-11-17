import { forwardRef, useImperativeHandle, useState } from 'react';

import clsx from 'clsx';

import { Typography } from '@shared/ui';

import type { LessonHandlers } from '@features/Gradebook/lib';
import type { PropsWithChildren } from 'react';
import type { ForwardRefRenderFunction } from 'react';

export type HeaderProps = PropsWithChildren<{
  className?: string;
  titleClassName?: string;
}>;

const Header: ForwardRefRenderFunction<LessonHandlers, HeaderProps> = (
  { children, className, titleClassName },
  ref,
) => {
  const [active, setActive] = useState(false);

  useImperativeHandle(ref, () => ({
    focus: () => setActive(true),
    blur: () => setActive(false),
  }));

  return (
    <div
      className={clsx(
        'flex h-full items-center px-2 whitespace-nowrap',
        active && 'bg-decorative-green',
        className,
      )}
    >
      <Typography
        className={titleClassName}
        variant="regular3"
        color="default-inverted"
      >
        {children}
      </Typography>
    </div>
  );
};

export default forwardRef(Header);
