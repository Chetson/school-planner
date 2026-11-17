import type { ThemeModel } from '@entities/theme';
import type { IconKind } from '@shared/helpers';

export type TableOptionsItemType = {
  callback: (theme: ThemeModel) => void;
  title: string;
  icon?: IconKind;
};
