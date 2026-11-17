import { createColumnHelper } from '@tanstack/react-table';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale/ru';

import { getStudentName } from '@shared/helpers';

import { EDITABLE_COMPONENTS, READONLY_COMPONENTS } from './config';

import type { GradebookComponents, GradebookRow } from './types';
import type {
  GradebookStudentListModel,
  GradebookSubjectListModel,
  GradebookStudentModel,
} from '@entities/gradebook';
import type { CellContext } from '@tanstack/react-table';

export const formatLessonDate = (date: string) => {
  return format(new Date(date), 'd MMMM yyyy EEEE', {
    locale: ru,
  });
};

export const getStudentsMap = (studentList: GradebookStudentModel[]) =>
  studentList.reduce<Record<number, GradebookStudentModel>>((map, student) => {
    map[student.student.id] = student;

    return map;
  }, {});

export const getComponents = (
  isEditable: boolean | undefined,
): GradebookComponents =>
  isEditable ? EDITABLE_COMPONENTS : READONLY_COMPONENTS;

export const renderCell = (info: CellContext<GradebookRow, unknown>) =>
  info.renderValue();

export const columnHelper = createColumnHelper<GradebookRow>();

export const sortGradebookRows = (rows: GradebookRow[]) =>
  rows.sort((a, b) =>
    a.title.localeCompare(b.title, 'ru', { sensitivity: 'base' }),
  );

export const createStudentsGradebookRows = (
  data: GradebookStudentListModel,
): GradebookRow[] => {
  const rows = data.dates.reduce<Record<number, GradebookRow>>(
    (rows, lesson) => {
      lesson.studentList.forEach(
        ({ student, presence, comment, scores, canEdit }) => {
          if (!rows[student.id]) {
            rows[student.id] = {
              id: student.id,
              data: {},
              title: getStudentName(student),
              total: data.totalScore[student.id],
              canEdit,
            };
          }

          rows[student.id].data[lesson.id] = {
            date: lesson.eventDate,
            scores,
            comment,
            presence,
          };
        },
      );

      return rows;
    },
    {},
  );

  return sortGradebookRows(Object.values(rows));
};

export const createSubjectsGradebookRows = (
  data: GradebookSubjectListModel,
): GradebookRow[] => {
  const rows = data.dates.reduce<Record<number, GradebookRow>>(
    (rows, lesson) => {
      lesson.subjectList.forEach(
        ({ subject, presence, comment, scores, theme }) => {
          if (!rows[subject.id]) {
            rows[subject.id] = {
              id: subject.id,
              data: {},
              title: subject.name,
              total: data.totalScore[subject.id],
              canEdit: false,
            };
          }

          rows[subject.id].data[lesson.id] = {
            date: lesson.eventDate,
            scores,
            comment,
            presence,
            theme,
          };
        },
      );

      return rows;
    },
    {},
  );

  return sortGradebookRows(Object.values(rows));
};
