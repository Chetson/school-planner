export enum TableAccessorKey {
  EVENT = 'event',
  ERROR = 'isError',
}

export type TableRow = {
  event: string;
  isError?: boolean;
};
