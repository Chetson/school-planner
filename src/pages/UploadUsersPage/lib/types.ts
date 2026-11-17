import type { ValidationUserError, CreateUserPayload } from '@entities/user';

export type FailedUser = {
  userData: CreateUserPayload;
  failures: ValidationUserError;
};

export type UploadedUsers = {
  successfull: CreateUserPayload[];
  failed: FailedUser[];
};
