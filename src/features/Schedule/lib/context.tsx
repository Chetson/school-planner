import { createContext, useContext } from 'react';

import type { EventModel } from '@entities/event';
import type { TimeslotInfoModel } from '@entities/settings';
import type { DateRange } from '@shared/helpers';
import type { FC, PropsWithChildren } from 'react';

export type ScheduleData = {
  events: Record<string, EventModel[]>;
  range: DateRange;
  timeslots: TimeslotInfoModel[];
  onChangeRange: (dates: DateRange) => void;
  onEditEvent: (event: EventModel) => void;
  onDeleteEvent: (date: EventModel) => void;
};

const ScheduleContext = createContext<ScheduleData | null>(null);

export const ScheduleProvider: FC<ScheduleData & PropsWithChildren> = ({
  children,
  ...value
}) => (
  <ScheduleContext.Provider value={value}>{children}</ScheduleContext.Provider>
);

export const useSchedule = () => {
  const data = useContext(ScheduleContext);

  if (!data) {
    throw new Error('useSchedule must be used within ScheduleProvider');
  }

  return data;
};
