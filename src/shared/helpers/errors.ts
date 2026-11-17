import { isAxiosError } from 'axios';
import { HttpStatusCode } from 'axios';

import { text } from './text';

import type { FormFieldError } from './forms';

export enum ApiErrorKind {
  COMMON = 'COMMON_ERROR',
  NOT_FOUND = 'NOT_FOUND',
  VALIDATION = 'VALIDATION_ERROR',
  UNAUTHORIZED = 'UNAUTHORIZED_ERROR',
}

export const DEFAULT_ERROR_MATCH = {
  [HttpStatusCode.BadRequest]: ApiErrorKind.VALIDATION,
  [HttpStatusCode.Unauthorized]: ApiErrorKind.UNAUTHORIZED,
};

export type ApiError<Id = ApiErrorKind, Detail = string> = {
  id: Id;
  detail: Detail;
};

export type CommonApiError = ApiError<ApiErrorKind.COMMON>;

export type ValidationApiError<Fields> = ApiError<
  ApiErrorKind.VALIDATION,
  Partial<Record<keyof Fields, FormFieldError[]>>
>;

export const normalizeApiError = <Detail = string, Error = ApiError<Detail>>(
  error: unknown,
  config: Partial<Record<HttpStatusCode, ApiErrorKind>> = DEFAULT_ERROR_MATCH,
): Error | CommonApiError => {
  if (isAxiosError(error) && error.response?.status) {
    const status = error.response?.status as HttpStatusCode;
    const detail = error.response?.data?.detail;
    const id = config?.[status];

    if (id) {
      return { id, detail } as Error;
    }
  }

  return { id: ApiErrorKind.COMMON, detail: text.COMMON_ERROR } as Error;
};
