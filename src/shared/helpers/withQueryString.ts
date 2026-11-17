import qs from 'query-string';

type Value = string | number | boolean | undefined | null;

export const withQueryString = <Q extends Record<string, Value | Value[]>>(
  path: string,
  query?: Q,
): string => {
  const separator = path.includes('?') ? '&' : '?';

  return query ? `${path}${separator}${qs.stringify(query)}` : path;
};
