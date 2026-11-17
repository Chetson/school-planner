import type { ClassModel } from '@entities/class';

export enum TableAccessorKey {
  CLASS = 'class_name',
  CURATOR = 'curators',
  STUDENTS = 'students',
  SUBJECTS = 'subjects',
  ACTIONS = 'actions',
}

export type TableAction = (cls: ClassModel) => void;
