export enum HttpMethod {
  POST = 'POST',
  PATCH = 'PATCH',
  GET = 'GET',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export type Tokens = {
  access: string;
  refresh: string;
};

export type ApiSection = (...parts: (string | number)[]) => string;
