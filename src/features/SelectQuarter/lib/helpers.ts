import { arabicToRoman } from '@shared/helpers';

import type { QuarterModel } from '@entities/settings';
import type { DropdownRemoteItemType } from '@features/DropdownRemote';

export const getTitle = (quarter: QuarterModel) =>
  `${arabicToRoman(quarter.number)} четверть`;

export const createDropdownItem = (
  quarter: QuarterModel,
): DropdownRemoteItemType<number, QuarterModel> => ({
  title: getTitle(quarter),
  id: quarter.number,
  value: quarter,
});
