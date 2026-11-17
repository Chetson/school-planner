import type { EventModel } from '@entities/event';
import type { EventFormData } from '@features/EventForm/lib';
import type { DefaultValues } from 'react-hook-form';

export const prepareDefaultValues = (
  event: EventModel,
): DefaultValues<EventFormData> => {
  const commonValues = {
    range: { from: new Date(event.dateStart), to: new Date(event.dateEnd) },
    timeslot: event.timeslot,
    period: event.period,
    eventType: event.eventType,
    comment: event.comment,
  };

  if (event.isGroupEvent) {
    return { ...commonValues, group: event.group };
  } else {
    return {
      ...commonValues,
      groupClass: event.group.groupClass?.[0],
      teacher: event.group.teacher,
      room: event.group.room ?? undefined,
      subject: event.group.subject ?? undefined,
    };
  }
};
