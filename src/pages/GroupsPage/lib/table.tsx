import { createColumnHelper } from '@tanstack/react-table';

import { CommonTableCell } from '@features/CommonTableCell';
import { TableActions } from '@features/TableActions';
import { UsersCollapseList } from '@features/UsersCollapseList';
import { getLastNameAndInitials, getStudentName } from '@shared/helpers';
import { CollapseList } from '@shared/ui';

import { TableAccessorKey } from './types';

import type { GroupModel } from '@entities/group';

const columnHelper = createColumnHelper<GroupModel>();

export const GROUPS_TABLE_COLUMNS = [
  columnHelper.accessor(
    ({ groupClass }) =>
      groupClass?.length ? (
        <CollapseList list={groupClass.map(({ className }) => className)} />
      ) : null,
    {
      id: TableAccessorKey.CLASS,
      header: 'Классы',
      size: 124,
      cell: (info) => info.renderValue(),
      enableSorting: false,
    },
  ),
  columnHelper.accessor(({ subject }) => subject?.name, {
    id: TableAccessorKey.SUBJECT,
    header: 'Предмет',
    size: 244,
    cell: (info) => info.renderValue(),
  }),
  columnHelper.accessor(
    ({ name, room }) => (
      <CommonTableCell
        title={name}
        subtitle={room ? `${room.roomName}` : null}
      />
    ),
    {
      id: TableAccessorKey.GROUP,
      header: 'Группа',
      size: 160,
      cell: (info) => info.renderValue(),
    },
  ),
  columnHelper.accessor(({ teacher }) => getLastNameAndInitials(teacher), {
    id: TableAccessorKey.TEACHER,
    header: 'Учитель',
    size: 244,
    cell: (info) => info.renderValue(),
  }),
  columnHelper.accessor(
    ({ students }) =>
      students?.length ? (
        <UsersCollapseList users={students} getUserName={getStudentName} />
      ) : null,
    {
      header: 'Ученики',
      id: TableAccessorKey.STUDENTS,
      enableSorting: false,
      size: 244,
      cell: (info) => info.renderValue(),
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
