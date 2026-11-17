export const deriveStrValue = (value?: File[] | File | null): string => {
  if (!value) return '';

  if (Array.isArray(value)) {
    return value.map((file) => file.name).join()
  }

  return value.name ?? '';
};
