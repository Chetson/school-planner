import { api, apiUrls, createApiFn } from '@shared/api';
import { DEFAULT_ERROR_MATCH } from '@shared/helpers';

import type {
  ClassBaseModel,
  ClassModel,
  CreateClassPayload,
  UpdateClassPayload,
} from './types';

export const updateClassMutationFn = createApiFn<
  ClassModel,
  UpdateClassPayload
>(({ id, data }) => {
  return api.patch(apiUrls.CLASSES.CLASS(id), data);
}, DEFAULT_ERROR_MATCH);

export const createClassMutationFn = createApiFn<
  ClassModel,
  CreateClassPayload
>((data) => {
  return api.post(apiUrls.CLASSES.CREATE, data);
}, DEFAULT_ERROR_MATCH);

export const deleteClassMutationFn = createApiFn<void, ClassBaseModel>(
  ({ id }) => api.delete(apiUrls.CLASSES.CLASS(id)),
);
