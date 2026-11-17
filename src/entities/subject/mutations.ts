import { api, apiUrls, createApiFn } from '@shared/api';

import type {
  CreateSubjectPayload,
  SubjectModel,
  UpdateSubjectPayload,
} from './types';

export const createSubjectMutationFn = createApiFn<
  SubjectModel,
  CreateSubjectPayload
>((data) => api.post(apiUrls.SUBJECTS.CREATE, data));

export const deleteSubjectMutationFn = createApiFn<void, { id: number }>(
  ({ id }) => api.delete(apiUrls.SUBJECTS.SUBJECT(id)),
);

export const updateSubjectMutationFn = createApiFn<
  SubjectModel,
  UpdateSubjectPayload
>(({ id, data }) => api.patch(apiUrls.SUBJECTS.SUBJECT(id), data));
