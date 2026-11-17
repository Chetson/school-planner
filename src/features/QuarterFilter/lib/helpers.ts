import { arabicToRoman } from '@shared/helpers';

import type { QuarterModel } from '@entities/settings';
import type { DropdownRemoteItemType } from '@features/DropdownRemote';

export const quarterStringDecorator = (number: number | undefined): string =>
  number ? arabicToRoman(number) + ' четверть' : '';

export const normalize = ({
  number,
  dateStart,
  dateEnd,
}: QuarterModel): DropdownRemoteItemType<number, QuarterModel> => ({
  id: number,
  title: quarterStringDecorator(number),
  value: { number, dateStart, dateEnd },
});
