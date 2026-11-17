import type { RadioGroupItemType } from '@shared/ui';

export enum EventKind {
  FACULTY = 'FACULTY',
  MANDATORY = 'MANDATORY',
}

export enum EventPeriod {
  UNIQUE = 'UNIQUE',
  DAILY = 'DAILY',
  WEEKLY = 'WEEKLY',
  BIWEEKLY = 'BIWEEKLY',
  MONTHLY = 'MONTHLY',
}

export const EVENT_KIND_NAMES: Record<EventKind, string> = {
  FACULTY: 'Факультатив',
  MANDATORY: 'Урок',
};

export enum EventChangeKind {
  SINGLE = 'SINGLE',
  PERMANENT = 'PERMANENT',
}

export const CONFIRM_CHANGE_OPTIONS: RadioGroupItemType<EventChangeKind>[] = [
  {
    id: EventChangeKind.SINGLE,
    label: 'Только это событие',
  },
  {
    id: EventChangeKind.PERMANENT,
    label: 'Это и последующие события',
  },
];
