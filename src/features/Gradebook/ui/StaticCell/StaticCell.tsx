import { forwardRef } from 'react';

import clsx from 'clsx';

import type { ForwardRefRenderFunction, HTMLAttributes } from 'react';

export type StaticCellProps = HTMLAttributes<HTMLDivElement>;

const StaticCell: ForwardRefRenderFunction<HTMLDivElement, StaticCellProps> = (
  { className, ...props },
  ref,
) => {
  return (
    <div
      ref={ref}
      {...props}
      className={clsx(
        'relative h-full w-full px-2 py-1.5 text-xs outline-none box-border cursor-text',
        className,
      )}
    />
  );
};

export default forwardRef(StaticCell);
