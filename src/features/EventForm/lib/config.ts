import { EventKind, EventPeriod } from '@entities/event';

import type { RadioGroupItemType } from '@shared/ui';

export const PERIOD_OPTIONS: RadioGroupItemType<EventPeriod>[] = [
  {
    id: EventPeriod.UNIQUE,
    label: 'Не повторять',
  },
  {
    id: EventPeriod.DAILY,
    label: 'Каждый день',
  },
  {
    id: EventPeriod.WEEKLY,
    label: 'Каждую неделю',
  },
  {
    id: EventPeriod.BIWEEKLY,
    label: 'Каждые 2 недели',
  },
  {
    id: EventPeriod.MONTHLY,
    label: 'Каждый месяц',
  },
];

export const EVENT_TYPE_OPTIONS: RadioGroupItemType<EventKind>[] = [
  {
    id: EventKind.MANDATORY,
    label: 'Урок',
  },
  {
    id: EventKind.FACULTY,
    label: 'Факультатив',
  },
];
