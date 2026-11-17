import clsx from 'clsx';

import { PencilIcon, TrashIcon } from '@shared/assets';
import { IconKind } from '@shared/helpers';
import { Icon } from '@shared/ui';

import type { TableMeta } from '@tanstack/react-table';

export interface TableActionsProps<Model extends object> {
  model: Model;
  isBlocked?: boolean;
  meta?: TableMeta<Model>;
}

export const TableActions = <Model extends object>({
  model,
  isBlocked,
  meta,
}: TableActionsProps<Model>) => {
  const { onEdit, onDelete, onBlock } = meta ?? {};

  return (
    <div className="flex items-start justify-end gap-2 text-decorative-gray-blue">
      {onEdit && (
        <button onClick={() => onEdit(model)}>
          <PencilIcon />
        </button>
      )}
      {onDelete && (
        <button onClick={() => onDelete(model)}>
          <TrashIcon />
        </button>
      )}
      {onBlock && (
        <button onClick={() => onBlock(model)}>
          <Icon
            className={clsx(isBlocked && 'text-text-critical')}
            kind={isBlocked ? IconKind.LOCK : IconKind.UNLOCK}
          />
        </button>
      )}
    </div>
  );
};
