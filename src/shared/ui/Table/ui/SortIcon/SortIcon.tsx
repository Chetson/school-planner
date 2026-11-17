import { IconKind } from '@shared/helpers';
import { SortDirection } from '@shared/types';
import { Icon } from '@shared/ui';
import type { Column } from '@tanstack/react-table';
import { clsx } from 'clsx';

interface SortIconProps<TData> {
  column: Column<TData, unknown>;
}

export function SortIcon<TData>({ column }: SortIconProps<TData>) {
  if (!column.getCanSort()) {
    return null;
  }

  return (
    <div
      className={clsx(
        'h-5 w-5 text-decorative-blue',
        column.getIsSorted() === SortDirection.ASC && 'rotate-180',
      )}
    >
      {column.getIsSorted() && (
        <Icon kind={IconKind.SORT} className="text-decorative-blue h-5 w-5" />
      )}
    </div>
  );
}
