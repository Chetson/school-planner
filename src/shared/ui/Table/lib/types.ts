import type { RowData } from '@tanstack/react-table';

export type TableAction<TData extends RowData> = (data: TData) => void;

declare module '@tanstack/react-table' {
  interface TableMeta<TData extends RowData> {
    onDelete?: TableAction<TData>;
    onEdit?: TableAction<TData>;
    onBlock?: TableAction<TData>;
    onRaise?: TableAction<TData>;
    onLower?: TableAction<TData>;
  }
}
