import { createColumnHelper } from '@tanstack/react-table';

import { parseDateToFrontFormat } from '@shared/helpers';
import { CollapseList } from '@shared/ui';

import { TableAccessorKey } from './types';
import { TableOptions } from '../TableOptions';

import type { ThemeModel } from '@entities/theme';

const columnHelper = createColumnHelper<ThemeModel>();

export const THEMES_TABLE_COLUMNS = [
  columnHelper.accessor(
    ({ lessonDate }) =>
      lessonDate?.length ? (
        <CollapseList
          list={lessonDate.map(
            (date) => parseDateToFrontFormat(new Date(date))!,
          )}
        />
      ) : null,
    {
      id: TableAccessorKey.DATE,
      header: 'Даты уроков',
      cell: (info) => info.renderValue(),
      enableSorting: false,
      size: 100,
    },
  ),
  columnHelper.accessor(({ name }) => name, {
    id: TableAccessorKey.THEME,
    header: 'Тема урока',
    cell: (info) => info.renderValue(),
    enableSorting: false,
    size: 450,
  }),
  columnHelper.accessor(({ totalHours }) => `${totalHours} ч`, {
    id: TableAccessorKey.HOURS,
    header: 'Количество часов',
    size: 450,
    cell: (info) => info.renderValue(),
    enableSorting: false,
  }),
  columnHelper.display({
    id: TableAccessorKey.OPTIONS,
    header: '',
    size: 80,
    cell: (info) => (
      <TableOptions
        meta={info.table.options.meta}
        theme={info.cell.row.original}
      />
    ),
    enableSorting: false,
  }),
];
