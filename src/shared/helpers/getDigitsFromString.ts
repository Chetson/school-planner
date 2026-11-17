export const getDigitsFromString = (value: string): string =>
  value.match(/\d+/g)?.join('') || '';
