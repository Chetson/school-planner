import { api, apiUrls, createApiFn } from '@shared/api';
import { DEFAULT_ERROR_MATCH } from '@shared/helpers';

import type {
  CreateUserPayload,
  UpdateUserPayload,
  UserModel,
} from '@entities/user';

export const createUsersMutationFn = createApiFn<
  UserModel[],
  { users: CreateUserPayload[] }
>((data) => api.post(apiUrls.USERS.CREATE, data.users), DEFAULT_ERROR_MATCH);

export const updateUserMutationFn = createApiFn<UserModel, UpdateUserPayload>(
  ({ id, data }) => api.patch(apiUrls.USERS.USER(id), data),
  DEFAULT_ERROR_MATCH,
);
