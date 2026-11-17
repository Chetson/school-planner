import { getDate, isBefore } from 'date-fns';

import { EVENT_KIND_NAMES } from '@entities/event';
import { Role } from '@entities/user';
import { AccessRole } from '@features/AccessRole';
import {
  DAYS_OF_WEEK_FULL_MAP,
  getTimeslotRange,
  IconKind,
} from '@shared/helpers';
import { Button, Icon, Popover, PopoverTrigger, Typography } from '@shared/ui';

import { EventItem } from '../EventItem';

import type { EventModel } from '@entities/event';
import type { DayOfWeek, NonNullableDateRange } from '@shared/helpers';
import type { FC } from 'react';

interface EventProps {
  isNow: boolean;
  event: EventModel;
  range: NonNullableDateRange;
  day: DayOfWeek;
  onEdit: (event: EventModel) => void;
  onDelete: (event: EventModel) => void;
}

export const Event: FC<EventProps> = ({
  isNow,
  event,
  range,
  day,
  onEdit,
  onDelete,
}) => {
  const {
    timeslot,
    group: { room, subject },
    eventType,
    eventDate,
    comment,
  } = event;

  const roomAndSubject = [room?.roomName, subject?.name]
    .filter(Boolean)
    .join(' ');

  return (
    <Popover
      anchorClassName="h-full w-full"
      popoverClassName="w-48 p-4 rounded-2xl"
      anchor={<EventItem isNow={isNow} event={event} range={range} />}
    >
      <div className="w-full p-2 overflow-hidden bg-decorative-blue rounded-lg">
        <Typography variant="caption2" color="default-inverted">
          {getDate(eventDate)}, {DAYS_OF_WEEK_FULL_MAP[day]}
        </Typography>
        <Typography
          variant="caption2"
          className="break-all block"
          color="default-inverted"
        >
          {getTimeslotRange(timeslot.startTime, timeslot.endTime)}
        </Typography>
      </div>
      {roomAndSubject && (
        <Typography variant="caption2" className="pt-4 block">
          {roomAndSubject}
        </Typography>
      )}
      <Typography className="block" variant="caption2" color="secondary">
        {EVENT_KIND_NAMES[eventType]}
      </Typography>
      {comment && (
        <Typography variant="caption2" color="secondary">
          {comment}
        </Typography>
      )}
      {isBefore(new Date(), new Date(eventDate)) && (
        <AccessRole role={Role.ADMIN}>
          <div className="space-x-1 flex justify-end pt-3">
            <PopoverTrigger asChild>
              <Button
                variant="tertiary"
                size="s"
                onClick={() => onDelete(event)}
              >
                <Icon kind={IconKind.TRASH} className="text-text-critical" />
              </Button>
            </PopoverTrigger>
            <PopoverTrigger asChild>
              <Button variant="tertiary" size="s" onClick={() => onEdit(event)}>
                <Icon kind={IconKind.PENCIL} className="text-text-secondary" />
              </Button>
            </PopoverTrigger>
          </div>
        </AccessRole>
      )}
    </Popover>
  );
};
