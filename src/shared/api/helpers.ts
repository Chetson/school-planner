import { normalizeApiError } from '@shared/helpers';

import type { ApiErrorKind } from '@shared/helpers';
import type {
  MutationFunction,
  QueryFunction,
  QueryFunctionContext,
} from '@tanstack/react-query';
import type { AxiosResponse } from 'axios';

export function createApiFn<
  Data,
  RequestArgs extends object & { [Symbol.iterator]?: never },
>(
  request: (args: RequestArgs) => Promise<AxiosResponse<Data>>,
  errorConfig?: Record<number, ApiErrorKind>,
): MutationFunction<Data, RequestArgs>;

export function createApiFn<
  Data,
  QueryKey extends unknown[],
  PageParam = never,
>(
  request: (
    context: QueryFunctionContext<QueryKey, PageParam>,
  ) => Promise<AxiosResponse<Data>>,
  errorConfig?: Record<number, ApiErrorKind>,
): QueryFunction<Data, QueryKey, PageParam>;

export function createApiFn<Data, RequestArgs>(
  request: (args: RequestArgs) => Promise<AxiosResponse<Data>>,
  errorConfig?: Record<number, ApiErrorKind>,
) {
  return async (args: RequestArgs): Promise<Data> => {
    try {
      const { data } = await request(args);

      return data;
    } catch (error) {
      console.error(error);
      throw normalizeApiError(error, errorConfig);
    }
  };
}
