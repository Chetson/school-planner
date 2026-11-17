import type { CreateUserPayload } from '@entities/user';
import type { UploadedUsers } from '@pages/UploadUsersPage/lib';
import { createColumnHelper } from '@tanstack/react-table';

import { ErrorCell } from '../ui/ErrorCell';
import { UserCell } from '../ui/UserCell';

import type { TableData } from './types';
import { TableAccessorKey } from './types';

const columnHelper = createColumnHelper<TableData>();

export const TABLE_COLUMNS = [
  columnHelper.accessor(TableAccessorKey.NAME, {
    cell: (info) => info.renderValue(),
    size: 9999,
  }),
  columnHelper.accessor(TableAccessorKey.ERROR, {
    cell: (info) => info.renderValue(),
    size: 200,
  }),
];

const createTableRow = (user: CreateUserPayload, isFailed = false) => ({
  [TableAccessorKey.NAME]: (
    <UserCell
      firstName={user.firstName}
      lastName={user.lastName}
      patronim={user.patronim}
      email={user.email}
      isFailed={isFailed}
    />
  ),
  [TableAccessorKey.ERROR]: <ErrorCell isFailed={isFailed} />,
});

export const createTableData = (data: UploadedUsers) =>
  data.failed
    .map((user) => createTableRow(user.userData, true))
    .concat(data.successfull.map((user) => createTableRow(user)));
