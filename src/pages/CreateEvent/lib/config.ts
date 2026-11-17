import { EventKind, EventPeriod } from '@entities/event';

import type { EventFormData } from '@features/EventForm/lib';

export const defaultValues: Partial<EventFormData> = {
  period: EventPeriod.UNIQUE,
  eventType: EventKind.MANDATORY,
};
