import { createColumnHelper } from '@tanstack/react-table';

import { ACTIVITY_FIELDS } from '@entities/activity';
import { TableActions } from '@features/TableActions';
import { omit } from '@shared/helpers';

import { TableAccessorKey } from './lib/types';

import type { ActivityModel } from '@entities/activity';

const columnHelper = createColumnHelper<ActivityModel>();

export const ACTIVITIES_TABLE_COLUMNS = [
  columnHelper.accessor(({ name }) => name, {
    id: TableAccessorKey.NAME,
    header: ACTIVITY_FIELDS.NAME,
    cell: (info) => info.renderValue(),
  }),
  columnHelper.accessor(({ shortname }) => shortname, {
    id: TableAccessorKey.SHORTNAME,
    header: ACTIVITY_FIELDS.SHORT_NAME,
    cell: (info) => info.renderValue(),
  }),
  columnHelper.accessor(({ koef }) => koef, {
    id: TableAccessorKey.COEF,
    header: ACTIVITY_FIELDS.COEF,
    cell: (info) => info.renderValue(),
    enableSorting: false,
  }),
  columnHelper.display({
    id: TableAccessorKey.UTILITY,
    header: '',
    size: 88,
    cell: (info) => {
      const meta = { ...info.table.options.meta };

      return (
        <TableActions
          model={info.cell.row.original}
          meta={
            info.cell.row.original?.defaultActivity
              ? omit(meta, ['onDelete'])
              : meta
          }
        />
      );
    },
    enableSorting: false,
  }),
];
