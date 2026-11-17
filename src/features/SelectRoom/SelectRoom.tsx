import { forwardRef, memo, useState } from 'react';

import { roomsQueryFn } from '@entities/room';
import { ROOMS_LIST_QUERY_KEYS } from '@entities/room';
import { SelectRemote } from '@features/SelectRemote';

import { createDropdownItem, getTitle } from './lib/helpers';

import type { RoomModel } from '@entities/room';
import type { MultiselectDropdownRemoteProps } from '@features/DropdownRemote';
import type { SelectInputProps } from '@shared/ui';
import type { ForwardRefRenderFunction } from 'react';

const SelectRoom: ForwardRefRenderFunction<
  HTMLButtonElement,
  MultiselectDropdownRemoteProps<RoomModel> & SelectInputProps
> = (props, ref) => {
  const [search, setSearch] = useState('');

  return (
    <SelectRemote
      {...props}
      ref={ref}
      withSearch
      searchText={search}
      getTitle={getTitle}
      queryKey={ROOMS_LIST_QUERY_KEYS({ search: search.trim() })}
      queryFn={roomsQueryFn}
      normalize={createDropdownItem}
      onSearch={setSearch}
    />
  );
};

export default memo(forwardRef(SelectRoom));
