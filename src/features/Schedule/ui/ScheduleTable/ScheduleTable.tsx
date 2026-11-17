import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import clsx from 'clsx';

import { SCHEDULE_COLUMNS, useSchedule } from '@features/Schedule/lib';

import styles from './scheduleTable.module.css';

import type { FC } from 'react';

export const ScheduleTable: FC = () => {
  const { timeslots } = useSchedule();

  const table = useReactTable({
    columns: SCHEDULE_COLUMNS,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    data: timeslots,
  });

  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead className={clsx(styles['thead'])}>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="bg-inherit">
              {headerGroup.headers.map((header, i) => (
                <th
                  onClick={header.column.getToggleSortingHandler()}
                  key={header.id}
                  className={clsx(
                    i === 0 && styles['time-cell'],
                    i === 0 && 'sticky top-0 !z-50',
                    i === headerGroup.headers.length - 1 &&
                      styles['shift-cell'],
                    styles['thead-cell'],
                  )}
                  style={{
                    width: `${header.getSize()}px`,
                    maxWidth: `${header.getSize()}px`,
                  }}
                >
                  <div
                    className={clsx(
                      i === 0 && 'rounded-t-md',
                      i === 1 && 'rounded-tl-md',
                      i === headerGroup.headers.length - 1 && 'rounded-tr-md',
                      'bg-bg-default w-full h-full overflow-hidden',
                    )}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className={styles['tbody']}>
          {table.getRowModel().rows.map((row, rowIndex, rows) => (
            <tr key={row.id} className={styles.row}>
              {row.getVisibleCells().map((cell, cellIndex, cells) => (
                <td
                  key={cell.id}
                  className={clsx(
                    cellIndex === 0 && styles['time-cell'],
                    cellIndex > 0 && cellIndex < rows.length - 1 && 'min-w-32',
                    styles['tbody-cell'],
                  )}
                  style={{
                    width: `${cell.column.getSize()}px`,
                    maxWidth: `${cell.column.getSize()}px`,
                  }}
                >
                  <div
                    className={clsx(
                      rowIndex === rows.length - 1 &&
                        cellIndex === 0 &&
                        'rounded-b-md',
                      rowIndex === rows.length - 1 &&
                        cellIndex === 1 &&
                        'rounded-bl-md',
                      rowIndex === rows.length - 1 &&
                        cellIndex === cells.length - 1 &&
                        'rounded-br-md',
                      styles['tbody-cell-content'],
                    )}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
