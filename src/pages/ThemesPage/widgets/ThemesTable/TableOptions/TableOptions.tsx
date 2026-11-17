import { IconKind, useToggle } from '@shared/helpers';
import { Dropdown, Popover } from '@shared/ui';
import { IconButton } from '@shared/ui/IconButton';

import { createOptions } from './lib/helpers';
import { TableOption } from './ui/TableOption';

import type { TableOptionsItemType } from './lib/types';
import type { ThemeModel } from '@entities/theme';
import type { TableMeta } from '@tanstack/react-table';
import type { FC } from 'react';

export type TableOptionsProps = {
  meta?: TableMeta<ThemeModel>;
  theme: ThemeModel;
};

// TODO привести к соответствию с макетом
export const TableOptions: FC<TableOptionsProps> = ({ meta, theme }) => {
  const [opened, { close, setOpened }] = useToggle();
  const options = createOptions(meta ?? {});

  const handleClickOption = (item: TableOptionsItemType) => {
    item.callback(theme);
    close();
  };

  return (
    <div className="w-full h-full flex justify-end items-center">
      <Popover
        align="end"
        isOpened={opened}
        isAutoWidth={false}
        onOpenChange={setOpened}
        popoverClassName="rounded-lg width w-44"
        anchorClassName="flex justify-end items-center"
        anchor={
          <Dropdown.Trigger asChild>
            <IconButton icon={IconKind.OPTIONS} />
          </Dropdown.Trigger>
        }
      >
        {options.map((option) => (
          <TableOption
            key={option.title}
            option={option}
            onClick={handleClickOption}
          />
        ))}
      </Popover>
    </div>
  );
};
