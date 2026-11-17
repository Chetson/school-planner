import { ICON_MAP, rem } from '@shared/helpers';

import type { IconKind } from '@shared/helpers';
import type { FC, SVGAttributes } from 'react';

export type IconProps = {
  kind?: IconKind | null;
  size?: number;
} & SVGAttributes<SVGElement>;

export const Icon: FC<IconProps> = ({ kind, size, ...props }) => {
  if (kind) {
    const RenderIcon = ICON_MAP[kind];

    const style = size ? { height: rem(size), width: rem(size) } : undefined;

    return <RenderIcon style={style} {...props} />;
  }

  return null;
};
