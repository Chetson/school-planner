import { DisabledCell } from '@features/Gradebook/ui';

import { columnHelper, getComponents, renderCell } from '../helpers';
import { TableAccessorKey } from '../types';

import type { DummyActivities, GradebookRow, LessonRef } from '../types';
import type { GradebookLessonModel } from '@entities/gradebook';
import type { AccessorFnColumnDef } from '@tanstack/react-table';

export type PresenceColumnsProps<Lesson extends GradebookLessonModel> = {
  lesson: Lesson;
  dummyActivities?: DummyActivities;
  canAddColumns: boolean;
  ref: LessonRef;
};

export const getPresenceColumns = <Lesson extends GradebookLessonModel>({
  lesson,
  dummyActivities = new Set(),
  canAddColumns,
  ref,
}: PresenceColumnsProps<Lesson>): AccessorFnColumnDef<
  GradebookRow,
  JSX.Element
>[] => [
  columnHelper.accessor(
    ({ data, id, canEdit }) => {
      if (!data[lesson.id]) {
        return <DisabledCell />;
      }

      const { PresenceCell } = getComponents(canEdit);

      return (
        <PresenceCell
          lessonRef={ref}
          lessonId={lesson.id}
          studentId={id}
          presence={data[lesson.id].presence}
        />
      );
    },
    {
      id: `${lesson.id}_${TableAccessorKey.PRESENCE}`,
      size: 50,
      header: () => {
        // TODO регулировать редактирования
        const { PresenceHeader } = getComponents(canAddColumns);

        return (
          <PresenceHeader
            withAddButton={
              !dummyActivities.has(lesson.id) && !lesson.activities.length
            }
            lessonId={lesson.id}
          />
        );
      },
      cell: renderCell,
    },
  ),
];
