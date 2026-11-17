import { SubHeader } from '@features/Gradebook/ui';
import { HoverCard, Typography } from '@shared/ui';

import type { FC } from 'react';

type ThemeHeaderBaseProps = {
  theme?: string | null;
  onActive?: VoidFunction;
};

export const ThemeHeaderBase: FC<ThemeHeaderBaseProps> = ({
  theme,
  onActive,
}) => {
  if (!theme) return null;

  return (
    <HoverCard
      isAutoWidth
      anchor={
        <SubHeader onDoubleClick={onActive} className="relative">
          <div className="absolute w-full left-0 top-0 h-full flex items-center px-2">
            <Typography className="truncate cursor-text" variant="regular3">
              {theme}
            </Typography>
          </div>
        </SubHeader>
      }
    >
      <Typography variant="regular3" className="block mb-1" color="secondary">
        Тема урока:
      </Typography>
      <Typography variant="regular3">{theme}</Typography>
    </HoverCard>
  );
};
