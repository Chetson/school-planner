import { memo } from 'react';

import { useSchedule } from '@features/Schedule/lib';
import { isDateWithinRange, parseDateWithTime } from '@shared/helpers';

import { getRangeOfCell } from './lib/helpers';
import { Event } from './ui/Event';

import type { TimeslotInfoModel } from '@entities/settings';
import type { DayOfWeek } from '@shared/helpers';
import type { FC } from 'react';

export interface EventsCellProps {
  row: TimeslotInfoModel;
  day: DayOfWeek;
}

const EventsCell: FC<EventsCellProps> = ({ row, day }) => {
  const { events, range, onEditEvent, onDeleteEvent } = useSchedule();

  const rangeOfCell = getRangeOfCell(row, day, range);
  const dateStr = parseDateWithTime(rangeOfCell?.from) ?? '';
  const isNow = rangeOfCell ? isDateWithinRange(rangeOfCell) : false;
  const eventList = events[dateStr] ?? [];

  if (!rangeOfCell) {
    return null;
  }

  // TODO поправить отображение 3 и более евентов после правки макета
  return (
    <div className="absolute w-full top-0 bottom-0 flex gap-1 p-1">
      {eventList.slice(0, 2).map((event) => (
        <Event
          key={event.id}
          isNow={isNow}
          event={event}
          range={rangeOfCell}
          day={day}
          onEdit={onEditEvent}
          onDelete={onDeleteEvent}
        />
      ))}
    </div>
  );
};

export default memo(EventsCell);
