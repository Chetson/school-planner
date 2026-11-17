import { memo, useMemo } from 'react';

import { GradebookTable } from './features/GradebookTable';
import {
  getLessonColumns,
  getTotalScoresColumns,
  getSubjectColumns,
  createSubjectsGradebookRows,
  getLessonSummaryColumn,
  getPresenceColumns,
  getCommentColumns,
} from './lib';

import type { SubjectColumnsProps } from './lib';
import type { GradebookSubjectListModel } from '@entities/gradebook';
import type { FC } from 'react';

export type GradebookSubjectList = {
  data: GradebookSubjectListModel;
} & SubjectColumnsProps;

const GradebookSubjectList: FC<GradebookSubjectList> = ({
  data,
  student,
  studentList,
  onSelectStudent,
}) => {
  const columns = useMemo(
    () => [
      ...getSubjectColumns({
        student,
        studentList,
        onSelectStudent,
      }),
      ...getLessonColumns({
        lessons: data.dates,
        getColumns: (lesson, ref) => [
          ...getPresenceColumns({
            lesson,
            canAddColumns: false,
            ref,
          }),
          ...getLessonSummaryColumn(lesson),
          ...getCommentColumns({ lesson, ref }),
        ],
      }),
      ...getTotalScoresColumns(data.quarter),
    ],
    [data, student, studentList, onSelectStudent],
  );

  const rows = useMemo(() => createSubjectsGradebookRows(data), [data]);

  return <GradebookTable rows={rows} columns={columns} />;
};

export default memo(GradebookSubjectList);
