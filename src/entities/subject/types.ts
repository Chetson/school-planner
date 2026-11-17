import type { subjectBaseSchema, subjectSchema } from './schema';
import type { CommonApiError, ValidationApiError } from '@shared/helpers';
import type { ApiList } from '@shared/types';
import type { z } from 'zod';

export type SubjectBaseModel = z.infer<typeof subjectBaseSchema>;

export type SubjectModel = z.infer<typeof subjectSchema>;

export interface CreateSubjectPayload {
  name: string;
}

export type SaveSubjectError =
  | ValidationApiError<SubjectModel>
  | CommonApiError;

export type SubjectListModel = ApiList<SubjectModel>;

export interface UpdateSubjectPayload {
  id: number;
  data: Partial<CreateSubjectPayload>;
}
