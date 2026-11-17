import type { z } from 'zod';

export const extractExistingParams = (
  searchParams: URLSearchParams,
): Record<string, string[]> => {
  const entries = Array.from(searchParams.entries());

  return entries.reduce<Record<string, string[]>>(
    (acc, [key, value]) => ((acc[key] = acc[key] || []).push(value), acc),
    {},
  );
};

export const removeExistingParams = (
  existingParams: Record<string, string[]>,
  key: string | string[],
): Record<string, string[]> => {
  if (Array.isArray(key)) {
    key.forEach((k) => {
      delete existingParams[k];
    });
  } else {
    delete existingParams[key];
  }

  return existingParams;
};

export const parseExistingParams = (
  params: URLSearchParams,
  schema?: z.ZodObject<z.ZodRawShape>,
): Record<string, string[]> => {
  const existingParams = extractExistingParams(params);

  if (!schema) return existingParams;

  return Object.keys(schema.shape).reduce((params, key) => {
    const targetSchema = schema.shape[key];
    const value = params[key];

    if (!targetSchema) return params;

    params[key] = targetSchema.safeParse(value).data;

    return params;
  }, existingParams);
};
