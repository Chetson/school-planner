import { api, apiUrls, createApiFn } from '@shared/api';

import type {
  LoginApiParams,
  LoginApiResponse,
  ResetPasswordApiParams,
} from '../lib';

export const loginMutationFn = createApiFn<LoginApiResponse, LoginApiParams>(
  (data) => api.post(apiUrls.JWT.CREATE, data),
);

export const resetPasswordQueryFn = createApiFn<
  LoginApiResponse,
  ResetPasswordApiParams
>((data) => api.post(apiUrls.USERS.RECOVER_PASSWORD, data));
