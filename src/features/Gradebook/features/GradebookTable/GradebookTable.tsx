import { useEffect, useRef } from 'react';

import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import clsx from 'clsx';

import styles from './gradebookTable.module.css';
import { TableAccessorKey } from '../../lib';

import type { GradebookRow } from '../../lib';
import type { GroupColumnDef } from '@tanstack/react-table';
import type { FC } from 'react';

export type GradebookTableProps = {
  rows: GradebookRow[];
  columns: GroupColumnDef<GradebookRow, unknown>[];
};

export const GradebookTable: FC<GradebookTableProps> = ({ rows, columns }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const table = useReactTable({
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    data: rows,
    state: {
      columnPinning: {
        left: [TableAccessorKey.STUDENTS, TableAccessorKey.SUBJECTS],
        right: [TableAccessorKey.TOTAL_SCORE],
      },
    },
  });

  useEffect(() => {
    if (containerRef.current) {
      const scrollWidth = containerRef.current.scrollWidth;
      const clientWidth = containerRef.current.clientWidth;

      containerRef.current.scrollLeft = scrollWidth - clientWidth;
    }
  }, []);

  return (
    <div className={styles.wrapper} ref={containerRef}>
      <table className={styles.table}>
        <thead className={styles['thead']}>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="bg-inherit box-border">
              {headerGroup.headers.map((header) => {
                const isPinnedLeft = header.column.getIsPinned() === 'left';
                const isPinnedRight = header.column.getIsPinned() === 'right';

                return (
                  <th
                    colSpan={header.colSpan}
                    key={header.id}
                    className={clsx(
                      isPinnedLeft && styles['pinned-left'],
                      isPinnedRight && styles['pinned-right'],
                      styles['thead-cell'],
                    )}
                  >
                    <div
                      className={clsx(
                        header.depth === 1
                          ? 'rounded-t-md bg-decorative-blue text-decorative-white'
                          : 'bg-decorative-light-blue-gray text-text-default',
                        'bg-bg-default max-w-full h-7 overflow-hidden',
                      )}
                    >
                      {/* Если критичны стили где хедер смержен, можно сделать что-то вроде такого https://github.com/TanStack/table/discussions/5201*/}
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </div>
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody className={styles['tbody']}>
          {table.getRowModel().rows.map((row, rowIndex) => {
            return (
              <tr key={row.id} className={clsx('trow', 'bg-inherit')}>
                {row.getVisibleCells().map((cell, cellIndex) => {
                  const isPinnedLeft = cell.column.getIsPinned() === 'left';
                  const isPinnedRight = cell.column.getIsPinned() === 'right';

                  return (
                    <td
                      key={cell.id}
                      className={clsx(
                        isPinnedLeft && styles['pinned-left'],
                        isPinnedRight && styles['pinned-right'],
                        styles['tbody-cell'],
                      )}
                    >
                      <div
                        className={clsx(
                          'tbody-cell-content',
                          'overflow-hidden h-12 w-full',
                          rowIndex === table.getRowModel().rows.length - 1 &&
                            isPinnedLeft &&
                            'rounded-b-md',
                          rowIndex === table.getRowModel().rows.length - 1 &&
                            cellIndex === 1 &&
                            'rounded-bl-md',
                          rowIndex === table.getRowModel().rows.length - 1 &&
                            row.getVisibleCells().length - 2 === cellIndex &&
                            'rounded-br-md',
                          isPinnedRight &&
                            rowIndex === table.getRowModel().rows.length - 1 &&
                            'rounded-b-md',
                          rowIndex % 2 !== 0
                            ? 'bg-decorative-light-blue'
                            : 'bg-bg-default',
                        )}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </div>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
