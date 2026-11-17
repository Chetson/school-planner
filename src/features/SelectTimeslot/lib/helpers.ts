import { convertTimeslotToCurrentTimeZone } from '@entities/settings';
import { getTimeslotRange } from '@shared/helpers';

import type { TimeslotInfoModel } from '@entities/settings';
import type { DropdownRemoteItemType } from '@features/DropdownRemote';

export const getTitle = ({ startTime, endTime }: TimeslotInfoModel) =>
  getTimeslotRange(startTime, endTime);

export const createDropdownItem = (
  timeslot: TimeslotInfoModel,
): DropdownRemoteItemType<number, TimeslotInfoModel> => {
  const convertedTimeslot = convertTimeslotToCurrentTimeZone(timeslot);

  return {
    id: convertedTimeslot.id,
    title: getTitle(convertedTimeslot),
    value: convertedTimeslot,
  };
};
