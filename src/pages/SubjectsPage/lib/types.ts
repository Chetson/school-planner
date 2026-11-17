import type { SubjectModel } from '@entities/subject';

export enum TableAccessorKey {
  SUBJECT = 'name',
  UTILITY = 'utility',
}

export type TableAction = (subject: SubjectModel) => void;
