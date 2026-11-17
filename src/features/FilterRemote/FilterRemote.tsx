import { memo, useState } from 'react';

import { DropdownRemote } from '@features/DropdownRemote';
import { Button, Dropdown, SwitchIcon, Typography } from '@shared/ui';

import type { DropdownRemotePropsBase } from '@features/DropdownRemote';

export type FilterRemoteProps<
  Model extends object,
  QueryKey extends unknown[],
> = {
  onChange: (value: Model | null) => void;
  value: Model | null;
} & DropdownRemotePropsBase<number, Model, QueryKey>;

const FilterRemote = <Model extends object, QueryKey extends unknown[]>({
  children,
  ...props
}: FilterRemoteProps<Model, QueryKey>) => {
  const [opened, setOpen] = useState(false);

  return (
    <DropdownRemote
      {...props}
      isOpened={opened}
      onOpenChange={setOpen}
      isAutoWidth={false}
      popoverClassName="w-72"
    >
      <Dropdown.Trigger asChild>
        <Button
          className="min-w-32 max-w-48"
          isFullSize={false}
          variant="blank"
          rightElement={<SwitchIcon opened={opened} />}
        >
          <Typography className="truncate" variant="regular3" color="secondary">
            {children}
          </Typography>
        </Button>
      </Dropdown.Trigger>
    </DropdownRemote>
  );
};

export default memo(FilterRemote) as typeof FilterRemote;
