import { createColumnHelper } from '@tanstack/react-table';

import { Typography } from '@shared/ui';

import { TableAccessorKey } from './types';

import type { TableRow } from './types';
import type { UploadedEvents } from '@entities/event';

const columnHelper = createColumnHelper<TableRow>();

export const TABLE_COLUMNS = [
  columnHelper.accessor(
    ({ event }) => (
      <Typography variant="regular3" className="truncate">
        {event}
      </Typography>
    ),
    {
      id: TableAccessorKey.EVENT,
      enableSorting: false,
      header: 'Событие',
      cell: (info) => info.getValue(),
      size: 600,
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
      enableSorting: false,
      header: '',
      cell: (info) => info.getValue(),
    },
  ),
];

export const createTableData = (data: UploadedEvents): TableRow[] => {
  return data.failed
    .map(({ lesson }) => ({
      event: lesson.subject || 'Событие',
      isError: true,
    }))
    .concat(data.successful.map(() => ({ event: 'Событие', isError: false })));
};
