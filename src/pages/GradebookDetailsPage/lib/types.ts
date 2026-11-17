import type { GradebookStudentListModel } from '@entities/gradebook';
import type { StudentModel } from '@entities/user';

export type GradebookModifier = (
  data: GradebookStudentListModel,
) => GradebookStudentListModel;

export type UseCuratedStudentsResult = {
  student: StudentModel;
  students: StudentModel[];
  setStudent: (s: StudentModel) => void;
};
