import { Presence } from '@entities/gradebook';

import { PRESENCE_NAMES } from './config';
import { PresenceBadge } from '../ui/PresenceBadge';

import type { DropdownItemType } from '@shared/ui';

export const createDropdownItem = (
  presence?: Presence | null,
): DropdownItemType<Presence> | null =>
  presence
    ? {
        id: presence,
        title: PRESENCE_NAMES[presence],
        icon: <PresenceBadge presence={presence} />,
      }
    : null;

export const DROPDOWN_OPTIONS = [
  createDropdownItem(Presence.PRESENT),
  createDropdownItem(Presence.ABSENT),
  createDropdownItem(Presence.ABSENT_REASONS),
  createDropdownItem(Presence.ABSENT_SICK),
] as DropdownItemType<Presence>[];
