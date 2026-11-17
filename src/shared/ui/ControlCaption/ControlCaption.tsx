import { getCaptionColor } from './lib/helpers';
import { Typography } from '../Typography';

import type { FC } from 'react';

interface ControlCaptionProps {
  isDisabled?: boolean;
  isError?: boolean;
  text?: string;
}

export const ControlCaption: FC<ControlCaptionProps> = ({
  isDisabled,
  isError,
  text,
}) => {
  if (!text) {
    return null;
  }

  return (
    <Typography
      variant="caption1"
      color={getCaptionColor({ isDisabled, isError })}
    >
      {text}
    </Typography>
  );
};
