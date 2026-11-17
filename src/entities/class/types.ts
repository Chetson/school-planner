import type { classBaseSchema, classSchema } from './schema';
import type { CommonApiError, ValidationApiError } from '@shared/helpers';
import type { ApiList } from '@shared/types';
import type { z } from 'zod';

export type ClassBaseModel = z.infer<typeof classBaseSchema>;

export type ClassModel = z.infer<typeof classSchema>;

export interface CreateClassPayload {
  className: string;
  baseClassroom?: number | null;
  curatorIds?: number[];
  studentIds?: number[];
}

export interface UpdateClassPayload {
  id: number;
  data: {
    className?: string;
    baseClassroom?: number | null;
    curatorIdsAdd?: number[] | null;
    curatorIdsRemove?: number[] | null;
    studentIdsAdd?: number[] | null;
    studentIdsRemove?: number[] | null;
  };
}

export type ClassesListModel = ApiList<ClassModel>;

export type SaveClassError =
  | ValidationApiError<CreateClassPayload>
  | CommonApiError;
