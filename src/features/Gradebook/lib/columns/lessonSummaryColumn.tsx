import { Typography } from '@shared/ui';

import { DisabledCell, LessonSummaryCell, SubHeader } from '../../ui';
import { columnHelper, renderCell } from '../helpers';
import { TableAccessorKey } from '../types';

import type { GradebookLessonSubjectListModel } from '@entities/gradebook';

export const getLessonSummaryColumn = ({
  id,
  activities,
}: GradebookLessonSubjectListModel) => [
  columnHelper.accessor(
    ({ data }) =>
      data[id]?.scores ? (
        <LessonSummaryCell
          scores={data[id].scores}
          activities={activities}
          theme={data[id].theme}
        />
      ) : (
        <DisabledCell />
      ),
    {
      id: `${id}_${TableAccessorKey.LESSON_SUMMARY}`,
      header: () => (
        <SubHeader>
          <Typography variant="caption1">Деятельность</Typography>
        </SubHeader>
      ),
      cell: renderCell,
    },
  ),
];
