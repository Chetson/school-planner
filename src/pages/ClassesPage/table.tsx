import { createColumnHelper } from '@tanstack/react-table';

import { CommonTableCell } from '@features/CommonTableCell';
import { TableActions } from '@features/TableActions';
import { UsersCollapseList } from '@features/UsersCollapseList';
import { getStudentName } from '@shared/helpers';

import { TableAccessorKey } from './lib/types';

import type { ClassModel } from '@entities/class';

const columnHelper = createColumnHelper<ClassModel>();

export const CLASSES_TABLE_COLUMNS = [
  columnHelper.accessor(
    ({ className, baseClassroom }) => (
      <CommonTableCell
        title={className}
        subtitle={baseClassroom?.roomName ? `${baseClassroom.roomName}` : null}
      />
    ),
    {
      id: TableAccessorKey.CLASS,
      header: 'Класс',
      size: 110,
      cell: (info) => info.renderValue(),
    },
  ),
  columnHelper.accessor(
    ({ curators }) =>
      curators?.length ? <UsersCollapseList users={curators} /> : null,
    {
      id: TableAccessorKey.CURATOR,
      header: 'Куратор',
      size: 300,
      cell: (info) => info.renderValue(),
      enableSorting: false,
    },
  ),
  columnHelper.accessor(
    ({ students }) =>
      students?.length ? (
        <UsersCollapseList users={students} getUserName={getStudentName} />
      ) : null,
    {
      id: TableAccessorKey.STUDENTS,
      header: 'Ученики',
      size: Number.MAX_SAFE_INTEGER,
      cell: (info) => info.renderValue(),
      enableSorting: false,
    },
  ),
  columnHelper.display({
    id: TableAccessorKey.ACTIONS,
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
