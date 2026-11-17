import { DisabledCell, SubHeader } from '@features/Gradebook/ui';
import { Typography } from '@shared/ui';

import { columnHelper, getComponents, renderCell } from '../helpers';
import { TableAccessorKey } from '../types';

import type { LessonRef } from '../types';
import type { GradebookLessonModel } from '@entities/gradebook';

export type CommentColumnsProps<Lesson extends GradebookLessonModel> = {
  lesson: Lesson;
  ref: LessonRef;
};

export const getCommentColumns = <Lesson extends GradebookLessonModel>({
  lesson,
  ref,
}: CommentColumnsProps<Lesson>) => [
  columnHelper.accessor(
    ({ data, id, canEdit }) => {
      if (!data[lesson.id]) {
        return <DisabledCell />;
      }

      const { CommentCell } = getComponents(canEdit);

      return (
        <CommentCell
          comment={data[lesson.id].comment}
          lessonId={lesson.id}
          studentId={id}
          lessonRef={ref}
        />
      );
    },
    {
      id: `${lesson.id}${TableAccessorKey.COMMENT}`,
      size: 50,
      header: () => (
        <SubHeader>
          <Typography variant="caption1">Комментарий</Typography>
        </SubHeader>
      ),
      cell: renderCell,
    },
  ),
];
