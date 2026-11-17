import { forwardRef, memo } from 'react';

import { TIMESLOTS_QUERY_KEYS } from '@entities/settings';
import { timeslotsSettingsQueryFn } from '@entities/settings/queries';
import { SelectRemote } from '@features/SelectRemote';
import { ClockIcon } from '@shared/assets';

import { createDropdownItem, getTitle } from './lib/helpers';

import type { TimeslotInfoModel } from '@entities/settings';
import type { MultiselectDropdownRemoteProps } from '@features/DropdownRemote';
import type { SelectInputProps } from '@shared/ui';
import type { ForwardRefRenderFunction } from 'react';

export type SelectTimeslotProps = {
  anchorClassName?: string;
} & MultiselectDropdownRemoteProps<TimeslotInfoModel> &
  SelectInputProps;

const SelectTimeslot: ForwardRefRenderFunction<
  HTMLButtonElement,
  SelectTimeslotProps
> = (props, ref) => (
  <SelectRemote
    {...props}
    ref={ref}
    leftElement={<ClockIcon />}
    queryKey={TIMESLOTS_QUERY_KEYS}
    queryFn={timeslotsSettingsQueryFn}
    getTitle={getTitle}
    normalize={createDropdownItem}
  />
);

export default memo(forwardRef(SelectTimeslot));
