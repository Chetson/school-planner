import { memo, useMemo } from 'react';

import { GradebookTable } from './features/GradebookTable';
import {
  GradebookActionsProvider,
  createStudentsGradebookRows,
  getStudentColumns,
  getLessonColumns,
  getTotalScoresColumns,
  useDummyActivityies,
  getActivityColumns,
  getThemeColumn,
  getPresenceColumns,
  getCommentColumns,
} from './lib';

import type {
  DeleteActivityType,
  ModifyActivityType,
  ModifyGradeType,
  ModifyPresenceType,
  ModifyThemeType,
} from './lib';
import type { ClassBaseModel } from '@entities/class';
import type { GradebookStudentListModel } from '@entities/gradebook';
import type { FC } from 'react';

export type GradebookStudentListProps = {
  cls?: ClassBaseModel | null;
  modifyActivity?: ModifyActivityType;
  deleteActivity?: DeleteActivityType;
  modifyGrade?: ModifyGradeType;
  modifyTheme?: ModifyThemeType;
  modifyPresence?: ModifyPresenceType;
  data: GradebookStudentListModel;
};

const GradebookStudentList: FC<GradebookStudentListProps> = ({
  cls,
  data,
  ...actions
}) => {
  const { dummyActivities, addDummyActivity, deleteDummyActivity } =
    useDummyActivityies();

  const columns = useMemo(
    () => [
      ...getStudentColumns(data.teacher, cls),
      ...getLessonColumns({
        lessons: data.dates,
        getColumns: (lesson, ref) =>
          getThemeColumn({
            lesson,
            getColumns: () => [
              ...getPresenceColumns({
                lesson,
                dummyActivities,
                canAddColumns: true,
                ref,
              }),
              ...getActivityColumns({ lesson, dummyActivities, ref }),
              ...getCommentColumns({ lesson, ref }),
            ],
          }),
      }),
      ...getTotalScoresColumns(data.quarter),
    ],
    [cls, dummyActivities, data],
  );

  const rows = useMemo(() => createStudentsGradebookRows(data), [data]);

  return (
    <GradebookActionsProvider
      {...actions}
      addDummyActivity={addDummyActivity}
      deleteDummyActivity={deleteDummyActivity}
    >
      <GradebookTable rows={rows} columns={columns} />
    </GradebookActionsProvider>
  );
};

export default memo(GradebookStudentList);
