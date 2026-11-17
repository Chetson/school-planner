import type { ReactNode } from 'react';

export type TabItem<Id> = {
  id: Id;
  title: string;
  content: ReactNode;
};

export interface TabsProps<Id, Item extends TabItem<Id>> {
  tabs?: Item[];
  active?: Item;
  className?: string;
  onChange?: (newTab: TabItem<Id>) => void;
}
