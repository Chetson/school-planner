import { createColumnHelper } from '@tanstack/react-table';

import { Role } from '@entities/user';
import { AccessRole } from '@features/AccessRole';
import { CommonTableCell } from '@features/CommonTableCell';
import { TableActions } from '@features/TableActions';
import { UsersCollapseList } from '@features/UsersCollapseList';

import { TableAccessorKey } from './types';

import type { RoomModel } from '@entities/room';

const columnHelper = createColumnHelper<RoomModel>();

export const ROOMS_TABLE_COLUMNS = [
  columnHelper.accessor(
    ({ basedClass, roomName }) => (
      <CommonTableCell title={roomName} subtitle={basedClass?.className} />
    ),
    {
      id: TableAccessorKey.ROOM,
      header: 'Кабинет',
      size: 310,
      cell: (info) => info.renderValue(),
    },
  ),
  columnHelper.accessor(
    ({ staff }) => (staff?.length ? <UsersCollapseList users={staff} /> : null),
    {
      id: TableAccessorKey.TEACHER,
      header: 'Учитель',
      size: Number.MAX_SAFE_INTEGER,
      cell: (info) => info.renderValue(),
      enableSorting: false,
    },
  ),
  columnHelper.display({
    id: TableAccessorKey.UTILITY,
    header: '',
    size: 88,
    cell: (info) => (
      <AccessRole role={Role.ADMIN}>
        <TableActions
          model={info.cell.row.original}
          meta={info.table.options.meta}
        />
      </AccessRole>
    ),
    enableSorting: false,
  }),
];
