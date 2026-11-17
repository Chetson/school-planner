import { HttpStatusCode } from 'axios';

const getCheckApiStatus = (checkStatus: number) => (status?: number | string) =>
  Number(status) === checkStatus;

export const isUnauthorizedStatus = getCheckApiStatus(
  HttpStatusCode.Unauthorized,
);
export const isBadRequestStatus = getCheckApiStatus(HttpStatusCode.BadRequest);
export const isNotFoundStatus = getCheckApiStatus(HttpStatusCode.NotFound);
export const isServerErrorStatus = getCheckApiStatus(
  HttpStatusCode.InternalServerError,
);
