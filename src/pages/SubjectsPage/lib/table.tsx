import { createColumnHelper } from '@tanstack/react-table';

import { TableActions } from '@features/TableActions';

import { TableAccessorKey } from './types';

import type { SubjectModel } from '@entities/subject';

const columnHelper = createColumnHelper<SubjectModel>();

export const SUBJECTS_TABLE_COLUMNS = [
  columnHelper.accessor(TableAccessorKey.SUBJECT, {
    header: 'Предмет',
    size: Number.MAX_SAFE_INTEGER,
  }),
  columnHelper.display({
    id: TableAccessorKey.UTILITY,
    header: '',
    size: 88,
    cell: (info) => (
      <TableActions
        model={info.cell.row.original}
        meta={info.table.options.meta}
      />
    ),
    enableSorting: false,
  }),
];
