import type { ReactNode } from 'react';

export enum TableAccessorKey {
  NAME = 'name',
  ERROR = 'error',
}

export type TableData = Record<TableAccessorKey, ReactNode>;
