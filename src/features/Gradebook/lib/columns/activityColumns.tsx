import { DisabledCell } from '@features/Gradebook/ui';

import { DummyActivityHeader } from '../../features';
import {
  columnHelper,
  getComponents,
  getStudentsMap,
  renderCell,
} from '../helpers';
import { TableAccessorKey } from '../types';

import type { DummyActivities, LessonRef } from '../types';
import type { GradebookLessonStudentListModel } from '@entities/gradebook';
import type { GradebookStudentModel } from '@entities/gradebook';

export type ActivityColumnsProps = {
  lesson: GradebookLessonStudentListModel;
  dummyActivities: DummyActivities;
  ref: LessonRef;
};

const hasScore = (
  activityId: number,
  studentsMap: Record<number, GradebookStudentModel>,
) => Object.values(studentsMap).some((student) => student.scores[activityId]);

export const getActivityColumns = ({
  lesson: { id, activities, studentList },
  dummyActivities,
  ref,
}: ActivityColumnsProps) => {
  const studentsMap = getStudentsMap(studentList);

  const columns = activities.map((data, index) =>
    columnHelper.accessor(
      (row) => {
        if (!row.data[id]) {
          return <DisabledCell />;
        }

        const { GradeCell } = getComponents(row.canEdit);

        return (
          <GradeCell
            activityId={data.activity.id}
            studentId={row.id}
            lessonId={id}
            score={row.data[id].scores[data.activity.id]?.score}
            lessonRef={ref}
          />
        );
      },
      {
        id: `${id}_${data.activity.id}`,
        size: 50,
        header: () => {
          const { ActivityHeader } = getComponents(true);

          return (
            <ActivityHeader
              lessonId={id}
              gradebookActivity={data}
              withAddButton={
                index === activities.length - 1 && !dummyActivities.has(id)
              }
              isDeleteAllowed={!hasScore(data.activity.id, studentsMap)}
            />
          );
        },
        cell: renderCell,
      },
    ),
  );

  if (dummyActivities.has(id)) {
    columns.push(
      columnHelper.accessor(
        (row) => (row.data[id] ? <></> : <DisabledCell />),
        {
          id: `${id}${TableAccessorKey.DUMMY_ACTIVITY}`,
          size: 50,
          header: () => <DummyActivityHeader lessonId={id} />,
          cell: renderCell,
        },
      ),
    );
  }

  return columns;
};
