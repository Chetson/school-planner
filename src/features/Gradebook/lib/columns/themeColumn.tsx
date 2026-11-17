import { ThemeHeaderReadonly } from '@features/Gradebook/features';

import { columnHelper } from '../helpers';
import { TableAccessorKey } from '../types';

import type { GradebookRow } from '../types';
import type { GradebookLessonStudentListModel } from '@entities/gradebook';
import type {
  AccessorFnColumnDef,
  GroupColumnDef,
} from '@tanstack/react-table';

export type ThemeColumnsProps = {
  lesson: GradebookLessonStudentListModel;
  getColumns: (
    lesson: GradebookLessonStudentListModel,
  ) => AccessorFnColumnDef<GradebookRow, JSX.Element>[];
};

export const getThemeColumn = ({
  lesson,
  getColumns,
}: ThemeColumnsProps): GroupColumnDef<GradebookRow, unknown>[] => [
  columnHelper.group({
    id: `${lesson.id}_${TableAccessorKey.THEME}`,
    header: () => (
      <ThemeHeaderReadonly theme={lesson.theme} lessonId={lesson.id} />
    ),
    columns: getColumns(lesson),
  }),
];
