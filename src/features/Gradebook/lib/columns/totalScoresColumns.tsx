import { arabicToRoman } from '@shared/helpers';
import { Typography } from '@shared/ui';

import { Header, StaticCell, SubHeader } from '../../ui';
import { columnHelper, renderCell } from '../helpers';
import { TableAccessorKey } from '../types';

export const getTotalScoresColumns = (quarter: number) => [
  columnHelper.group({
    id: TableAccessorKey.TOTAL_SCORES,
    header: () => <Header>Итог</Header>,
    columns: [
      columnHelper.accessor(({ total }) => <StaticCell>{total}</StaticCell>, {
        id: TableAccessorKey.TOTAL_SCORE,
        header: () => (
          <SubHeader>
            <Typography variant="caption1">{`${arabicToRoman(quarter)} чт`}</Typography>
          </SubHeader>
        ),
        cell: renderCell,
        size: 48,
      }),
    ],
  }),
];
