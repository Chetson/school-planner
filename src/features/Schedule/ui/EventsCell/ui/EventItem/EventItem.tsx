import clsx from 'clsx';

import { getDateProperties } from '@features/Schedule/lib';
import { PopoverTrigger, Typography } from '@shared/ui';

import { getTypographyColor } from './helpers';

import type { EventModel } from '@entities/event';
import type { NonNullableDateRange } from '@shared/helpers';
import type { FC } from 'react';

interface EventItemProps {
  isNow: boolean;
  event: EventModel;
  range: NonNullableDateRange;
}

export const EventItem: FC<EventItemProps> = ({ isNow, event, range }) => {
  const { isPast, isFuture } = getDateProperties(range.from);

  const isMANDATORY = event.eventType === 'MANDATORY';
  const isFACULTY = event.eventType === 'FACULTY';
  const typographyColor = getTypographyColor(isPast, isNow);

  return (
    <PopoverTrigger asChild>
      <div
        className={clsx(
          isNow && '!bg-decorative-blue',
          isMANDATORY && isPast && 'bg-bg-secondary',
          isMANDATORY && isFuture && 'bg-decorative-beige',
          isFACULTY && isPast && 'bg-decorative-light-blue',
          isFACULTY && isFuture && 'bg-decorative-lavender',
          'rounded w-full h-full min-w-[48%] p-1 overflow-hidden flex flex-col cursor-pointer',
        )}
      >
        {event.group.room?.roomName && (
          <Typography
            variant="caption2"
            color={typographyColor}
            className="truncate"
          >
            {event.group.room.roomName}
          </Typography>
        )}
        {event.group.subject?.name && (
          <Typography
            variant="caption2"
            color={typographyColor}
            className="truncate"
          >
            {event.group.subject.name}
          </Typography>
        )}
        {event.group.groupClass?.length ? (
          <Typography
            variant="caption2"
            color={typographyColor}
            className="truncate"
          >
            {event.group.groupClass
              .map(({ className }) => className)
              .join(', ')}
          </Typography>
        ) : null}
      </div>
    </PopoverTrigger>
  );
};
