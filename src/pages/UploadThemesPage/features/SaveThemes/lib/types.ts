export enum TableAccessorKey {
  THEME = 'theme',
  HOURS = 'hours',
  ERROR = 'isError',
}

export type TableRow = {
  theme: string;
  hours?: number;
  isError?: boolean;
};
