import { useState } from 'react';

import * as CollapsiblePrimitive from '@radix-ui/react-collapsible';

import { SwitchIcon } from '../SwitchIcon';
import { Typography } from '../Typography';

import type { FC } from 'react';

export interface CollapseListProps {
  list: string[];
}

export const CollapseList: FC<CollapseListProps> = ({ list }) => {
  const [opened, setOpened] = useState(false);

  if (!list.length) {
    return null;
  }

  const [firstItem, ...restList] = list;

  const firstItemContent = (
    <Typography className="block truncate" variant="regular3">
      {firstItem}
    </Typography>
  );

  if (!restList.length) {
    return firstItemContent;
  }

  return (
    <CollapsiblePrimitive.Root
      className="space-y-2 w-full"
      onOpenChange={setOpened}
    >
      {firstItemContent}
      <CollapsiblePrimitive.CollapsibleContent className="space-y-2">
        {restList.map((item) => (
          <Typography key={item} variant="regular3" className="block truncate">
            {item}
          </Typography>
        ))}
      </CollapsiblePrimitive.CollapsibleContent>
      <CollapsiblePrimitive.CollapsibleTrigger>
        <Typography
          variant="regular3"
          className="!text-decorative-mint flex items-center"
        >
          {opened ? 'Свернуть' : `Ещё ${restList.length}`}{' '}
          <SwitchIcon opened={opened} />
        </Typography>
      </CollapsiblePrimitive.CollapsibleTrigger>
    </CollapsiblePrimitive.Root>
  );
};
