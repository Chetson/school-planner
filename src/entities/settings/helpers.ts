import { convertToCurrentTimeZone } from '@shared/helpers';

import type { TimeslotInfoModel } from './types';

export const convertTimeslotToCurrentTimeZone = (
  timeslot: TimeslotInfoModel,
): TimeslotInfoModel => ({
  ...timeslot,
  startTime: convertToCurrentTimeZone(timeslot.startTime),
  endTime: convertToCurrentTimeZone(timeslot.endTime),
});
