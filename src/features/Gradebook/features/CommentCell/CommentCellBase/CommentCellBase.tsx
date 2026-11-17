import { StaticCell } from '@features/Gradebook/ui';
import { HoverCard, Typography } from '@shared/ui';

import type { FC } from 'react';

type CommentCellBaseProps = {
  comment?: string;
  onDoubleClick?: VoidFunction;
};

export const CommentCellBase: FC<CommentCellBaseProps> = ({
  comment,
  onDoubleClick,
}) => {
  const cell = (
    <StaticCell onDoubleClick={onDoubleClick}>
      <Typography variant="caption1" className="line-clamp-2">
        {comment}
      </Typography>
    </StaticCell>
  );

  if (!comment) {
    return cell;
  }

  return (
    <HoverCard className="w-48" anchor={cell}>
      <Typography variant="caption1">{comment}</Typography>
    </HoverCard>
  );
};
