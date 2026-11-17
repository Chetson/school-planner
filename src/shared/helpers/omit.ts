export function omit<T extends object, K extends keyof T>(
  obj: T,
  keys: K[] | K,
): Omit<T, K> {
  const result = { ...obj };
  (Array.isArray(keys) ? keys : [keys]).forEach((key) => {
    delete result[key];
  });

  return result;
}
