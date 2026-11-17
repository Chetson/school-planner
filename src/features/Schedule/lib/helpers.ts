import { isToday, isWeekend, isPast, isFuture } from 'date-fns';

import { applyTimeToDate, parseDateWithTime } from '@shared/helpers';

import type { EventModel } from '@entities/event';

export const getDateProperties = (date = new Date()) => ({
  isPast: isPast(date),
  isToday: isToday(date),
  isFuture: isFuture(date),
  isWeekend: isWeekend(date),
});

export const createEventsMap = (events: EventModel[]) =>
  events.reduce<Record<string, EventModel[]>>((map, event) => {
    const dateStr = parseDateWithTime(
      applyTimeToDate(event.timeslot.startTime, new Date(event.eventDate)),
    );

    if (!dateStr) return map;

    if (map[dateStr]) {
      map[dateStr].push(event);
    } else {
      map[dateStr] = [event];
    }

    return map;
  }, {});
