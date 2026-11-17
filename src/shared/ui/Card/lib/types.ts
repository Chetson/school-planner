import type { IconKind } from '@shared/helpers';

export type CardColor = 'gray' | 'blue' | 'mint' | 'orange';

export interface CardListItemProps {
  icon?: IconKind;
  color?: CardColor;
  title?: string;
  subtitle?: string;
}

export interface CardProps {
  title: string;
  color?: CardColor;
  icon?: IconKind;
  items?: CardListItemProps[];
  isCounter?: boolean;
  className?: string;
}
