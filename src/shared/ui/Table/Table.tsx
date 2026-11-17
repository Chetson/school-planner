import { forwardRef, useMemo, useRef } from 'react';

import { composeRefs } from '@radix-ui/react-compose-refs';
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { clsx } from 'clsx';

import { cn } from '@shared/helpers/styles.ts';

import styles from './table.module.css';
import { tabelVariants } from './table.theme.ts';
import { SortIcon } from './ui/SortIcon/SortIcon.tsx';

import type { TableOptions } from '@tanstack/react-table';
import type { Ref, UIEvent } from 'react';

export interface DataTableProps<TData>
  extends Omit<
    TableOptions<TData>,
    'getCoreRowModel' | 'getSortedRowModel' | 'renderFallbackValue'
  > {
  withHeader?: boolean;
  className?: string;
  cellClassName?: string;
  variant?: 'primary' | 'secondary';
  ref?: Ref<HTMLDivElement>;
  onScroll?: (event: UIEvent<HTMLDivElement>) => void;
}

function Table<TData>(
  {
    columns,
    className,
    cellClassName,
    withHeader = true,
    variant,
    onScroll,
    ...props
  }: DataTableProps<TData>,
  ref: Ref<HTMLDivElement>,
) {
  const localRef = useRef<HTMLDivElement | null>(null);

  const setRefs = composeRefs(localRef, ref);

  const memoColumns = useMemo(() => columns, []);

  const table = useReactTable({
    columns: memoColumns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    renderFallbackValue: '-',
    ...props,
  });

  return (
    <div
      onScroll={onScroll}
      ref={setRefs}
      className={cn(tabelVariants({ variant, className }))}
    >
      <table className={styles.table}>
        {/** Заголовок таблицы */}
        {withHeader && (
          <thead className={styles.thead}>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="bg-inherit">
                <th className={clsx(styles['pinned-cell'], 'left-0', 'z-40')}>
                  <div
                    className={clsx(
                      styles['pinned-cell-content'],
                      'rounded-l-22',
                    )}
                  />
                </th>
                {headerGroup.headers.map((header, i) => (
                  <th
                    onClick={header.column.getToggleSortingHandler()}
                    key={header.id}
                    className={clsx(
                      styles['head-cell'],
                      i !== 0 && 'pl-4',
                      i !== headerGroup.headers.length - 1 && 'pr-4',
                      header.column.getCanSort() && 'cursor-pointer',
                    )}
                    style={{
                      width: `${header.getSize()}px`,
                      maxWidth: `${header.getSize()}px`,
                    }}
                  >
                    <div className="relative z-50 flex items-center gap-2">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                      <SortIcon column={header.column} />
                    </div>
                  </th>
                ))}
                <th className={clsx(styles['pinned-cell'], 'right-0', 'z-20')}>
                  <div
                    className={clsx(
                      styles['pinned-cell-content'],
                      'rounded-r-22',
                    )}
                  />
                </th>
              </tr>
            ))}
          </thead>
        )}

        {/** Тело таблицы */}
        <tbody className={styles.tbody}>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className={styles.row}>
              <td className={clsx(styles['pinned-cell'], 'left-0', 'z-10 ')}>
                <div
                  className={clsx(
                    styles['pinned-cell-content'],
                    'rounded-l-22',
                  )}
                />
              </td>
              {row.getVisibleCells().map((cell, i) => (
                <td
                  key={cell.id}
                  className={clsx(
                    styles.cell,
                    cellClassName,
                    i !== 0 && 'pl-4',
                    i !== row.getVisibleCells().length - 1 && 'pr-4',
                  )}
                  style={{
                    width: `${cell.column.getSize()}px`,
                    maxWidth: `${cell.column.getSize()}px`,
                  }}
                >
                  <div className="h-full relative truncate z-20 text-sm">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </div>
                </td>
              ))}
              <td className={clsx(styles['pinned-cell'], 'right-0', 'z-10')}>
                <div
                  className={clsx(
                    styles['pinned-cell-content'],
                    'rounded-r-22',
                  )}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default forwardRef(Table) as typeof Table;
