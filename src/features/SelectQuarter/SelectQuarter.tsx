import { forwardRef, memo } from 'react';

import { QUARTER_QUERY_KEYS } from '@entities/settings';
import { quartersQueryFn } from '@entities/settings/queries';
import { SelectRemote } from '@features/SelectRemote';

import { createDropdownItem, getTitle } from './lib/helpers';

import type { QuarterModel } from '@entities/settings';
import type { MultiselectDropdownRemoteProps } from '@features/DropdownRemote';
import type { SelectInputProps } from '@shared/ui';
import type { ForwardRefRenderFunction } from 'react';

const SelectQuarter: ForwardRefRenderFunction<
  HTMLButtonElement,
  MultiselectDropdownRemoteProps<QuarterModel> & SelectInputProps
> = (props, ref) => {
  return (
    <SelectRemote
      {...props}
      ref={ref}
      getTitle={getTitle}
      queryKey={QUARTER_QUERY_KEYS}
      queryFn={quartersQueryFn}
      normalize={createDropdownItem}
    />
  );
};

export default memo(forwardRef(SelectQuarter));
