import { memo, useMemo } from 'react';

import { createEventsMap, ScheduleProvider } from './lib';
import { ScheduleTable } from './ui/ScheduleTable';

import type { EventModel } from '@entities/event';
import type { TimeslotInfoModel } from '@entities/settings';
import type { DateRange } from '@shared/helpers';
import type { FC } from 'react';

export interface ScheduleProps {
  range: DateRange;
  events?: EventModel[];
  timeslots: TimeslotInfoModel[];
  onEditEvent: (event: EventModel) => void;
  onDeleteEvent: (date: EventModel) => void;
  onChangeRange: (date: DateRange) => void;
}

const Schedule: FC<ScheduleProps> = ({
  range,
  events = [],
  timeslots,
  onChangeRange,
  onEditEvent,
  onDeleteEvent,
}) => {
  const eventsMap = useMemo(() => createEventsMap(events), [events]);

  return (
    <ScheduleProvider
      range={range}
      events={eventsMap}
      timeslots={timeslots}
      onEditEvent={onEditEvent}
      onChangeRange={onChangeRange}
      onDeleteEvent={onDeleteEvent}
    >
      <ScheduleTable />
    </ScheduleProvider>
  );
};

export default memo(Schedule);
