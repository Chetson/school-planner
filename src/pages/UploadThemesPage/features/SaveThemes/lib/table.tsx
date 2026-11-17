import { createColumnHelper } from '@tanstack/react-table';

import { Typography } from '@shared/ui';

import { TableAccessorKey } from './types';

import type { TableRow } from './types';
import type { UploadedThemes } from '@entities/theme';

const columnHelper = createColumnHelper<TableRow>();

export const TABLE_COLUMNS = [
  columnHelper.accessor(
    ({ theme }) => (
      <Typography variant="regular3" className="truncate">
        {theme}
      </Typography>
    ),
    {
      id: TableAccessorKey.THEME,
      header: 'Тема урока',
      cell: (info) => info.getValue(),
      size: 600,
    },
  ),
  columnHelper.accessor(
    ({ hours }) =>
      hours ? (
        <Typography variant="regular3">{`${hours} часов`}</Typography>
      ) : null,
    {
      id: TableAccessorKey.HOURS,
      header: 'Количество часов',
      cell: (info) => info.getValue(),
      size: 200,
    },
  ),
  columnHelper.accessor(
    ({ isError }) =>
      isError ? (
        <Typography variant="regular3" color="critical">
          Произошла ошибка
        </Typography>
      ) : null,
    {
      id: TableAccessorKey.ERROR,
      header: '',
      cell: (info) => info.getValue(),
    },
  ),
];

export const createTableData = (data: UploadedThemes): TableRow[] =>
  data.failed
    .map(({ lessonThemeData }) => ({
      theme: lessonThemeData.name,
      hours: lessonThemeData.totalHours,
      isError: true,
    }))
    .concat(
      data.successfull.map(({ name, totalHours }) => ({
        theme: name,
        hours: totalHours,
        isError: false,
      })),
    );
