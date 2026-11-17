import { getLastNameAndInitials } from '@shared/helpers';
import { Typography } from '@shared/ui';

import { Header, SubHeader, StaticCell } from '../../ui';
import { columnHelper, renderCell } from '../helpers';
import { TableAccessorKey } from '../types';

import type { ClassBaseModel } from '@entities/class';
import type { UserBaseModel } from '@entities/user';

export const getStudentColumns = (
  teacher?: UserBaseModel,
  cls?: ClassBaseModel | null,
) => [
  columnHelper.group({
    id: TableAccessorKey.STUDENTS,
    header: () => (
      <Header>{teacher ? getLastNameAndInitials(teacher) : ''}</Header>
    ),
    columns: [
      columnHelper.accessor(
        ({ title }) => (
          <StaticCell>
            <Typography className="text-nowrap" variant="regular3">
              {title}
            </Typography>
          </StaticCell>
        ),
        {
          id: TableAccessorKey.STUDENTS,
          header: () =>
            cls ? (
              <SubHeader>
                <Typography variant="caption1">{cls.className}</Typography>
              </SubHeader>
            ) : null,
          cell: renderCell,
        },
      ),
    ],
  }),
];
