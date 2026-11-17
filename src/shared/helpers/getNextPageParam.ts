import type { GetNextPageParamFunction } from '@tanstack/react-query';

export const getNextPageParam: GetNextPageParamFunction<number, unknown> = (
  _,
  groups,
): number => groups.length + 1;
