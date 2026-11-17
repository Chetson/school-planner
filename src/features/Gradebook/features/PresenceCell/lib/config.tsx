import { Presence } from '@entities/gradebook';

import type { ReactNode } from 'react';

export const PRESENCE_VALUES: Record<Presence, ReactNode> = {
  [Presence.PRESENT]: (
    <div className="w-1 h-1 bg-decorative-blue rounded-full" />
  ),
  [Presence.ABSENT]: 'Н',
  [Presence.ABSENT_REASONS]: 'Н/У',
  [Presence.ABSENT_SICK]: 'Н/Б',
};

export const PRESENCE_NAMES: Record<Presence, string> = {
  [Presence.PRESENT]: 'На уроке',
  [Presence.ABSENT]: 'Нет на уроке',
  [Presence.ABSENT_REASONS]: 'Нет по причине',
  [Presence.ABSENT_SICK]: 'Нет по справке',
};
