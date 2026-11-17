import { createColumnHelper } from '@tanstack/react-table';

import { Role } from '@entities/user';
import { AccessRole } from '@features/AccessRole';
import { CuratorBadge } from '@features/CuratorBadge';
import { RoleBadge } from '@features/RoleBadge';
import { TableActions } from '@features/TableActions';
import { parseDateToFrontFormat } from '@shared/helpers';

import { TableAccessorKey } from './types';
import { CellWrapperWithBlock } from '../ui/CellWrapper';
import { UserCell } from '../ui/UserCell';

import type { UserModel } from '@entities/user';
import type { CellContext } from '@tanstack/react-table';
import type { ReactNode } from 'react';

const columnHelper = createColumnHelper<UserModel>();

const wrapCellValue = (info: CellContext<UserModel, ReactNode>) => (
  <CellWrapperWithBlock isBlocked={info.cell.row.original.isBlocked}>
    {info.renderValue()}
  </CellWrapperWithBlock>
);

const getUserCell = (user: UserModel) => (
  <UserCell
    userId={user.id}
    firstName={user.firstName}
    lastName={user.lastName}
    patronim={user.patronim}
    email={user.email}
  />
);

export const USERS_TABLE_COLUMNS = [
  columnHelper.accessor(getUserCell, {
    id: TableAccessorKey.NAME,
    header: 'Пользователь',
    size: 250,
    cell: wrapCellValue,
  }),
  columnHelper.accessor(
    (user) =>
      user.birthDate && parseDateToFrontFormat(new Date(user.birthDate)),
    {
      id: TableAccessorKey.BIRTH_DATE,
      header: 'День рождения',
      size: 150,
      cell: wrapCellValue,
    },
  ),
  columnHelper.accessor(
    (user: UserModel) => {
      const isCurator = user.role === Role.TEACHER && user?.extra.isCurator;
      const curatedClassName =
        isCurator && user.extra.curatedClasses.length > 0
          ? user.extra.curatedClasses?.[0].className
          : undefined;

      return (
        <div className="flex flex-col items-start gap-1">
          <RoleBadge role={user.role} />
          {isCurator && <CuratorBadge clsName={curatedClassName} />}
        </div>
      );
    },
    {
      id: TableAccessorKey.ROLE,
      header: 'Роль',
      size: 150,
      enableSorting: false,
      cell: wrapCellValue,
    },
  ),
  columnHelper.accessor((user) => user.phoneNumber, {
    id: TableAccessorKey.PHONE,
    header: 'Телефон',
    size: 176,
    enableSorting: false,
    cell: wrapCellValue,
  }),
  columnHelper.accessor((user) => user.city, {
    id: TableAccessorKey.CITY,
    header: 'Город',
    size: 192,
    cell: wrapCellValue,
  }),
  columnHelper.accessor((user) => user.rawPassword, {
    id: TableAccessorKey.PASSWORD,
    header: 'Пароль',
    size: 110,
    enableSorting: false,
    cell: wrapCellValue,
  }),
  columnHelper.display({
    id: TableAccessorKey.UTILITY,
    header: '',
    enableSorting: false,
    size: 88,
    cell: (info) => (
      <AccessRole role={Role.ADMIN}>
        <TableActions
          model={info.cell.row.original}
          isBlocked={info.cell.row.original.isBlocked}
          meta={info.table.options.meta}
        />
      </AccessRole>
    ),
  }),
];
