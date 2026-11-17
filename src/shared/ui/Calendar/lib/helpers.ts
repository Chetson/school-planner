import type { DropdownItemType } from '@shared/ui/Dropdown';
import type { DropdownOption as DayPickerDropdownOption } from 'react-day-picker';

export interface CalendarOption extends DropdownItemType<number> {
  value: number;
}

export const getNormalizedOptions = (
  options?: DayPickerDropdownOption[],
): CalendarOption[] =>
  (options || []).map((option) => ({
    id: option.value,
    title: option.label,
    value: option.value,
  }));
