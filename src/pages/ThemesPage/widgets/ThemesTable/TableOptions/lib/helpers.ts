import { IconKind } from '@shared/helpers';

import type { TableOptionsItemType } from './types';
import type { ThemeModel } from '@entities/theme';
import type { TableMeta } from '@tanstack/react-table';

export const createOptions = (meta: TableMeta<ThemeModel>) => {
  const options: TableOptionsItemType[] = [];

  if (meta.onEdit) {
    options.push({
      title: 'Редактировать',
      icon: IconKind.PENCIL,
      callback: meta.onEdit,
    });
  }

  if (meta.onRaise) {
    options.push({
      title: 'Вверх',
      icon: IconKind.DIRECTION_UP,
      callback: meta.onRaise,
    });
  }

  if (meta.onLower) {
    options.push({
      title: 'Вниз',
      icon: IconKind.DIRECTION_DOWN,
      callback: meta.onLower,
    });
  }

  if (meta.onDelete) {
    options.push({
      title: 'Удалить',
      icon: IconKind.TRASH,
      callback: meta.onDelete,
    });
  }

  return options;
};
