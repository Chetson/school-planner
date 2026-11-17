import { createRef } from 'react';

import { Header } from '../../ui';
import { columnHelper, formatLessonDate } from '../helpers';

import type { GradebookRow, LessonHandlers } from '../types';
import type { GradebookLessonModel } from '@entities/gradebook';
import type {
  AccessorFnColumnDef,
  GroupColumnDef,
} from '@tanstack/react-table';
import type { RefObject } from 'react';

export type GetLessonChildrenColumns<RowModel extends object> = (
  lesson: GradebookLessonModel<RowModel>,
  ref: RefObject<LessonHandlers>,
) =>
  | AccessorFnColumnDef<GradebookRow, JSX.Element>[]
  | GroupColumnDef<GradebookRow, JSX.Element>[];

export const getLessonColumns = <RowModel extends object>({
  lessons,
  getColumns,
}: {
  lessons: GradebookLessonModel<RowModel>[];
  getColumns: GetLessonChildrenColumns<RowModel>;
}) =>
  lessons.map((lesson) => {
    const ref = createRef<LessonHandlers>();

    return columnHelper.group({
      id: String(lesson.id),
      header: () => (
        <Header ref={ref}>{formatLessonDate(lesson.eventDate)}</Header>
      ),
      columns: getColumns(lesson, ref),
    });
  });
